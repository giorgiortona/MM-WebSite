import { useRef } from 'react';
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP, prefersReducedMotion, isTouch } from '../lib/gsap';

/* ScrollSmoother avvolge la pagina e abilita gli effetti data-speed / data-lag.
   Su touch e con reduced-motion resta spento: lo scroll nativo è già corretto. */
export function useSmoother(scope, enabled) {
  const smoother = useRef(null);

  useGSAP(
    () => {
      if (!enabled) return;
      if (prefersReducedMotion() || isTouch()) {
        ScrollTrigger.refresh();
        return;
      }
      smoother.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.05,
        effects: true,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });
      return () => {
        smoother.current?.kill();
        smoother.current = null;
      };
    },
    { scope, dependencies: [enabled] }
  );

  return smoother;
}

/* Spostamento verso una sezione, animato oppure immediato. */
export function scrollToSection(id, { instant = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const smoother = ScrollSmoother.get();
  if (instant) {
    if (smoother) {
      smoother.scrollTo(el, false, 'top 64px');
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    }
    return;
  }
  if (smoother) {
    smoother.scrollTo(el, true, 'top 64px');
  } else {
    gsap.to(window, { duration: 1, scrollTo: { y: el, offsetY: 64 }, ease: 'brake' });
  }
}
