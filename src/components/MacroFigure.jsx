/* Composizioni per le macro aree del catalogo. Sono illustrazioni vettoriali
   con resa fotografica (luce, volumi, ombre a terra): raccontano il contenuto
   dell'area meglio di una fotografia generica e restano coerenti fra loro. */
import LavoriSign from './LavoriSign';

const W = '#F2F3EF';
const R = '#C8102E';
const Y = '#FFD400';
const K = '#14161A';
const S = '#8A9099';
const A = '#2A2F35';

/* ---------- materiali condivisi ---------- */
const Defs = () => (
  <defs>
    <linearGradient id="mf-pole" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#555c65" />
      <stop offset="0.3" stopColor="#dde1e5" />
      <stop offset="0.55" stopColor="#979ea6" />
      <stop offset="1" stopColor="#434950" />
    </linearGradient>
    <linearGradient id="mf-plate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#4f555d" />
      <stop offset="1" stopColor="#1b1e23" />
    </linearGradient>
    <linearGradient id="mf-sheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
      <stop offset="0.42" stopColor="#fff" stopOpacity="0.08" />
      <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
      <stop offset="1" stopColor="#fff" stopOpacity="0.14" />
    </linearGradient>
    <linearGradient id="mf-blue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#1d86d6" />
      <stop offset="1" stopColor="#09477f" />
    </linearGradient>
    <linearGradient id="mf-sign-red" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#dc1a3d" />
      <stop offset="1" stopColor="#a30d27" />
    </linearGradient>
    <linearGradient id="mf-white" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#ffffff" />
      <stop offset="1" stopColor="#dcdfdb" />
    </linearGradient>
    <radialGradient id="mf-housing-red" cx="0.38" cy="0.3" r="0.9">
      <stop offset="0" stopColor="#f2506a" />
      <stop offset="0.55" stopColor="#c8102e" />
      <stop offset="1" stopColor="#68081a" />
    </radialGradient>
    <radialGradient id="mf-housing-dark" cx="0.4" cy="0.3" r="0.9">
      <stop offset="0" stopColor="#555b63" />
      <stop offset="1" stopColor="#15171b" />
    </radialGradient>
    <radialGradient id="mf-face" cx="0.5" cy="0.5" r="0.6">
      <stop offset="0" stopColor="#2c2f35" />
      <stop offset="1" stopColor="#07080a" />
    </radialGradient>
    <radialGradient id="mf-led" cx="0.38" cy="0.35" r="0.7">
      <stop offset="0" stopColor="#fffbe0" />
      <stop offset="0.45" stopColor="#ffd400" />
      <stop offset="1" stopColor="#d68a00" />
    </radialGradient>
    <radialGradient id="mf-glow">
      <stop offset="0" stopColor="#ffd400" stopOpacity="0.7" />
      <stop offset="1" stopColor="#ffd400" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="mf-amber" cx="0.4" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#fff3a8" />
      <stop offset="0.5" stopColor="#ffc800" />
      <stop offset="1" stopColor="#b86a00" />
    </radialGradient>
    <linearGradient id="mf-cone" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#ff9c42" />
      <stop offset="0.4" stopColor="#ff6a00" />
      <stop offset="1" stopColor="#b04000" />
    </linearGradient>
    <linearGradient id="mf-band" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#ffffff" />
      <stop offset="0.5" stopColor="#f2f2ef" />
      <stop offset="1" stopColor="#b3b6b2" />
    </linearGradient>
    <linearGradient id="mf-asphalt" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#3c4148" stopOpacity="0" />
      <stop offset="0.22" stopColor="#3c4148" />
      <stop offset="1" stopColor="#1c1f24" />
    </linearGradient>
    <linearGradient id="mf-paint" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
      <stop offset="1" stopColor="#f2f3ef" />
    </linearGradient>
    <clipPath id="mf-road">
      <path d="M0 180 100 30H220L320 180z" />
    </clipPath>
    <filter id="mf-blur" x="-50%" y="-80%" width="200%" height="260%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
    <filter id="mf-text-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2.2" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="mf-grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
      <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.16 0" />
    </filter>
  </defs>
);

const groundShadow = (cx, rx, cy = 159) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.17} fill="#000" opacity="0.3" filter="url(#mf-blur)" />
);

const post = (x, top, w = 7) => <rect x={x - w / 2} y={top} width={w} height={158 - top} fill="url(#mf-pole)" />;

