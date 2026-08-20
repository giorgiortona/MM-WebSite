import { useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import './Preloader.css';

/* Caricamento essenziale: il nome, una linea di mezzeria che viene stesa
   da sinistra a destra e la percentuale. Alla fine lo schermo sale. */
export default function Preloader({ onDone }) {
  const root = useRef(null);
  const [count, setCount] = useState(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      const leave = () =>
        gsap
          .timeline({ onComplete: () => onDone?.() })
          .to(q('.pl-body'), { opacity: 0, y: -14, duration: 0.45, ease: 'panel' })
          .to(root.current, { yPercent: -100, duration: 0.8, ease: 'panel' }, 0.2);

      if (prefersReducedMotion()) {
        setCount(100);
        gsap.delayedCall(0.3, () => onDone?.());
        return;
      }

      gsap.from(q('.pl-word'), { yPercent: 110, duration: 0.9, ease: 'panel', stagger: 0.07 });

      const proxy = { v: 0 };
      let ready = document.readyState === 'complete';
      const onLoad = () => (ready = true);
      window.addEventListener('load', onLoad, { once: true });
      const guard = gsap.delayedCall(5, () => (ready = true));

      const paint = () => {
        setCount(Math.round(proxy.v));
        gsap.set(q('.pl-line-fill'), { scaleX: proxy.v / 100 });
      };

      const run = gsap.to(proxy, {
        v: 92,
        duration: 1.7,
        ease: 'power2.out',
        onUpdate: paint,
        onComplete: () => {
          const finish = () =>
            gsap.to(proxy, { v: 100, duration: 0.5, ease: 'brake', onUpdate: paint, onComplete: leave });
          const wait = () => (ready ? finish() : gsap.delayedCall(0.15, wait));
          wait();
        },
      });

      return () => {
        window.removeEventListener('load', onLoad);
        guard.kill();
        run.kill();
      };
    },
    { scope: root }
  );

  return (
    <div
      className="preloader"
      ref={root}
      role="progressbar"
      aria-label="Caricamento"
      aria-valuenow={count}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="pl-body">
        <h1 className="pl-name">
          <span className="pl-word-mask">
            <span className="pl-word">M.M.</span>
          </span>
          <span className="pl-word-mask">
            <span className="pl-word">Group</span>
          </span>
        </h1>

        <div className="pl-line" aria-hidden="true">
          <span className="pl-line-fill" />
        </div>

        <div className="pl-meta">
          <span>Segnaletica stradale</span>
          <span className="pl-count">{String(count).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  );
}
