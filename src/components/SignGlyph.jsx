/* Pittogrammi dei segnali disegnati in SVG: sostituiscono le foto di prodotto
   nel catalogo e restano nitidi a qualsiasi dimensione. */
const glyphs = {
  triangle: (
    <>
      <path d="M32 8 58 54H6z" fill="#F2F3EF" />
      <path d="M32 16 51 50H13z" fill="var(--sign-red)" />
      <path d="M32 24 45 47H19z" fill="#F2F3EF" />
      <rect x="30" y="30" width="4" height="9" rx="1.6" fill="#111316" />
      <rect x="30" y="41" width="4" height="4" rx="2" fill="#111316" />
    </>
  ),
  plate: (
    <>
      <rect x="6" y="14" width="52" height="36" rx="3" fill="var(--sign-blue)" />
      <rect x="10" y="18" width="44" height="28" rx="2" fill="none" stroke="#F2F3EF" strokeWidth="2" />
      <rect x="15" y="24" width="24" height="4" rx="2" fill="#F2F3EF" />
      <rect x="15" y="32" width="18" height="4" rx="2" fill="#F2F3EF" opacity="0.7" />
      <path d="M44 26h6l-4 4 4 4h-6l-4-4z" fill="#F2F3EF" />
    </>
  ),
  arrow: (
    <>
      <path d="M6 16h40l12 16-12 16H6z" fill="var(--sign-green)" />
      <rect x="12" y="24" width="22" height="4" rx="2" fill="#F2F3EF" />
      <rect x="12" y="34" width="14" height="4" rx="2" fill="#F2F3EF" opacity="0.7" />
    </>
  ),
  delineator: (
    <>
      <rect x="24" y="10" width="16" height="46" rx="3" fill="#F2F3EF" />
      <rect x="24" y="10" width="16" height="10" rx="3" fill="var(--sign-red)" />
      <rect x="24" y="30" width="16" height="10" fill="var(--sign-red)" />
      <rect x="24" y="50" width="16" height="6" fill="var(--sign-red)" />
      <circle cx="32" cy="25" r="3" fill="var(--yellow)" />
    </>
  ),
  barrier: (
    <>
      <rect x="4" y="22" width="56" height="16" rx="2" fill="#F2F3EF" />
      <path d="M12 22h10L12 38H4z" fill="var(--sign-red)" />
      <path d="M32 22h10L32 38H22z" fill="var(--sign-red)" />
      <path d="M52 22h8L52 38h-10z" fill="var(--sign-red)" />
      <rect x="14" y="38" width="4" height="16" fill="#3A4048" />
      <rect x="46" y="38" width="4" height="16" fill="#3A4048" />
    </>
  ),
  cone: (
    <>
      <path d="M32 8 48 52H16z" fill="var(--orange)" />
      <path d="M25.5 30h13l2 7h-17z" fill="#F2F3EF" />
      <rect x="10" y="52" width="44" height="6" rx="2" fill="var(--orange)" />
    </>
  ),
  pole: (
    <>
      <rect x="28" y="6" width="8" height="52" rx="2" fill="#8A9099" />
      <rect x="28" y="6" width="3" height="52" fill="#B7BDC4" />
      <rect x="16" y="16" width="32" height="4" rx="2" fill="var(--yellow)" />
      <rect x="16" y="30" width="32" height="4" rx="2" fill="var(--yellow)" opacity="0.6" />
      <rect x="12" y="52" width="40" height="6" rx="2" fill="#3A4048" />
    </>
  ),
  mirror: (
    <>
      <circle cx="32" cy="26" r="18" fill="#F2F3EF" />
      <circle cx="32" cy="26" r="13" fill="var(--asphalt-500)" />
      <path d="M22 30c6-8 14-8 20 0" stroke="var(--yellow)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="29" y="42" width="6" height="16" rx="2" fill="#8A9099" />
    </>
  ),
  paint: (
    <>
      <rect x="6" y="40" width="52" height="18" rx="2" fill="var(--asphalt-500)" />
      <rect x="10" y="47" width="14" height="4" rx="2" fill="#F2F3EF" />
      <rect x="30" y="47" width="14" height="4" rx="2" fill="#F2F3EF" />
      <rect x="20" y="10" width="24" height="22" rx="3" fill="var(--yellow)" />
      <rect x="26" y="6" width="12" height="6" rx="2" fill="var(--yellow-deep)" />
      <path d="M30 32h4v10h-4z" fill="#F2F3EF" />
    </>
  ),
  film: (
    <>
      <rect x="8" y="18" width="48" height="28" rx="3" fill="var(--asphalt-400)" />
      <rect x="14" y="24" width="36" height="16" rx="2" fill="var(--yellow)" />
      <path d="M14 40 50 24" stroke="#F2F3EF" strokeWidth="2" opacity="0.8" />
      <path d="M14 32 34 24" stroke="#F2F3EF" strokeWidth="2" opacity="0.5" />
      <circle cx="8" cy="32" r="5" fill="#8A9099" />
      <circle cx="56" cy="32" r="5" fill="#8A9099" />
    </>
  ),
};

export default function SignGlyph({ type = 'triangle', size = 40, className = '' }) {
  return (
    <svg
      className={`sign-glyph ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      {glyphs[type] || glyphs.triangle}
    </svg>
  );
}
