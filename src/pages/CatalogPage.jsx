import { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { gsap, useGSAP, Flip, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import {
  macros,
  familiesOf,
  productsOfFamily,
  productsOfMacro,
  findMacro,
  products,
  countCatalogItems,
  catalogItemCount,
  findFamily,
} from '../data/catalog';
import ProductFigure from '../components/ProductFigure';
import VariantFigure from '../components/VariantFigure';
import MacroFigure from '../components/MacroFigure';
import Footer from '../components/Footer';
import './CatalogPage.css';

const normalizeSearch = (value = '') =>
  value
    .toLocaleLowerCase('it-IT')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();

const catalogSearchEntries = products.flatMap((product) => {
  const family = findFamily(product.cat);
  const productMacro = macros.find((item) => item.id === family?.macro);
  if (!family || !productMacro) return [];

  const route = `/catalogo/${productMacro.id}/${product.id}`;
  const context = `${productMacro.name} ${family.label} ${product.fig || ''}`;
  const productEntry = {
    key: product.id,
    label: product.name,
    detail: `${productMacro.name} · ${family.label}`,
    route,
    macroId: productMacro.id,
    haystack: normalizeSearch(
      [product.name, product.fig, product.desc, ...(product.tags || [])].filter(Boolean).join(' ')
    ),
  };

  const variantEntries = (product.variants || []).map((variant, index) => ({
    key: `${product.id}-variant-${index}`,
    label: variant.name,
    detail: `${product.name} · ${productMacro.name}`,
    route,
    macroId: productMacro.id,
    haystack: normalizeSearch(`${variant.name} ${variant.desc || ''} ${product.name} ${context}`),
  }));

  return [productEntry, ...variantEntries];
});

function CatalogSearch({ currentMacroId }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const normalizedQuery = normalizeSearch(query);

  const results = useMemo(() => {
    if (normalizedQuery.length < 2) return [];

    return catalogSearchEntries
      .map((entry) => {
        const label = normalizeSearch(entry.label);
        let rank = 4;
        if (label === normalizedQuery) rank = 0;
        else if (label.startsWith(normalizedQuery)) rank = 1;
        else if (label.includes(normalizedQuery)) rank = 2;
        else if (entry.haystack.includes(normalizedQuery)) rank = 3;
        else return null;

        if (entry.macroId === currentMacroId) rank -= 0.25;
        return { ...entry, rank };
      })
      .filter(Boolean)
      .sort((a, b) => a.rank - b.rank || a.label.localeCompare(b.label, 'it'))
      .slice(0, 8);
  }, [currentMacroId, normalizedQuery]);

  const openResult = (result) => {
    if (!result) return;
    setQuery('');
    setIsOpen(false);
    navigate(result.route);
  };

  return (
    <form
      className="catalog-search"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        openResult(results[0]);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      <label className="catalog-search__label" htmlFor={`catalog-search-${currentMacroId || 'all'}`}>
        Cerca nel catalogo
      </label>
      <div className="catalog-search__field">
        <input
          id={`catalog-search-${currentMacroId || 'all'}`}
          type="search"
          value={query}
          placeholder="Cerca segnali e articoli…"
          autoComplete="off"
          aria-controls="catalog-search-results"
          aria-expanded={isOpen && normalizedQuery.length >= 2}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setIsOpen(false);
          }}
        />
        <button type="submit" aria-label="Avvia la ricerca" disabled={!results.length}>
          <span aria-hidden="true" />
        </button>
      </div>

      {isOpen && normalizedQuery.length >= 2 && (
        <div className="catalog-search__results" id="catalog-search-results" aria-live="polite">
          {results.length > 0 ? (
            results.map((result) => (
              <button type="button" key={result.key} onClick={() => openResult(result)}>
                <strong>{result.label}</strong>
                <span>{result.detail}</span>
              </button>
            ))
          ) : (
            <p>Nessun articolo trovato</p>
          )}
        </div>
      )}
    </form>
  );
}

