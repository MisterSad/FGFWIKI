import React from 'react';
import { shipDecks } from '../data/gameData';
import TeamDisplay from './TeamDisplay';
import { Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FlagshipDecks() {
    const { t } = useTranslation();

    return (
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', color: 'var(--text-main)' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    color: 'var(--primary-neon)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textShadow: '0 0 20px rgba(0, 243, 255, 0.3)',
                    marginBottom: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'
                }}>
                    <Layers size={40} /> {t('flagships.decks.title')}
                </h2>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
                    {t('flagships.decks.subtitle')}
                </p>
            </div>


            <div>
                {shipDecks.map(d => <TeamDisplay key={d.id} deck={d} />)}
            </div>
        </div>
    );
}
