import { useRef, useState, useCallback, useEffect } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { useSmoother, scrollToSection } from './hooks/useSmoother';

import Preloader from './components/Preloader';
import Header from './components/Header';
import NavOverlay from './components/NavOverlay';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Intro from './components/Intro';
import ServicesList from './components/ServicesList';
import HorizontalReel from './components/HorizontalReel';
import BentoMosaic from './components/BentoMosaic';
import Showreel from './components/Showreel';
import Catalog from './components/Catalog';
import Quality from './components/Quality';
import Contact from './components/Contact';
import Footer from './components/Footer';
import QuoteBar from './components/QuoteBar';
import QuoteModal from './components/QuoteModal';
import Lightbox from './components/Lightbox';

export default function App() {
  const wrapper = useRef(null);
  /* L'animazione di caricamento si vede una volta per sessione:
     alla seconda visita la pagina si apre subito. */
  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem('mm-visited')
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [quote, setQuote] = useState({ open: false, product: null });
  const [photo, setPhoto] = useState(null);

  useSmoother(wrapper, !loading);

  /* Durante il caricamento la pagina non scorre */
  useEffect(() => {
    document.body.classList.toggle('is-locked', loading);
  }, [loading]);

  /* A caricamento finito le misure vanno ricalcolate: le immagini
     potrebbero aver cambiato l'altezza delle sezioni. */
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => ScrollTrigger.refresh(), 220);
    return () => clearTimeout(t);
  }, [loading]);

  const navigate = useCallback((id) => {
    setMenuOpen(false);
    setTimeout(() => scrollToSection(id), 480);
  }, []);

  const openQuote = useCallback((product = null) => {
    setQuote({ open: true, product });
  }, []);

  const closeQuote = useCallback(() => {
    setQuote((q) => ({ ...q, open: false }));
  }, []);

  const toTop = useCallback(() => scrollToSection('top'), []);

  return (
    <>
      {loading && (
        <Preloader
          onDone={() => {
            sessionStorage.setItem('mm-visited', '1');
            setLoading(false);
          }}
        />
      )}

      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        onLogoClick={toTop}
      />

      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={navigate} />

      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content">
          <main>
            <Hero onQuote={() => openQuote()} onExplore={() => navigate('catalogo')} />
            <Marquee />
            <Intro />
            <ServicesList />
            <HorizontalReel onOpenPhoto={setPhoto} />
            <BentoMosaic onOpenPhoto={setPhoto} />
            <Showreel />
            <Catalog onQuote={openQuote} />
            <Quality />
            <Contact />
          </main>

          <Footer onNavigate={navigate} onTop={toTop} />
        </div>
      </div>

      <QuoteBar onQuote={openQuote} hidden={menuOpen || quote.open || Boolean(photo)} />

      <QuoteModal open={quote.open} product={quote.product} onClose={closeQuote} />

      <Lightbox slug={photo} onClose={() => setPhoto(null)} onChange={setPhoto} />
    </>
  );
}
