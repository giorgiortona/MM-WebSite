import { useRef } from 'react';
import { gsap, useGSAP, SplitText, prefersReducedMotion } from '../lib/gsap';
import { site } from '../data/site';
import Figure from './Figure';
import './Hero.css';

export default function Hero({ onQuote, onExplore }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const reduced = prefersReducedMotion();

      const split = new SplitText(q('.hero__title span'), {
        type: 'lines',
        linesClass: 'hero-line',
        mask: 'lines',
      });

      const tl = gsap.timeline({ delay: reduced ? 0 : 0.15, defaults: { ease: 'panel' } });

      tl.from(q('.hero__eyebrow'), { opacity: 0, y: 20, duration: 0.7 }, 0)
        .from(split.lines, { yPercent: 118, duration: 1.05, stagger: 0.09 }, 0.1)
        .from(q('.hero__subtitle'), { opacity: 0, y: 24, duration: 0.8 }, 0.38)
        .from(q('.hero__rule'), { scaleX: 0, transformOrigin: '0 50%', duration: 0.9 }, 0.52)
        .from(q('.hero__lead'), { opacity: 0, y: 26, duration: 0.8 }, 0.6)
        .from(q('.hero__cta > *'), { opacity: 0, y: 22, duration: 0.7, stagger: 0.08 }, 0.73)
        .from(q('.hero__meta > *'), { opacity: 0, y: 18, duration: 0.7, stagger: 0.08 }, 0.85)
        .from(q('.hero__meta > *'), { opacity: 0, duration: 0.01 }, 1);

      /* Il fondo si scurisce e scivola mentre si esce dalla hero */
      if (!reduced) {
        gsap.to(q('.hero__veil'), {
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(q('.hero__content'), {
          yPercent: -12,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      }

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__bg">
        <Figure
          slug="rotatoria-aerea"
          size={1800}
          sizes="100vw"
          loading="eager"
          speed={0.82}
          className="hero__image"
        />
        <div className="hero__veil" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
      </div>

      <div className="hero__content shell">
        <p className="hero__eyebrow">
          {site.legal} — {site.address.city} ({site.address.province})
        </p>

        <h1 className="hero__title">
          <span>M.M. Group</span>
        </h1>

        <p className="hero__subtitle">
          Segnaletica stradale <em>completa</em>
        </p>

        <div className="hero__rule" aria-hidden="true" />

        <p className="hero__lead">
          Orizzontale e verticale, barriere e protezioni, cantieri e impianti semaforici.
          Produzione conforme alla norma <strong>EN 12899-1:2007</strong> con marcatura CE su
          ogni fornitura.
        </p>

        <div className="hero__cta">
          <button className="btn" type="button" onClick={onQuote}>
            Richiedi preventivo
            <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2.2" fill="none" />
            </svg>
          </button>
          <button className="btn btn--ghost" type="button" onClick={onExplore}>
            Sfoglia il catalogo
          </button>
        </div>

        <ul className="hero__meta">
          <li>
            <span>Pellicole</span>
            <strong>classe 1 · 2 · 3</strong>
          </li>
          <li>
            <span>Certificato</span>
            <strong>0474-CPR-0653</strong>
          </li>
          <li>
            <span>Preventivi</span>
            <strong>{site.phoneDisplay}</strong>
          </li>
        </ul>
      </div>

    </section>
  );
}
