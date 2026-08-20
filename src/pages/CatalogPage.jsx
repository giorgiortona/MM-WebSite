import { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { gsap, useGSAP, Flip, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import {
  macros,
  familiesOf,
  productsOfFamily,
  productsOfMacro,
  findMacro,
  findFamily,
  products,
} from '../data/catalog';
import ProductFigure from '../components/ProductFigure';
import MacroFigure from '../components/MacroFigure';
import Footer from '../components/Footer';
import { scrollToSection } from '../hooks/useSmoother';
import './CatalogPage.css';

export default function CatalogPage({ onQuote, notFound }) {
  const { macroId, articleId } = useParams();
  const navigate = useNavigate();
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

  useGSAP(
    () => {
      if (!flip.current) return;
      Flip.from(flip.current, {
        duration: 0.5,
        ease: 'panel',
        scale: true,
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
              <header className="catpage__head" data-enter>
                <h1 className="catpage__title">Catalogo</h1>
                <p className="catpage__sub">
                  {notFound
                    ? 'La pagina cercata non esiste. Riparti da qui: il catalogo è diviso in cinque aree.'
                    : `${products.length} articoli in cinque aree, con materiali, misure e classi di pellicola.`}
                </p>
              </header>

              <div className="catpage__areas" data-enter>
                {macros.map((m) => (
                  <Link className="area-card" key={m.id} to={`/catalogo/${m.id}`}>
                    <span className="area-card__shot">
                      <MacroFigure id={m.id} />
                    </span>
                    <span className="area-card__name">{m.name}</span>
                    <span className="area-card__count">{productsOfMacro(m.id).length} articoli</span>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* ---------- famiglie e articoli ---------- */}
          {macro && !article && (
            <>
              <header className="catpage__head" data-enter>
                <p className="catpage__crumb">
                  <Link to="/catalogo">Catalogo</Link>
                  <span aria-hidden="true">/</span>
                  <strong>{macro.name}</strong>
                </p>
                <h1 className="catpage__title">{macro.name}</h1>
                <p className="catpage__sub">{macro.blurb}</p>
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
                          <em>{productsOfFamily(f.id).length}</em>
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
                    >
                      <span className="art-card__shot">
                        <ProductFigure id={p.id} />
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
                  <ProductFigure id={article.id} />
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
                    <button className="sheet__back" type="button" onClick={() => navigate(-1)}>
                      Torna indietro
                    </button>
                  </div>
                </div>
              </article>

              <section className="sheet__siblings" data-enter>
                <h2>Altri articoli della famiglia</h2>
                <div className="art-grid">
                  {productsOfFamily(article.cat)
                    .filter((p) => p.id !== article.id)
                    .slice(0, 4)
                    .map((p) => (
                      <Link className="art-card" key={p.id} to={`/catalogo/${macro.id}/${p.id}`}>
                        <span className="art-card__shot">
                          <ProductFigure id={p.id} />
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
          navigate('/');
          setTimeout(() => scrollToSection(id), 700);
        }}
        onTop={() => navigate('/')}
      />
    </div>
  );
}
