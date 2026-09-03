import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { macros, products, findFamily } from '../src/data/catalog.js';

const SITE_URL = 'https://mmgroupsegnaletica.it';
const LAST_MODIFIED = process.env.SEO_LASTMOD || new Date().toISOString().slice(0, 10);
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputFile = resolve(scriptDirectory, '../public/sitemap.xml');

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const catalogPaths = products.flatMap((product) => {
  const family = findFamily(product.cat);
  const macro = family ? macros.find((item) => item.id === family.macro) : null;
  return macro ? [`/catalogo/${macro.id}/${product.id}`] : [];
});

const paths = [
  '/',
  '/catalogo',
  ...macros.map((macro) => `/catalogo/${macro.id}`),
  ...catalogPaths,
];

const uniquePaths = [...new Set(paths)];
const entries = uniquePaths
  .map(
    (path) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
  </url>`
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

await writeFile(outputFile, sitemap, 'utf8');
console.log(`Sitemap generata: ${uniquePaths.length} URL`);