export default function CatalogPage({ onQuote, notFound }) {
  const { macroId, articleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const root = useRef(null);
  const grid = useRef(null);
  const flip = useRef(null);

  const macro = macroId ? findMacro(macroId) : null;
  const article = articleId ? products.find((p) => p.id === articleId) : null;
  const famList = useMemo(() => (macro ? familiesOf(macro.id) : []), [macro]);

  const [family, setFamily] = useState(() => (famList[0] ? famList[0].id : null));

  useEffect(() => {
    setFamily(famList[0] ? famList[0].id : null);
  }, [macroId, famList]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [macroId, articleId]);

  /* Tornando da una scheda articolo, ripristina il punto esatto della
     categoria prima che la pagina venga mostrata: nessun salto verso l'alto. */
  useLayoutEffect(() => {
    const scrollY = location.state?.restoreCatalogScrollY;
    if (articleId || !Number.isFinite(scrollY)) return;
    window.scrollTo({ top: scrollY, behavior: 'auto' });
  }, [articleId, location.key, location.state]);

  /* Ingresso della pagina */
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.from(q('[data-enter]'), {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'panel',
        stagger: 0.06,
        clearProps: 'all',
      });
    },
    { scope: root, dependencies: [macroId, articleId] }
  );

  /* Cambio famiglia: le schede rimaste scivolano nella nuova posizione. */
  const pickFamily = (id) => {
    if (id === family) return;
    if (!prefersReducedMotion() && grid.current) {
      flip.current = Flip.getState(grid.current.querySelectorAll('.art-card'));
    }
    setFamily(id);
  };

  const returnToHomeCatalog = () => {
    navigate('/', { state: { instantSection: 'catalogo' } });
  };

  const returnToFamily = () => {
    const scrollY = location.state?.catalogScrollY ?? 0;
    navigate(`/catalogo/${macro.id}`, { state: { restoreCatalogScrollY: scrollY } });
  };

  useGSAP(
    () => {
      if (!flip.current) return;
      Flip.from(flip.current, {
        duration: 0.5,
        ease: 'panel',
        scale: false,
        absolute: true,
        onEnter: (els) =>
          gsap.fromTo(els, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.03, ease: 'panel' }),
        onLeave: (els) => gsap.to(els, { opacity: 0, y: -14, duration: 0.25 }),
      });
      flip.current = null;
    },
    { dependencies: [family], scope: root }
  );

  const items = family ? productsOfFamily(family) : [];

  return (
    <div className="catpage" ref={root}>
      {/* --- barra di sezione: sempre visibile, per cambiare area --- */}
      <div className="catbar">
        <div className="catbar__inner">
          <Link className="catbar__back" to="/">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 12H5m0 0 6-6m-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            Torna al sito
          </Link>

          <nav className="catbar__nav" aria-label="Aree del catalogo">
            {macros.map((m) => (
              <Link
                key={m.id}
                to={`/catalogo/${m.id}`}
                className={`catbar__link ${m.id === macroId ? 'is-active' : ''}`}
              >
                {m.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <main className="catpage__main">
        <div className="shell">
          {/* ---------- indice delle aree ---------- */}
          {!macro && (
            <>
              <header className="catpage__head catpage__head--with-search" data-enter>
                <div className="catpage__head-copy">
                  <h1 className="catpage__title">Catalogo</h1>
                  <p className="catpage__sub">
                    {notFound
                      ? 'La pagina cercata non esiste. Riparti da qui: il catalogo è diviso in cinque aree.'
                      : `${catalogItemCount} segnali e articoli in cinque aree, con materiali, misure e classi di pellicola.`}
                  </p>
                </div>
                <CatalogSearch />
              </header>

              <div className="catpage__areas" data-enter>
                {macros.map((m) => (
                  <Link className="area-card" key={m.id} to={`/catalogo/${m.id}`}>
                    <span className="area-card__shot">
                      <MacroFigure id={m.id} />
                    </span>
                    <span className="area-card__name">{m.name}</span>
                    <span className="area-card__count">
                      {countCatalogItems(productsOfMacro(m.id))} articoli
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* ---------- famiglie e articoli ---------- */}
          {macro && !article && (
            <>
              <header className="catpage__head catpage__head--with-search" data-enter>
                <div className="catpage__head-copy">
                  <p className="catpage__crumb">
                    <Link to="/catalogo">Catalogo</Link>
                    <span aria-hidden="true">/</span>
                    <strong>{macro.name}</strong>
                  </p>
                  <h1 className="catpage__title">{macro.name}</h1>
                  <p className="catpage__sub">{macro.blurb}</p>
                </div>
                <CatalogSearch currentMacroId={macro.id} />
              </header>

              <div className="catpage__grid">
                <aside className="fam-rail" data-enter>
                  <ul>
                    {famList.map((f) => (
                      <li key={f.id}>
                        <button
                          className={`fam-rail__item ${f.id === family ? 'is-active' : ''}`}
                          onClick={() => pickFamily(f.id)}
                        >
                          <span>{f.label}</span>
                          <em>{countCatalogItems(productsOfFamily(f.id))}</em>
                        </button>
                      </li>
                    ))}
                  </ul>
                </aside>

                <div className="art-grid" ref={grid} data-enter>
                  {items.map((p) => (
                    <Link
                      className="art-card"
                      key={p.id}
                      data-flip-id={p.id}
                      to={`/catalogo/${macro.id}/${p.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        navigate(`/catalogo/${macro.id}/${p.id}`, {
                          state: { catalogScrollY: window.scrollY },
                        });
                      }}
                    >
                      <span className="art-card__shot">
                        <ProductFigure id={p.visual || p.id} />
                      </span>
                      <span className="art-card__body">
                        <span className="art-card__name">{p.name}</span>
                        <span className="art-card__fig">{p.fig}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ---------- scheda articolo ---------- */}
          {macro && article && (
            <>
              <header className="catpage__head" data-enter>
                <p className="catpage__crumb">
                  <Link to="/catalogo">Catalogo</Link>
                  <span aria-hidden="true">/</span>
                  <Link to={`/catalogo/${macro.id}`}>{macro.name}</Link>
                  <span aria-hidden="true">/</span>
                  <strong>{article.name}</strong>
                </p>
              </header>

              <article className="sheet">
                <div className="sheet__shot" data-enter>
                  <ProductFigure id={article.visual || article.id} />
                </div>

                <div className="sheet__body" data-enter>
                  <span className="sheet__fig">{article.fig}</span>
                  <h1 className="sheet__name">{article.name}</h1>
                  <p className="sheet__desc">{article.desc}</p>

                  <dl className="sheet__specs">
                    {article.specs.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                    <div>
                      <dt>Prezzo</dt>
                      <dd>su richiesta</dd>
                    </div>
                  </dl>

                  <div className="sheet__actions">
                    <button className="btn btn--dark" type="button" onClick={() => onQuote(article.name)}>
                      Richiedi preventivo
                      <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2.2" fill="none" />
                      </svg>
                    </button>
                    <button className="sheet__back" type="button" onClick={returnToFamily}>
                      Torna indietro
                    </button>
                    <button className="sheet__back" type="button" onClick={returnToHomeCatalog}>
                      Torna al catalogo
                    </button>
                  </div>
                </div>
              </article>

              {article.variants?.length > 0 && (
                <section className="sheet__variants" aria-labelledby="varianti-title" data-enter>
                  <div className="sheet__variants-head">
                    <h2 id="varianti-title">Segnali disponibili</h2>
                    <span>{article.variants.length} varianti</span>
                  </div>
                  <div className="sheet__variants-list">
                    {article.variants.map((variant) => (
                      <article className="sheet__variant" key={variant.name}>
                        <span className="sheet__variant-shot">
                          <VariantFigure
                            name={variant.name}
                            family={article.id}
                            visual={article.visual}
                          />
                        </span>
                        <span className="sheet__variant-copy">
                          <h3>{variant.name}</h3>
                          <p>{variant.desc}</p>
                        </span>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              <section className="sheet__siblings" data-enter>
                <h2>Altri articoli della famiglia</h2>
                <div className="art-grid">
                  {productsOfFamily(article.cat)
                    .filter((p) => p.id !== article.id)
                    .slice(0, 4)
                    .map((p) => (
                      <Link
                        className="art-card"
                        key={p.id}
                        to={`/catalogo/${macro.id}/${p.id}`}
                        state={{ catalogScrollY: location.state?.catalogScrollY ?? 0 }}
                      >
                        <span className="art-card__shot">
                          <ProductFigure id={p.visual || p.id} />
                        </span>
                        <span className="art-card__body">
                          <span className="art-card__name">{p.name}</span>
                          <span className="art-card__fig">{p.fig}</span>
                        </span>
                      </Link>
                    ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer
        onNavigate={(id) => {
          navigate('/', { state: { instantSection: id } });
        }}
        onTop={() => navigate('/')}
      />
    </div>
  );
}
