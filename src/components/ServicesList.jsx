import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { services } from '../data/services';
import Figure from './Figure';
import './ServicesList.css';

/* Elenco dei servizi con un pannello fotografico che resta fermo a lato:
   aprendo una voce l'immagine corrispondente sfuma al posto della precedente.
   Niente immagini agganciate al cursore: la posizione è sempre la stessa. */
export default function ServicesList() {
  const root = useRef(null);
  const [open, setOpen] = useState(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.from(q('.srv-row'), {
        opacity: 0,
        y: 34,
        duration: 0.8,
        ease: 'panel',
        stagger: 0.05,
        clearProps: 'all',
        scrollTrigger: { trigger: q('.srv-list')[0], start: 'top 84%' },
      });
      gsap.from(q('.srv-media'), {
        opacity: 0,
        duration: 1,
        ease: 'panel',
        scrollTrigger: { trigger: q('.srv-media')[0], start: 'top 88%' },
      });
    },
    { scope: root }
  );

  return (
    <section className="section services" id="servizi" ref={root}>
      <div className="shell">
        <h2 className="section-title">Che cosa facciamo</h2>

        <div className="srv-grid">
          <div className="srv-media">
            <div className="srv-media__inner">
              {services.map((s, i) => (
                <Figure
                  key={s.photo}
                  slug={s.photo}
                  size={900}
                  sizes="(max-width: 900px) 92vw, 40vw"
                  className={`srv-media__shot ${i === open ? 'is-active' : ''}`}
                />
              ))}
            </div>
          </div>

          <ul className="srv-list">
            {services.map((s, i) => (
              <li className={`srv-row ${open === i ? 'is-open' : ''}`} key={s.id}>
                <button
                  className="srv-row__head"
                  onClick={() => setOpen(i)}
                  onMouseEnter={() => setOpen(i)}
                  aria-expanded={open === i}
                  aria-controls={`srv-panel-${s.id}`}
                >
                  <span className="srv-row__title">{s.title}</span>
                  <span className="srv-row__mark" aria-hidden="true" />
                </button>

                <div className="srv-row__panel" id={`srv-panel-${s.id}`} hidden={open !== i}>
                  <p className="srv-row__excerpt">{s.excerpt}</p>
                  <ul className="srv-row__bullets">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
