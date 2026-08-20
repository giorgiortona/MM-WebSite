import { useRef, useState, useMemo } from 'react';
import { gsap, useGSAP, Flip, prefersReducedMotion } from '../lib/gsap';
import { categories, products } from '../data/catalog';
import SignGlyph from './SignGlyph';
import './Catalog.css';

/* Catalogo senza prezzi: ogni articolo si quota su misura.
   Il cambio di filtro usa Flip, così le schede rimaste si spostano
   nella nuova posizione invece di sparire e ricomparire. */
export default function Catalog({ onQuote }) {
  const root = useRef(null);
  const grid = useRef(null);
  const flipState = useRef(null);
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const okCat = cat === 'all' || p.cat === cat;
      if (!okCat) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.fig.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.specs.some(([, v]) => v.toLowerCase().includes(q))
      );
    });
  }, [cat, query]);

  const capture = () => {
    if (prefersReducedMotion() || !grid.current) return;
    flipState.current = Flip.getState(grid.current.querySelectorAll('.cat-card'));
  };

  useGSAP(
    () => {
      if (!flipState.current) return;
      Flip.from(flipState.current, {
        duration: 0.55,
        ease: 'panel',
        scale: true,
        absolute: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, scale: 0.92 },
            { opacity: 1, scale: 1, duration: 0.45, ease: 'brake', stagger: 0.02 }
          ),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.28 }),
      });
      flipState.current = null;
    },
    { dependencies: [cat, query], scope: root }
  );

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.from(q('.cat-filters__chip'), {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: 'brake',
        stagger: 0.03,
        clearProps: 'all',
        scrollTrigger: { trigger: q('.cat-filters'), start: 'top 88%' },
      });
      gsap.from(q('.cat-card'), {
        opacity: 0,
        y: 42,
        duration: 0.8,
        ease: 'panel',
        stagger: 0.04,
        clearProps: 'all',
        scrollTrigger: { trigger: grid.current, start: 'top 86%' },
      });
    },
    { scope: root }
  );

  const counts = useMemo(() => {
    const map = { all: products.length };
    categories.forEach((c) => {
      map[c.id] = products.filter((p) => p.cat === c.id).length;
    });
    return map;
  }, []);

  return (
    <section className="section catalog" id="catalogo" ref={root}>
      <div className="shell">
        <div className="catalog__head">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__num">05</span> Catalogo
            </p>
            <h2 className="section-title">Cinquantuno famiglie di articoli</h2>
          </div>
          <div className="catalog__head-side">
            <p>
              Il catalogo raccoglie tutto ciò che produciamo e forniamo, con materiali, misure e
              classi di pellicola. <strong>I prezzi non sono esposti:</strong> ogni fornitura
              dipende da quantità, finitura e posa, quindi si quota su richiesta.
            </p>
            <button className="btn" type="button" onClick={() => onQuote()}>
              Chiedi un preventivo
              <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2.2" fill="none" />
              </svg>
            </button>
          </div>
        </div>

        <div className="cat-toolbar">
          <div className="cat-filters" role="group" aria-label="Filtra per categoria">
            <button
              className={`cat-filters__chip ${cat === 'all' ? 'is-active' : ''}`}
              onClick={() => {
                capture();
                setCat('all');
              }}
              aria-pressed={cat === 'all'}
            >
              Tutti <em>{counts.all}</em>
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                className={`cat-filters__chip ${cat === c.id ? 'is-active' : ''}`}
                onClick={() => {
                  capture();
                  setCat(c.id);
                }}
                aria-pressed={cat === c.id}
              >
                <SignGlyph type={c.glyph} size={18} />
                {c.label} <em>{counts[c.id]}</em>
              </button>
            ))}
          </div>

          <label className="cat-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <input
              type="search"
              placeholder="Cerca: disco, new jersey, fig. 392…"
              value={query}
              onChange={(e) => {
                capture();
                setQuery(e.target.value);
              }}
              aria-label="Cerca nel catalogo"
            />
          </label>
        </div>

        <div className="cat-grid" ref={grid}>
          {visible.map((p) => {
            const glyph = categories.find((c) => c.id === p.cat)?.glyph;
            return (
              <article className="cat-card" key={p.id} data-flip-id={p.id}>
                <header className="cat-card__head">
                  <span className="cat-card__glyph">
                    <SignGlyph type={glyph} size={34} />
                  </span>
                  <span className="cat-card__fig">{p.fig}</span>
                </header>

                <h3 className="cat-card__name">{p.name}</h3>
                <p className="cat-card__desc">{p.desc}</p>

                <dl className="cat-card__specs">
                  {p.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>

                <footer className="cat-card__foot">
                  <span className="cat-card__price">Prezzo su richiesta</span>
                  <button
                    className="cat-card__cta"
                    type="button"
                    onClick={() => onQuote(p.name)}
                  >
                    Richiedi preventivo
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2.2" fill="none" />
                    </svg>
                  </button>
                </footer>
              </article>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="cat-empty">
            Nessun articolo corrisponde alla ricerca. L’assortimento è più ampio del catalogo
            online: chiamaci e verifichiamo insieme.
          </p>
        )}

        <p className="catalog__note">
          Merce resa franco nostra sede di Grosseto, imballo incluso. Le misure e le classi di
          pellicola indicate sono quelle di listino: lavorazioni fuori standard su richiesta.
        </p>
      </div>
    </section>
  );
}
