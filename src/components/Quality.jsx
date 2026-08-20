import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { compliance } from '../data/site';
import Figure from './Figure';
import './Quality.css';

/* Quinta componente fotografica: una sola immagine a tutta larghezza che
   si allarga mentre la si supera, con le certificazioni sovrapposte. */
export default function Quality() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      gsap.fromTo(
        q('.quality__band .figure'),
        { scale: 1.25, yPercent: -6 },
        {
          scale: 1,
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: q('.quality__band'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        q('.quality__band'),
        { clipPath: 'inset(0% 14% 0% 14%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: q('.quality__band'),
            start: 'top 92%',
            end: 'center 55%',
            scrub: 0.8,
          },
        }
      );

      gsap.from(q('.qual-card'), {
        opacity: 0,
        y: 46,
        duration: 0.9,
        ease: 'panel',
        stagger: 0.1,
        clearProps: 'all',
        scrollTrigger: { trigger: q('.quality__cards'), start: 'top 84%' },
      });
    },
    { scope: root }
  );

  return (
    <section className="section quality" id="qualita" ref={root}>
      <div className="shell">
        <div className="quality__head">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__num">06</span> Qualità
            </p>
            <h2 className="section-title">Conformità dichiarata su ogni fornitura</h2>
          </div>
          <p className="quality__head-text">
            La segnaletica permanente non è un prodotto qualsiasi: risponde a una norma
            armonizzata e va accompagnata dai documenti che ne certificano la prestazione.
          </p>
        </div>
      </div>

      <div className="quality__band">
        <Figure slug="a27-belluno" sizes="100vw" />
        <div className="quality__band-veil" aria-hidden="true" />
        <span className="quality__band-tag">Autostrada A27 · preselezione e mezzo di protezione</span>
      </div>

      <div className="shell">
        <div className="quality__cards">
          {compliance.map((c, i) => (
            <article className="qual-card" key={c.code}>
              <span className="qual-card__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="qual-card__code">{c.code}</h3>
              <strong className="qual-card__title">{c.title}</strong>
              <p className="qual-card__body">{c.body}</p>
            </article>
          ))}
        </div>

        <div className="quality__terms">
          <h3>Condizioni di fornitura</h3>
          <ul>
            <li>Merce resa franco nostra sede di Grosseto</li>
            <li>Imballo incluso nella fornitura</li>
            <li>Prezzi al netto di I.V.A., soggetti a variazione</li>
            <li>Posa in opera e trasporto quotati a parte</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
