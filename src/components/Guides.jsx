import React, { useState } from 'react';
import { tips } from '../data/gameData';
import TipCard from './TipCard';
import { BookOpen, Swords, Coins, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Guides() {
    const { t } = useTranslation();
    const [selectedTip, setSelectedTip] = useState(null);

    const closeModal = () => setSelectedTip(null);

    const beginnerTips = tips.filter(tip => tip.category === 'beginner');
    const combatTips = tips.filter(tip => tip.category === 'combat');
    const economyTips = tips.filter(tip => tip.category === 'economy');

    return (
        <>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '4rem' }}>

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
                            <TipCard
                                key={tip.id}
                                tip={{
                                    ...tip,
                                    onClick: () => tip.hasDetails && setSelectedTip(tip)
                                }}
                            />
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

            {/* FULL SCREEN MODAL FOR DETAILED GUIDES */}
            {selectedTip && selectedTip.hasDetails && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(8px)',
                        zIndex: 1000,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem'
                    }}
                    onClick={closeModal}
                >
                    <div
                        className="glass-panel"
                        style={{
                            width: '100%',
                            maxWidth: '900px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            padding: '2.5rem',
                            position: 'relative',
                            border: '1px solid var(--primary-neon)',
                            boxShadow: '0 0 50px rgba(0, 243, 255, 0.2)',
                            background: 'rgba(20, 20, 30, 0.95)'
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-dim)',
                                fontSize: '2rem',
                                cursor: 'pointer',
                                lineHeight: 1
                            }}
                        >
                            &times;
                        </button>

                        {/* Modal Header */}
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                            <h2 style={{ margin: '0 0 0.5rem', fontSize: '2rem', color: 'var(--primary-neon)' }}>{t(selectedTip.title)}</h2>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <span style={{
                                    background: 'rgba(0, 243, 255, 0.1)',
                                    color: 'var(--primary-neon)',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    fontSize: '0.85rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}>
                                    {t(`categories.${selectedTip.category}`)}
                                </span>
                            </div>
                        </div>

                        {/* Guide Sections */}
                        {selectedTip.sections && selectedTip.sections.map((section, idx) => (
                            <div key={idx} style={{ marginBottom: '2rem' }}>
                                {section.header && (
                                    <h3 style={{
                                        color: 'white',
                                        fontSize: '1.4rem',
                                        marginBottom: '1rem',
                                        borderBottom: '1px solid rgba(0, 243, 255, 0.3)',
                                        paddingBottom: '0.5rem',
                                        display: 'inline-block'
                                    }}>
                                        {t(section.header)}
                                    </h3>
                                )}

                                {section.text && (
                                    <p style={{
                                        color: 'var(--text-main)',
                                        lineHeight: '1.7',
                                        fontSize: '1.05rem',
                                        whiteSpace: 'pre-line',
                                        marginBottom: '1rem'
                                    }}>
                                        {t(section.text)}
                                    </p>
                                )}

                                {section.image && (
                                    <div style={{ margin: '1.5rem 0', textAlign: 'center' }}>
                                        <img
                                            src={section.image}
                                            alt={section.header ? t(section.header) : "Guide Illustration"}
                                            style={{
                                                maxWidth: '100%',
                                                height: 'auto',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                                            }}
                                        />
                                    </div>
                                )}

                                {section.grid && (
                                    <div style={{ marginBottom: '2rem', overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                                            <thead>
                                                <tr style={{ background: 'rgba(0, 243, 255, 0.1)' }}>
                                                    {section.grid.headers.map((header, hIdx) => (
                                                        <th key={hIdx} style={{ padding: '12px', textAlign: 'left', color: 'var(--primary-neon)', borderBottom: '1px solid var(--primary-neon)' }}>
                                                            {t(header)}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {section.grid.rows.map((row, rIdx) => (
                                                    <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                                                        {row.map((cell, cIdx) => (
                                                            <td key={cIdx} style={{ padding: '12px', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                                {t(cell)}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {section.note && (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.8rem',
                                        marginTop: '1rem',
                                        color: '#ffd700',
                                        background: 'rgba(255, 215, 0, 0.05)',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        borderLeft: '3px solid #ffd700'
                                    }}>
                                        <Lightbulb size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <span style={{ fontSize: '0.95rem', lineHeight: '1.5', fontStyle: 'italic' }}>
                                            {t(section.note)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </>
    );
}
