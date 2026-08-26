import { useState, useCallback, useLayoutEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ScrollSmoother } from './lib/gsap';
import { scrollToSection } from './hooks/useSmoother';

import Header from './components/Header';
import NavOverlay from './components/NavOverlay';
import QuoteBar from './components/QuoteBar';
import QuoteModal from './components/QuoteModal';
import Lightbox from './components/Lightbox';
import Home from './pages/Home';
import CatalogPage from './pages/CatalogPage';
import LegalPage from './pages/LegalPage';

function Shell() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isLegal = location.pathname === '/privacy' || location.pathname === '/cookie-policy';

  const [menuOpen, setMenuOpen] = useState(false);
  const [quote, setQuote] = useState({ open: false, product: null });
  const [photo, setPhoto] = useState(null);
  const previousPath = useRef(location.pathname);

  useLayoutEffect(() => {
    const entersCatalog =
      location.pathname.startsWith('/catalogo') && !previousPath.current.startsWith('/catalogo');
    previousPath.current = location.pathname;
    if (entersCatalog) setMenuOpen(false);
  }, [location.pathname]);

  /* Le navigazioni provenienti da una pagina interna arrivano alla sezione
     richiesta prima del nuovo fotogramma, senza mostrare lo scorrimento. */
  useLayoutEffect(() => {
    const section = location.state?.instantSection;
    if (isHome && section) scrollToSection(section, { instant: true });
  }, [isHome, location.key, location.state]);

  /* Uscendo dalla home lo smoother va spento: vive solo su quella pagina. */
  useLayoutEffect(() => {
    if (!isHome) ScrollSmoother.get()?.kill();
    const restoresCatalogPosition = Number.isFinite(location.state?.restoreCatalogScrollY);
    if (!location.state?.instantSection && !restoresCatalogPosition) window.scrollTo(0, 0);
  }, [isHome, location.pathname, location.state]);

  /* Le voci di menu portano a una sezione della home, da qualunque pagina. */
  const goToSection = useCallback(
    (id) => {
      setMenuOpen(false);
      if (isHome) {
        setTimeout(() => scrollToSection(id, { instant: true }), 0);
      } else {
        navigate('/', { state: { instantSection: id } });
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
    if (isHome) scrollToSection('top');
    else navigate('/');
  }, [isHome, navigate]);

  return (
    <>
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
              ready
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
        <Route
          path="/privacy"
          element={<LegalPage type="privacy" onNavigate={goToSection} />}
        />
        <Route
          path="/cookie-policy"
          element={<LegalPage type="cookie" onNavigate={goToSection} />}
        />
        <Route path="*" element={<CatalogPage onQuote={openQuote} notFound />} />
      </Routes>

      <QuoteBar onQuote={openQuote} hidden={menuOpen || quote.open || Boolean(photo) || isLegal} />
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
