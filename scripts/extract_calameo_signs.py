"""Extract the individual road-sign illustrations from the supplied Calameo pages.

The publication pages contain a full-resolution JPEG underneath their searchable
text layer.  This script reads that JPEG, selects the catalogue's fixed grid,
removes the surrounding page background and exports compact WebP assets.
"""

from __future__ import annotations

import argparse
import base64
from difflib import SequenceMatcher
import html
import io
import re
import unicodedata
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageOps, ImageStat


PAGE_IMAGE = re.compile(r'<image[^>]+base64,([^"\']+)')
SERIES = re.compile(
    r"id:\s*'(?P<id>serie-[^']+)'[\s\S]*?names:\s*`(?P<names>[^`]+)`",
    re.MULTILINE,
)
TEXT_NODE = re.compile(
    r'<text class="(?P<class>[^"]+)"[^>]*transform="matrix\((?P<matrix>[^)]*)\)"[^>]*>(?P<text>.*?)</text>'
)

# The brochure uses three columns and three rows.  Values are expressed in the
# 1153 x 1600 source-page coordinate system and stop before the printed caption.
COLUMNS = ((154, 394), (462, 702), (770, 1010))
ROWS = ((151, 352), (608, 809), (1065, 1266))

FAMILY_PAGES = {
    'serie-pericolo': (2, 6),
    'serie-precedenza': (6, 8),
    'serie-divieto': (8, 11),
    'serie-sosta': (11, 12),
    'serie-obbligo': (12, 15),
    'serie-integrativi': (16, 19),
    'serie-complementari-cds': (19, 21),
    'serie-preavviso-preselezione': (22, 23),
    'serie-direzione': (24, 25),
    'serie-identificazione-progressive': (25, 27),
    'serie-localita': (27, 29),
    'serie-turistico-alberghiera': (30, 31),
    'serie-guida': (31, 37),
    'serie-servizi': (38, 40),
    'serie-simboli-indicazione': (41, 55),
    'serie-temporanei': (56, 64),
    'serie-ferroviaria': (64, 64),
}

MANUAL_SLOTS = {
    'serie-integrativi::Validità nei giorni festivi': (16, 1, 1),
    'serie-integrativi::Validità nei giorni lavorativi': (16, 1, 1),
    'serie-integrativi::Eccezione per categoria': (16, 1, 2),
    'serie-integrativi::Fine della prescrizione': (16, 2, 1),
    'serie-integrativi::Strada sdrucciolevole per ghiaccio': (17, 2, 0),
    'serie-integrativi::Strada sdrucciolevole per pioggia': (17, 2, 1),
    'serie-temporanei::Impianto sequenziale': (58, 0, 0),
    'serie-temporanei::Presegnale di cantiere mobile': (59, 0, 2),
    'serie-temporanei::Segnale mobile di preavviso': (59, 0, 1),
    'serie-temporanei::Segnale mobile di protezione': (59, 1, 0),
    'serie-temporanei::Passaggio obbligatorio per veicoli operativi': (59, 0, 0),
    'serie-temporanei::Barriera di recinzione per chiusini': (59, 2, 1),
    'serie-temporanei::Preavviso di deviazione': (60, 0, 2),
    'serie-temporanei::Preavviso deviazione con limite di massa': (60, 1, 2),
    'serie-temporanei::Preavviso deviazione autocarri consigliata': (60, 2, 2),
    'serie-temporanei::Preavviso deviazione autocarri obbligatoria': (60, 2, 0),
    'serie-temporanei::Direzione autocarri obbligatoria': (60, 2, 1),
    'serie-temporanei::Direzione autocarri consigliata': (61, 0, 0),
    'serie-temporanei::Conferma di deviazione': (60, 1, 0),
    'serie-temporanei::Corsia destra chiusa da due a una': (61, 0, 1),
    'serie-temporanei::Corsia sinistra chiusa da due a una': (61, 0, 2),
    'serie-temporanei::Corsia destra chiusa da tre a due': (61, 1, 0),
    'serie-temporanei::Corsia sinistra chiusa da tre a due': (61, 1, 1),
    'serie-temporanei::Corsie chiuse con deviazione parallela': (61, 1, 2),
    'serie-temporanei::Corsie chiuse con passaggio su carreggiata opposta': (61, 2, 1),
    'serie-temporanei::Carreggiata chiusa con deviazione su una corsia': (62, 0, 1),
    'serie-temporanei::Carreggiata chiusa con deviazione su due corsie': (62, 0, 0),
    'serie-temporanei::Rientro in carreggiata': (62, 1, 0),
    'serie-temporanei::Uso corsie disponibili': (63, 0, 1),
    'serie-temporanei::Variazione corsie disponibili': (63, 0, 0),
    'serie-temporanei::Presegnalamento cantiere autostradale': (63, 1, 0),
    'serie-temporanei::Supporto guard-rail centro onda monofacciale': (63, 2, 0),
    'serie-temporanei::Supporto guard-rail centro onda bifacciale': (63, 2, 1),
    'serie-temporanei::Supporto guard-rail sopra onda destro': (63, 2, 2),
    'serie-temporanei::Supporto guard-rail sopra onda sinistro': (64, 0, 0),
    'serie-temporanei::Supporto muro controripa': (64, 0, 1),
}


