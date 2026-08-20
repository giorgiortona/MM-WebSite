/* Composizioni per le cinque macro aree: raccontano il contenuto dell'area
   meglio di una fotografia generica, e restano coerenti fra loro. */
const W = '#F2F3EF';
const R = '#C8102E';
const B = '#0B5FA5';
const G = '#0E7A3C';
const Y = '#FFD400';
const K = '#14161A';
const S = '#8A9099';
const A = '#2A2F35';
const O = '#FF6A00';

const scenes = {
  verticale: (
    <>
      <rect x="60" y="72" width="7" height="86" fill={S} />
      <path d="M63.5 20 96 78H31z" fill={R} />
      <path d="M63.5 32 87 73H40z" fill={W} />
      <rect x="59" y="44" width="9" height="16" rx="3" fill={K} />
      <circle cx="63.5" cy="66" r="4" fill={K} />

      <rect x="158" y="86" width="7" height="72" fill={S} />
      <circle cx="161.5" cy="56" r="34" fill={R} />
      <circle cx="161.5" cy="56" r="25" fill={W} />
      <rect x="135" y="49" width="53" height="13" rx="2" fill={R} />

      <rect x="256" y="96" width="7" height="62" fill={S} />
      <rect x="206" y="34" width="108" height="62" rx="3" fill={B} stroke={W} strokeWidth="3" />
      <rect x="220" y="52" width="58" height="9" rx="4" fill={W} />
      <rect x="220" y="70" width="38" height="9" rx="4" fill={W} opacity="0.75" />
    </>
  ),

  orizzontale: (
    <>
      <path d="M0 178 96 34h128l96 144z" fill={A} />
      <path d="M104 34 40 178h16L112 34z" fill={W} />
      <path d="M216 34l64 144h-16L208 34z" fill={W} />
      <rect x="155" y="150" width="12" height="26" fill={W} />
      <rect x="157" y="112" width="9" height="20" fill={W} />
      <rect x="158" y="84" width="7" height="15" fill={W} />
      <rect x="159" y="62" width="5" height="11" fill={W} />
      <path d="M161 34l14 18h-9v16h-10V52h-9z" fill={W} />
      <rect x="248" y="140" width="46" height="9" fill={Y} />
      <rect x="248" y="158" width="46" height="9" fill={Y} />
    </>
  ),

  sicurezza: (
    <>
      <rect x="18" y="72" width="128" height="26" fill={W} stroke={K} strokeWidth="2" />
      <path d="M34 72h18L34 98H16z" fill={R} />
      <path d="M74 72h18L74 98H56z" fill={R} />
      <path d="M114 72h18l-18 26H96z" fill={R} />
      <rect x="40" y="98" width="9" height="42" fill={S} />
      <rect x="116" y="98" width="9" height="42" fill={S} />
      <rect x="26" y="140" width="36" height="8" rx="3" fill={A} />
      <rect x="104" y="140" width="36" height="8" rx="3" fill={A} />

      <path d="M184 150V96l12-24V50h74v22l12 24v54z" fill={W} stroke={K} strokeWidth="2" />
      <rect x="196" y="58" width="74" height="14" fill={R} />
      <rect x="188" y="112" width="90" height="14" fill={R} />
    </>
  ),

  cantiere: (
    <>
      <path d="M56 24 96 140H16z" fill={O} />
      <path d="M42 70h28l6 18H36z" fill={W} />
      <rect x="4" y="140" width="104" height="14" rx="4" fill={O} />

      <rect x="150" y="30" width="46" height="96" rx="8" fill={A} />
      <circle cx="173" cy="54" r="12" fill={R} />
      <circle cx="173" cy="78" r="12" fill={Y} opacity="0.3" />
      <circle cx="173" cy="102" r="12" fill={G} opacity="0.3" />
      <rect x="168" y="126" width="10" height="20" fill={S} />

      <ellipse cx="266" cy="52" rx="26" ry="15" fill={Y} />
      <rect x="240" y="54" width="52" height="32" rx="7" fill={A} />
      <rect x="260" y="86" width="12" height="46" fill={S} />
      <rect x="238" y="132" width="56" height="9" rx="3" fill={A} />
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
      {scenes[id] || scenes.verticale}
    </svg>
  );
}
