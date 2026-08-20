import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext';
import { getLanguageFromPath } from './i18n';
import Layout from './components/layout/Layout';
import Hero from './components/pages/Hero';
import LoginModal from './components/modals/LoginModal';
import SearchModal from './components/modals/SearchModal';
import ProfileSetupModal from './components/modals/ProfileSetupModal';

// Language-prefixed URLs (/fr/guides, /de/news/...) share a single SPA:
// the prefix is detected at startup and used as the router basename.
const LANG_PREFIX = getLanguageFromPath();
const BASENAME = LANG_PREFIX ? `/${LANG_PREFIX}` : undefined;

// Resilient lazy import that automatically refreshes the page if a new build invalidated chunks
function lazyWithRetry(componentImport) {
  return lazy(async () => {
    const pageHasBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('fgf_page_reloaded_for_chunk') || 'false'
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem('fgf_page_reloaded_for_chunk', 'false');
      return component;
    } catch (error) {
      if (!pageHasBeenForceRefreshed) {
        window.sessionStorage.setItem('fgf_page_reloaded_for_chunk', 'true');
        window.location.reload();
        return { default: () => null };
      }
      throw error;
    }
  });
}

const Guides = lazyWithRetry(() => import('./components/pages/Guides'));
const News = lazyWithRetry(() => import('./components/pages/News'));
const FlagshipGuide = lazyWithRetry(() => import('./components/pages/FlagshipGuide'));
const HeroTierList = lazyWithRetry(() => import('./components/pages/HeroTierList'));
const EventGuide = lazyWithRetry(() => import('./components/pages/EventGuide'));
const Builder = lazyWithRetry(() => import('./components/pages/Builder'));
const GiftCodes = lazyWithRetry(() => import('./components/pages/GiftCodes'));
const CreatorsCorner = lazyWithRetry(() => import('./components/pages/CreatorsCorner'));
const GuildTool = lazyWithRetry(() => import('./components/pages/GuildTool'));
const GameEvolutions = lazyWithRetry(() => import('./components/pages/GameEvolutions'));
const NotFound = lazyWithRetry(() => import('./components/pages/NotFound'));

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
            onProfileClick={() => setIsProfileOpen(true)}
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
        {isProfileOpen && (
          <ProfileSetupModal
            onClose={() => setIsProfileOpen(false)}
          />
        )}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