const plate = (x, w = 32) => (
  <>
    <rect x={x - w / 2} y="155" width={w} height="6" rx="2" fill="url(#mf-plate)" />
    <rect x={x - w / 2 + 2} y="155" width={w - 4} height="1.4" rx="0.7" fill="#fff" opacity="0.25" />
  </>
);

/* triangolo di pericolo con angoli arrotondati: bordo bianco, fascia rossa, campo bianco */
const triPath = (cx, top, w, inset) => {
  const h = w * 0.866;
  const c = { x: cx, y: top + (2 * h) / 3 };
  const k = (h / 3 - inset) / (h / 3);
  const v = [[cx, top], [cx - w / 2, top + h], [cx + w / 2, top + h]].map(([x, y]) =>
    [(c.x + (x - c.x) * k).toFixed(2), (c.y + (y - c.y) * k).toFixed(2)].join(' '),
  );
  return `M${v[0]}L${v[1]}L${v[2]}z`;
};

const warningSign = (cx, top, w) => {
  const r = w * 0.05;
  const edge = w * 0.012;
  const band = w * 0.125;
  const rho = w * 0.012;
  const h = w * 0.866;
  return (
    <>
      <path d={triPath(cx + 3, top + 5, w, r)} fill="#000" stroke="#000" strokeWidth={2 * r} strokeLinejoin="round" opacity="0.28" filter="url(#mf-blur)" />
      <path d={triPath(cx, top, w, r)} fill="#fff" stroke="#fff" strokeWidth={2 * r} strokeLinejoin="round" />
      <path d={triPath(cx, top, w, r)} fill="url(#mf-sign-red)" stroke="url(#mf-sign-red)" strokeWidth={2 * (r - edge)} strokeLinejoin="round" />
      <path d={triPath(cx, top, w, band + rho)} fill="url(#mf-white)" stroke="url(#mf-white)" strokeWidth={2 * rho} strokeLinejoin="round" />
      <rect x={cx - w * 0.035} y={top + h * 0.38} width={w * 0.07} height={h * 0.26} rx={w * 0.03} fill={K} />
      <circle cx={cx} cy={top + h * 0.76} r={w * 0.045} fill={K} />
      <path d={triPath(cx, top, w, r)} fill="url(#mf-sheen)" stroke="url(#mf-sheen)" strokeWidth={2 * r} strokeLinejoin="round" />
    </>
  );
};

