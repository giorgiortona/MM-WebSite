import LightFigure from './LightFigure';

/* Anteprima di una cartella del catalogo: tre elementi affiancati, senza alterazioni,
   con la linguetta che indica quanti ne contiene. Accetta figure vettoriali (keys)
   oppure immagini (sources). */
export default function FolderFigure({ keys = [], sources = [], count, label = 'prodotti' }) {
  return (
    <span className="folder-figure">
      <span className="folder-figure__tab">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 7a2 2 0 0 1 2-2h4.2a2 2 0 0 1 1.5.7L12 7h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="currentColor" />
        </svg>
        {count} {label}
      </span>
      <span className="folder-figure__row">
        {keys.map((key) => (
          <span className="folder-figure__item" key={key}>
            <LightFigure figureKey={key} />
          </span>
        ))}
        {sources.map((src) => (
          <span className="folder-figure__item folder-figure__item--photo" key={src}>
            <img src={src} alt="" loading="lazy" decoding="async" />
          </span>
        ))}
      </span>
    </span>
  );
}
