/* Illustrazioni originali, una per ogni prodotto della segnaletica luminosa.
   Disegnate in SVG con la stessa palette e lo stesso linguaggio grafico delle
   figure di catalogo: nessuna fotografia, nessuna immagine di terzi. */
import LavoriSign from './LavoriSign';

const W = '#F2F3EF';
const R = '#C8102E';
const B = '#0B5FA5';
const G = '#0E7A3C';
const Y = '#FFD400';
const K = '#14161A';
const S = '#8A9099';
const A = '#2A2F35';
const O = '#FF6A00';
const L = '#B7BDC4';

/* ---------- elementi ricorrenti ---------- */
const pole = (x = 60, top = 74) => (
  <>
    <rect x={x - 3} y={top} width="6" height={104 - top} fill={S} />
    <rect x={x - 14} y="104" width="28" height="5" rx="2" fill={A} />
  </>
);

const rays = (cx, cy, r1, r2, angles = [-135, -90, -45], color = Y, width = 4) => (
  <path
    d={angles
      .map((a) => {
        const t = (a * Math.PI) / 180;
        const p = (r) => `${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`;
        return `M${p(r1)}L${p(r2)}`;
      })
      .join('')}
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
    fill="none"
  />
);

const lamp = (cx, cy, r, { ring = R, n = 6, dim = false } = {}) => {
  const dot = r * 0.12;
  const orbit = r * 0.42;
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={ring} />
      <circle cx={cx} cy={cy} r={r * 0.82} fill={A} />
      <circle cx={cx} cy={cy} r={r * 0.66} fill={K} />
      {Array.from({ length: n }, (_, i) => {
        const t = (i / n) * 2 * Math.PI;
        return (
          <circle
            key={i}
            cx={cx + orbit * Math.cos(t)}
            cy={cy + orbit * Math.sin(t)}
            r={dot}
            fill={Y}
            opacity={dim ? 0.3 : 1}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={dot} fill={dim ? Y : W} opacity={dim ? 0.3 : 1} />
    </>
  );
};

/* lampada ambra da cantiere: corpo scuro con calotta */
const dlamp = (cx, y, w = 36, h = 28, dome = Y) => (
  <>
    <rect x={cx - w / 2} y={y} width={w} height={h} rx="7" fill={A} />
    <path d={`M${cx - w / 2 + 3} ${y + 2}a${(w - 6) / 2} ${w * 0.38} 0 0 1 ${w - 6} 0z`} fill={dome} />
  </>
);

const solar = (x, y, w, h) => {
  const dx = w * 0.18;
  const top = (k) => x + dx + ((w - dx) * k) / 3;
  const bottom = (k) => x + ((w - dx) * k) / 3;
  return (
    <>
      <path d={`M${x} ${y + h}L${x + dx} ${y}H${x + w}L${x + w - dx} ${y + h}z`} fill={B} stroke={W} strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d={`M${top(1)} ${y}L${bottom(1)} ${y + h}M${top(2)} ${y}L${bottom(2)} ${y + h}M${x + dx / 2} ${y + h / 2}H${x + w - dx / 2}`}
        stroke={W}
        strokeWidth="1.2"
        fill="none"
      />
    </>
  );
};

const bolt = (x, y, s = 1) => (
  <path d={`M${x + 8 * s} ${y}L${x} ${y + 12 * s}h${6 * s}l${-2 * s} ${9 * s} ${9 * s} ${-13 * s}h${-6 * s}z`} fill={Y} />
);

const battery = (x, y, w, h) => (
  <>
    <rect x={x + w * 0.2} y={y - 4} width={w * 0.18} height="5" rx="1" fill={S} />
    <rect x={x + w * 0.62} y={y - 4} width={w * 0.18} height="5" rx="1" fill={S} />
    <rect x={x} y={y} width={w} height={h} rx="4" fill={A} />
    {bolt(x + w / 2 - 4.5, y + h / 2 - 10, 0.95)}
  </>
);

const road = (top = 70) => (
  <>
    <rect x="6" y={top} width="108" height={104 - top} rx="3" fill={A} />
    <rect x="14" y={top + 20} width="20" height="5" fill={W} />
    <rect x="50" y={top + 20} width="20" height="5" fill={W} />
    <rect x="86" y={top + 20} width="20" height="5" fill={W} />
  </>
);

const dome = (cx, base, rx, ry, color) => <path d={`M${cx - rx} ${base}a${rx} ${ry} 0 0 1 ${rx * 2} 0z`} fill={color} />;

const display = (x, y, w, h) => <rect x={x} y={y} width={w} height={h} rx="7" fill={K} />;

const numeral = (x, y, size, text, fill = Y) => (
  <text x={x} y={y} textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize={size} fill={fill}>
    {text}
  </text>
);

const cornerDots = (x, y, w, h, i = 8) => (
  <>
    <circle cx={x + i} cy={y + i} r="2.4" fill={Y} />
    <circle cx={x + w - i} cy={y + i} r="2.4" fill={Y} />
    <circle cx={x + i} cy={y + h - i} r="2.4" fill={Y} />
    <circle cx={x + w - i} cy={y + h - i} r="2.4" fill={Y} />
  </>
);

const pedestrian = (cx, cy) => (
  <>
    <circle cx={cx} cy={cy - 6} r="3.2" fill={K} />
    <path
      d={`M${cx} ${cy - 1}v10M${cx - 6} ${cy + 3}h12M${cx} ${cy + 9}l-5 8M${cx} ${cy + 9}l5 8`}
      stroke={K}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </>
);

const lightBar = (x, y, w, h, color = Y) => {
  const n = Math.max(2, Math.floor((w - 8) / 18));
  const seg = (w - 8 - (n - 1) * 3) / n;
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={K} />
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x + 4 + i * (seg + 3)} y={y + 3} width={seg} height={h - 6} rx={(h - 6) / 2} fill={color} />
      ))}
    </>
  );
};

