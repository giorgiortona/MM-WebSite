import { useRef, useState } from 'react';
import { gsap, useGSAP, isTouch } from '../lib/gsap';
import { services } from '../data/services';
import Figure from './Figure';
import './ServicesList.css';

/* Seconda componente fotografica: l'elenco dei servizi non mostra immagini
   finché il puntatore non entra in una riga. A quel punto la foto compare
   e insegue il cursore. Su touch la riga si apre e mostra la foto in linea. */
export default function ServicesList() {
  const root = useRef(null);
  const follower = useRef(null);
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(0);
  const setX = useRef(null);
  const setY = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      gsap.from(q('.srv-row'), {
        opacity: 0,
        y: 40,
        duration: 0.85,
        ease: 'brake',
        stagger: 0.06,
        clearProps: 'all',
        scrollTrigger: { trigger: q('.srv-list'), start: 'top 82%' },
      });

      if (isTouch()) return;

      setX.current = gsap.quickTo(follower.current, 'x', { duration: 0.55, ease: 'power3' });
      setY.current = gsap.quickTo(follower.current, 'y', { duration: 0.55, ease: 'power3' });

      const onMove = (e) => {
        const r = root.current.getBoundingClientRect();
        setX.current(e.clientX - r.left);
        setY.current(e.clientY - r.top);
      };

      root.current.addEventListener('pointermove', onMove);
      return () => root.current?.removeEventListener('pointermove', onMove);
    },
    { scope: root }
  );

  useGSAP(
    () => {
      gsap.to(follower.current, {
        autoAlpha: active === null ? 0 : 1,
        scale: active === null ? 0.85 : 1,
        duration: 0.45,
        ease: 'panel',
      });
    },
    { dependencies: [active] }
  );

  return (
    <section className="section services" id="servizi" ref={root}>
      <div className="shell">
        <p className="eyebrow">
          <span className="eyebrow__num">02</span> Servizi
        </p>
        <h2 className="section-title">Che cosa facciamo, dalla traccia al collaudo</h2>
        <p className="section-lead">
          Otto famiglie di lavorazioni che coprono l’intero oggetto sociale: passa il puntatore
          su una voce per vederla in cantiere, aprila per il dettaglio.
        </p>

        <ul className="srv-list">
          {services.map((s, i) => (
            <li
              className={`srv-row ${open === i ? 'is-open' : ''}`}
              key={s.id}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <button
                className="srv-row__head"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`srv-panel-${s.id}`}
              >
                <span className="srv-row__n">{s.n}</span>
                <span className="srv-row__title">{s.title}</span>
                <span className="srv-row__plus" aria-hidden="true">
                  <i />
                  <i />
                </span>
              </button>

              <div className="srv-row__panel" id={`srv-panel-${s.id}`} hidden={open !== i}>
                <div className="srv-row__panel-in">
                  <p className="srv-row__excerpt">{s.excerpt}</p>
                  <ul className="srv-row__bullets">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <Figure
                    slug={s.photo}
                    size={900}
                    sizes="(max-width: 900px) 92vw, 30vw"
                    className="srv-row__inline-photo"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="srv-follower" ref={follower} aria-hidden="true">
        {services.map((s, i) => (
          <Figure
            key={s.photo + i}
            slug={s.photo}
            size={900}
            sizes="26vw"
            className={`srv-follower__item ${active === i ? 'is-active' : ''}`}
          />
        ))}
      </div>
    </section>
  );
}
