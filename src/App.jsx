import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext';
import { getLanguageFromPath } from './i18n';
import Layout from './components/layout/Layout';
import Hero from './components/pages/Hero';
import LoginModal from './components/modals/LoginModal';
import SearchModal from './components/modals/SearchModal';

// Language-prefixed URLs (/fr/guides, /de/news/...) share a single SPA:
// the prefix is detected at startup and used as the router basename.
const LANG_PREFIX = getLanguageFromPath();
const BASENAME = LANG_PREFIX ? `/${LANG_PREFIX}` : undefined;

const Guides = lazy(() => import('./components/pages/Guides'));
const News = lazy(() => import('./components/pages/News'));
const FlagshipGuide = lazy(() => import('./components/pages/FlagshipGuide'));
const HeroTierList = lazy(() => import('./components/pages/HeroTierList'));
const EventGuide = lazy(() => import('./components/pages/EventGuide'));
const Builder = lazy(() => import('./components/pages/Builder'));
const GiftCodes = lazy(() => import('./components/pages/GiftCodes'));
const StellaAnomaly = lazy(() => import('./components/pages/StellaAnomaly'));
const CreatorsCorner = lazy(() => import('./components/pages/CreatorsCorner'));
const GuildTool = lazy(() => import('./components/pages/GuildTool'));
const GameEvolutions = lazy(() => import('./components/pages/GameEvolutions'));
const NotFound = lazy(() => import('./components/pages/NotFound'));

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut for Spotlight Search (Cmd+K, Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter basename={BASENAME}>
        <Suspense fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0a0a0c', color: 'var(--text-dim)', fontFamily: 'var(--font-label)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Loading FGF Wiki...
          </div>
        }>
          <Layout 
            onLoginClick={() => setIsLoginModalOpen(true)}
            onSearchClick={() => setIsSearchOpen(true)}
          >
            <Suspense fallback={
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', color: 'var(--text-dim)', fontFamily: 'var(--font-label)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Loading Data...
              </div>
            }>
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Hero />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:newsId" element={<News />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/guides/:guideId" element={<Guides />} />
                <Route path="/champions" element={<HeroTierList />} />
                <Route path="/flagships" element={<FlagshipGuide />} />
                <Route path="/flagship-decks" element={<Navigate to="/flagships?tab=decks" replace />} />
                <Route path="/ground-teams" element={<Navigate to="/champions?tab=ground" replace />} />
                <Route path="/events" element={<EventGuide />} />
                <Route path="/events/:eventId" element={<EventGuide />} />
                <Route path="/tools" element={<Builder />} />
                <Route path="/gift-codes" element={<GiftCodes />} />
                <Route path="/stella-anomaly" element={<StellaAnomaly />} />
                <Route path="/creators" element={<CreatorsCorner />} />
                <Route path="/creators/:creatorId" element={<CreatorsCorner />} />
                <Route path="/guild-tool" element={<GuildTool />} />
                <Route path="/evolutions" element={<GameEvolutions />} />
                <Route path="/evolutions/:threadId" element={<GameEvolutions />} />
                <Route path="/game-evolutions" element={<Navigate to="/evolutions" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </Suspense>
        <Analytics />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