const scenes = {
  verticale: (
    <>
      {/* segnale di pericolo */}
      {groundShadow(63, 28)}
      {post(63, 74)}
      {plate(63, 28)}
      {warningSign(63, 18, 74)}

      {/* segnale di divieto */}
      {groundShadow(161, 28)}
      {post(161, 86)}
      {plate(161, 28)}
      <circle cx="165" cy="61" r="34" fill="#000" opacity="0.28" filter="url(#mf-blur)" />
      <circle cx="161" cy="56" r="34" fill="#fff" />
      <circle cx="161" cy="56" r="32.4" fill="url(#mf-sign-red)" />
      <circle cx="161" cy="56" r="24.5" fill="url(#mf-white)" />
      <rect x="138" y="50" width="46" height="12" rx="1.5" fill="url(#mf-sign-red)" />
      <circle cx="161" cy="56" r="34" fill="url(#mf-sheen)" />

      {/* segnale di indicazione */}
      {groundShadow(260, 28)}
      {post(260, 92)}
      {plate(260, 28)}
      <rect x="210" y="40" width="108" height="62" rx="4" fill="#000" opacity="0.28" filter="url(#mf-blur)" />
      <rect x="206" y="34" width="108" height="62" rx="4" fill="#fff" />
      <rect x="209" y="37" width="102" height="56" rx="2" fill="url(#mf-blue)" />
      <rect x="221" y="52" width="58" height="9" rx="4" fill="#fff" />
      <rect x="221" y="70" width="38" height="9" rx="4" fill="#fff" opacity="0.8" />
      <path d="M284 74h14m0 0-6-6m6 6-6 6" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="206" y="34" width="108" height="62" rx="4" fill="url(#mf-sheen)" />
    </>
  ),

  orizzontale: (
    <>
      <path d="M0 180 100 30H220L320 180z" fill="url(#mf-asphalt)" />
      <g clipPath="url(#mf-road)">
        <rect x="0" y="30" width="320" height="150" filter="url(#mf-grain)" />
        {/* margini della carreggiata */}
        <path d="M105 34 38 180H60L113 34z" fill="url(#mf-paint)" />
        <path d="M215 34 282 180H260L207 34z" fill="url(#mf-paint)" />
        {/* mezzeria */}
        {[[48, 62], [72, 90], [104, 130], [150, 190]].map(([y1, y2]) => {
          const hw = (y) => 1.6 + (y - 34) * 0.05;
          return (
            <path
              key={y1}
              d={`M${160 - hw(y1)} ${y1}H${160 + hw(y1)}L${160 + hw(y2)} ${y2}H${160 - hw(y2)}z`}
              fill="url(#mf-paint)"
            />
          );
        })}
        {/* stalli gialli */}
        <path d="M246 134H292L297 145H241z" fill={Y} opacity="0.95" />
        <path d="M239 156H298L304 170H233z" fill={Y} opacity="0.95" />
      </g>
    </>
  ),

  luminosa: (
    <>
      {/* segnale di attraversamento con lampeggianti */}
      {groundShadow(62, 28)}
      {post(62, 96)}
      {plate(62, 32)}
      <rect x="26" y="40" width="80" height="62" rx="3" fill="#000" opacity="0.28" filter="url(#mf-blur)" />
      <rect x="22" y="34" width="80" height="62" rx="3" fill="#fff" />
      <rect x="25" y="37" width="74" height="56" rx="1.5" fill="url(#mf-blue)" />
      <path d="M62 43 85 87H39z" fill="url(#mf-white)" stroke="url(#mf-white)" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="62" cy="58" r="3.5" fill={K} />
      <path d="M62 63v11M55 67h14M62 74l-5 9M62 74l5 9" stroke={K} strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="22" y="34" width="80" height="62" rx="3" fill="url(#mf-sheen)" />
      {[34, 90].map((x) => (
        <g key={x}>
          <circle cx={x} cy="22" r="22" fill="url(#mf-glow)" opacity="0.8" />
          <rect x={x - 2.5} y="29" width="5" height="6" fill="url(#mf-pole)" />
          <circle cx={x} cy="22" r="9" fill="url(#mf-housing-dark)" />
          <circle cx={x} cy="22" r="6.8" fill="url(#mf-amber)" />
          <ellipse cx={x - 2} cy="19.5" rx="2.6" ry="1.5" fill="#fff" opacity="0.75" />
        </g>
      ))}
      <path d="M22 14 15 8M104 14l7-6" stroke={Y} strokeWidth="4" strokeLinecap="round" />

      {/* proiettore LED singolo */}
      {groundShadow(170, 28)}
      {post(170, 100)}
      {plate(170, 32)}
      <circle cx="170" cy="64" r="64" fill="url(#mf-glow)" opacity="0.4" />
      <circle cx="174" cy="69" r="40" fill="#000" opacity="0.3" filter="url(#mf-blur)" />
      <circle cx="170" cy="64" r="40" fill="url(#mf-housing-red)" />
      <circle cx="170" cy="64" r="36.5" fill="none" stroke="#000" strokeOpacity="0.28" />
      <circle cx="170" cy="64" r="33" fill="url(#mf-housing-dark)" />
      <circle cx="170" cy="64" r="26" fill="url(#mf-face)" />
      {[[184, 64], [177, 76.1], [163, 76.1], [156, 64], [163, 51.9], [177, 51.9]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="8.5" fill="url(#mf-glow)" />
          <circle cx={x} cy={y} r="4.5" fill="url(#mf-led)" />
        </g>
      ))}
      <circle cx="170" cy="64" r="4.5" fill="url(#mf-led)" />
      <circle cx="170" cy="64" r="26" fill="none" stroke="#fff" strokeOpacity="0.14" />
      <ellipse cx="152" cy="40" rx="15" ry="6.5" transform="rotate(-38 152 40)" fill="#fff" opacity="0.3" />
      <path d="M138 30l-8-8M170 14V2M202 30l8-8" stroke={Y} strokeWidth="5" strokeLinecap="round" />

      {/* display radar */}
      {groundShadow(270, 28)}
      {post(270, 116)}
      {plate(270, 32)}
      <rect x="238" y="30" width="72" height="96" rx="8" fill="#000" opacity="0.3" filter="url(#mf-blur)" />
      <rect x="234" y="24" width="72" height="96" rx="8" fill="url(#mf-housing-dark)" />
      <rect x="238" y="28" width="64" height="88" rx="5.5" fill="#050607" />
      <circle cx="270" cy="64" r="24" fill="none" stroke="#e8213f" strokeWidth="6" filter="url(#mf-text-glow)" />
      <text x="270" y="74" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="30" fill={Y} filter="url(#mf-text-glow)">50</text>
      <text x="270" y="104" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="600" fontSize="12" fill={W} opacity="0.85">km/h</text>
      <rect x="234" y="24" width="72" height="96" rx="8" fill="url(#mf-sheen)" opacity="0.55" />
      {[[242, 32], [298, 32], [242, 112], [298, 112]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill="#8f969e" />
      ))}
    </>
  ),

  cantiere: (
    <>
      {/* cono */}
      {groundShadow(62, 50, 155)}
      <path d="M58 26Q62 18 66 26L94 140H30z" fill="url(#mf-cone)" />
      <path d="M50.1 66Q62 71 73.9 66L77.7 80Q62 86 46.3 80z" fill="url(#mf-band)" />
      <path d="M40.8 100Q62 106.5 83.2 100L86.4 112Q62 118.5 37.6 112z" fill="url(#mf-band)" />
      <path d="M55 36 40 132H48L59 42z" fill="#fff" opacity="0.22" />
      <path d="M69 40 88 136H94L72 40z" fill="#000" opacity="0.14" />
      <rect x="22" y="138" width="80" height="17" rx="4" fill="url(#mf-cone)" />
      <rect x="24" y="138.5" width="76" height="2" rx="1" fill="#fff" opacity="0.3" />
      <rect x="22" y="150" width="80" height="5" rx="2" fill="#000" opacity="0.18" />

      {/* segnale temporaneo di lavori */}
      {groundShadow(170, 28)}
      {post(170, 92)}
      {plate(170, 34)}
      <path d="M170 12 219 96H121z" transform="translate(5 6)" fill="#000" opacity="0.28" filter="url(#mf-blur)" />
      <LavoriSign cx={170} top={12} width={98} gloss />

      {/* lampada lampeggiante da cantiere */}
      {groundShadow(270, 36)}
      {post(270, 92, 12)}
      {plate(270, 62)}
      <circle cx="270" cy="50" r="48" fill="url(#mf-glow)" opacity="0.6" />
      <rect x="246" y="58" width="56" height="40" rx="8" fill="#000" opacity="0.28" filter="url(#mf-blur)" />
      <rect x="242" y="52" width="56" height="40" rx="8" fill="url(#mf-housing-dark)" />
      <rect x="244" y="53" width="52" height="3" rx="1.5" fill="#fff" opacity="0.18" />
      <path d="M244 54a26 22 0 0 1 52 0z" fill="url(#mf-amber)" />
      <path d="M257 54c0-12 4-19 13-20M283 54c0-12-4-19-13-20" stroke="#8a5200" strokeOpacity="0.35" fill="none" />
      <ellipse cx="258" cy="41" rx="8" ry="3.2" transform="rotate(-25 258 41)" fill="#fff" opacity="0.6" />
      <path d="M270 24V10M244 34l-9-9M296 34l9-9" stroke={Y} strokeWidth="5" strokeLinecap="round" />
    </>
  ),

  sostegni: (
    <>
      <rect x="34" y="16" width="16" height="140" rx="4" fill={S} />
      <rect x="34" y="16" width="5" height="140" fill="#B7BDC4" />
      <circle cx="42" cy="60" r="20" fill="none" stroke={S} strokeWidth="8" />

      <circle cx="150" cy="62" r="42" fill={W} stroke={K} strokeWidth="3" />
      <circle cx="150" cy="62" r="31" fill={A} />
      <path d="M127 72c14-18 32-18 46 0" stroke={Y} strokeWidth="6" fill="none" />
      <rect x="143" y="104" width="14" height="52" rx="4" fill={S} />

      <rect x="238" y="30" width="16" height="126" rx="8" fill={W} stroke={K} strokeWidth="2" />
      <rect x="238" y="50" width="16" height="16" fill={R} />
      <rect x="238" y="90" width="16" height="16" fill={R} />
      <path d="M282 156V96a24 24 0 0 1 48 0v60z" fill="#9BA0A6" />
      <rect x="282" y="116" width="48" height="12" fill={Y} />
    </>
  ),
};

export default function MacroFigure({ id, className = '' }) {
  return (
    <svg
      className={`macro-figure ${className}`}
      viewBox="0 0 340 180"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs />
      {scenes[id] || scenes.verticale}
    </svg>
  );
}
