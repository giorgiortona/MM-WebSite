import { useRef, useEffect, useCallback } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { photos, src } from '../data/gallery';
import './Lightbox.css';

const order = Object.keys(photos);

export default function Lightbox({ slug, onClose, onChange }) {
  const root = useRef(null);
  const open = Boolean(slug);
  const meta = slug ? photos[slug] : null;

  const step = useCallback(
    (dir) => {
      if (!slug) return;
      const i = order.indexOf(slug);
      onChange(order[(i + dir + order.length) % order.length]);
    },
    [slug, onChange]
  );

  useGSAP(
    () => {
      if (!open) return;
      const q = gsap.utils.selector(root);
      gsap
        .timeline({ defaults: { ease: 'panel' } })
        .fromTo(q('.lightbox__scrim'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0)
        .fromTo(
          q('.lightbox__stage'),
          { opacity: 0, scale: 0.94, clipPath: 'inset(6% 6% 6% 6%)' },
          { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6 },
          0.05
        )
        .fromTo(q('.lightbox__bar > *'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, 0.25);
    },
    { dependencies: [open, slug], scope: root }
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('is-locked');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [open, onClose, step]);

  if (!open) return null;

  return (
    <div className="lightbox" ref={root} role="dialog" aria-modal="true" aria-label={meta.alt}>
      <div className="lightbox__scrim" onClick={onClose} />

      <button className="lightbox__close" onClick={onClose} aria-label="Chiudi">
        <span />
        <span />
      </button>

      <button className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Immagine precedente">
        <svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
      </button>

      <figure className="lightbox__stage">
        <img src={src(slug, 1800)} alt={meta.alt} />
        <figcaption className="lightbox__bar">
          <span className="lightbox__place">{meta.place}</span>
          <strong className="lightbox__caption">{meta.caption}</strong>
          <span className="lightbox__count">
            {String(order.indexOf(slug) + 1).padStart(2, '0')} / {String(order.length).padStart(2, '0')}
          </span>
        </figcaption>
      </figure>

      <button className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Immagine successiva">
        <svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
      </button>
    </div>
  );
}
