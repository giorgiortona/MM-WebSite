import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { photos } from '../data/gallery';
import Figure from './Figure';
import './BentoMosaic.css';

/* Quarta componente fotografica: un mosaico a celle disuguali in cui ogni
   riquadro sale a velocità diversa. Due celle sono di testo, così la griglia
   racconta la rifrangenza invece di limitarsi a mostrarla. */
/* Le tre classi di pellicola previste, con la resa sotto i fari:
   e' l'unica cosa che davvero le distingue, quindi la si mostra. */
const CLASSES = [
  { n: 'Classe 1', use: 'Strade urbane e complementari', lum: 0.3 },
  { n: 'Classe 2', use: 'Extraurbane e alta visibilità', lum: 0.62 },
  { n: 'Classe 3', use: 'Autostrade e punti critici', lum: 1 },
];

const cells = [
  { type: 'photo', slug: 'bari-notturna', area: 'a', speed: 0.95 },
  { type: 'photo', slug: 'cerignola-notte', area: 'b', speed: 1.05 },
  { type: 'photo', slug: 'stallo-ricarica', area: 'd', speed: 1.05 },
  { type: 'photo', slug: 'attraversamento-colorato', area: 'e', speed: 0.97 },
  { type: 'classes', area: 'f' },
];

export default function BentoMosaic({ onOpenPhoto }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      gsap.from(q('.bento__cell'), {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'panel',
        stagger: 0.07,
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: q('.bento__grid'), start: 'top 80%' },
      });

      gsap.from(q('.bento__class'), {
        opacity: 0,
        x: -18,
        duration: 0.8,
        ease: 'panel',
        stagger: 0.12,
        clearProps: 'all',
        scrollTrigger: { trigger: q('.bento__classes')[0], start: 'top 85%' },
      });
    },
    { scope: root }
  );

  return (
    <section className="section bento" ref={root}>
      <div className="shell">
        <div className="bento__head">
          <div>
            <h2 className="section-title">La segnaletica si giudica al buio</h2>
          </div>
          <p className="bento__head-text">
            La classe della pellicola decide quanto un segnale resta leggibile sotto i fari.
            Forniamo tutte e tre le classi previste, e le posiamo lavorando anche di notte per
            non chiudere la strada di giorno.
          </p>
        </div>

        <div className="bento__grid">
          {cells.map((cell) => {
            if (cell.type === 'photo') {
              const meta = photos[cell.slug];
              return (
                <button
                  className={`bento__cell bento__cell--${cell.area} bento__cell--photo`}
                  key={cell.area}
                  onClick={() => onOpenPhoto(cell.slug)}
                  aria-label={`Apri l’immagine: ${meta.caption}`}
                >
                  <Figure slug={cell.slug} />
                  <span className="bento__caption">
                    <em>{meta.place}</em>
                    {meta.caption}
                  </span>
                  <span className="bento__zoom" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path d="M16 16l5 5M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </button>
              );
            }

            if (cell.type === 'note') {
              return (
                <div className={`bento__cell bento__cell--${cell.area} bento__note`} key={cell.area}>
                  <span className="bento__note-mark" aria-hidden="true">“</span>
                  <p>
                    Il lavoro notturno non è un extra: su autostrade e strade a scorrimento è
                    l’unico modo per tracciare senza fermare il traffico.
                  </p>
                  <span className="bento__note-src">Squadra segnaletica orizzontale</span>
                </div>
              );
            }

            return (
              <div className={`bento__cell bento__cell--${cell.area} bento__classes`} key={cell.area}>
                <span className="bento__classes-label">Classi di pellicola</span>
                {CLASSES.map((c) => (
                  <div className="bento__class" key={c.n}>
                    <span className="lum" style={{ '--l': c.lum }} aria-hidden="true">
                      <span className="lum__sign" />
                    </span>
                    <span className="bento__class-name">{c.n}</span>
                    <span className="bento__class-use">{c.use}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
