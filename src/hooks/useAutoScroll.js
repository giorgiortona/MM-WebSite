import { useEffect } from 'react';
import { prefersReducedMotion } from '../lib/gsap';

/* Scorrimento lento e continuo per le strisce orizzontali.
   Parte solo quando la striscia è in vista e ha davvero qualcosa da scorrere,
   si ferma appena la si tocca e riprende dopo qualche secondo dal punto in cui
   l'ha lasciata l'utente. Arrivata in fondo inverte e torna indietro. */
export function useAutoScroll(ref, { speed = 26, idle = 3500 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;
    let last = 0;
    let dir = 1;
    let touchedAt = 0;
    /* La posizione va tenuta a parte: il browser arrotonda scrollLeft
       all'intero, quindi rileggendola si perderebbe il mezzo pixel di
       avanzamento di ogni fotogramma e la striscia resterebbe ferma. */
    let pos = el.scrollLeft;

    const travel = () => el.scrollWidth - el.clientWidth;

    /* La visibilità si misura dal riquadro a ogni fotogramma invece che con un
       osservatore: due sole letture per pagina, e nessuno stato da tenere
       allineato quando la sezione viene bloccata o rimisurata. */
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    };

    const step = (now) => {
      raf = requestAnimationFrame(step);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      if (now - touchedAt < idle || travel() <= 4 || !inView()) {
        pos = el.scrollLeft; // resta allineato a dove l'ha portata l'utente
        return;
      }

      pos += speed * dt * dir;
      if (pos >= travel()) {
        pos = travel();
        dir = -1;
      } else if (pos <= 0) {
        pos = 0;
        dir = 1;
      }
      el.scrollLeft = pos;
    };

    const touched = () => (touchedAt = performance.now());
    const events = ['pointerdown', 'touchstart', 'wheel'];
    events.forEach((e) => el.addEventListener(e, touched, { passive: true }));

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      events.forEach((e) => el.removeEventListener(e, touched));
    };
  }, [ref, speed, idle]);
}
