import { useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import './Preloader.css';

/* Animazione di caricamento su misura: una strada in prospettiva che viene
   tracciata dal basso verso il punto di fuga (segnaletica orizzontale) mentre
   ai lati salgono due sostegni con i rispettivi segnali (verticale).
   Al termine il pannello si apre in cinque corsie che si sollevano. */
export default function Preloader({ onDone }) {
  const root = useRef(null);
  const [count, setCount] = useState(0);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const q = gsap.utils.selector(root);

      /* --- Timeline della scena, pilotata dalla percentuale --- */
      const scene = gsap.timeline({ paused: true });

      scene
        .fromTo(
          q('.pl-edge'),
          { drawSVG: '0% 0%' },
          { drawSVG: '0% 100%', duration: 1, ease: 'none', stagger: 0.06 },
          0
        )
        .fromTo(
          q('.pl-dash'),
          { opacity: 0, scaleY: 0.2, transformOrigin: '50% 100%' },
          { opacity: 1, scaleY: 1, duration: 0.5, ease: 'brake', stagger: 0.12 },
          0.15
        )
        .fromTo(
          q('.pl-post'),
          { drawSVG: '100% 100%' },
          { drawSVG: '0% 100%', duration: 0.45, ease: 'none', stagger: 0.3 },
          0.9
        )
        .fromTo(
          q('.pl-sign'),
          { opacity: 0, scale: 0.4, transformOrigin: '50% 100%' },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.2)', stagger: 0.3 },
          1.15
        )
        .fromTo(
          q('.pl-glow'),
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'none' },
          1.2
        );

      /* --- Uscita: le corsie si sollevano una dopo l'altra --- */
      const leave = () => {
        const out = gsap.timeline({
          onComplete: () => onDone?.(),
        });
        out
          .to(q('.pl-scene'), { scale: 1.14, opacity: 0, duration: 0.7, ease: 'panel' })
          .to(q('.preloader__hud'), { opacity: 0, y: -18, duration: 0.5, ease: 'panel' }, 0.05)
          .to(
            q('.preloader__lane'),
            { yPercent: -101, duration: 0.9, ease: 'panel', stagger: 0.07 },
            0.35
          )
          .to(q('.preloader__sweep'), { scaleY: 0, transformOrigin: '50% 0%', duration: 0.5, ease: 'panel' }, 0.5);
        return out;
      };

      if (reduced) {
        scene.progress(1);
        setCount(100);
        gsap.delayedCall(0.35, () => onDone?.());
        return;
      }

      /* --- Contatore: sale fino a 92 e attende il vero load della pagina --- */
      const proxy = { v: 0 };
      let ready = document.readyState === 'complete';
      const onLoad = () => (ready = true);
      window.addEventListener('load', onLoad, { once: true });
      const guard = gsap.delayedCall(5, () => (ready = true));

      const run = gsap.to(proxy, {
        v: 92,
        duration: 2.05,
        ease: 'power2.out',
        onUpdate: () => {
          setCount(Math.round(proxy.v));
          scene.progress(proxy.v / 100);
          gsap.set(q('.preloader__bar-fill'), { scaleX: proxy.v / 100 });
        },
        onComplete: () => {
          const finish = () => {
            gsap.to(proxy, {
              v: 100,
              duration: 0.55,
              ease: 'brake',
              onUpdate: () => {
                setCount(Math.round(proxy.v));
                scene.progress(proxy.v / 100);
                gsap.set(q('.preloader__bar-fill'), { scaleX: proxy.v / 100 });
              },
              onComplete: () => leave(),
            });
          };
          const waitReady = () => {
            if (ready) finish();
            else gsap.delayedCall(0.15, waitReady);
          };
          waitReady();
        },
      });

      return () => {
        window.removeEventListener('load', onLoad);
        guard.kill();
        run.kill();
        scene.kill();
      };
    },
    { scope: root }
  );

  return (
    <div
      className="preloader"
      ref={root}
      role="progressbar"
      aria-label="Caricamento del sito"
      aria-valuenow={count}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="preloader__lanes" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="preloader__lane" key={i} />
        ))}
      </div>

      <div className="preloader__inner">
        <div className="preloader__hud">
          <span className="preloader__brand">M.M. Group</span>
          <span className="preloader__job">Tracciamento in corso</span>
        </div>

        <svg className="pl-scene" viewBox="0 0 720 320" aria-hidden="true">
          <defs>
            <linearGradient id="plFade" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#1F2328" />
              <stop offset="100%" stopColor="#0B0C0E" />
            </linearGradient>
            <radialGradient id="plGlow" cx="50%" cy="18%" r="55%">
              <stop offset="0%" stopColor="#FFD400" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FFD400" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* carreggiata in prospettiva */}
          <path d="M120 320 600 320 412 44 308 44Z" fill="url(#plFade)" />
          <rect className="pl-glow" x="0" y="0" width="720" height="320" fill="url(#plGlow)" />

          {/* linee di margine, tracciate verso il punto di fuga */}
          <path className="pl-edge" d="M152 320 322 46" stroke="#F2F3EF" strokeWidth="7" fill="none" strokeLinecap="square" />
          <path className="pl-edge" d="M568 320 398 46" stroke="#F2F3EF" strokeWidth="7" fill="none" strokeLinecap="square" />

          {/* mezzeria tratteggiata */}
          <path className="pl-dash" d="M344 320h32l-5 -46h-22z" fill="#F2F3EF" />
          <path className="pl-dash" d="M349 258h22l-4 -36h-14z" fill="#F2F3EF" />
          <path className="pl-dash" d="M353 208h14l-3 -28h-8z" fill="#F2F3EF" />
          <path className="pl-dash" d="M356 168h8l-2 -21h-4z" fill="#F2F3EF" />
          <path className="pl-dash" d="M358 136h4l-1 -16h-2z" fill="#F2F3EF" />
          <path className="pl-dash" d="M359 112h2l-0.5 -12h-1z" fill="#F2F3EF" />

          {/* sostegno di sinistra con disco */}
          <path className="pl-post" d="M96 300 96 168" stroke="#8A9099" strokeWidth="6" fill="none" />
          <g className="pl-sign">
            <circle cx="96" cy="148" r="30" fill="#F2F3EF" />
            <circle cx="96" cy="148" r="24" fill="#C8102E" />
            <rect x="76" y="142" width="40" height="12" rx="2" fill="#F2F3EF" />
          </g>

          {/* sostegno di destra con triangolo */}
          <path className="pl-post" d="M624 300 624 186" stroke="#8A9099" strokeWidth="6" fill="none" />
          <g className="pl-sign">
            <path d="M624 116 660 178H588Z" fill="#F2F3EF" />
            <path d="M624 132 648 172H600Z" fill="#C8102E" />
            <path d="M624 143 640 168H608Z" fill="#F2F3EF" />
          </g>
        </svg>

        <div className="preloader__meter">
          <div className="preloader__count">
            <span className="preloader__num">{String(count).padStart(3, '0')}</span>
            <span className="preloader__pct">%</span>
          </div>
          <div className="preloader__bar">
            <div className="preloader__bar-fill" />
          </div>
          <span className="preloader__legend">Segnaletica orizzontale · verticale</span>
        </div>
      </div>

      <div className="preloader__sweep" aria-hidden="true" />
    </div>
  );
}
