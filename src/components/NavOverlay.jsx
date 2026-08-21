import { useRef, useEffect } from 'react';
import { gsap, useGSAP, SplitText } from '../lib/gsap';
import { nav, site, PHONE_TEL } from '../data/site';
import './NavOverlay.css';

/* Menu a tutto schermo: il pannello si apre con un taglio diagonale,
   le voci salgono in sequenza e il marchio accompagna la navigazione. */
export default function NavOverlay({ open, onClose, onNavigate }) {
  const root = useRef(null);
  const tl = useRef(null);

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
          split.chars,
          { yPercent: 115 },
          { yPercent: 0, duration: 0.75, stagger: 0.014 },
          0.32
        )
        .fromTo(
          q('[data-nav-fade]'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 },
          0.5
        )
        .fromTo(
          q('.nav-overlay__brand'),
          { opacity: 0, scale: 0.94 },
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
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    className="nav-link"
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                  >
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
            <div className="nav-overlay__brand" aria-label="M.M. Group">
              <span className="nav-overlay__brand-mm">M.M.</span>
              <span className="nav-overlay__brand-group">Group</span>
              <span className="nav-overlay__brand-sub">Segnaletica stradale completa</span>
            </div>

            <div className="nav-overlay__contact" data-nav-fade>
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

      </div>
    </div>
  );
}
