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
        <div className="card reveal" style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            height: '100%',
            boxSizing: 'border-box',
            cursor: tip.hasDetails ? 'pointer' : 'default'
        }}
            onClick={tip.hasDetails ? tip.onClick : undefined}
        >
            <div className="scan-line"></div>

            {/* Ornaments for important cards */}
            {tip.highlight && (
                <>
                    <div className="corner-tl"></div>
                    <div className="corner-br"></div>
                </>
            )}

            {/* Decorative Icon Background */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                opacity: 0.05,
                transform: 'rotate(15deg)',
                pointerEvents: 'none',
                color: 'var(--gold)'
            }}>
                <IconComponent size={140} strokeWidth={1} />
            </div>

            <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                <h3 style={{
                    color: 'var(--text-primary)',
                    marginTop: 0,
                    marginBottom: '1rem',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '0.8rem',
                    display: 'block' // Ensure full width border
                }}>
                    {t(tip.title)}
                </h3>

                <p style={{
                    color: 'var(--text-secondary)',
                    margin: 0
                }}>
                    {t(tip.content)}
                </p>
            </div>

            {/* Highlight Badge if applicable */}
            {tip.highlight && (
                <div className="label-text" style={{
                    marginTop: '2rem',
                    alignSelf: 'flex-start',
                    color: 'var(--gold-bright)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Star size={14} strokeWidth={1.5} /> {t('core.important', 'CRITICAL')}
                </div>
            )}

            {tip.hasDetails && (
                <div style={{
                    marginTop: 'auto',
                    paddingTop: '2rem',
                    color: 'var(--gold)',
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    opacity: 0.8
                }}>
                    {t('hero.cta', 'DETAILS')}
                    <span style={{ fontSize: '1.2em' }}>→</span>
                </div>
            )}
        </div>
    );
}
