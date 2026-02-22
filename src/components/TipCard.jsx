import React from 'react';
import { Lightbulb, Star, BookOpen, Swords, Rocket, Users, Calendar, Trophy, Coins, Hammer, Home } from 'lucide-react';

const CATEGORY_ICONS = {
    beginner: BookOpen,
    combat: Swords,
    meta_ships: Rocket,
    ground: Users,
    events: Calendar,
    tier_list: Trophy,
    economy: Coins,
    builder: Hammer
};

import { useTranslation } from 'react-i18next';

export default function TipCard({ tip }) {
    const { t } = useTranslation();
    const IconComponent = CATEGORY_ICONS[tip.category] || Lightbulb;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(20, 20, 30, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            overflow: 'hidden',
            padding: '1.5rem',
            position: 'relative',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(10px)',
            height: '100%',
            cursor: tip.hasDetails ? 'pointer' : 'default'
        }}
            onClick={tip.onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 243, 255, 0.15)';
                e.currentTarget.style.borderColor = 'var(--primary-neon)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
            }}
        >
            {/* Decorative Icon Background */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                opacity: 0.05,
                transform: 'rotate(15deg)',
                pointerEvents: 'none',
                color: 'white'
            }}>
                <IconComponent size={120} />
            </div>

            <div style={{ flex: 1 }}>
                <h3 style={{
                    fontSize: '1.4rem',
                    color: 'white',
                    marginTop: 0,
                    marginBottom: '1rem',
                    borderBottom: '2px solid var(--primary-neon)',
                    paddingBottom: '0.5rem',
                    display: 'inline-block'
                }}>
                    {t(tip.title)}
                </h3>

                <p style={{
                    color: 'var(--text-dim)',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    position: 'relative',
                    zIndex: 1,
                    margin: 0
                }}>
                    {t(tip.content)}
                </p>
            </div>

            {/* Highlight Badge if applicable */}
            {tip.highlight && (
                <div style={{
                    marginTop: '1.5rem',
                    alignSelf: 'flex-start',
                    background: 'rgba(255, 215, 0, 0.1)',
                    color: '#ffd700',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                }}>
                    <Star size={14} fill="#ffd700" /> Top Tip
                </div>
            )}

            {tip.hasDetails && (
                <div style={{
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    color: 'var(--primary-neon)',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    {t('hero.cta')} →
                </div>
            )}
        </div>
    );
}
