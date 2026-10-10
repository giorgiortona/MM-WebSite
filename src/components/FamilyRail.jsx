import { useEffect, useRef, useState } from 'react';

/* Elenco delle cartelle del catalogo. Sul telefono scorre in orizzontale: le frecce
   rendono evidente che ce ne sono altre oltre il bordo dello schermo. */
export default function FamilyRail({ families, active, onPick, countOf }) {
  const list = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: true });

  useEffect(() => {
    const el = list.current;
    if (!el) return undefined;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setEdge({ start: el.scrollLeft <= 4, end: max <= 4 || el.scrollLeft >= max - 4 });
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [families]);

  useEffect(() => {
    const el = list.current;
    const current = el?.querySelector('.is-active');
    if (!el || !current || el.scrollWidth <= el.clientWidth) return;
    const left = current.offsetLeft - (el.clientWidth - current.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [active]);

  const scrollBy = (direction) => {
    const el = list.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: 'smooth' });
  };

  return (
    <aside className="fam-rail" data-enter>
      <button
        type="button"
        className="fam-rail__arrow fam-rail__arrow--prev"
        onClick={() => scrollBy(-1)}
        hidden={edge.start}
        aria-label="Cartelle precedenti"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul ref={list}>
        {families.map((f) => (
          <li key={f.id}>
            <button
              className={`fam-rail__item ${f.id === active ? 'is-active' : ''}`}
              onClick={() => onPick(f.id)}
            >
              <span>{f.label}</span>
              <em>{countOf(f.id)}</em>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="fam-rail__arrow fam-rail__arrow--next"
        onClick={() => scrollBy(1)}
        hidden={edge.end}
        aria-label="Altre cartelle"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </aside>
  );
}
