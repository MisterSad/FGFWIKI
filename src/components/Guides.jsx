import React from 'react';
import { tips } from '../data/gameData';
import TipCard from './TipCard';
import { BookOpen, Swords, Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DailyChecklist from './DailyChecklist';

export default function Guides() {
    const { t } = useTranslation();
    const beginnerTips = tips.filter(tip => tip.category === 'beginner');
    const combatTips = tips.filter(tip => tip.category === 'combat');
    const economyTips = tips.filter(tip => tip.category === 'economy');

    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '4rem' }}>

            {/* Daily Checklist Section */}
            <DailyChecklist />

            {/* Start Guide Section */}
            <div style={{ marginBottom: '4rem' }}>
                <h2 style={{
                    fontSize: '2rem',
                    color: 'var(--primary-neon)',
                    marginBottom: '1.5rem',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '0.5rem'
                }}>
                    <BookOpen size={32} /> {t('guides.start_guide')}
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '1.5rem',
                    alignItems: 'stretch'
                }}>
                    {beginnerTips.map(tip => (
                        <TipCard key={tip.id} tip={tip} />
                    ))}
                </div>
            </div>

            {/* Combat Tactics Section */}
            <div>
                <h2 style={{
                    fontSize: '2rem',
                    color: 'var(--primary-neon)',
                    marginBottom: '1.5rem',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '0.5rem'
                }}>
                    <Swords size={32} /> {t('guides.combat_tactics')}
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '1.5rem',
                    alignItems: 'stretch'
                }}>
                    {combatTips.map(tip => (
                        <TipCard key={tip.id} tip={tip} />
                    ))}
                </div>
            </div>

            {/* Economy Section */}
            <div style={{ marginTop: '4rem' }}>
                <h2 style={{
                    fontSize: '2rem',
                    color: 'var(--primary-neon)',
                    marginBottom: '1.5rem',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '0.5rem'
                }}>
                    <Coins size={32} /> {t('guides.economy')}
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '1.5rem',
                    alignItems: 'stretch'
                }}>
                    {economyTips.map(tip => (
                        <TipCard key={tip.id} tip={tip} />
                    ))}
                </div>
            </div>

        </div>
    );
}
