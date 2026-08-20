import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './BurgerButton.css';

/* Due sole linee: all'apertura si incrociano. */
export default function BurgerButton({ open, onToggle }) {
  const root = useRef(null);
  const tl = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      tl.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.4, ease: 'panel' } })
        .to(q('.burger__bar--top'), { y: 4.75, rotate: 45 }, 0)
        .to(q('.burger__bar--bot'), { y: -4.75, rotate: -45, width: 24 }, 0);
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
      <span className="burger__bars" aria-hidden="true">
        <span className="burger__bar burger__bar--top" />
        <span className="burger__bar burger__bar--bot" />
      </span>
      <span className="burger__label">{open ? 'Chiudi' : 'Menu'}</span>
    </button>
  );
}
