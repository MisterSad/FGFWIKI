import React from 'react';
import { tips } from '../data/gameData';
import { Swords, Star } from 'lucide-react';

export default function CombatTactics() {
    const combatTips = tips.filter(tip => tip.category === 'combat');

    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {/* Grid Layout (Uniform Size) */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem',
                alignItems: 'stretch' // Ensures all cards in a row have the same height
            }}>
                {combatTips.map(tip => (
                    <div className="card reveal" key={tip.id} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'var(--bg-void)',
                        border: '1px solid var(--border)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        padding: '1.5rem',
                        position: 'relative',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                        boxShadow: 'none',
                        height: '100%' // Stretch to fill grid cell
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
                            e.currentTarget.style.borderColor = 'var(--gold)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = 'var(--border)';
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
                            <Swords size={120} />
                        </div>

                        <div style={{ flex: 1 }}>
                            <h3 className="label-text" style={{
                                fontSize: '1.4rem',
                                color: 'var(--text-primary)',
                                marginTop: 0,
                                marginBottom: '1rem',
                                borderBottom: '1px solid var(--gold)',
                                paddingBottom: '0.5rem',
                                display: 'inline-block'
                            }}>
                                {tip.title}
                            </h3>

                            <p style={{
                                color: 'var(--text-dim)',
                                lineHeight: '1.6',
                                fontSize: '0.95rem',
                                position: 'relative',
                                zIndex: 1,
                                margin: 0
                            }}>
                                {tip.content}
                            </p>
                        </div>

                        {/* Highlight Badge if applicable */}
                        {tip.highlight && (
                            <div className="label-text" style={{
                                marginTop: '1.5rem',
                                alignSelf: 'flex-start',
                                background: 'var(--bg-void)',
                                color: 'var(--gold)',
                                padding: '4px 8px',
                                borderRadius: '2px',
                                fontSize: '0.75rem',
                                border: '1px solid var(--gold)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem'
                            }}>
                                <Star size={14} color="var(--gold)" /> Key Strategy
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
