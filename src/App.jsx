import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ScrollSmoother } from './lib/gsap';
import { scrollToSection } from './hooks/useSmoother';

import Preloader from './components/Preloader';
import Header from './components/Header';
import NavOverlay from './components/NavOverlay';
import QuoteBar from './components/QuoteBar';
import QuoteModal from './components/QuoteModal';
import Lightbox from './components/Lightbox';
import Home from './pages/Home';
import CatalogPage from './pages/CatalogPage';

function Shell() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  /* Il caricamento appare a ogni ricarica e quando si entra nel catalogo. */
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quote, setQuote] = useState({ open: false, product: null });
  const [photo, setPhoto] = useState(null);
  const previousPath = useRef(location.pathname);

  useLayoutEffect(() => {
    const wasCatalog = previousPath.current.startsWith('/catalogo');
    const entersCatalog = location.pathname.startsWith('/catalogo') && !wasCatalog;
    previousPath.current = location.pathname;

    if (entersCatalog) {
      setMenuOpen(false);
      setLoading(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('is-locked', loading);
  }, [loading]);

  /* Uscendo dalla home lo smoother va spento: vive solo su quella pagina. */
  useEffect(() => {
    if (!isHome) ScrollSmoother.get()?.kill();
    window.scrollTo(0, 0);
  }, [isHome, location.pathname]);

  /* Le voci di menu portano a una sezione della home, da qualunque pagina. */
  const goToSection = useCallback(
    (id) => {
      setMenuOpen(false);
      if (isHome) {
        setTimeout(() => scrollToSection(id), 480);
      } else {
        navigate('/');
        setTimeout(() => scrollToSection(id), 700);
      }
    },
    [isHome, navigate]
  );

  const openQuote = useCallback((product = null) => setQuote({ open: true, product }), []);
  const closeQuote = useCallback(() => setQuote((q) => ({ ...q, open: false })), []);
  const toTop = useCallback(() => {
    if (isHome) scrollToSection('top');
    else navigate('/');
  }, [isHome, navigate]);

  const onLogoClick = useCallback(() => {
    setMenuOpen(false);
    setLoading(true);
    if (isHome) scrollToSection('top');
    else navigate('/');
  }, [isHome, navigate]);

  return (
    <>
      {loading && (
        <Preloader onDone={() => setLoading(false)} />
      )}

      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        onLogoClick={onLogoClick}
        solid={!isHome}
      />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={goToSection} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              ready={!loading}
              onQuote={() => openQuote()}
              onOpenPhoto={setPhoto}
              onNavigate={goToSection}
              onTop={toTop}
            />
          }
        />
        <Route path="/catalogo" element={<CatalogPage onQuote={openQuote} />} />
        <Route path="/catalogo/:macroId" element={<CatalogPage onQuote={openQuote} />} />
        <Route path="/catalogo/:macroId/:articleId" element={<CatalogPage onQuote={openQuote} />} />
        <Route path="*" element={<CatalogPage onQuote={openQuote} notFound />} />
      </Routes>

      <QuoteBar onQuote={openQuote} hidden={menuOpen || quote.open || Boolean(photo)} />
      <QuoteModal open={quote.open} product={quote.product} onClose={closeQuote} />
      <Lightbox slug={photo} onClose={() => setPhoto(null)} onChange={setPhoto} />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
