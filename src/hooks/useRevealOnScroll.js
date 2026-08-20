import { gsap, useGSAP } from '../lib/gsap';

/* Rivelazione standard di sezione: gli elementi con [data-reveal]
   salgono in sequenza quando la sezione entra in viewport. */
export function useRevealOnScroll(scope, { selector = '[data-reveal]', y = 42, stagger = 0.08, start = 'top 82%' } = {}) {
  useGSAP(
    () => {
      const items = gsap.utils.toArray(selector, scope.current);
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'brake',
        stagger,
        scrollTrigger: { trigger: scope.current, start },
      });
    },
    { scope }
  );
}
