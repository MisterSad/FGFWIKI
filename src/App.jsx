import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';

const Guides = lazy(() => import('./components/Guides'));
const FlagshipGuide = lazy(() => import('./components/FlagshipGuide'));
const HeroTierList = lazy(() => import('./components/HeroTierList'));
const EventGuide = lazy(() => import('./components/EventGuide'));
const Builder = lazy(() => import('./components/Builder'));
const GiftCodes = lazy(() => import('./components/GiftCodes'));
const Support = lazy(() => import('./components/Support'));

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0a0a0c', color: 'var(--text-dim)', fontFamily: 'var(--font-label)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Loading FGF Wiki...
          </div>
        }>
          <Layout onLoginClick={() => setIsLoginModalOpen(true)}>
            <Suspense fallback={
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', color: 'var(--text-dim)', fontFamily: 'var(--font-label)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Loading Data...
              </div>
            }>
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Hero />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/guides/:guideId" element={<Guides />} />
                <Route path="/daily-tasks" element={<Navigate to="/guides?tab=daily-tasks" replace />} />
                <Route path="/champions" element={<HeroTierList />} />
                <Route path="/flagships" element={<FlagshipGuide />} />
                <Route path="/flagship-decks" element={<Navigate to="/flagships?tab=decks" replace />} />
                <Route path="/ground-teams" element={<Navigate to="/champions?tab=ground" replace />} />
                <Route path="/events" element={<EventGuide />} />
                <Route path="/events/:eventId" element={<EventGuide />} />
                <Route path="/tools" element={<Builder />} />
                <Route path="/gift-codes" element={<GiftCodes />} />
                <Route path="/support" element={<Support />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </Suspense>
          </Layout>
        </Suspense>
        <Analytics />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
