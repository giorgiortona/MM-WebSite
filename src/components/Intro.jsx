import { useRef } from 'react';
import { gsap, useGSAP, SplitText, prefersReducedMotion } from '../lib/gsap';
import { stats } from '../data/site';
import Figure from './Figure';
import './Intro.css';

/* Prima componente fotografica: due immagini scoperte da una maschera
   che si apre dal basso, come vernice stesa, con parallasse sfalsata. */
export default function Intro() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const reduced = prefersReducedMotion();

      const split = new SplitText(q('.intro__title'), {
        type: 'lines',
        linesClass: 'intro-line',
        mask: 'lines',
      });

      gsap.from(split.lines, {
        yPercent: 118,
        duration: 1,
        ease: 'panel',
        stagger: 0.08,
        scrollTrigger: { trigger: q('.intro__title'), start: 'top 84%' },
      });

      gsap.from(q('[data-reveal]'), {
        opacity: 0,
        y: 34,
        duration: 0.9,
        ease: 'brake',
        stagger: 0.08,
        scrollTrigger: { trigger: q('.intro__copy'), start: 'top 78%' },
      });

      /* Maschere: da riquadro chiuso a immagine intera */
      q('.intro__shot').forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: reduced ? 0.01 : 1.25,
            ease: 'panel',
            scrollTrigger: { trigger: el, start: 'top 88%' },
            delay: i * 0.12,
          }
        );
      });

      /* Contatori */
      q('.stat__value').forEach((el) => {
        const target = Number(el.dataset.to);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'brake',
          scrollTrigger: { trigger: el, start: 'top 92%' },
          onUpdate: () => {
            el.textContent = Math.round(obj.v);
          },
        });
      });

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section className="section intro" id="lavori" ref={root}>
      <div className="shell intro__grid">
        <div className="intro__copy">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow__num">01</span> L’azienda
          </p>

          <h2 className="intro__title section-title">
            Teniamo la strada leggibile, di giorno e di notte.
          </h2>

          <p className="section-lead" data-reveal>
            M.M. Group costruisce, fornisce, posa e mantiene segnaletica stradale orizzontale e
            verticale, barriere e protezioni, verde pubblico e arredo urbano. Dalla vernice
            spartitraffico al pannello di preavviso, dal cantiere temporaneo all’impianto
            semaforico: un solo interlocutore per l’intera opera.
          </p>

          <p className="intro__text" data-reveal>
            Lavoriamo per enti pubblici e imprese private, su strade urbane ed extraurbane,
            autostrade, aree industriali e piazzali logistici. Partecipiamo a gare e appalti
            banditi da enti pubblici e privati e seguiamo l’opera dalla progettazione al collaudo.
          </p>

          <ul className="intro__stats">
            {stats.map((s) => (
              <li className="stat" key={s.label} data-reveal>
                <span className="stat__num">
                  <span className="stat__value" data-to={s.value}>
                    0
                  </span>
                  <em>{s.suffix}</em>
                </span>
                <strong className="stat__label">{s.label}</strong>
                <span className="stat__note">{s.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="intro__media">
          <div className="intro__shot parallax-frame intro__shot--a">
            <Figure slug="bari-notturna" sizes="(max-width: 900px) 100vw, 46vw" speed={0.94} />
            <span className="figure__tag">Tracciamento notturno</span>
          </div>
          <div className="intro__shot parallax-frame intro__shot--b">
            <Figure slug="strada-nuova" sizes="(max-width: 900px) 60vw, 26vw" speed={1.07} />
            <span className="figure__tag">Mezzeria su nuovo tappeto</span>
          </div>
          <span className="intro__stamp" aria-hidden="true">
            EN 12899-1
          </span>
        </div>
      </div>
    </section>
  );
}