def page_image(svg_path: Path) -> Image.Image:
    source = svg_path.read_text(encoding='utf-8')
    match = PAGE_IMAGE.search(source)
    if not match:
        raise RuntimeError(f'No embedded page image in {svg_path.name}')
    return Image.open(io.BytesIO(base64.b64decode(match.group(1)))).convert('RGB')


def ink_ratio(image: Image.Image) -> float:
    """Return the share of pixels that differ materially from the white page."""
    sample = image.resize((146, 105)).convert('L')
    histogram = sample.histogram()
    return sum(histogram[:238]) / (sample.width * sample.height)


def content_score(image: Image.Image) -> float:
    sample = image.resize((132, 105)).convert('RGB')
    return sum(ImageStat.Stat(sample).stddev) / 3


def trim_page_background(image: Image.Image, padding: int = 8) -> Image.Image:
    background = Image.new('RGB', image.size, image.getpixel((0, 0)))
    difference = ImageChops.difference(image, background).convert('L')
    difference = difference.point(lambda value: 255 if value > 14 else 0)
    bounds = difference.getbbox()
    if not bounds:
        return image
    left, top, right, bottom = bounds
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(image.width, right + padding)
    bottom = min(image.height, bottom + padding)
    return image.crop((left, top, right, bottom))


def slugify(value: str) -> str:
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode()
    value = re.sub(r'[^a-zA-Z0-9]+', '-', value).strip('-').lower()
    return value or 'segnale'


def catalogue_variants(data_path: Path) -> list[tuple[str, str]]:
    source = data_path.read_text(encoding='utf-8')
    variants: list[tuple[str, str]] = []
    for match in SERIES.finditer(source):
        family = match.group('id')
        variants.extend((family, name.strip()) for name in match.group('names').split('|'))
    return variants


def slot_titles(svg_path: Path) -> dict[tuple[int, int], str]:
    source = svg_path.read_text(encoding='utf-8')
    grouped: dict[tuple[int, int], list[tuple[float, str]]] = {}
    title_bands = ((380, 505), (837, 962), (1294, 1419))

    for match in TEXT_NODE.finditer(source):
        if not {'fc1', 'fc2'}.intersection(match.group('class').split()):
            continue
        matrix = match.group('matrix').split()
        if len(matrix) != 6:
            continue
        x, y = float(matrix[-2]), float(matrix[-1])
        column = min(range(3), key=lambda index: abs(x - COLUMNS[index][0]))
        if abs(x - COLUMNS[column][0]) > 80:
            continue
        row = next((index for index, (low, high) in enumerate(title_bands) if low <= y <= high), None)
        if row is None:
            continue
        value = html.unescape(re.sub(r'<[^>]+>', '', match.group('text'))).strip()
        letters = [char for char in value if char.isalpha()]
        if not letters or sum(char.isupper() for char in letters) / len(letters) < 0.72:
            continue
        normalized = clean_title(value)
        if normalized.startswith(('figura ', 'modello ')):
            continue
        grouped.setdefault((row, column), []).append((y, value))

    return {
        key: ' '.join(value for _y, value in sorted(lines))
        for key, lines in grouped.items()
    }


def clean_title(value: str) -> str:
    value = ''.join(' ' if '\ue000' <= char <= '\uf8ff' else char for char in value)
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode().lower()
    substitutions = {
        'segnale di ': '',
        'segnali di ': '',
        'segnale ': '',
        'strada o passo chiuso': 'strada intransitabile',
        'dritto': 'diritto',
        'tramviario': 'tranviario',
        'pic nic': 'picnic',
    }
    for original, replacement in substitutions.items():
        value = value.replace(original, replacement)
    return re.sub(r'[^a-z0-9]+', ' ', value).strip()


def match_score(name: str, title: str) -> float:
    left = clean_title(name)
    right = clean_title(title)
    if not right:
        return 0
    sequence = SequenceMatcher(None, left, right).ratio()
    left_tokens = set(left.split())
    right_tokens = set(right.split())
    token_score = len(left_tokens & right_tokens) / max(1, len(left_tokens | right_tokens))
    containment = min(len(left), len(right)) / max(len(left), len(right)) if left in right or right in left else 0
    return sequence * 0.52 + token_score * 0.33 + containment * 0.15


