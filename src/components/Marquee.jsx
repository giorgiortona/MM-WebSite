import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import './Marquee.css';

const WORDS = [
  'Segnaletica orizzontale',
  'Segnaletica verticale',
  'Barriere e protezioni',
  'Cantieri stradali',
  'Impianti semaforici',
  'Delineatori',
  'Arredo urbano',
  'Pellicole 3M',
];

/* Nastro continuo: due copie identiche scorrono in loop.
   Lo scroll della pagina ne accelera e inverte la corsa. */
export default function Marquee() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = root.current.querySelector('.marquee__track');

      const loop = gsap.to(track, {
        xPercent: -50,
        duration: 26,
        ease: 'none',
        repeat: -1,
      });

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const dir = self.direction;
          gsap.to(loop, {
            timeScale: dir * (1 + Math.min(Math.abs(self.getVelocity()) / 1400, 3)),
            duration: 0.4,
            overwrite: true,
          });
        },
      });

      return () => {
        st.kill();
        loop.kill();
      };
    },
    { scope: root }
  );

  const row = (
    <div className="marquee__row">
      {WORDS.map((w) => (
        <span className="marquee__item" key={w}>
          {w}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3 22 21H2z" fill="var(--yellow)" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" ref={root} aria-hidden="true">
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </div>
  );
}
