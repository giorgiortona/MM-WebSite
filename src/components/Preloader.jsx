import { useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import './Preloader.css';

/* Schermata di caricamento con avanzamento lineare. Alla fine lo schermo sale. */
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
        const reducedExit = gsap.delayedCall(0.3, () => onDone?.());
        return () => reducedExit.kill();
      }

      let ready = document.readyState === 'complete';
      let progressDone = false;
      let leaving = false;
      let finishTween;
      const proxy = { value: 0 };

      const paint = () => {
        setCount(Math.round(proxy.value));
        gsap.set(q('.pl-progress__fill'), { scaleX: proxy.value / 100 });
      };

      const finish = () => {
        if (!ready || !progressDone || leaving) return;
        leaving = true;
        finishTween = gsap.to(proxy, {
          value: 100,
          duration: 0.45,
          ease: 'brake',
          onUpdate: paint,
          onComplete: leave,
        });
      };

      const onLoad = () => {
        ready = true;
        finish();
      };

      window.addEventListener('load', onLoad, { once: true });
      const guard = gsap.delayedCall(5, () => {
        ready = true;
        finish();
      });

      const intro = gsap
        .timeline()
        .from(q('.pl-word'), { yPercent: 110, duration: 0.9, ease: 'panel', stagger: 0.07 })
        .from(q('.pl-accent'), { scaleY: 0, transformOrigin: 'bottom', duration: 0.55, ease: 'panel' }, 0.28)
        .from(q('.pl-subtitle'), { opacity: 0, y: 16, duration: 0.65, ease: 'panel' }, 0.42)
        .from(q('.pl-kicker, .pl-status'), { opacity: 0, y: 10, duration: 0.55, ease: 'panel' }, 0.55);

      const progress = gsap.to(proxy, {
        value: 92,
        duration: 1.7,
        delay: 0.35,
        ease: 'power2.out',
        onUpdate: paint,
        onComplete: () => {
          progressDone = true;
          finish();
        },
      });

      return () => {
        window.removeEventListener('load', onLoad);
        guard.kill();
        intro.kill();
        progress.kill();
        finishTween?.kill();
      };
    },
    { scope: root }
  );

  return (
    <div
      className="preloader"
      ref={root}
      role="progressbar"
      aria-label="Caricamento del sito M.M. Group"
      aria-valuenow={count}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="pl-body">
        <span className="pl-accent" aria-hidden="true" />

        <div className="pl-copy">
          <h1 className="pl-name">
            <span className="pl-word-mask">
              <span className="pl-word">M.M.</span>
            </span>
            <span className="pl-word-mask">
              <span className="pl-word">Group</span>
            </span>
          </h1>

          <p className="pl-subtitle">Segnaletica stradale completa</p>
          <p className="pl-kicker">Produzione · fornitura · posa</p>

          <div className="pl-progress" aria-hidden="true">
            <span className="pl-progress__fill" />
          </div>

          <div className="pl-status" aria-hidden="true">
            <span>Caricamento</span>
            <span>{String(count).padStart(3, '0')}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
