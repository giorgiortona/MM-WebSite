import { useRef, useEffect } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { site, PHONE_TEL, PHONE_WA } from '../data/site';
import './QuoteModal.css';

/* Il preventivo passa dal telefono: la finestra prepara il messaggio con
   l'articolo scelto e lascia scegliere il canale. */
export default function QuoteModal({ open, product, onClose }) {
  const root = useRef(null);
  const tl = useRef(null);
  const closeBtn = useRef(null);

  const subject = product
    ? `Richiesta preventivo — ${product}`
    : 'Richiesta preventivo — segnaletica stradale';

  const message = product
    ? `Buongiorno, vorrei un preventivo per: ${product}. Vi contatto dal sito.`
    : 'Buongiorno, vorrei un preventivo per una fornitura di segnaletica. Vi contatto dal sito.';

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(root.current, { autoAlpha: 0 });

      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: 'panel' },
          onReverseComplete: () => gsap.set(root.current, { autoAlpha: 0 }),
        })
        .set(root.current, { autoAlpha: 1 })
        .fromTo(q('.quote__scrim'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)
        .fromTo(
          q('.quote__box'),
          { yPercent: 8, opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
          { yPercent: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7 },
          0.05
        )
        .fromTo(
          q('[data-quote-item]'),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
          0.25
        );
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (!tl.current) return;
      open ? tl.current.play() : tl.current.timeScale(1.6).reverse();
    },
    { dependencies: [open] }
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => closeBtn.current?.focus(), 260);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <div
      className="quote"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Richiesta di preventivo"
      aria-hidden={!open}
      inert={!open || undefined}
    >
      <div className="quote__scrim" onClick={onClose} />

      <div className="quote__box">
        <button className="quote__close" onClick={onClose} ref={closeBtn} aria-label="Chiudi">
          <span />
          <span />
        </button>

        <p className="quote__eyebrow" data-quote-item>
          Preventivo senza impegno
        </p>

        <h2 className="quote__title" data-quote-item>
          {product ? (
            <>
              Quotiamo <em>{product}</em>
            </>
          ) : (
            <>Parliamo della tua fornitura</>
          )}
        </h2>

        <p className="quote__text" data-quote-item>
          Dicci quantità, misure e classe di pellicola: prepariamo l’offerta e, se serve,
          veniamo a rilevare in cantiere. Risposta in giornata negli orari di ufficio.
        </p>

        <a className="quote__phone" href={`tel:${PHONE_TEL}`} data-quote-item>
          <span className="quote__phone-label">Chiama ora</span>
          <span className="quote__phone-num">{site.phoneDisplay}</span>
        </a>

        <div className="quote__alts" data-quote-item>
          <a
            className="quote__alt"
            href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-5.6-4.8c-.4-.7-.9-1.6-.9-2.5 0-.8.4-1.3.6-1.5.2-.3.5-.3.6-.3h.5c.2 0 .4 0 .6.5l.8 1.9c0 .2 0 .3-.1.5l-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.5.3v1.1Z"
                fill="currentColor"
              />
            </svg>
            WhatsApp
          </a>

          <a
            className="quote__alt"
            href={`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="m3.5 7 8.5 6 8.5-6" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            Email
          </a>
        </div>

        <p className="quote__foot" data-quote-item>
          {site.legal} — {site.address.street}, {site.address.zip} {site.address.city} (
          {site.address.province}) · P. IVA {site.vat}
        </p>

        <div className="hazard-strip quote__strip" aria-hidden="true" />
      </div>
    </div>
  );
}
