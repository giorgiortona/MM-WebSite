import { useRef, useEffect, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { site, PHONE_TEL } from '../data/site';
import './QuoteBar.css';

/* Barra sempre raggiungibile: compare dopo la hero e resta a fondo schermo. */
export default function QuoteBar({ onQuote, hidden }) {
  const root = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useGSAP(
    () => {
      gsap.set(root.current, { y: 0, yPercent: 130 });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      /* y esplicito: senza, un transform residuo letto dal DOM
         resterebbe sommato allo spostamento percentuale. */
      gsap.to(root.current, {
        y: 0,
        yPercent: show && !hidden ? 0 : 130,
        duration: 0.6,
        ease: 'panel',
      });
    },
    { dependencies: [show, hidden] }
  );

  return (
    <div className="quotebar" ref={root}>
      <div className="quotebar__inner">
        <span className="quotebar__text">
          <strong>Preventivo gratuito</strong>
          <em>Fornitura, posa e manutenzione</em>
        </span>
        <div className="quotebar__actions">
          <a className="quotebar__phone" href={`tel:${PHONE_TEL}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5C10.4 19.4 4.6 13.6 4 5.7A2.5 2.5 0 0 1 6.5 3Z"
                fill="currentColor"
              />
            </svg>
            <span>{site.phoneDisplay}</span>
          </a>
          <button className="quotebar__btn" type="button" onClick={() => onQuote()}>
            Richiedi
          </button>
        </div>
      </div>
    </div>
  );
}
