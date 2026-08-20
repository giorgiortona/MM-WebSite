import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap';
import { cantieriReel, photos } from '../data/gallery';
import Figure from './Figure';
import './HorizontalReel.css';

/* Terza componente fotografica: la sezione si blocca e i cantieri scorrono
   lateralmente, come si percorre una strada. Sotto i mille pixel di larghezza
   il blocco viene disattivato e resta uno scorrimento a scatti nativo. */
export default function HorizontalReel({ onOpenPhoto }) {
  const root = useRef(null);

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

        /* Ogni foto si muove leggermente in controtendenza dentro la sua cornice */
        q('.reel__card').forEach((card) => {
          gsap.fromTo(
            card.querySelector('img'),
            { xPercent: -4.5 },
            {
              xPercent: 4.5,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
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
      <div className="reel__viewport">
        <div className="reel__track">
          <div className="reel__intro">
            <p className="eyebrow">
              <span className="eyebrow__num">03</span> Cantieri
            </p>
            <h2 className="section-title">Lavori<br />consegnati</h2>
            <p className="reel__intro-text">
              Tratti autostradali, intersezioni urbane, piazzali e aree di sosta.
              Ogni immagine è un cantiere concluso e riaperto al traffico.
            </p>
            <span className="reel__hint">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              Scorri per percorrere
            </span>
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
                <Figure slug={slug} sizes="(max-width: 999px) 78vw, 34vw" />
                <span className="reel__card-meta">
                  <span className="reel__card-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="reel__card-caption">{meta.caption}</span>
                  <span className="reel__card-place">{meta.place}</span>
                </span>
              </button>
            );
          })}

          <div className="reel__end">
            <span>Fine tratto</span>
            <div className="hazard-strip" />
          </div>
        </div>
      </div>

      <div className="reel__progress" aria-hidden="true">
        <div className="reel__progress-fill" />
      </div>
    </section>
  );
}
