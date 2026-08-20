import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, DrawSVGPlugin, Flip, useGSAP);

/* Ease dedicate: la prima imita la frenata di un mezzo d'opera,
   la seconda l'apertura netta di un pannello. */
gsap.registerEase('brake', (p) => 1 - Math.pow(1 - p, 4.2));
gsap.registerEase('panel', (p) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
);

/* In sviluppo gsap resta raggiungibile dalla console per ispezionare le timeline. */
if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
  window.ScrollSmoother = ScrollSmoother;
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none), (pointer: coarse)').matches;

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, Flip, useGSAP };
