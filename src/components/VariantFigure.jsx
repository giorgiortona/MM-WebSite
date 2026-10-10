import { variantImages } from '../data/variantImages';
import LightFigure, { hasLightFigure } from './LightFigure';

export default function VariantFigure({ name, family, className = '' }) {
  const key = `${family}::${name}`;

  if (hasLightFigure(key)) return <LightFigure figureKey={key} className={className} />;

  const source = variantImages[key];

  if (!source) return null;

  return (
    <img
      className={`variant-figure ${className}`}
      src={source}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}
