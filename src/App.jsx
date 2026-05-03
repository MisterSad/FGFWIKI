import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';

import Guides from './components/Guides';
import FlagshipGuide from './components/FlagshipGuide';
import FlagshipDecks from './components/FlagshipDecks';
import GroundGuide from './components/GroundGuide';
import HeroTierList from './components/HeroTierList';
import EventGuide from './components/EventGuide';
import Builder from './components/Builder';
import DailyChecklist from './components/DailyChecklist';
import GiftCodes from './components/GiftCodes';
import Support from './components/Support';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout onLoginClick={() => setIsLoginModalOpen(true)}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Hero />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/daily-tasks" element={<DailyChecklist />} />
            <Route path="/champions" element={<HeroTierList />} />
            <Route path="/flagships" element={<FlagshipGuide />} />
            <Route path="/flagship-decks" element={<FlagshipDecks />} />
            <Route path="/ground-teams" element={<GroundGuide />} />
            <Route path="/events" element={<EventGuide />} />
            <Route path="/tools" element={<Builder />} />
            <Route path="/gift-codes" element={<GiftCodes />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Layout>
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
