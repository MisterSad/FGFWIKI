import React, { useState, useEffect, useMemo } from 'react';
import { Ship, Users, Sword, Shield, Crosshair, Leaf, TrendingUp, Crown } from 'lucide-react'; // Import icons
import { useTranslation } from 'react-i18next';

const CyclingHeroSlot = ({ slot, idx, t }) => {
    // Check if slot name has alternatives (e.g., "Killer Bee / Cocoon")
    const names = useMemo(() => slot.name.split('/').map(n => n.trim()), [slot.name]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (names.length > 1) {
            const timer = setInterval(() => {
                setCurrentIdx(prev => (prev + 1) % names.length);
                setImageError(false); // Reset error state when image changes
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [names.length]);

    const currentName = names[currentIdx];

    return (
        <div style={{
            background: 'var(--bg-surface)',
            padding: '1rem',
            borderRadius: '2px',
            border: '1px solid var(--border)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <div style={{
                position: 'absolute', top: '10px', left: '10px',
                background: 'var(--bg-void)', border: '1px solid var(--border)',
                borderRadius: '50%', width: '24px', height: '24px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 'bold',
                color: 'var(--text-secondary)'
            }}>
                {idx + 1}
            </div>

            {/* Hero Image or SVG Fallback */}
            <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--bg-void)',
                borderRadius: '50%',
                marginBottom: '0.8rem',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
                overflow: 'hidden'
            }}>
                {!imageError ? (
                    <img
                        key={currentName}
                        src={`/images/${currentName}.png`}
                        alt={currentName}
                        onError={() => setImageError(true)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <Users size={24} />
                )}
            </div>

            <div style={{ marginTop: '0.2rem', fontWeight: 'bold', color: 'var(--gold)' }}>
                {names.length > 1 ? slot.name : currentName}
            </div>

            {/* Show tiny dots if there are multiple characters */}
            {names.length > 1 && (
                <div style={{ display: 'flex', gap: '4px', marginTop: '4px', marginBottom: '4px' }}>
                    {names.map((_, dotIdx) => (
                        <div key={dotIdx} style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: dotIdx === currentIdx ? 'var(--gold)' : 'var(--border)'
                        }} />
                    ))}
                </div>
            )}

            <div className="label-text" style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                {t(slot.role).split(':')[1] || t(slot.role)}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                "{t(slot.reason)}"
            </div>
        </div>
    );
};

export default function TeamDisplay({ deck, isGround = false }) {
    const { t } = useTranslation();

    const getIcon = () => {
        if (!isGround) return <Ship size={24} />;
        if (deck.id === 'early_game') return <Leaf size={24} color="var(--accent-teal)" />;
        if (deck.id === 'mid_game') return <TrendingUp size={24} color="var(--accent-blue)" />;
        if (deck.id === 'late_game') return <Crown size={24} color="var(--gold)" />;
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
                        background: deck.energyType === 'Kinetic' ? 'var(--gold)' : deck.energyType === 'Beam' ? 'var(--accent-teal)' : 'var(--accent-blue)',
                        color: 'var(--bg-void)',
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
                        background: 'var(--bg-elevated)',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'var(--bg-void)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.8rem',
                            border: '1px solid var(--gold)',
                            color: 'var(--text-dim)',
                            fontSize: '0.7rem'
                        }}>
                            <Ship size={32} />
                        </div>
                        <div style={{ color: 'var(--gold-bright)', fontWeight: 'bold', fontSize: '1rem' }}>
                            {deck.energyType === 'Kinetic' ? 'Gram' : deck.energyType === 'Beam' ? 'Opportunity' : 'Demerzel'}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.3rem' }}>
                            {t(`common.${deck.energyType?.toLowerCase()}`)} {t('common.core')}
                        </div>
                    </div>

                    {/* Heroes Grid */}
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {deck.slots.map((slot, idx) => (
                            <CyclingHeroSlot key={idx} slot={slot} idx={idx} t={t} />
                        ))}
                    </div>
                </div>
            )}

            {/* Ground Team Layout (Card Style with Images or SVG Fallback) */}
            {isGround && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                    {deck.members.map((member, idx) => {
                        const [imageError, setImageError] = React.useState(false);
                        return (
                            <div key={idx} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                background: 'var(--bg-void)',
                                padding: '1rem',
                                borderRadius: '2px',
                                border: '1px solid var(--border)'
                            }}>
                                {/* Hero Image or SVG Fallback */}
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'var(--bg-surface)',
                                    borderRadius: '50%',
                                    marginBottom: '0.8rem',
                                    border: '1px solid var(--gold)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    color: 'var(--text-secondary)',
                                    overflow: 'hidden'
                                }}>
                                    {!imageError ? (
                                        <img
                                            src={`/images/${member}.png`}
                                            alt={member}
                                            onError={() => setImageError(true)}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <Users size={32} />
                                    )}
                                </div>

                                <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '1rem' }}>
                                    {member}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
