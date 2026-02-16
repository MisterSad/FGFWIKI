import React from 'react';
import { Ship, Users, Sword, Shield, Crosshair, Leaf, TrendingUp, Crown } from 'lucide-react'; // Import icons
import { useTranslation } from 'react-i18next';

export default function TeamDisplay({ deck, isGround = false }) {
    const { t } = useTranslation();

    const getIcon = () => {
        if (!isGround) return <Ship size={24} />;
        if (deck.id === 'early_game') return <Leaf size={24} color="#4ade80" />;
        if (deck.id === 'mid_game') return <TrendingUp size={24} color="#60a5fa" />;
        if (deck.id === 'late_game') return <Crown size={24} color="#fbbf24" />;
        return <Users size={24} />;
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {getIcon()}
                    {t(deck.title)}
                </h3>
                {!isGround && (
                    <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        background: deck.energyType === 'Kinetic' ? '#FFD700' : deck.energyType === 'Beam' ? '#00F3FF' : '#BF55EC',
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: '0.8rem'
                    }}>
                        {t(`common.${deck.energyType?.toLowerCase()}`)}
                    </span>
                )}
            </div>

            <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>{t(deck.description)}</p>

            {/* Ship Slots Layout (Flagship Left + 1 -> 2 -> 3) */}
            {!isGround && (
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

                    {/* Flagship SVG Placeholder */}
                    <div style={{
                        flex: '0 0 120px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.8rem',
                            border: '2px dashed var(--primary-neon)',
                            color: 'var(--text-dim)',
                            fontSize: '0.7rem'
                        }}>
                            <Ship size={32} />
                        </div>
                        <div style={{ color: 'var(--primary-neon)', fontWeight: 'bold', fontSize: '1rem' }}>
                            {deck.energyType === 'Kinetic' ? 'Gram' : deck.energyType === 'Beam' ? 'Opportunity' : 'Demerzel'}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.3rem' }}>
                            {t(`common.${deck.energyType?.toLowerCase()}`)} {t('common.core')}
                        </div>
                    </div>

                    {/* Heroes Grid */}
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {deck.slots.map((slot, idx) => (
                            <div key={idx} style={{
                                background: 'rgba(0,0,0,0.3)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                position: 'relative',
                                display: 'flex', /* Align content */
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    position: 'absolute', top: '10px', left: '10px',
                                    background: 'var(--bg-deep)', border: '1px solid var(--text-dim)',
                                    borderRadius: '50%', width: '24px', height: '24px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.8rem', fontWeight: 'bold'
                                }}>
                                    {idx + 1}
                                </div>

                                {/* Hero SVG Placeholder */}
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'rgba(0,0,0,0.5)',
                                    borderRadius: '50%',
                                    marginBottom: '0.8rem',
                                    border: '1px dashed var(--text-dim)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    color: 'var(--text-dim)'
                                }}>
                                    <Users size={24} />
                                </div>

                                <div style={{ marginTop: '0.2rem', fontWeight: 'bold', color: 'var(--primary-neon)' }}>{slot.name}</div>
                                <div style={{ fontSize: '0.8rem', color: '#fff', opacity: 0.8, marginTop: '0.25rem' }}>{t(slot.role).split(':')[1] || t(slot.role)}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                                    "{t(slot.reason)}"
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Ground Team Layout (Card Style with SVG Placeholders) */}
            {isGround && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                    {deck.members.map((member, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            {/* Hero SVG Placeholder */}
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'rgba(0,0,0,0.5)',
                                borderRadius: '50%',
                                marginBottom: '0.8rem',
                                border: '2px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                color: 'var(--text-dim)',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                            }}>
                                <Users size={32} />
                            </div>

                            <div style={{ fontWeight: 'bold', color: 'white', fontSize: '1rem' }}>
                                {member}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
