import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './BurgerButton.css';

/* Le tre barre del menu sono tre linee di segnaletica: continua, tratteggiata,
   continua corta. All'apertura la mediana si dissolve e le altre due incrociano. */
export default function BurgerButton({ open, onToggle }) {
  const root = useRef(null);
  const tl = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      tl.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.42, ease: 'panel' } })
        .to(q('.burger__bar--mid'), { scaleX: 0, opacity: 0, transformOrigin: '100% 50%' }, 0)
        .to(q('.burger__bar--top'), { y: 8, rotate: 45, width: 26 }, 0.06)
        .to(q('.burger__bar--bot'), { y: -8, rotate: -45, width: 26 }, 0.06)
        .to(q('.burger__ring'), { scale: 1, opacity: 1, duration: 0.5 }, 0);
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (!tl.current) return;
      open ? tl.current.play() : tl.current.reverse();
    },
    { dependencies: [open] }
  );

  return (
    <button
      ref={root}
      className="burger"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="nav-overlay"
      aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
    >
      <span className="burger__ring" aria-hidden="true" />
      <span className="burger__bars" aria-hidden="true">
        <span className="burger__bar burger__bar--top" />
        <span className="burger__bar burger__bar--mid" />
        <span className="burger__bar burger__bar--bot" />
      </span>
      <span className="burger__label">{open ? 'Chiudi' : 'Menu'}</span>
    </button>
  );
}