const trafficLight = (x, lit) => (
  <>
    {pole(x, 72)}
    <rect x={x - 13} y="14" width="26" height="58" rx="7" fill={K} />
    <circle cx={x} cy="29" r="6.5" fill={R} opacity={lit === 'r' ? 1 : 0.3} />
    <circle cx={x} cy="43" r="6.5" fill={Y} opacity={0.3} />
    <circle cx={x} cy="57" r="6.5" fill={G} opacity={lit === 'g' ? 1 : 0.3} />
  </>
);

/* segnale di intersezione con due lampeggianti su staffa: base del Safety Cross */
const crossSign = () => (
  <>
    {pole(60, 88)}
    <rect x="58" y="32" width="4" height="8" fill={S} />
    <rect x="22" y="28" width="76" height="4" rx="2" fill={S} />
    {[28, 92].map((x) => (
      <g key={x}>
        <circle cx={x} cy="20" r="9" fill={A} />
        <circle cx={x} cy="20" r="6" fill={Y} />
      </g>
    ))}
    {rays(28, 20, 13, 19, [-165, -125])}
    {rays(92, 20, 13, 19, [-55, -15])}
    <path d="M60 38 98 92H22z" fill={R} />
    <path d="M60 51 85 86H35z" fill={W} />
    <rect x="57.5" y="57" width="5" height="26" fill={K} />
    <rect x="48" y="67" width="24" height="5" fill={K} />
  </>
);

