import { useRef, useState, useEffect } from 'react';
import { gsap, useGSAP, SplitText } from '../lib/gsap';
import { nav, site, PHONE_TEL } from '../data/site';
import { services } from '../data/services';
import Figure from './Figure';
import './NavOverlay.css';

/* Menu a tutto schermo: il pannello si apre con un taglio diagonale,
   le voci salgono in sequenza e l'anteprima a destra segue il puntatore. */
export default function NavOverlay({ open, onClose, onNavigate }) {
  const root = useRef(null);
  const tl = useRef(null);
  const [hovered, setHovered] = useState(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      const split = new SplitText(q('.nav-link__text'), {
        type: 'chars',
        charsClass: 'nav-char',
        mask: 'chars',
      });

      gsap.set(root.current, { autoAlpha: 0 });

      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: 'panel' },
          onReverseComplete: () => gsap.set(root.current, { autoAlpha: 0 }),
        })
        .set(root.current, { autoAlpha: 1 })
        .fromTo(
          q('.nav-overlay__panel'),
          { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
          { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.85 },
          0
        )
        .fromTo(
          q('.nav-overlay__bar'),
          { scaleX: 0, transformOrigin: '0 50%' },
          { scaleX: 1, duration: 0.7 },
          0.1
        )
        .fromTo(
          split.chars,
          { yPercent: 115 },
          { yPercent: 0, duration: 0.75, stagger: 0.014 },
          0.32
        )
        .fromTo(
          q('.nav-link__km'),
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.05 },
          0.45
        )
        .fromTo(
          q('[data-nav-fade]'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 },
          0.5
        )
        .fromTo(
          q('.nav-overlay__preview'),
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 0.9 },
          0.4
        );

      return () => split.revert();
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (!tl.current) return;
      open ? tl.current.timeScale(1).play() : tl.current.timeScale(1.7).reverse();
    },
    { dependencies: [open] }
  );

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    const onKey = (e) => e.key === 'Escape' && open && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [open, onClose]);

  const previewSlug = services[hovered % services.length]?.photo || 'rotatoria-aerea';

  return (
    <div
      className="nav-overlay"
      id="nav-overlay"
      ref={root}
      aria-hidden={!open}
      inert={!open || undefined}
    >
      <div className="nav-overlay__panel">
        <div className="grain" aria-hidden="true" />

        <div className="nav-overlay__grid">
          <nav className="nav-overlay__nav" aria-label="Navigazione principale">
            <ul>
              {nav.map((item, i) => (
                <li key={item.id}>
                  <a
                    className="nav-link"
                    href={`#${item.id}`}
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                  >
                    <span className="nav-link__km">km {item.km}</span>
                    <span className="nav-link__text">{item.label}</span>
                    <svg className="nav-link__arrow" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-overlay__aside">
            <div className="nav-overlay__preview" aria-hidden="true">
              {services.map((s, i) => (
                <Figure
                  key={s.photo}
                  slug={s.photo}
                  size={900}
                  sizes="34vw"
                  className={`nav-preview__item ${i === hovered ? 'is-active' : ''}`}
                />
              ))}
              <span className="nav-overlay__preview-tag">
                {services[hovered % services.length]?.title}
              </span>
            </div>

            <div className="nav-overlay__contact" data-nav-fade>
              <span className="nav-overlay__label">Preventivi</span>
              <a className="nav-overlay__phone" href={`tel:${PHONE_TEL}`}>
                {site.phoneDisplay}
              </a>
              <a className="nav-overlay__mail" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <p className="nav-overlay__addr">
                {site.address.street} — {site.address.zip} {site.address.city} ({site.address.province})
              </p>
            </div>
          </div>
        </div>

        <div className="nav-overlay__bar hazard-strip" aria-hidden="true" />
      </div>
    </div>
  );
}
