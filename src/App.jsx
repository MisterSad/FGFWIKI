import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import TipCard from './components/TipCard';

import Guides from './components/Guides';
import FlagshipGuide from './components/FlagshipGuide';
import FlagshipDecks from './components/FlagshipDecks';
import GroundGuide from './components/GroundGuide';
import HeroTierList from './components/HeroTierList';
import TeamDisplay from './components/TeamDisplay';
import EventGuide from './components/EventGuide';
import Builder from './components/Builder';
import DailyChecklist from './components/DailyChecklist';
import GiftCodes from './components/GiftCodes';
import { tips, shipDecks, groundTeams } from './data/gameData';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('bgmMuted');
    return saved !== null ? saved === 'true' : true; // Default to muted to respect autoplay policies
  });
  const audioRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('bgmMuted', isMuted);
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Autoplay prevented by browser:', e));
      }
    }
  }, [isMuted]);

  const toggleMute = () => setIsMuted(!isMuted);

  // Attempt to autoplay on first user interaction if not muted
  useEffect(() => {
    const handleInteraction = () => {
      if (!isMuted && audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(e => console.log('Playback prevented:', e));
      }
    };
    document.addEventListener('click', handleInteraction, { once: true });
    return () => document.removeEventListener('click', handleInteraction);
  }, [isMuted]);

  const renderContent = () => {
    // Overview / Home Content
    if (activeCategory === 'all') {
      return (
        <>
          <Hero />
        </>
      );
    }

    if (activeCategory === 'guides') return <Guides />;
    if (activeCategory === 'daily_tasks') return <DailyChecklist />;
    if (activeCategory === 'tier_list') return <HeroTierList />;
    if (activeCategory === 'meta_ships') return <FlagshipGuide />;
    if (activeCategory === 'flagship_decks') return <FlagshipDecks />;
    if (activeCategory === 'ground') return <GroundGuide />;
    if (activeCategory === 'events') return <EventGuide />;
    if (activeCategory === 'builder') return <Builder />;
    if (activeCategory === 'gift_codes') return <GiftCodes />;

    // Filtered Tips
    const filteredTips = tips.filter(tip => tip.category === activeCategory);

    return (
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '4rem',
          alignItems: 'stretch'
        }}>
          {filteredTips.map(tip => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/Foundation%20Main%20Title.mp3" loop />
      <Layout
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        isMuted={isMuted}
        toggleMute={toggleMute}
      >
        {renderContent()}
      </Layout>
      <Analytics />
    </>
  );
}

export default App;
