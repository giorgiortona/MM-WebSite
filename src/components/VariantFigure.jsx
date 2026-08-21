import { variantImages } from '../data/variantImages';

export default function VariantFigure({ name, family, className = '' }) {
  const source = variantImages[`${family}::${name}`];

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
