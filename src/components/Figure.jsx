import { useState } from 'react';
import { photos, src, lqip } from '../data/gallery';
import './Figure.css';

/* Immagine con placeholder sfocato: il file -lqip è una miniatura da 24px
   che riempie il riquadro finché la webp definitiva non è decodificata. */
export default function Figure({
  slug,
  className = '',
  speed,
  loading = 'lazy',
  onClick,
  children,
}) {
  const [loaded, setLoaded] = useState(false);
  const meta = photos[slug];
  if (!meta) return null;

  return (
    <figure
      className={`figure ${loaded ? 'is-loaded' : ''} ${className}`}
      style={{ backgroundImage: `url(${lqip(slug)})` }}
      onClick={onClick}
      data-speed={speed}
    >
      <img
        src={src(slug, 1800)}
        width={meta.width}
        height={meta.height}
        alt={meta.alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
      {children}
    </figure>
  );
}
