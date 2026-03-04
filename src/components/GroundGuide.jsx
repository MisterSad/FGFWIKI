import React from 'react';
import { groundTeams } from '../data/gameData';
import TeamDisplay from './TeamDisplay';
import { Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function GroundGuide() {
    const { t } = useTranslation();

    return (
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', color: 'var(--text-main)', paddingBottom: '4rem' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: '2.5rem',
                    color: "#FFFFFF",
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'
                }}>
                    <Users size={40} /> {t('ground_guide.title')}
                </h2>
                <p className="label-text" style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                    {t('ground_guide.subtitle')}
                </p>
            </div>

            {/* Teams Content */}
            <div>
                {groundTeams.map(deck => (
                    <TeamDisplay key={deck.id} deck={deck} isGround={true} />
                ))}
            </div>
        </div>
    );
}
