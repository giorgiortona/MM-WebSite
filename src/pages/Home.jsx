import { useRef, useEffect } from 'react';
import { ScrollTrigger } from '../lib/gsap';
import { useSmoother } from '../hooks/useSmoother';

import Hero from '../components/Hero';
import Intro from '../components/Intro';
import ServicesList from '../components/ServicesList';
import HorizontalReel from '../components/HorizontalReel';
import BentoMosaic from '../components/BentoMosaic';
import Showreel from '../components/Showreel';
import CatalogTeaser from '../components/CatalogTeaser';
import Quality from '../components/Quality';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

const HOME_TITLE = 'M.M. Group — Segnaletica stradale a Grosseto e Nardò';
const HOME_DESCRIPTION =
  'Segnaletica stradale orizzontale e verticale, cantieri, delineatori e posa in opera. Produzione certificata EN 12899-1:2007 e preventivi su richiesta.';

export default function Home({ ready, onQuote, onOpenPhoto, onNavigate, onTop }) {
  const wrapper = useRef(null);
  useSmoother(wrapper, ready);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => ScrollTrigger.refresh(), 220);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <>
      <Seo title={HOME_TITLE} description={HOME_DESCRIPTION} />
      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content">
          <main>
            <Hero onQuote={onQuote} onExplore={() => onNavigate('catalogo')} />
            <Intro />
            <ServicesList />
            <HorizontalReel onOpenPhoto={onOpenPhoto} />
            <CatalogTeaser />
            <BentoMosaic onOpenPhoto={onOpenPhoto} />
            <Showreel />
            <Quality />
            <Contact />
          </main>
          <Footer onNavigate={onNavigate} onTop={onTop} />
        </div>
      </div>
    </>
  );
}
