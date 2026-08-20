import { useRef, useEffect, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { clips } from '../data/gallery';
import './Showreel.css';

/* Ogni spezzone dura otto secondi ed è tagliato dai filmati di cantiere.
   Il video parte solo quando la scheda entra in viewport e si ferma appena esce:
   niente decodifica inutile su otto sorgenti in parallelo. */
function ClipCard({ clip, index }) {
  const wrap = useRef(null);
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    const v = video.current;
    if (!el || !v) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false));
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={`clip clip--${clip.orientation} ${playing ? 'is-playing' : ''}`} ref={wrap}>
      <div className="clip__frame">
        <video
          ref={video}
          src={`/media/clips/${clip.slug}.mp4`}
          poster={`/media/clips/${clip.slug}-poster.jpg`}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`${clip.title} — ${clip.note}`}
        />
        <span className="clip__badge">
          <i aria-hidden="true" />
          00:08
        </span>
        <span className="clip__index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <figcaption className="clip__caption">
        <strong>{clip.title}</strong>
        <span>{clip.note}</span>
      </figcaption>
    </figure>
  );
}

export default function Showreel() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      gsap.from(q('.showreel__strip .clip'), {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'panel',
        stagger: 0.08,
        clearProps: 'all',
        scrollTrigger: { trigger: q('.showreel__strip'), start: 'top 85%' },
      });

      gsap.from(q('.showreel__wide .clip'), {
        opacity: 0,
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 1.1,
        ease: 'panel',
        stagger: 0.14,
        clearProps: 'all',
        scrollTrigger: { trigger: q('.showreel__wide'), start: 'top 85%' },
      });
    },
    { scope: root }
  );

  const vertical = clips.filter((c) => c.orientation === 'v');
  const horizontal = clips.filter((c) => c.orientation === 'h');

  return (
    <section className="section showreel" id="showreel" ref={root}>
      <div className="shell">
        <div className="showreel__head">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__num">04</span> In opera
            </p>
            <h2 className="section-title">Otto secondi per volta</h2>
          </div>
          <p className="showreel__head-text">
            Spezzoni brevi girati durante le lavorazioni: la macchina spartitraffico al lavoro,
            la resa notturna della vernice, la percorrenza a cantiere concluso.
          </p>
        </div>
      </div>

      <div className="showreel__strip">
        {vertical.map((c, i) => (
          <ClipCard clip={c} index={i} key={c.slug} />
        ))}
      </div>

      <div className="shell">
        <div className="showreel__wide">
          <div className="showreel__wide-head">
            <h3>Segnaletica industriale interna</h3>
            <p>
              Corsie, stalli e percorsi pedonali su pavimento di capannoni e piazzali logistici,
              con vernici a bassa manutenzione e tracciati studiati sui flussi dei mezzi.
            </p>
          </div>
          <div className="showreel__wide-grid">
            {horizontal.map((c, i) => (
              <ClipCard clip={c} index={vertical.length + i} key={c.slug} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