/* ---------- una figura per ogni prodotto ---------- */
const figures = {
  /* Proiettori LED */
  'serie-proiettori-led::BASIC 100/101 e BASIC 102': (
    <>
      {pole(60, 76)}
      {lamp(60, 50, 24, { ring: O, n: 3 })}
      {rays(60, 50, 30, 40)}
    </>
  ),
  'serie-proiettori-led::BASIC 200': (
    <>
      {pole(60, 82)}
      {lamp(60, 50, 30)}
      {rays(60, 50, 36, 46)}
    </>
  ),
  'serie-proiettori-led::BASIC 201': (
    <>
      {pole(60, 82)}
      {lamp(60, 52, 29)}
      <path d="M24 50a36 36 0 0 1 72 0h-8a28 28 0 0 0-56 0z" fill={K} />
      <path d="M60 10V2" stroke={Y} strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  'serie-proiettori-led::BASIC 206': (
    <>
      <rect x="88" y="14" width="12" height="82" rx="2" fill={A} />
      <rect x="62" y="48" width="28" height="7" fill={S} />
      {lamp(48, 52, 28, { ring: R, n: 5 })}
      {rays(48, 52, 34, 44, [-135, -90, -45, 180])}
    </>
  ),
  'serie-proiettori-led::BASIC 302/303': (
    <>
      {pole(60, 88)}
      {lamp(60, 50, 38)}
      <circle cx="60" cy="50" r="12" fill="none" stroke={Y} strokeWidth="2.5" opacity="0.7" />
    </>
  ),
  'serie-proiettori-led::Impianto doppio BASIC 201/206': (
    <>
      {pole(60, 76)}
      <rect x="12" y="70" width="96" height="6" rx="2" fill={S} />
      {lamp(34, 46, 22)}
      {lamp(86, 46, 22, { dim: true })}
      {rays(34, 46, 27, 36, [-135, -90, -45])}
    </>
  ),

  /* Impianti e alimentazione */
  'serie-impianti-alimentazione::Sequenza BASIC 200': (
    <>
      <rect x="6" y="94" width="108" height="6" rx="2" fill={A} />
      {[22, 60, 98].map((x) => (
        <rect key={x} x={x - 2.5} y="66" width="5" height="28" fill={S} />
      ))}
      {lamp(22, 52, 15, { ring: O, n: 3, dim: true })}
      {lamp(60, 52, 15, { ring: O, n: 3 })}
      {lamp(98, 52, 15, { ring: O, n: 3 })}
      {rays(98, 52, 20, 29)}
      <path d="M34 30h14M72 30h14" stroke={Y} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
    </>
  ),
  'serie-impianti-alimentazione::D-Solar Radio': (
    <>
      {pole(52, 84)}
      {solar(26, 12, 52, 22)}
      {lamp(52, 60, 22, { ring: O, n: 3 })}
      <path d="M86 50a12 12 0 0 1 0 22M94 44a20 20 0 0 1 0 34M102 38a28 28 0 0 1 0 46" stroke={B} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </>
  ),
  'serie-impianti-alimentazione::Kit fotovoltaici': (
    <>
      {solar(10, 14, 64, 38)}
      <rect x="88" y="34" width="22" height="36" rx="4" fill={A} />
      <circle cx="99" cy="44" r="3" fill={Y} />
      <circle cx="99" cy="54" r="3" fill={G} />
      <rect x="92" y="62" width="14" height="3" fill={S} />
      {battery(38, 72, 40, 26)}
      <path d="M42 52v20M99 70v8H78" stroke={K} strokeWidth="3" fill="none" strokeLinejoin="round" />
    </>
  ),
  'serie-impianti-alimentazione::Kit alimentatore/batteria': (
    <>
      <rect x="10" y="34" width="46" height="54" rx="5" fill={A} />
      <rect x="17" y="42" width="32" height="16" rx="2" fill={K} />
      <rect x="20" y="46" width="14" height="8" fill={G} />
      <circle cx="42" cy="50" r="3" fill={Y} />
      <rect x="18" y="68" width="30" height="5" rx="2" fill={S} />
      <path d="M56 66h12" stroke={K} strokeWidth="4" strokeLinecap="round" />
      {battery(70, 52, 40, 40)}
    </>
  ),

  /* Marker stradali */
  'serie-marker-stradali::Solartop 24': (
    <>
      {road(72)}
      <rect x="34" y="68" width="52" height="6" rx="2" fill={L} />
      {dome(60, 68, 24, 18, S)}
      <path d="M44 56l6-8h20l6 8z" fill={B} stroke={W} strokeWidth="1.5" strokeLinejoin="round" />
      {rays(60, 60, 34, 44, [-150, -90, -30])}
    </>
  ),
  'serie-marker-stradali::Solarground': (
    <>
      {road(66)}
      <ellipse cx="60" cy="70" rx="46" ry="14" fill={Y} opacity="0.25" />
      <ellipse cx="60" cy="68" rx="30" ry="9" fill={L} />
      <ellipse cx="60" cy="67" rx="21" ry="6" fill={B} />
      <path d="M60 61v12M44 67h32" stroke={W} strokeWidth="1.2" />
      {rays(60, 62, 30, 40, [-150, -90, -30])}
    </>
  ),
  'serie-marker-stradali::Glasstop e Miniglasstop': (
    <>
      {road(72)}
      <rect x="20" y="68" width="44" height="6" rx="2" fill={L} />
      {dome(42, 68, 18, 16, Y)}
      <path d="M32 62a10 8 0 0 1 8-6" stroke={W} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="76" y="70" width="26" height="5" rx="2" fill={L} />
      {dome(89, 70, 10, 9, Y)}
      {rays(42, 60, 24, 33, [-135, -90, -45])}
      {rays(89, 64, 15, 21, [-135, -90, -45], Y, 3)}
    </>
  ),
  'serie-marker-stradali::Powerground 2': (
    <>
      {road(66)}
      <rect x="32" y="62" width="56" height="9" rx="2" fill={S} />
      <rect x="37" y="64.5" width="46" height="4" rx="1" fill={Y} />
      <path d="M88 67h8l14 18" stroke={K} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M60 52V40M36 54l-8-8M84 54l8-8" stroke={Y} strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  'serie-marker-stradali::RGR': (
    <>
      {road(72)}
      <rect x="38" y="68" width="44" height="6" rx="2" fill={L} />
      {dome(60, 68, 22, 16, W)}
      <ellipse cx="60" cy="60" rx="9" ry="5.5" fill={R} />
      <path d="M52 56l4-3" stroke={W} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  'serie-marker-stradali::Side 25': (
    <>
      <rect x="8" y="26" width="104" height="72" rx="3" fill={A} />
      <rect x="8" y="26" width="104" height="8" fill={S} />
      <ellipse cx="60" cy="60" rx="46" ry="16" fill={Y} opacity="0.22" />
      <rect x="24" y="52" width="72" height="16" rx="8" fill={K} />
      <rect x="31" y="57" width="58" height="6" rx="3" fill={Y} />
    </>
  ),
  'serie-marker-stradali::Kronos': (
    <>
      {road(66)}
      <ellipse cx="60" cy="72" rx="36" ry="13" fill={S} />
      <ellipse cx="60" cy="70" rx="27" ry="9" fill={A} />
      <ellipse cx="60" cy="69" rx="14" ry="5" fill={Y} />
      {rays(60, 64, 34, 44, [-150, -90, -30])}
    </>
  ),
  'serie-marker-stradali::Kit punti pericolosi': (
    <>
      <path d="M22 110Q40 60 100 30" stroke={A} strokeWidth="38" fill="none" />
      <path d="M22 110Q40 60 100 30" stroke={W} strokeWidth="2" strokeDasharray="8 7" fill="none" />
      {[[33.6, 85.1], [50.5, 64.5], [72.6, 46.2]].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="9" fill={Y} opacity="0.3" />
          <circle cx={x} cy={y} r="4.5" fill={Y} />
        </g>
      ))}
    </>
  ),
  'serie-marker-stradali::TH200': (
    <>
      <ellipse cx="60" cy="104" rx="22" ry="6" fill={A} />
      <rect x="52" y="30" width="16" height="74" rx="4" fill={W} stroke={K} strokeWidth="2" />
      <rect x="52" y="52" width="16" height="12" fill={R} />
      <rect x="52" y="76" width="16" height="12" fill={R} />
      <circle cx="60" cy="24" r="8" fill={Y} />
      {rays(60, 24, 13, 21, [-150, -90, -30])}
    </>
  ),

  /* Dissuasori di velocità e radar */
  'serie-dissuasori-radar::Indicator Flat': (
    <>
      {pole(60, 76)}
      {display(14, 22, 92, 54)}
      {numeral(60, 62, 40, '42')}
      {cornerDots(14, 22, 92, 54)}
    </>
  ),
  'serie-dissuasori-radar::Indicator XL / XL Flat': (
    <>
      {pole(60, 84)}
      {display(8, 8, 104, 76)}
      <circle cx="60" cy="46" r="29" fill="none" stroke={R} strokeWidth="6" />
      {numeral(60, 59, 40, '50')}
      {cornerDots(8, 8, 104, 76, 9)}
    </>
  ),
  'serie-dissuasori-radar::Indicator Text': (
    <>
      {pole(60, 80)}
      {display(12, 14, 96, 66)}
      <rect x="24" y="26" width="72" height="8" rx="4" fill={Y} />
      <rect x="24" y="42" width="52" height="8" rx="4" fill={Y} />
      <rect x="24" y="58" width="62" height="8" rx="4" fill={R} />
    </>
  ),
  'serie-dissuasori-radar::Indicator Flat+': (
    <>
      {solar(32, 6, 56, 14)}
      {pole(60, 80)}
      {display(14, 26, 92, 54)}
      {numeral(60, 66, 40, '30')}
      {cornerDots(14, 26, 92, 54)}
    </>
  ),
  'serie-dissuasori-radar::Indicator Flat 2': (
    <>
      {pole(60, 78)}
      {display(14, 14, 92, 64)}
      {numeral(60, 52, 40, '38')}
      <text x="60" y="68" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="600" fontSize="12" fill={W} opacity="0.85">km/h</text>
      <path d="M26 24h10M84 24h10" stroke={Y} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  'serie-dissuasori-radar::Safetyradar': (
    <>
      {pole(46, 72)}
      <rect x="22" y="34" width="48" height="38" rx="6" fill={A} />
      <circle cx="46" cy="53" r="13" fill={K} />
      <circle cx="46" cy="53" r="5" fill={B} />
      <path d="M80 42a16 16 0 0 1 0 22M90 36a26 26 0 0 1 0 34M100 30a36 36 0 0 1 0 46" stroke={Y} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </>
  ),
  'serie-dissuasori-radar::Safetyradar – LED Box': (
    <>
      {pole(28, 76)}
      <rect x="8" y="42" width="40" height="34" rx="6" fill={A} />
      <circle cx="28" cy="59" r="10" fill={K} />
      <circle cx="28" cy="59" r="4" fill={B} />
      {pole(92, 76)}
      {display(66, 18, 52, 58)}
      {numeral(92, 56, 28, '50')}
      <path d="M48 62Q60 62 66 62" stroke={K} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M52 50a8 8 0 0 1 0 8" stroke={Y} strokeWidth="3" strokeLinecap="round" fill="none" />
    </>
  ),

  /* Dispositivi luminosi di sicurezza */
  'serie-sicurezza-luminosa::Safety Cross – impianto lampeggiante': (
    <>{crossSign()}</>
  ),
  'serie-sicurezza-luminosa::Safety Cross – configurazioni e alimentazione': (
    <>
      <g transform="translate(-6 20) scale(0.72)">{crossSign()}</g>
      {solar(76, 8, 40, 22)}
      <rect x="87" y="32" width="5" height="72" fill={S} />
      <rect x="76" y="104" width="28" height="5" rx="2" fill={A} />
      <rect x="77" y="52" width="26" height="22" rx="4" fill={A} />
      {bolt(86, 55, 0.75)}
      <path d="M77 66H66V96H46" stroke={K} strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </>
  ),
  'serie-sicurezza-luminosa::Ecosolar': (
    <>
      {pole(60, 84)}
      <rect x="46" y="30" width="4" height="10" fill={S} />
      <rect x="70" y="30" width="4" height="10" fill={S} />
      {solar(28, 8, 64, 24)}
      {lamp(60, 62, 26, { ring: O, n: 6 })}
      {rays(60, 62, 32, 41, [-180, 0], Y, 3.5)}
      {rays(60, 62, 32, 41, [-145, -35], Y, 3.5)}
    </>
  ),
  'serie-sicurezza-luminosa::Attraversamento pedonale luminoso LED – Stratos P': (
    <>
      {pole(60, 78)}
      <rect x="18" y="12" width="84" height="66" rx="3" fill={B} stroke={W} strokeWidth="3" />
      <path d="M60 22 82 66H38z" fill={W} />
      {pedestrian(60, 44)}
      {[30, 46, 62, 78, 94].map((x) => (
        <g key={x}>
          <circle cx={x} cy="17" r="2.2" fill={Y} />
          <circle cx={x} cy="73" r="2.2" fill={Y} />
        </g>
      ))}
      <circle cx="23" cy="30" r="2.2" fill={Y} />
      <circle cx="23" cy="45" r="2.2" fill={Y} />
      <circle cx="23" cy="60" r="2.2" fill={Y} />
      <circle cx="97" cy="30" r="2.2" fill={Y} />
      <circle cx="97" cy="45" r="2.2" fill={Y} />
      <circle cx="97" cy="60" r="2.2" fill={Y} />
    </>
  ),
  'serie-sicurezza-luminosa::Attraversamento pedonale luminoso LED – schema laterale': (
    <>
      <rect x="6" y="104" width="108" height="5" rx="2" fill={A} />
      <rect x="37" y="14" width="6" height="90" fill={S} />
      <rect x="44" y="18" width="6" height="52" fill={B} stroke={W} strokeWidth="1.5" />
      <rect x="50" y="22" width="22" height="5" fill={S} />
      <circle cx="78" cy="25" r="10" fill={A} />
      <circle cx="78" cy="25" r="6" fill={Y} />
      {rays(78, 25, 14, 20, [-60, 0, 60])}
      <path d="M96 18v56M91 18h10M91 74h10" stroke={S} strokeWidth="2" fill="none" />
      <path d="M24 70v34M19 70h10" stroke={S} strokeWidth="2" fill="none" />
    </>
  ),
  'serie-sicurezza-luminosa::D-Solar e LED Box': (
    <>
      {pole(36, 62)}
      {solar(12, 6, 46, 16)}
      {lamp(36, 42, 18, { ring: O, n: 3 })}
      <path d="M54 46Q70 46 78 66" stroke={K} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="78" y="58" width="32" height="30" rx="4" fill={A} />
      <rect x="84" y="64" width="20" height="8" rx="1" fill={K} />
      <circle cx="90" cy="68" r="2" fill={Y} />
      <circle cx="98" cy="68" r="2" fill={Y} />
      <rect x="84" y="78" width="20" height="3" fill={S} />
    </>
  ),
  'serie-sicurezza-luminosa::Tempoflash': (
    <>
      {pole(44, 70)}
      {lamp(44, 46, 26, { ring: O, n: 5 })}
      {rays(44, 46, 32, 41)}
      <circle cx="92" cy="82" r="15" fill={W} stroke={K} strokeWidth="3" />
      <path d="M92 72v10l7 4" stroke={K} strokeWidth="3" strokeLinecap="round" fill="none" />
    </>
  ),
  'serie-sicurezza-luminosa::Animal Guardian e Animal Reflector': (
    <>
      <rect x="31" y="46" width="6" height="58" fill={S} />
      <rect x="20" y="104" width="28" height="5" rx="2" fill={A} />
      {solar(14, 8, 40, 16)}
      <rect x="32" y="22" width="4" height="8" fill={S} />
      <rect x="18" y="30" width="32" height="24" rx="5" fill={A} />
      <circle cx="34" cy="42" r="7" fill={Y} />
      <circle cx="34" cy="42" r="3" fill={W} />
      {rays(34, 42, 14, 20, [-150, -30], Y, 3)}
      <rect x="82" y="22" width="14" height="82" rx="5" fill={W} stroke={K} strokeWidth="2" />
      <rect x="85" y="32" width="8" height="14" rx="2" fill={R} />
      <rect x="85" y="54" width="8" height="14" rx="2" fill={R} />
      <rect x="85" y="76" width="8" height="14" rx="2" fill={B} />
      <ellipse cx="89" cy="104" rx="14" ry="4" fill={A} />
    </>
  ),

  /* Segnali e illuminazione LED */
  'serie-segnali-illuminazione::Segnali LED retroilluminati': (
    <>
      {pole(60, 80)}
      <rect x="10" y="12" width="100" height="72" rx="9" fill={Y} opacity="0.3" />
      <rect x="18" y="18" width="84" height="58" rx="4" fill={B} stroke={W} strokeWidth="3" />
      <path d="M36 47h42m0 0-13-13m13 13-13 13" stroke={W} strokeWidth="7" fill="none" />
    </>
  ),
  'serie-segnali-illuminazione::Delineatore speciale d’ostacolo LED': (
    <>
      <clipPath id="lf-obstacle">
        <rect x="32" y="16" width="56" height="68" />
      </clipPath>
      {pole(60, 84)}
      <rect x="32" y="16" width="56" height="68" fill={W} stroke={K} strokeWidth="2" />
      <g clipPath="url(#lf-obstacle)" fill={K}>
        <path d="M32 24 88 6v14L32 38z" />
        <path d="M32 46 88 28v14L32 60z" />
        <path d="M32 68 88 50v14L32 82z" />
        <path d="M32 90 88 72v14L32 104z" />
      </g>
      <circle cx="60" cy="9" r="5" fill={Y} />
      {rays(60, 9, 9, 15, [-150, -30], Y, 3)}
    </>
  ),
  'serie-segnali-illuminazione::Segnali LED per passaggi pedonali': (
    <>
      <rect x="6" y="94" width="108" height="12" fill={A} />
      {[12, 34, 56, 78, 100].map((x) => (
        <rect key={x} x={x} y="97" width="12" height="6" fill={W} />
      ))}
      <rect x="62" y="56" width="6" height="38" fill={S} />
      <rect x="30" y="8" width="70" height="52" rx="3" fill={B} stroke={W} strokeWidth="3" />
      <path d="M65 16 85 52H45z" fill={W} />
      {pedestrian(65, 34)}
      {cornerDots(30, 8, 70, 52, 6)}
    </>
  ),
  'serie-segnali-illuminazione::Maya': (
    <>
      <path d="M44 104V34Q44 16 66 16H92" stroke={S} strokeWidth="6" fill="none" strokeLinejoin="round" />
      <rect x="30" y="102" width="28" height="6" rx="2" fill={A} />
      <path d="M88 11h22l-3 12H91z" fill={A} />
      <path d="M92 25 78 80H116L106 25z" fill={Y} opacity="0.28" />
    </>
  ),
  'serie-segnali-illuminazione::Trilogy Bust': (
    <>
      {pole(60, 48)}
      <rect x="22" y="40" width="76" height="6" rx="2" fill={S} />
      {[28, 60, 92].map((x) => (
        <g key={x}>
          <rect x={x - 2.5} y="30" width="5" height="12" fill={S} />
          <circle cx={x} cy="24" r="11" fill={A} />
          <circle cx={x} cy="24" r="7" fill={Y} />
        </g>
      ))}
      <path d="M44 56 52 92H68L76 56z" fill={Y} opacity="0.22" />
    </>
  ),
  'serie-segnali-illuminazione::Traffic 3000': (
    <>
      {road(92)}
      {pole(40, 60)}
      <rect x="12" y="16" width="56" height="44" rx="5" fill={A} />
      <rect x="18" y="22" width="44" height="22" rx="2" fill={K} />
      <rect x="23" y="34" width="6" height="7" fill={Y} />
      <rect x="33" y="29" width="6" height="12" fill={Y} />
      <rect x="43" y="26" width="6" height="15" fill={Y} />
      <rect x="53" y="31" width="6" height="10" fill={Y} />
      <circle cx="26" cy="52" r="3" fill={R} />
      <path d="M44 100Q70 98 90 96" stroke={Y} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="88" y="94" width="14" height="4" rx="2" fill={S} />
    </>
  ),

  /* Segnaletica luminosa da cantiere */
  'serie-cantiere-luminoso::D-Solo e Mini D-Solo': (
    <>
      <rect x="18" y="86" width="44" height="6" rx="2" fill={A} />
      {dlamp(40, 52, 44, 34)}
      {rays(40, 62, 33, 43, [-150, -90, -30])}
      <rect x="78" y="88" width="30" height="5" rx="2" fill={A} />
      {dlamp(93, 68, 28, 20)}
      {rays(93, 74, 22, 30, [-150, -90, -30], Y, 3)}
    </>
  ),
  'serie-cantiere-luminoso::Super D-Lite': (
    <>
      <rect x="36" y="58" width="48" height="46" rx="6" fill={A} />
      <path d="M36 60a24 30 0 0 1 48 0z" fill={Y} />
      <rect x="44" y="82" width="32" height="6" rx="2" fill={K} />
      {bolt(55, 70, 0.7)}
      {rays(60, 58, 38, 48, [-150, -90, -30])}
    </>
  ),
  'serie-cantiere-luminoso::D-Star': (
    <>
      <path d="M40 80h40l8 24H32z" fill={A} />
      {lamp(60, 52, 30, { ring: O, n: 8 })}
      {rays(60, 52, 35, 46, [-135, -90, -45, 180, 0], Y, 3.5)}
    </>
  ),
  'serie-cantiere-luminoso::D2-BASIC200': (
    <>
      {pole(60, 88)}
      <rect x="57" y="44" width="6" height="14" fill={S} />
      {lamp(60, 28, 19)}
      {lamp(60, 70, 19, { dim: true })}
      {rays(60, 28, 24, 32, [-150, -30])}
    </>
  ),
  'serie-cantiere-luminoso::D2-Star, D4-Star e BASIC200 Radio': (
    <>
      <path d="M40 24a24 24 0 0 1 40 0M31 14a38 38 0 0 1 58 0" stroke={B} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <rect x="6" y="96" width="108" height="6" rx="2" fill={A} />
      {[24, 60, 96].map((x) => (
        <g key={x}>
          <rect x={x - 2.5} y="62" width="5" height="34" fill={S} />
          {lamp(x, 50, 15, { ring: O, n: 3 })}
        </g>
      ))}
    </>
  ),
  'serie-cantiere-luminoso::Impianti sequenziali LED senza fili e Tipo B': (
    <>
      <path d="M52 34a8 8 0 0 1 16 0M44 34a16 16 0 0 1 32 0M36 34a24 24 0 0 1 48 0" stroke={B} strokeWidth="3" strokeLinecap="round" fill="none" />
      {[6, 66].map((x) => (
        <g key={x}>
          <rect x={x + 8} y="66" width="4" height="32" fill={S} />
          <rect x={x + 38} y="66" width="4" height="32" fill={S} />
          <rect x={x} y="56" width="48" height="14" fill={W} stroke={K} strokeWidth="1.5" />
          <path d={`M${x + 8} 56h8l-8 14H${x}zM${x + 24} 56h8l-8 14h-8zM${x + 40} 56h8v14h-16z`} fill={R} />
          {lamp(x + 24, 46, 9, { ring: O, n: 0 })}
          <circle cx={x + 24} cy="46" r="4" fill={Y} />
        </g>
      ))}
    </>
  ),
  'serie-cantiere-luminoso::Visual LED 60×60 retroilluminato': (
    <>
      {pole(60, 72)}
      <rect x="20" y="2" width="80" height="74" rx="9" fill={Y} opacity="0.28" />
      <rect x="26" y="8" width="68" height="64" rx="5" fill={A} />
      <rect x="31" y="13" width="58" height="54" rx="3" fill={W} />
      <LavoriSign cx={60} top={19} width={46} />
    </>
  ),
  'serie-cantiere-luminoso::Impianto semaforico mobile LED': (
    <>
      {trafficLight(30, 'r')}
      {trafficLight(90, 'g')}
      <path d="M30 108Q60 118 90 108" stroke={K} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  ),
  'serie-cantiere-luminoso::Indicatore di direzione e guide traffico LTS': (
    <>
      {pole(60, 72)}
      {display(12, 22, 96, 50)}
      <path d="M26 47H82M82 47 66 31M82 47 66 63" stroke={Y} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.1 10.5" fill="none" />
      <path d="M96 33l-6 14 6 14" stroke={O} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  'serie-cantiere-luminoso::Frecce direzionali Serie ISS': (
    <>
      {pole(60, 84)}
      <rect x="6" y="14" width="108" height="70" rx="5" fill={K} />
      <path d="M20 48h48V32l30 22-30 22V60H20z" fill={Y} />
      <circle cx="14" cy="22" r="2.4" fill={O} />
      <circle cx="106" cy="22" r="2.4" fill={O} />
    </>
  ),
  'serie-cantiere-luminoso::Carrelli LED figure 400/401': (
    <>
      <path d="M16 88 2 100" stroke={A} strokeWidth="4" strokeLinecap="round" />
      <rect x="16" y="84" width="82" height="6" rx="2" fill={A} />
      <rect x="53" y="36" width="5" height="48" fill={S} />
      <path d="M56 10 88 62H24z" fill={R} />
      <path d="M56 24 74 56H38z" fill={Y} />
      <circle cx="36" cy="98" r="9" fill={K} />
      <circle cx="36" cy="98" r="3.5" fill={S} />
      <circle cx="78" cy="98" r="9" fill={K} />
      <circle cx="78" cy="98" r="3.5" fill={S} />
      <circle cx="22" cy="64" r="4" fill={Y} />
      <circle cx="90" cy="64" r="4" fill={Y} />
    </>
  ),

  /* Accessori, batterie ed emergenza */
  'serie-accessori-emergenza::Accessori per segnaletica luminosa': (
    <>
      <rect x="22" y="8" width="14" height="100" rx="3" fill={S} />
      <rect x="22" y="8" width="4" height="100" fill={L} />
      <rect x="16" y="30" width="26" height="12" rx="3" fill={A} />
      <rect x="16" y="74" width="26" height="12" rx="3" fill={A} />
      <circle cx="22" cy="36" r="2" fill={S} />
      <circle cx="36" cy="36" r="2" fill={S} />
      <circle cx="22" cy="80" r="2" fill={S} />
      <circle cx="36" cy="80" r="2" fill={S} />
      <rect x="42" y="34" width="46" height="5" fill={A} />
      <rect x="86" y="24" width="6" height="26" rx="2" fill={A} />
      <path d="M42 80h48" stroke={K} strokeWidth="3" strokeLinecap="round" />
      <circle cx="96" cy="80" r="6" fill="none" stroke={K} strokeWidth="3" />
      <circle cx="96" cy="80" r="2" fill={Y} />
    </>
  ),
  'serie-accessori-emergenza::Batterie, caricabatterie e D4 Box': (
    <>
      {battery(10, 46, 44, 46)}
      <rect x="66" y="52" width="46" height="38" rx="4" fill={K} />
      <rect x="72" y="58" width="22" height="10" rx="1" fill={A} />
      <circle cx="102" cy="63" r="3.5" fill={G} />
      <rect x="72" y="74" width="34" height="4" fill={S} />
      <path d="M66 72h-12" stroke={K} strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  'serie-accessori-emergenza::Profiler II, Zeus LED, NX270 e torce': (
    <>
      <path d="M18 18h20l-4 8H22z" fill={S} />
      <ellipse cx="28" cy="18" rx="10" ry="3.5" fill={Y} />
      <rect x="22" y="26" width="12" height="62" rx="3" fill={A} />
      <rect x="22" y="40" width="12" height="3" fill={K} />
      <rect x="26" y="52" width="4" height="8" rx="2" fill={R} />
      <path d="M52 44v-10h22v10" stroke={S} strokeWidth="3.5" fill="none" strokeLinejoin="round" />
      <rect x="46" y="44" width="34" height="50" rx="5" fill={A} />
      <rect x="51" y="50" width="24" height="18" rx="2" fill={Y} />
      <rect x="51" y="76" width="24" height="5" rx="2" fill={K} />
      <path d="M92 20h16l-3 10H95z" fill={S} />
      <ellipse cx="100" cy="20" rx="8" ry="3" fill={Y} />
      <rect x="95" y="30" width="10" height="56" rx="3" fill={O} />
      <rect x="95" y="46" width="10" height="3" fill={K} />
    </>
  ),
  'serie-accessori-emergenza::Impulse 102 e kit emergenza': (
    <>
      {dlamp(60, 44, 36, 26)}
      {rays(60, 56, 26, 36, [-150, -90, -30])}
      <rect x="14" y="70" width="92" height="34" rx="6" fill={R} />
      <rect x="54" y="76" width="12" height="22" fill={W} />
      <rect x="45" y="82" width="30" height="10" fill={W} />
      <rect x="20" y="76" width="4" height="22" rx="2" fill="#E0495F" />
    </>
  ),
  'serie-accessori-emergenza::Beacon 420, Mini Excalibur e Mini Scimitar': (
    <>
      {dlamp(34, 52, 40, 36)}
      <rect x="22" y="88" width="24" height="6" rx="2" fill={S} />
      {rays(34, 60, 28, 38, [-150, -90, -30])}
      {lightBar(62, 40, 50, 16)}
      {lightBar(62, 66, 50, 16, R)}
      <rect x="70" y="56" width="4" height="10" fill={S} />
      <rect x="100" y="56" width="4" height="10" fill={S} />
    </>
  ),

  /* Dispositivi per automezzi e strumenti */
  'serie-veicoli-strumenti::Barre LED Excalibur e Scimitar': (
    <>
      <rect x="4" y="78" width="112" height="6" fill={A} />
      <rect x="22" y="66" width="8" height="12" fill={S} />
      <rect x="90" y="66" width="8" height="12" fill={S} />
      {lightBar(8, 40, 104, 26)}
      {rays(60, 48, 40, 52, [-140, -90, -40])}
    </>
  ),
  'serie-veicoli-strumenti::Rotanti e strobo 275, GF8.8, GDO, Turbo Star, CL199 e R65': (
    <>
      <rect x="32" y="86" width="56" height="10" rx="3" fill={A} />
      <rect x="40" y="62" width="40" height="24" rx="3" fill={A} />
      <path d="M40 64a20 28 0 0 1 40 0z" fill={Y} opacity="0.9" />
      <path d="M54 64l6-18 6 18z" fill={O} />
      <circle cx="60" cy="50" r="3" fill={W} />
      {rays(60, 54, 32, 42, [-160, -125, -90, -55, -20])}
    </>
  ),
  'serie-veicoli-strumenti::Arrow, NCC Stik e BASIC Bar': (
    <>
      <rect x="4" y="76" width="112" height="6" fill={A} />
      <rect x="20" y="64" width="8" height="12" fill={S} />
      <rect x="92" y="64" width="8" height="12" fill={S} />
      <rect x="6" y="38" width="108" height="26" rx="4" fill={K} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle key={i} cx={19 + i * 12.3} cy="51" r="4.8" fill={Y} opacity={0.35 + i * 0.09} />
      ))}
      {rays(60, 38, 8, 18, [-120, -90, -60], Y, 3)}
    </>
  ),
  'serie-veicoli-strumenti::Moduli LED NCC e pannello a messaggio variabile': (
    <>
      <rect x="8" y="64" width="34" height="22" rx="4" fill={K} />
      {[16, 25, 34].map((x) => (
        <circle key={x} cx={x} cy="75" r="3" fill={Y} />
      ))}
      <rect x="77" y="66" width="6" height="38" fill={S} />
      <rect x="64" y="104" width="32" height="5" rx="2" fill={A} />
      <rect x="50" y="18" width="64" height="50" rx="5" fill={K} />
      <rect x="58" y="27" width="48" height="6" rx="3" fill={Y} />
      <rect x="58" y="39" width="34" height="6" rx="3" fill={Y} />
      <rect x="58" y="51" width="42" height="6" rx="3" fill={R} />
    </>
  ),
  'serie-veicoli-strumenti::NP130, Golight 2020 e Stryker 3051': (
    <>
      <rect x="38" y="90" width="44" height="12" rx="3" fill={A} />
      <rect x="55" y="70" width="10" height="20" fill={S} />
      <path d="M36 52v18h48V52" stroke={S} strokeWidth="6" fill="none" strokeLinejoin="round" />
      <circle cx="60" cy="48" r="24" fill={A} />
      <circle cx="60" cy="48" r="18" fill={Y} />
      <circle cx="60" cy="48" r="9" fill={W} />
      {rays(60, 48, 30, 40, [-135, -90, -45], Y, 4)}
    </>
  ),
  'serie-veicoli-strumenti::Reflecto Horizontal e Reflecto Vertical': (
    <>
      <rect x="8" y="88" width="104" height="16" fill={A} />
      <rect x="8" y="95" width="104" height="4" fill={W} />
      <path d="M36 78 26 90h68L84 78z" fill={Y} opacity="0.3" />
      <rect x="28" y="22" width="64" height="56" rx="9" fill={A} />
      <rect x="36" y="30" width="48" height="18" rx="2" fill={K} />
      <path d="M42 41h8l4-6 5 10 4-6h8" stroke={Y} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="60" cy="62" r="5" fill={R} />
    </>
  ),
  'serie-veicoli-strumenti::Reled 10': (
    <>
      <rect x="34" y="8" width="52" height="98" rx="11" fill={A} />
      <rect x="42" y="18" width="36" height="28" rx="3" fill={K} />
      {numeral(60, 40, 24, '10')}
      {[50, 60, 70].map((x) =>
        [60, 72].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" fill={S} />),
      )}
      <circle cx="60" cy="92" r="6" fill={R} />
    </>
  ),
};

export const hasLightFigure = (key) => Boolean(figures[key]);

export default function LightFigure({ figureKey, className = '' }) {
  const art = figures[figureKey];
  if (!art) return null;

  return (
    <svg
      className={`variant-figure variant-figure--svg ${className}`}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      {art}
    </svg>
  );
}
