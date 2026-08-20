/* Figure di catalogo disegnate a mano in SVG, una per articolo.
   Le sagome ricalcano le figure del Codice della Strada: restano nitide a
   qualsiasi dimensione e non portano vincoli di licenza. */
const W = '#F2F3EF';
const R = '#C8102E';
const B = '#0B5FA5';
const G = '#0E7A3C';
const Y = '#FFD400';
const K = '#14161A';
const S = '#8A9099';
const A = '#2A2F35';
const O = '#FF6A00';

const pole = (x = 60, top = 74) => (
  <>
    <rect x={x - 3} y={top} width="6" height={104 - top} fill={S} />
    <rect x={x - 14} y="104" width="28" height="5" rx="2" fill={A} />
  </>
);

const figures = {
  /* ---------- segnali ---------- */
  triangolo: (
    <>
      {pole(60, 70)}
      <path d="M60 14 100 76H20z" fill={R} />
      <path d="M60 24 90 71H30z" fill={W} />
      <rect x="56" y="38" width="8" height="17" rx="3" fill={K} />
      <circle cx="60" cy="62" r="4" fill={K} />
    </>
  ),
  disco: (
    <>
      {pole(60, 76)}
      <circle cx="60" cy="46" r="34" fill={R} />
      <circle cx="60" cy="46" r="26" fill={W} />
      <rect x="34" y="40" width="52" height="12" rx="2" fill={R} />
    </>
  ),
  ottagono: (
    <>
      {pole(60, 78)}
      <path d="M46 13h28l20 20v28l-20 20H46L26 61V33z" fill={R} />
      <path d="M46 13h28l20 20v28l-20 20H46L26 61V33z" fill="none" stroke={W} strokeWidth="4" />
      <text x="60" y="54" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="26" fill={W}>STOP</text>
    </>
  ),
  'croce-andrea': (
    <>
      {pole(60, 66)}
      <path d="M22 30 98 62 96 72 20 40z" fill={W} stroke={R} strokeWidth="3" />
      <path d="M20 62 96 30l2 10-76 32z" fill={W} stroke={R} strokeWidth="3" />
    </>
  ),
  distanziometrico: (
    <>
      {pole(60, 82)}
      <rect x="42" y="12" width="36" height="70" fill={W} stroke={K} strokeWidth="2" />
      <path d="M46 26h28l-28 16z" fill={R} />
      <path d="M46 50h28l-28 16z" fill={R} />
    </>
  ),

  /* ---------- targhe ---------- */
  quadrato: (
    <>
      {pole(60, 80)}
      <rect x="22" y="12" width="76" height="68" fill={B} stroke={W} strokeWidth="3" />
      <rect x="34" y="30" width="52" height="8" rx="3" fill={W} />
      <rect x="34" y="46" width="34" height="8" rx="3" fill={W} opacity="0.75" />
    </>
  ),
  targa: (
    <>
      {pole(60, 76)}
      <rect x="12" y="22" width="96" height="54" fill={B} stroke={W} strokeWidth="3" />
      <rect x="22" y="36" width="48" height="7" rx="3" fill={W} />
      <rect x="22" y="52" width="34" height="7" rx="3" fill={W} opacity="0.75" />
      <path d="M80 44h12l-6-6 6 6-6 6" stroke={W} strokeWidth="3" fill="none" />
    </>
  ),
  'targa-non-standard': (
    <>
      <rect x="8" y="16" width="104" height="76" fill={G} stroke={W} strokeWidth="3" />
      <rect x="18" y="30" width="56" height="7" rx="3" fill={W} />
      <rect x="18" y="45" width="42" height="7" rx="3" fill={W} opacity="0.8" />
      <rect x="18" y="60" width="66" height="7" rx="3" fill={W} opacity="0.6" />
      <path d="M8 16h104M8 92h104" stroke={A} strokeWidth="4" />
    </>
  ),
  integrativo: (
    <>
      {pole(60, 88)}
      <circle cx="60" cy="34" r="24" fill={R} />
      <circle cx="60" cy="34" r="17" fill={W} />
      <rect x="26" y="66" width="68" height="22" fill={W} stroke={K} strokeWidth="2" />
      <rect x="34" y="74" width="52" height="6" rx="3" fill={K} />
    </>
  ),
  'passo-carrabile': (
    <>
      <rect x="26" y="16" width="68" height="88" fill={W} stroke={K} strokeWidth="2" />
      <circle cx="60" cy="42" r="18" fill="none" stroke={R} strokeWidth="6" />
      <path d="M46 30 74 54" stroke={R} strokeWidth="6" />
      <rect x="34" y="70" width="52" height="6" rx="3" fill={K} />
      <rect x="34" y="82" width="38" height="5" rx="2" fill={K} opacity="0.6" />
    </>
  ),
  'centro-abitato': (
    <>
      {pole(60, 76)}
      <rect x="10" y="26" width="100" height="50" fill={W} stroke={K} strokeWidth="2" />
      <path d="M24 62v-14l10-8 10 8v14z" fill={A} />
      <path d="M52 62V44l10-8 10 8v18z" fill={A} />
      <path d="M80 62V50l8-6 8 6v12z" fill={A} />
    </>
  ),
  ribaltabile: (
    <>
      <rect x="14" y="40" width="92" height="30" fill={W} stroke={K} strokeWidth="2" />
      <rect x="24" y="50" width="46" height="8" rx="3" fill={K} />
      <path d="M60 70v22" stroke={S} strokeWidth="5" />
      <path d="M46 28c8-10 20-10 28 0" stroke={O} strokeWidth="4" fill="none" markerEnd="" />
      <circle cx="14" cy="55" r="4" fill={S} />
      <circle cx="106" cy="55" r="4" fill={S} />
    </>
  ),

  /* ---------- direzione ---------- */
  'direzione-urbano': (
    <>
      {pole(30, 62)}
      <rect x="24" y="20" width="84" height="20" fill={W} stroke={K} strokeWidth="2" />
      <rect x="24" y="46" width="84" height="20" fill={W} stroke={K} strokeWidth="2" />
      <rect x="34" y="27" width="42" height="6" rx="3" fill={K} />
      <rect x="34" y="53" width="34" height="6" rx="3" fill={K} />
    </>
  ),
  'direzione-industria': (
    <>
      {pole(28, 68)}
      <rect x="22" y="26" width="88" height="42" fill={A} stroke={W} strokeWidth="2" />
      <rect x="32" y="36" width="46" height="7" rx="3" fill={W} />
      <rect x="32" y="50" width="32" height="7" rx="3" fill={W} opacity="0.7" />
      <path d="M86 44h14" stroke={W} strokeWidth="3" />
      <path d="M96 39l5 5-5 5" stroke={W} strokeWidth="3" fill="none" />
    </>
  ),
  freccia: (
    <>
      {pole(50, 70)}
      <path d="M10 28h74l24 20-24 20H10z" fill={G} stroke={W} strokeWidth="3" />
      <rect x="22" y="38" width="40" height="7" rx="3" fill={W} />
      <rect x="22" y="52" width="26" height="7" rx="3" fill={W} opacity="0.75" />
    </>
  ),
  'nome-strada': (
    <>
      <rect x="10" y="34" width="100" height="42" fill={W} stroke={B} strokeWidth="4" />
      <rect x="22" y="46" width="60" height="7" rx="3" fill={B} />
      <rect x="22" y="59" width="38" height="5" rx="2" fill={B} opacity="0.6" />
      <circle cx="96" cy="55" r="7" fill={B} />
    </>
  ),
  civico: (
    <>
      <rect x="34" y="24" width="52" height="62" rx="3" fill={B} stroke={W} strokeWidth="3" />
      <text x="60" y="68" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="42" fill={W}>10</text>
    </>
  ),
  cippo: (
    <>
      {pole(60, 60)}
      <rect x="34" y="18" width="52" height="42" rx="3" fill={W} stroke={K} strokeWidth="2" />
      <rect x="34" y="18" width="52" height="13" rx="3" fill={B} />
      <text x="60" y="52" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="20" fill={K}>24</text>
    </>
  ),
  identificazione: (
    <>
      {pole(60, 66)}
      <rect x="30" y="16" width="60" height="50" rx="4" fill={B} stroke={W} strokeWidth="3" />
      <text x="60" y="50" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="24" fill={W}>SS1</text>
    </>
  ),

  /* ---------- tracciamento ---------- */
  mezzeria: (
    <>
      <rect x="10" y="16" width="100" height="88" fill={A} />
      <rect x="16" y="16" width="6" height="88" fill={W} />
      <rect x="98" y="16" width="6" height="88" fill={W} />
      <rect x="57" y="22" width="6" height="18" fill={W} />
      <rect x="57" y="50" width="6" height="18" fill={W} />
      <rect x="57" y="78" width="6" height="18" fill={W} />
    </>
  ),
  iscrizioni: (
    <>
      <rect x="10" y="16" width="100" height="88" fill={A} />
      <path d="M60 26l16 20h-10v22h-12V46H44z" fill={W} />
      <rect x="30" y="80" width="60" height="7" rx="1" fill={W} />
      <rect x="30" y="92" width="42" height="7" rx="1" fill={W} opacity="0.7" />
    </>
  ),
  attraversamenti: (
    <>
      <rect x="10" y="16" width="100" height="88" fill={A} />
      <rect x="18" y="26" width="13" height="68" fill={W} />
      <rect x="38" y="26" width="13" height="68" fill={R} />
      <rect x="58" y="26" width="13" height="68" fill={W} />
      <rect x="78" y="26" width="13" height="68" fill={Y} />
    </>
  ),
  zebrature: (
    <>
      <rect x="10" y="16" width="100" height="88" fill={A} />
      <path d="M60 20 96 96H24z" fill="none" stroke={W} strokeWidth="5" />
      <path d="M52 52h16M46 68h28M40 84h40" stroke={W} strokeWidth="6" />
    </>
  ),
  stalli: (
    <>
      <rect x="10" y="16" width="100" height="88" fill={A} />
      <path d="M22 26v68M52 26v68M82 26v68M108 26v68" stroke={W} strokeWidth="5" />
      <path d="M22 26h86" stroke={W} strokeWidth="5" />
      <circle cx="67" cy="66" r="11" fill="none" stroke={B} strokeWidth="5" />
      <path d="M67 58v16" stroke={B} strokeWidth="5" />
    </>
  ),
  industriale: (
    <>
      <rect x="10" y="16" width="100" height="88" fill="#C9CAC4" />
      <rect x="10" y="16" width="100" height="10" fill={A} opacity="0.35" />
      <path d="M20 40h80M20 60h80M20 80h80" stroke={Y} strokeWidth="7" />
      <path d="M20 40h80" stroke={Y} strokeWidth="7" />
      <rect x="20" y="90" width="80" height="6" fill={W} />
    </>
  ),

  /* ---------- vernici e pellicole ---------- */
  vernice: (
    <>
      <rect x="34" y="30" width="52" height="52" rx="4" fill={Y} />
      <rect x="46" y="22" width="28" height="10" rx="4" fill="#E8B800" />
      <path d="M34 46h52" stroke="#E8B800" strokeWidth="3" />
      <path d="M60 82v14" stroke={W} strokeWidth="6" />
      <rect x="22" y="96" width="76" height="8" rx="2" fill={A} />
      <rect x="34" y="98" width="20" height="4" fill={W} />
      <rect x="66" y="98" width="20" height="4" fill={W} />
    </>
  ),
  'pellicola-neutra': (
    <>
      <rect x="18" y="34" width="84" height="52" rx="3" fill={A} />
      <rect x="26" y="42" width="68" height="36" fill={Y} />
      <path d="M26 78 94 42" stroke={W} strokeWidth="3" opacity="0.9" />
      <path d="M26 62 62 42" stroke={W} strokeWidth="3" opacity="0.6" />
      <circle cx="18" cy="60" r="8" fill={S} />
      <circle cx="102" cy="60" r="8" fill={S} />
    </>
  ),
  'pellicola-digitale': (
    <>
      <rect x="18" y="34" width="84" height="52" rx="3" fill={W} stroke={K} strokeWidth="2" />
      <rect x="26" y="42" width="30" height="36" fill={R} />
      <rect x="58" y="42" width="16" height="36" fill={G} />
      <rect x="76" y="42" width="18" height="36" fill={B} />
      <circle cx="18" cy="60" r="8" fill={S} />
      <circle cx="102" cy="60" r="8" fill={S} />
    </>
  ),
  adesivi: (
    <>
      <rect x="20" y="42" width="80" height="34" rx="2" fill={W} stroke={K} strokeWidth="2" />
      <path d="M28 42h12L28 76h-8z" fill={R} />
      <path d="M52 42h12L52 76H40z" fill={R} />
      <path d="M76 42h12L76 76H64z" fill={R} />
      <path d="M96 30l10 10-10 4z" fill={S} />
    </>
  ),

  /* ---------- delineatori ---------- */
  'delineatore-margine': (
    <>
      <rect x="46" y="20" width="28" height="84" rx="4" fill={W} stroke={K} strokeWidth="2" />
      <rect x="52" y="34" width="16" height="10" rx="2" fill={R} />
      <rect x="52" y="58" width="16" height="10" rx="2" fill={R} />
      <rect x="52" y="82" width="16" height="10" rx="2" fill={R} />
    </>
  ),
  'delineatore-galleria': (
    <>
      <path d="M20 100V56a40 40 0 0 1 80 0v44z" fill={A} />
      <rect x="30" y="66" width="14" height="30" rx="3" fill={W} />
      <rect x="76" y="66" width="14" height="30" rx="3" fill={W} />
      <circle cx="37" cy="76" r="4" fill={Y} />
      <circle cx="83" cy="76" r="4" fill={R} />
    </>
  ),
  'delineatore-curva': (
    <>
      <rect x="18" y="34" width="84" height="46" rx="3" fill={W} stroke={K} strokeWidth="2" />
      <path d="M26 34h16L26 80h-8z" fill={K} />
      <path d="M56 34h16L56 80H40z" fill={K} />
      <path d="M86 34h16L86 80H70z" fill={K} />
      <rect x="56" y="80" width="8" height="24" fill={S} />
    </>
  ),
  'delineatore-tornante': (
    <>
      {pole(60, 74)}
      <rect x="16" y="24" width="88" height="50" fill={W} stroke={K} strokeWidth="2" />
      <path d="M28 62c14-30 46-30 62 0" stroke={K} strokeWidth="6" fill="none" />
      <path d="M84 44l8 4-4 8" stroke={K} strokeWidth="5" fill="none" />
    </>
  ),
  ostacolo: (
    <>
      {pole(60, 80)}
      <rect x="20" y="22" width="80" height="58" fill={W} stroke={K} strokeWidth="2" />
      <path d="M30 22h16L30 80h-10z" fill={K} />
      <path d="M62 22h16L62 80H46z" fill={K} />
      <path d="M94 22h6L94 80H78z" fill={K} />
    </>
  ),
  'delineatore-montagna': (
    <>
      <path d="M14 100 46 40l18 30 14-22 34 52z" fill={A} />
      <rect x="52" y="46" width="16" height="54" rx="3" fill={W} />
      <rect x="52" y="46" width="16" height="12" rx="3" fill={R} />
      <circle cx="60" cy="70" r="4" fill={Y} />
    </>
  ),
  catadiottri: (
    <>
      <path d="M10 46h100v12H10z" fill={S} />
      <path d="M10 66h100v12H10z" fill={S} />
      <rect x="30" y="40" width="18" height="14" rx="2" fill={W} />
      <rect x="30" y="40" width="9" height="14" rx="2" fill={R} />
      <rect x="74" y="40" width="18" height="14" rx="2" fill={W} />
      <rect x="74" y="40" width="9" height="14" rx="2" fill={R} />
      <rect x="24" y="78" width="8" height="26" fill={A} />
      <rect x="88" y="78" width="8" height="26" fill={A} />
    </>
  ),
  defleco: (
    <>
      <rect x="52" y="24" width="16" height="66" rx="8" fill={O} />
      <rect x="52" y="40" width="16" height="10" fill={W} />
      <rect x="52" y="62" width="16" height="10" fill={W} />
      <ellipse cx="60" cy="94" rx="26" ry="8" fill={A} />
    </>
  ),

  /* ---------- barriere ---------- */
  'barriera-normale': (
    <>
      <rect x="10" y="38" width="100" height="24" fill={W} stroke={K} strokeWidth="2" />
      <path d="M22 38h14L22 62h-12z" fill={R} />
      <path d="M52 38h14L52 62H38z" fill={R} />
      <path d="M82 38h14L82 62H68z" fill={R} />
      <path d="M106 38h4L106 62H94z" fill={R} />
      <rect x="26" y="62" width="8" height="34" fill={S} />
      <rect x="86" y="62" width="8" height="34" fill={S} />
      <rect x="16" y="96" width="28" height="6" rx="2" fill={A} />
      <rect x="76" y="96" width="28" height="6" rx="2" fill={A} />
    </>
  ),
  'barriera-direzionale': (
    <>
      <rect x="8" y="34" width="104" height="34" fill={W} stroke={K} strokeWidth="2" />
      <path d="M20 34h16L20 68H6z" fill={R} />
      <path d="M52 34h16L52 68H36z" fill={R} />
      <path d="M84 34h16L84 68H68z" fill={R} />
      <path d="M40 84h34m0 0-8-8m8 8-8 8" stroke={K} strokeWidth="4" fill="none" />
      <rect x="18" y="68" width="7" height="20" fill={S} />
      <rect x="95" y="68" width="7" height="20" fill={S} />
    </>
  ),
  'new-jersey': (
    <>
      <path d="M18 100V62l10-20V26h64v16l10 20v38z" fill={W} stroke={K} strokeWidth="2" />
      <rect x="28" y="34" width="64" height="12" fill={R} />
      <rect x="22" y="72" width="76" height="12" fill={R} />
    </>
  ),
  transenne: (
    <>
      <rect x="14" y="34" width="92" height="16" fill={W} stroke={K} strokeWidth="2" />
      <path d="M26 34h12L26 50h-10z" fill={R} />
      <path d="M56 34h12L56 50H44z" fill={R} />
      <path d="M86 34h12L86 50H74z" fill={R} />
      <path d="M22 50v46M98 50v46M22 96h20M78 96h20" stroke={S} strokeWidth="5" fill="none" />
      <path d="M22 68h76" stroke={S} strokeWidth="4" />
    </>
  ),
  chiusino: (
    <>
      <circle cx="60" cy="72" r="20" fill={A} />
      <rect x="20" y="30" width="80" height="10" fill={W} stroke={K} strokeWidth="2" />
      <path d="M30 30h10L30 40h-8z" fill={R} />
      <path d="M56 30h10L56 40H46z" fill={R} />
      <path d="M82 30h10L82 40H72z" fill={R} />
      <path d="M24 40v52M96 40v52" stroke={S} strokeWidth="5" />
    </>
  ),

  /* ---------- cantiere ---------- */
  coni: (
    <>
      <path d="M60 16 88 92H32z" fill={O} />
      <path d="M50 48h20l4 12H46z" fill={W} />
      <rect x="20" y="92" width="80" height="10" rx="3" fill={O} />
    </>
  ),
  lampeggianti: (
    <>
      <rect x="40" y="44" width="40" height="26" rx="6" fill={A} />
      <ellipse cx="60" cy="42" rx="20" ry="12" fill={Y} />
      <path d="M60 18v10M34 26l7 7M86 26l-7 7" stroke={Y} strokeWidth="4" />
      <rect x="52" y="70" width="16" height="26" fill={S} />
      <rect x="38" y="96" width="44" height="6" rx="2" fill={A} />
    </>
  ),
  semaforico: (
    <>
      <rect x="42" y="12" width="36" height="76" rx="6" fill={A} />
      <circle cx="60" cy="30" r="9" fill={R} />
      <circle cx="60" cy="50" r="9" fill={Y} opacity="0.35" />
      <circle cx="60" cy="70" r="9" fill={G} opacity="0.35" />
      <rect x="56" y="88" width="8" height="14" fill={S} />
      <rect x="40" y="102" width="40" height="6" rx="2" fill={A} />
    </>
  ),
  cavalletti: (
    <>
      <path d="M60 12 86 62H34z" fill={R} />
      <path d="M60 24 76 57H44z" fill={W} />
      <path d="M46 62 34 104M74 62l12 42" stroke={S} strokeWidth="6" />
      <path d="M40 88h40" stroke={S} strokeWidth="5" />
    </>
  ),
  basi: (
    <>
      <ellipse cx="60" cy="84" rx="42" ry="14" fill={A} />
      <ellipse cx="60" cy="78" rx="42" ry="14" fill={K} />
      <rect x="54" y="20" width="12" height="58" rx="2" fill={S} />
      <rect x="46" y="70" width="28" height="8" rx="3" fill={S} />
    </>
  ),
  palette: (
    <>
      <circle cx="60" cy="42" r="28" fill={R} />
      <path d="M32 42a28 28 0 0 1 56 0z" fill={G} />
      <rect x="55" y="70" width="10" height="36" rx="4" fill={A} />
    </>
  ),
  'carichi-sporgenti': (
    <>
      <rect x="20" y="26" width="80" height="80" fill={W} stroke={K} strokeWidth="2" />
      <path d="M20 26 100 106M100 26 20 106" stroke={R} strokeWidth="10" />
    </>
  ),
  'veicoli-operativi': (
    <>
      {pole(60, 78)}
      <rect x="18" y="18" width="84" height="60" rx="4" fill={B} stroke={W} strokeWidth="3" />
      <path d="M38 48h44m0 0-12-12m12 12-12 12" stroke={W} strokeWidth="6" fill="none" />
    </>
  ),

  /* ---------- sostegni ---------- */
  pali: (
    <>
      <rect x="34" y="12" width="12" height="92" rx="3" fill={S} />
      <rect x="34" y="12" width="4" height="92" fill="#B7BDC4" />
      <rect x="70" y="12" width="16" height="92" rx="4" fill={S} />
      <rect x="70" y="12" width="5" height="92" fill="#B7BDC4" />
      <rect x="24" y="104" width="72" height="6" rx="2" fill={A} />
    </>
  ),
  mensole: (
    <>
      <rect x="18" y="12" width="10" height="92" fill={A} />
      <rect x="28" y="34" width="58" height="10" rx="3" fill={S} />
      <path d="M28 44 60 34" stroke={S} strokeWidth="5" />
      <rect x="80" y="26" width="12" height="26" rx="4" fill={S} />
    </>
  ),
  staffe: (
    <>
      <circle cx="60" cy="60" r="18" fill="none" stroke={S} strokeWidth="8" />
      <rect x="30" y="52" width="20" height="16" rx="2" fill={S} />
      <rect x="70" y="52" width="20" height="16" rx="2" fill={S} />
      <circle cx="36" cy="60" r="4" fill={K} />
      <circle cx="84" cy="60" r="4" fill={K} />
    </>
  ),
  bandit: (
    <>
      <circle cx="60" cy="60" r="26" fill="none" stroke={S} strokeWidth="7" strokeDasharray="7 5" />
      <rect x="48" y="26" width="24" height="14" rx="3" fill={K} />
      <path d="M28 96h64" stroke={S} strokeWidth="6" strokeDasharray="8 6" />
    </>
  ),

  /* ---------- arredo urbano ---------- */
  parapedonali: (
    <>
      <rect x="26" y="20" width="14" height="84" rx="7" fill={W} stroke={K} strokeWidth="2" />
      <rect x="26" y="34" width="14" height="12" fill={R} />
      <rect x="26" y="64" width="14" height="12" fill={R} />
      <rect x="80" y="20" width="14" height="84" rx="7" fill={W} stroke={K} strokeWidth="2" />
      <rect x="80" y="34" width="14" height="12" fill={R} />
      <rect x="80" y="64" width="14" height="12" fill={R} />
    </>
  ),
  dissuasori: (
    <>
      <path d="M34 100V44a26 26 0 0 1 52 0v56z" fill="#9BA0A6" />
      <rect x="34" y="60" width="52" height="12" fill={Y} />
      <ellipse cx="60" cy="100" rx="30" ry="8" fill={A} />
    </>
  ),
  specchi: (
    <>
      <circle cx="60" cy="46" r="32" fill={W} stroke={K} strokeWidth="3" />
      <circle cx="60" cy="46" r="24" fill={A} />
      <path d="M42 54c10-14 26-14 36 0" stroke={Y} strokeWidth="5" fill="none" />
      <rect x="54" y="78" width="12" height="26" rx="3" fill={S} />
      <rect x="40" y="104" width="40" height="6" rx="2" fill={A} />
    </>
  ),
};

export default function ProductFigure({ id, className = '' }) {
  const art = figures[id];
  return (
    <svg
      className={`product-figure ${className}`}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      {art || figures.triangolo}
    </svg>
  );
}

export const hasFigure = (id) => Boolean(figures[id]);
