import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../lib/gsap';
import { macros, productsOfMacro, countCatalogItems, catalogItemCount } from '../data/catalog';
import MacroFigure from './MacroFigure';
import './CatalogTeaser.css';

/* Anteprima del catalogo sulla home: le quattro aree, ognuna porta alla
   pagina dedicata. La sfumatura che porta dal fondo scuro a quello chiaro
   scorre insieme alla pagina. */
export default function CatalogTeaser() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      gsap.from(q('.macro-card'), {
        opacity: 0,
        y: 46,
        duration: 0.85,
        ease: 'panel',
        stagger: 0.07,
        clearProps: 'all',
        scrollTrigger: { trigger: q('.macro-grid')[0], start: 'top 84%' },
      });

    },
    { scope: root }
  );

  return (
    <section className="teaser" id="catalogo" ref={root}>
      <div className="teaser__fade teaser__fade--in" aria-hidden="true" />

      <div className="teaser__body">
        <div className="shell">
          <header className="teaser__head">
            <h2 className="teaser__title">Catalogo</h2>
            <p className="teaser__sub">
              {catalogItemCount} segnali e articoli in quattro aree, con materiali, misure e classi di
              pellicola. Il prezzo dipende da quantità, finitura e posa: si concorda per telefono.
            </p>
          </header>

          <div className="macro-grid">
            {macros.map((m) => (
              <Link className="macro-card" key={m.id} to={`/catalogo/${m.id}`}>
                <span className="macro-card__shot">
                  <MacroFigure id={m.id} />
                </span>
                <span className="macro-card__text">
                  <span className="macro-card__name">{m.name}</span>
                  <span className="macro-card__blurb">{m.blurb}</span>
                  <span className="macro-card__foot">
                    <em>{countCatalogItems(productsOfMacro(m.id))} articoli</em>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="teaser__fade teaser__fade--out" aria-hidden="true" />
    </section>
  );
}