def select_candidate(
    family: str,
    name: str,
    variant_index: int,
    variant_count: int,
    candidates: list[dict],
) -> tuple[dict, float]:
    exact = exact_family_candidates(family, candidates)
    if exact:
        if len(exact) != variant_count:
            raise RuntimeError(
                f'Exact scope for {family} contains {len(exact)} cells, expected {variant_count}.'
            )
        best = exact[variant_index]
        best['uses'] += 1
        return best, match_score(name, best['title'])

    page_start, page_end = FAMILY_PAGES[family]
    scoped = [candidate for candidate in candidates if page_start <= candidate['page'] <= page_end]
    expected = 0 if variant_count == 1 else variant_index / (variant_count - 1) * (len(scoped) - 1)

    ranked = []
    for position, candidate in enumerate(scoped):
        semantic = match_score(name, candidate['title'])
        distance = abs(position - expected) / max(4, len(scoped) * 0.18)
        order_bonus = max(0, 1 - distance) * 0.14
        reuse_penalty = candidate['uses'] * 0.035
        ranked.append((semantic + order_bonus - reuse_penalty, semantic, candidate))

    score, semantic, best = max(ranked, key=lambda item: item[0])
    if semantic < 0.24:
        best = min(scoped, key=lambda candidate: abs(candidate['scope_position'] - expected))
        semantic = match_score(name, best['title'])
    best['uses'] += 1
    return best, semantic


def exact_family_candidates(family: str, candidates: list[dict]) -> list[dict]:
    rules = {
        'serie-pericolo': lambda item: 2 <= item['page'] <= 5 or (item['page'] == 6 and item['row'] <= 1),
        'serie-precedenza': lambda item: (item['page'] == 6 and item['row'] == 2) or item['page'] == 7 or (item['page'] == 8 and item['row'] == 0),
        'serie-divieto': lambda item: (item['page'] == 8 and item['row'] >= 1) or item['page'] in (9, 10) or (item['page'] == 11 and item['row'] <= 1),
        'serie-sosta': lambda item: (item['page'] == 11 and item['row'] == 2) or (item['page'] == 12 and item['row'] <= 1),
        'serie-obbligo': lambda item: (item['page'] == 12 and item['row'] == 2) or 13 <= item['page'] <= 15,
        'serie-servizi': lambda item: 38 <= item['page'] <= 40 or (item['page'] == 41 and item['row'] == 0 and item['column'] <= 1),
        'serie-simboli-indicazione': lambda item: (item['page'] == 41 and item['row'] >= 1) or 42 <= item['page'] <= 55 or (item['page'] == 56 and item['row'] == 0),
    }
    rule = rules.get(family)
    return [item for item in candidates if rule(item)] if rule else []


def occupied_slots(page: Image.Image) -> list[tuple[int, int, Image.Image, float]]:
    slots = []
    for row_index, (top, bottom) in enumerate(ROWS):
        for column_index, (left, right) in enumerate(COLUMNS):
            crop = page.crop((left, top, right, bottom))
            score = content_score(crop)
            if score > 8:
                slots.append((row_index, column_index, crop, score))
    return slots


def make_debug_sheet(source_dir: Path, page_number: int, output: Path) -> None:
    page = page_image(source_dir / f'p{page_number}.svg')
    slots = occupied_slots(page)
    sheet = Image.new('RGB', (3 * 320, 3 * 250), '#e9ece8')
    draw = ImageDraw.Draw(sheet)
    for row_index in range(3):
        for column_index in range(3):
            left, right = COLUMNS[column_index]
            top, bottom = ROWS[row_index]
            crop = page.crop((left, top, right, bottom))
            ratio = ink_ratio(crop)
            score = content_score(crop)
            preview = ImageOps.contain(crop, (292, 210))
            x = column_index * 320 + (320 - preview.width) // 2
            y = row_index * 250 + 8
            sheet.paste(preview, (x, y))
            draw.text((column_index * 320 + 10, row_index * 250 + 222), f'r{row_index + 1} c{column_index + 1}  ink={ratio:.3f} std={score:.1f}', fill='#15283b')
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, quality=92)


