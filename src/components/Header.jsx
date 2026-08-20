import { useRef, useState, useEffect } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { site, PHONE_TEL } from '../data/site';
import BurgerButton from './BurgerButton';
import './Header.css';

export default function Header({ menuOpen, onToggleMenu, onLogoClick }) {
  const root = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(
    () => {
      gsap.from(root.current, {
        yPercent: -110,
        duration: 1,
        ease: 'panel',
        delay: 0.15,
      });
    },
    { scope: root }
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`} ref={root}>
      <div className="header__inner">
        <a
          className="logo"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onLogoClick();
          }}
          aria-label="M.M. Group — torna in cima"
        >
          <span className="logo__mark" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <path d="M20 4 37 34H3z" fill="var(--yellow)" />
              <path d="M20 12 30 30H10z" fill="var(--asphalt-900)" />
              <rect x="18" y="17" width="4" height="7" rx="1.4" fill="var(--yellow)" />
              <rect x="18" y="26" width="4" height="3.4" rx="1.7" fill="var(--yellow)" />
            </svg>
          </span>
          <span className="logo__text">
            <strong>M.M. Group</strong>
            <em>{site.payoff}</em>
          </span>
        </a>

        <div className="header__actions">
          <a className="header__phone" href={`tel:${PHONE_TEL}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5C10.4 19.4 4.6 13.6 4 5.7A2.5 2.5 0 0 1 6.5 3Z"
                fill="currentColor"
              />
            </svg>
            <span>{site.phoneDisplay}</span>
          </a>
          <BurgerButton open={menuOpen} onToggle={onToggleMenu} />
        </div>
      </div>
      <div className="header__rule" aria-hidden="true" />
    </header>
  );
}
