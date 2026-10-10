/* Esempi di impiego di una serie della segnaletica luminosa: scenari con pittogramma
   e, per i display, messaggi tipo mostrati come su un pannello a LED. */
const W = '#F2F3EF';
const R = '#C8102E';
const B = '#0B5FA5';
const G = '#0E7A3C';
const Y = '#FFD400';
const K = '#14161A';
const S = '#8A9099';
const A = '#2A2F35';
const O = '#FF6A00';

const icons = {
  incrocio: (
    <>
      <rect x="18" y="2" width="12" height="44" fill={A} />
      <rect x="2" y="18" width="44" height="12" fill={A} />
      <path d="M24 6v6M24 36v6M6 24h6M36 24h6" stroke={W} strokeWidth="2" />
    </>
  ),
  curva: (
    <>
      <path d="M10 44Q10 16 40 8" stroke={A} strokeWidth="12" fill="none" />
      <path d="M10 44Q10 16 40 8" stroke={W} strokeWidth="1.6" strokeDasharray="4 4" fill="none" />
    </>
  ),
  velocita: (
    <>
      <circle cx="24" cy="24" r="19" fill={W} stroke={R} strokeWidth="4.5" />
      <text x="24" y="30" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="17" fill={K}>50</text>
    </>
  ),
  rotatoria: (
    <>
      <circle cx="24" cy="24" r="15" stroke={A} strokeWidth="10" fill="none" />
      <circle cx="24" cy="24" r="15" stroke={W} strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <circle cx="24" cy="24" r="4" fill={G} />
    </>
  ),
  radio: (
    <>
      <circle cx="12" cy="36" r="5" fill={A} />
      <path d="M20 28a11 11 0 0 1 8 8M20 20a19 19 0 0 1 16 16M20 12a27 27 0 0 1 24 24" stroke={B} strokeWidth="3" strokeLinecap="round" fill="none" />
    </>
  ),
  batteria: (
    <>
      <rect x="14" y="9" width="7" height="5" rx="1" fill={S} />
      <rect x="27" y="9" width="7" height="5" rx="1" fill={S} />
      <rect x="8" y="14" width="32" height="26" rx="3" fill={A} />
      <path d="M26 18 17 29h6l-2 9 10-13h-6z" fill={Y} />
    </>
  ),
  galleria: (
    <>
      <path d="M6 42V24a18 18 0 0 1 36 0v18z" fill={A} />
      <path d="M14 42V26a10 10 0 0 1 20 0v16z" fill="#4A5058" />
      <circle cx="10" cy="30" r="2.4" fill={Y} />
      <circle cx="38" cy="30" r="2.4" fill={Y} />
      <circle cx="10" cy="38" r="2.4" fill={Y} />
      <circle cx="38" cy="38" r="2.4" fill={Y} />
    </>
  ),
  nebbia: (
    <>
      <path d="M6 14h28M12 23h30M6 32h26" stroke={S} strokeWidth="4.5" strokeLinecap="round" opacity="0.65" />
      <circle cx="38" cy="38" r="5" fill={Y} />
      <circle cx="38" cy="38" r="8.5" fill={Y} opacity="0.3" />
    </>
  ),
  scuola: (
    <>
      <path d="M5 22 24 7l19 15z" fill={R} />
      <rect x="9" y="22" width="30" height="20" fill={W} stroke={K} strokeWidth="1.5" />
      <rect x="21" y="30" width="6" height="12" fill={B} />
      <rect x="12" y="26" width="6" height="6" fill={Y} />
      <rect x="30" y="26" width="6" height="6" fill={Y} />
    </>
  ),
  cantiere: (
    <>
      <path d="M24 5 36 40H12z" fill={O} />
      <path d="M20 19h8l2.5 7h-13z" fill={W} />
      <rect x="7" y="39" width="34" height="5" rx="2" fill={O} />
    </>
  ),
  svincolo: (
    <>
      <path d="M24 44V26M24 26 11 8M24 26 37 8" stroke={A} strokeWidth="8" fill="none" strokeLinejoin="round" />
      <path d="M24 42V30" stroke={W} strokeWidth="1.5" strokeDasharray="3 3" />
    </>
  ),
  centro: (
    <>
      <rect x="4" y="24" width="14" height="18" fill={A} />
      <rect x="20" y="14" width="14" height="28" fill={S} />
      <rect x="36" y="27" width="8" height="15" fill={A} />
      <rect x="7" y="28" width="3" height="3" fill={Y} />
      <rect x="12" y="28" width="3" height="3" fill={Y} />
      <rect x="23" y="19" width="3" height="3" fill={Y} />
      <rect x="28" y="19" width="3" height="3" fill={Y} />
      <rect x="23" y="26" width="3" height="3" fill={Y} />
    </>
  ),
  attraversamento: (
    <>
      <rect x="3" y="8" width="42" height="32" rx="3" fill={A} />
      {[8, 17, 26, 35].map((x) => (
        <rect key={x} x={x} y="12" width="5.5" height="24" fill={W} />
      ))}
    </>
  ),
  animali: (
    <>
      <ellipse cx="24" cy="32" rx="10" ry="8" fill={K} />
      <circle cx="11" cy="22" r="4" fill={K} />
      <circle cx="20" cy="13" r="4.5" fill={K} />
      <circle cx="30" cy="13" r="4.5" fill={K} />
      <circle cx="38" cy="22" r="4" fill={K} />
    </>
  ),
  ghiaccio: (
    <path
      d="M24 5v38M7 14.5l34 19M7 33.5l34-19M18 8l6 5 6-5M18 40l6-5 6 5"
      stroke={B}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  fermata: (
    <>
      <rect x="22" y="16" width="4" height="28" fill={S} />
      <rect x="9" y="5" width="30" height="15" rx="3" fill={B} />
      <text x="24" y="16" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="10" fill={W}>BUS</text>
    </>
  ),
  traffico: (
    <>
      <rect x="8" y="26" width="7" height="14" fill={B} />
      <rect x="18" y="14" width="7" height="26" fill={Y} />
      <rect x="28" y="20" width="7" height="20" fill={B} />
      <rect x="38" y="8" width="5" height="32" fill={Y} />
      <rect x="4" y="40" width="40" height="2" fill={S} />
    </>
  ),
  semaforo: (
    <>
      <rect x="15" y="3" width="18" height="42" rx="4.5" fill={K} />
      <circle cx="24" cy="12" r="4.6" fill={R} />
      <circle cx="24" cy="24" r="4.6" fill={Y} opacity="0.35" />
      <circle cx="24" cy="36" r="4.6" fill={G} opacity="0.6" />
    </>
  ),
  incidente: (
    <>
      <path d="M24 5 45 41H3z" fill={R} />
      <path d="M24 15 37 37H11z" fill={W} />
      <rect x="22.5" y="21" width="3" height="9" rx="1.5" fill={K} />
      <circle cx="24" cy="33" r="1.8" fill={K} />
    </>
  ),
  strumento: (
    <>
      <rect x="13" y="3" width="22" height="42" rx="5" fill={A} />
      <rect x="17" y="8" width="14" height="11" rx="1.5" fill={K} />
      <path d="M19 15h3l1.5-3 2 5 1.5-2h2" stroke={Y} strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="27" r="2" fill={S} />
      <circle cx="29" cy="27" r="2" fill={S} />
      <circle cx="19" cy="34" r="2" fill={S} />
      <circle cx="29" cy="34" r="2" fill={S} />
    </>
  ),
  auto: (
    <>
      <rect x="16" y="7" width="16" height="4" rx="2" fill={Y} />
      <path d="M4 37V29c0-3 2-5 5-5l5-9h20l5 9c3 0 5 2 5 5v8z" fill={W} stroke={K} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="14" cy="38" r="5" fill={K} />
      <circle cx="34" cy="38" r="5" fill={K} />
    </>
  ),
};

export default function ExampleSection({ examples }) {
  if (!examples) return null;

  return (
    <section className="sheet__examples" aria-labelledby="esempi-title" data-enter>
      <div className="sheet__examples-head">
        <h2 id="esempi-title">Esempi di impiego</h2>
        <p>{examples.intro}</p>
      </div>

      <div className="sheet__examples-grid">
        {examples.items.map((item) => (
          <article className="example-card" key={item.title}>
            <svg className="example-card__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
              {icons[item.icon] || icons.incrocio}
            </svg>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      {examples.messages && (
        <div className="example-messages">
          <div className="example-messages__copy">
            <h3>{examples.messagesTitle}</h3>
            <p>{examples.messagesText}</p>
          </div>
          <div className="example-messages__grid">
            {examples.messages.map((lines) => (
              <span className="led-panel" key={lines.join('/')}>
                {lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
