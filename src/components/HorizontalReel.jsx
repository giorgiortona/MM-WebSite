import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { cantieriReel, photos } from '../data/gallery';
import Figure from './Figure';
import './HorizontalReel.css';

/* Terza componente fotografica: la sezione si blocca e i cantieri scorrono
   lateralmente, come si percorre una strada. Sotto i mille pixel di larghezza
   il blocco viene disattivato e resta uno scorrimento a scatti nativo. */
export default function HorizontalReel({ onOpenPhoto }) {
  const root = useRef(null);
  const viewport = useRef(null);

  /* Su desktop la sezione è bloccata e il riquadro non scorre: il movimento
     autonomo si accorge da solo che non c'è nulla da scorrere e resta fermo. */
  useAutoScroll(viewport, { speed: 26 });

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const track = q('.reel__track')[0];

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => track.scrollWidth - window.innerWidth + 80;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        /* Barra di avanzamento in stile linea di mezzeria */
        gsap.to(q('.reel__progress-fill'), {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: true,
          },
        });

        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section className="reel" id="cantieri" ref={root}>
      <div className="reel__viewport" ref={viewport}>
        <div className="reel__track">
          <div className="reel__intro">
            <h2 className="section-title">Lavori<br />consegnati</h2>
            <p className="reel__intro-text">
              Tratti autostradali, intersezioni urbane, piazzali e aree di sosta.
              Ogni immagine è un cantiere concluso e riaperto al traffico.
            </p>
          </div>

          {cantieriReel.map((slug, i) => {
            const meta = photos[slug];
            return (
              <button
                className={`reel__card reel__card--${meta.ratio > 1 ? 'wide' : 'tall'}`}
                key={slug}
                onClick={() => onOpenPhoto(slug)}
                aria-label={`Apri l’immagine: ${meta.caption}`}
              >
                <Figure slug={slug} />
                <span className="reel__card-meta">
                  <span className="reel__card-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="reel__card-caption">{meta.caption}</span>
                  <span className="reel__card-place">{meta.place}</span>
                </span>
              </button>
            );
          })}

        </div>
      </div>

      <div className="reel__progress" aria-hidden="true">
        <div className="reel__progress-fill" />
      </div>
    </section>
  );
}
