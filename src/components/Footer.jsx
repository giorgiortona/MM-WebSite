import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { site, nav, PHONE_TEL } from '../data/site';
import './Footer.css';

export default function Footer({ onNavigate, onTop }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.from(q('.footer__word'), {
        yPercent: 105,
        duration: 1.1,
        ease: 'panel',
        stagger: 0.06,
        scrollTrigger: { trigger: q('.footer__big'), start: 'top 92%' },
      });
    },
    { scope: root }
  );

  return (
    <footer className="footer" ref={root}>
      <div className="shell footer__inner">
        <div className="footer__cols">
          <div className="footer__col">
            <span className="footer__label">Sede operativa</span>
            <p>
              {site.legal}
              <br />
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city} ({site.address.province})
            </p>
          </div>

          <div className="footer__col">
            <span className="footer__label">Contatti</span>
            <p>
              <a href={`tel:${PHONE_TEL}`}>{site.phoneDisplay}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a href={`mailto:${site.pec}`}>{site.pec}</a>
            </p>
          </div>

          <div className="footer__col">
            <span className="footer__label">Sezioni</span>
            <ul className="footer__nav">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(n.id);
                    }}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <span className="footer__label">Conformità</span>
            <p>
              EN 12899-1:2007
              <br />
              Marcatura CE — cert. 0474-CPR-0653
              <br />
              Rina Service S.p.A. · Reg. UE 305/11
            </p>
          </div>
        </div>

        <div className="footer__big" aria-hidden="true">
          <span className="footer__word-mask">
            <span className="footer__word">M.M.</span>
          </span>
          <span className="footer__word-mask">
            <span className="footer__word">Group</span>
          </span>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {site.legal} — P. IVA e C.F. {site.vat}
          </span>
          <button className="footer__top" onClick={onTop}>
            Torna in cima
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 20V5m0 0-6 6m6-6 6 6" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
