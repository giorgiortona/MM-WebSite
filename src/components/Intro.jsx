import { useRef } from 'react';
import { gsap, useGSAP, SplitText, prefersReducedMotion } from '../lib/gsap';
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
        scrollTrigger: { trigger: q('.intro__layout')[0], start: 'top 78%' },
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

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section className="section intro" id="lavori" ref={root}>
      <div className="shell intro__layout">
        <header className="intro__headline">
          <span className="intro__kicker" data-reveal>Segnaletica stradale</span>
          <h2 className="intro__title section-title">
            Teniamo la strada leggibile, di giorno e di notte.
          </h2>
        </header>

        <div className="intro__shot intro__shot--night">
          <Figure slug="bari-notturna" />
          <span className="figure__tag">Tracciamento notturno</span>
        </div>

        <div className="intro__copy intro__copy--primary" data-reveal>
          <p className="section-lead" data-reveal>
            M.M. Group costruisce, fornisce, posa e mantiene segnaletica stradale orizzontale e
            verticale, delineatori e segnaletica di cantiere. Dalla vernice spartitraffico al
            pannello di preavviso, dalla targa al cantiere temporaneo: un solo interlocutore per
            l’intera opera.
          </p>
          <span className="intro__road-rule" aria-hidden="true" />
        </div>

        <div className="intro__shot intro__shot--road">
          <Figure slug="strada-nuova" />
          <span className="figure__tag">Mezzeria su nuovo tappeto</span>
        </div>

        <aside className="intro__copy intro__copy--secondary" data-reveal>
          <span className="intro__aside-label">Dalla progettazione al collaudo</span>
          <p className="intro__text">
            Lavoriamo per enti pubblici e imprese private, su strade urbane ed extraurbane,
            autostrade, aree industriali e piazzali logistici. Partecipiamo a gare e appalti
            banditi da enti pubblici e privati e seguiamo l’opera dalla progettazione al collaudo.
          </p>
        </aside>
      </div>
    </section>
  );
}
