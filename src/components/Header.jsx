import { useRef, useState, useEffect } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { site, PHONE_TEL } from '../data/site';
import BurgerButton from './BurgerButton';
import './Header.css';

export default function Header({ menuOpen, onToggleMenu, onLogoClick, solid = false }) {
  const root = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(
    () => {
      gsap.from(root.current, { y: -80, opacity: 0, duration: 0.9, ease: 'panel', delay: 0.1 });
    },
    { scope: root }
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled || solid ? 'is-scrolled' : ''}`} ref={root}>
      <div className="header__inner">
        <a
          className="logo"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onLogoClick();
          }}
        >
          <span className="logo__name">M.M. Group</span>
          <span className="logo__rule" aria-hidden="true" />
          <span className="logo__sub">{site.payoff}</span>
        </a>

        <div className="header__actions">
          <a className="header__phone" href={`tel:${PHONE_TEL}`}>
            {site.phoneDisplay}
          </a>
          <BurgerButton open={menuOpen} onToggle={onToggleMenu} />
        </div>
      </div>
    </header>
  );
}
