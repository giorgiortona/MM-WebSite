import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { compliance } from '../data/site';
import Figure from './Figure';
import './Quality.css';

const terms = [
  'Merce resa franco nostra sede di Grosseto',
  'Imballo incluso nella fornitura',
  'Prezzi al netto di I.V.A.',
  'Posa e trasporto quotati a parte',
];

export default function Quality() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      gsap.fromTo(
        q('.quality__band .figure'),
        { scale: 1.16 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: q('.quality__band')[0],
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );

      gsap.from(q('[data-reveal]'), {
        opacity: 0,
        y: 34,
        duration: 0.8,
        ease: 'panel',
        stagger: 0.08,
        clearProps: 'all',
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      });
    },
    { scope: root }
  );

  return (
    <section className="section quality" id="qualita" ref={root}>
      <div className="shell">
        <div className="quality__head">
          <h2 className="section-title" data-reveal>
            Conformità dichiarata su ogni fornitura
          </h2>
          <p className="quality__lead" data-reveal>
            La segnaletica permanente risponde a una norma armonizzata e va accompagnata dai
            documenti che ne certificano la prestazione.
          </p>
        </div>

        <div className="quality__band" data-reveal>
          <Figure slug="a27-belluno" sizes="100vw" />
        </div>

        <div className="quality__cards">
          {compliance.map((c) => (
            <article className="qual-card" key={c.code} data-reveal>
              <h3 className="qual-card__code">{c.code}</h3>
              <strong className="qual-card__title">{c.title}</strong>
              <p className="qual-card__body">{c.body}</p>
            </article>
          ))}
        </div>

        <ul className="quality__terms" data-reveal>
          {terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