def extract(source_dir: Path, data_path: Path, output_dir: Path, manifest_path: Path) -> None:
    variants = catalogue_variants(data_path)
    candidates: list[dict] = []
    page_counts: list[tuple[int, int]] = []

    for page_number in range(2, 65):
        page = page_image(source_dir / f'p{page_number}.svg')
        slots = occupied_slots(page)
        titles = slot_titles(source_dir / f'p{page_number}.svg')
        page_counts.append((page_number, len(slots)))
        for row_index, column_index, crop, _ratio in slots:
            candidates.append({
                'page': page_number,
                'row': row_index,
                'column': column_index,
                'crop': crop,
                'title': titles.get((row_index, column_index), ''),
                'uses': 0,
                'scope_position': 0,
            })

    for family, (start, end) in FAMILY_PAGES.items():
        scoped = [candidate for candidate in candidates if start <= candidate['page'] <= end]
        for position, candidate in enumerate(scoped):
            candidate['scope_position'] = position

    output_dir.mkdir(parents=True, exist_ok=True)
    manifest_lines = [
        '/* Generated from the supplied brochure; keep names aligned with signSeries.js. */',
        'export const variantImages = {',
    ]

    family_totals = {
        family: sum(1 for variant_family, _name in variants if variant_family == family)
        for family, _name in variants
    }
    family_positions = {family: 0 for family in family_totals}
    match_scores = []

    for index, (family, name) in enumerate(variants, start=1):
        if family == 'serie-ferroviaria':
            railway_boxes = {
                'Segnale nome stazione': (600, 595, 1015, 850),
                'Segnale di ubicazione': (140, 1180, 405, 1455),
                'Segnale telefono': (140, 1180, 405, 1455),
                'Targa di servizio ferroviario': (140, 595, 555, 850),
            }
            page = page_image(source_dir / 'p64.svg')
            candidate = {
                'page': 64,
                'row': 0,
                'column': 0,
                'crop': page.crop(railway_boxes[name]),
                'title': name,
            }
            semantic = 1
        elif f'{family}::{name}' in MANUAL_SLOTS:
            page_number, row_index, column_index = MANUAL_SLOTS[f'{family}::{name}']
            candidate = next(
                item for item in candidates
                if item['page'] == page_number
                and item['row'] == row_index
                and item['column'] == column_index
            )
            semantic = 1
        else:
            candidate, semantic = select_candidate(
                family,
                name,
                family_positions[family],
                family_totals[family],
                candidates,
            )
        family_positions[family] += 1
        page_number = candidate['page']
        row_index = candidate['row']
        column_index = candidate['column']
        crop = candidate['crop']
        if family != 'serie-ferroviaria' and crop.width > 24 and crop.height > 24:
            crop = crop.crop((4, 4, crop.width - 10, crop.height - 10))
        filename = f'{index:03d}-{slugify(name)}.webp'
        trimmed = trim_page_background(crop)
        canvas = Image.new('RGB', (320, 230), '#ffffff')
        fitted = ImageOps.contain(trimmed, (292, 206), Image.Resampling.LANCZOS)
        canvas.paste(fitted, ((canvas.width - fitted.width) // 2, (canvas.height - fitted.height) // 2))
        canvas.save(output_dir / filename, 'WEBP', quality=88, method=6)
        key = f'{family}::{name}'.replace('\\', '\\\\').replace("'", "\\'")
        manifest_lines.append(
            f"  '{key}': '/media/catalog/signs/{filename}',"
            f' // p{page_number} r{row_index + 1} c{column_index + 1}'
        )
        match_scores.append((semantic, family, name, candidate['title'], page_number, row_index, column_index))

    manifest_lines.append('};')
    manifest_path.write_text('\n'.join(manifest_lines) + '\n', encoding='utf-8')
    low_scores = sorted(match_scores)[:25]
    print(f'Exported {len(variants)} images from {len(candidates)} brochure cells.')
    print('Lowest-confidence associations:')
    for score, family, name, title, page, row, column in low_scores:
        print(f'{score:.2f}\tp{page} r{row + 1}c{column + 1}\t{family}\t{name}\t<- {title or "[untitled]"}')


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--data', type=Path, default=Path('src/data/signSeries.js'))
    parser.add_argument('--output', type=Path, default=Path('public/media/catalog/signs'))
    parser.add_argument('--manifest', type=Path, default=Path('src/data/variantImages.js'))
    parser.add_argument('--debug-page', type=int)
    parser.add_argument('--debug-output', type=Path)
    parser.add_argument('--titles', action='store_true')
    args = parser.parse_args()

    if args.debug_page:
        output = args.debug_output or Path(f'debug-p{args.debug_page}.jpg')
        make_debug_sheet(args.source, args.debug_page, output)
        return

    if args.titles:
        for page_number in range(2, 65):
            path = args.source / f'p{page_number}.svg'
            titles = slot_titles(path)
            print(
                f'p{page_number}: ' + ' | '.join(
                    f'r{row + 1}c{column + 1}={title}'
                    for (row, column), title in sorted(titles.items())
                )
            )
        return

    extract(args.source, args.data, args.output, args.manifest)


if __name__ == '__main__':
    main()
