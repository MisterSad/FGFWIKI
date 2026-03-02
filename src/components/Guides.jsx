import React, { useState } from 'react';
import { tips } from '../data/gameData';
import TipCard from './TipCard';
import { BookOpen, Swords, Coins, Lightbulb, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Guides() {
    const { t } = useTranslation();
    const [selectedTip, setSelectedTip] = useState(null);

    const closeModal = () => setSelectedTip(null);

    const beginnerTips = tips.filter(tip => tip.category === 'beginner');
    const combatTips = tips.filter(tip => tip.category === 'combat');
    const economyTips = tips.filter(tip => tip.category === 'economy');

    if (selectedTip && selectedTip.hasDetails) {
        return (
            <div className="container fade-in" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem', paddingTop: '2rem' }}>
                {/* Back Button */}
                <button
                    onClick={closeModal}
                    className="label-text"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        background: 'transparent',
                        border: '1px solid var(--gold)',
                        color: 'var(--gold)',
                        padding: '0.8rem 1.5rem',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        marginBottom: '2rem',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--gold)';
                        e.currentTarget.style.color = 'var(--bg-void)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--gold)';
                    }}
                >
                    <ArrowLeft size={20} /> {t('common.back', 'BACK')}
                </button>

                <div
                    className="glass-panel"
                    style={{
                        padding: '3rem',
                        border: '1px solid var(--gold)',
                        boxShadow: '0 0 50px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    {/* Header */}
                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                        <h2 style={{ fontFamily: 'var(--font-hero)', textTransform: 'uppercase', margin: '0 0 0.5rem', fontSize: '2.5rem', color: 'var(--gold-bright)' }}>{t(selectedTip.title)}</h2>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span className="label-text" style={{
                                background: 'var(--bg-void)',
                                color: 'var(--accent-teal)',
                                border: '1px solid var(--accent-teal)',
                                padding: '6px 16px',
                                borderRadius: '2px',
                                fontSize: '1.1rem'
                            }}>
                                {t(`categories.${selectedTip.category}`)}
                            </span>
                        </div>
                    </div>

                    {/* Guide Sections */}
                    {selectedTip.sections && selectedTip.sections.map((section, idx) => (
                        <div key={idx} style={{ marginBottom: '3rem' }}>
                            {section.header && (
                                <h3 className="label-text" style={{
                                    color: 'var(--text-primary)',
                                    fontSize: '1.6rem',
                                    marginBottom: '1.5rem',
                                    borderBottom: '1px solid var(--gold)',
                                    paddingBottom: '0.5rem',
                                    display: 'inline-block'
                                }}>
                                    {t(section.header)}
                                </h3>
                            )}

                            {section.text && (
                                <p style={{
                                    color: 'var(--text-main)',
                                    lineHeight: '1.8',
                                    fontSize: '1.1rem',
                                    whiteSpace: 'pre-line',
                                    marginBottom: '1.5rem'
                                }}>
                                    {t(section.text)}
                                </p>
                            )}

                            {section.image && (
                                <div style={{ margin: '2rem 0', textAlign: 'center' }}>
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
                                <div style={{ marginBottom: '2.5rem', overflowX: 'auto' }}>
                                    <table style={{ fontFamily: 'var(--font-mono)', width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
                                        <thead>
                                            <tr style={{ background: 'var(--bg-void)' }}>
                                                {section.grid.headers.map((header, hIdx) => (
                                                    <th key={hIdx} style={{ padding: '16px', textAlign: 'left', color: 'var(--gold)', borderBottom: '1px solid var(--border)' }}>
                                                        {t(header)}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section.grid.rows.map((row, rIdx) => (
                                                <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? 'var(--bg-void)' : 'transparent' }}>
                                                    {row.map((cell, cIdx) => (
                                                        <td key={cIdx} style={{ padding: '16px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', lineHeight: '1.5' }}>
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
                                    gap: '1rem',
                                    marginTop: '1.5rem',
                                    color: 'var(--gold)',
                                    background: 'var(--bg-void)',
                                    padding: '1.5rem',
                                    borderRadius: '2px',
                                    borderLeft: '4px solid var(--gold)'
                                }}>
                                    <Lightbulb size={28} style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <span style={{ fontSize: '1.05rem', lineHeight: '1.6', fontStyle: 'italic', color: 'var(--text-dim)' }}>
                                        {t(section.note)}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '4rem' }}>

                {/* Start Guide Section */}
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-hero)',
                        fontSize: '2rem',
                        color: 'var(--gold)',
                        marginBottom: '1.5rem',
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        borderBottom: '1px solid var(--border)',
                        paddingBottom: '0.5rem',
                        textTransform: 'uppercase'
                    }}>
                        <BookOpen size={32} /> <span className="label-text">{t('guides.start_guide')}</span>
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
                        fontFamily: 'var(--font-hero)',
                        fontSize: '2rem',
                        color: 'var(--accent-teal)',
                        marginBottom: '1.5rem',
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        borderBottom: '1px solid var(--border)',
                        paddingBottom: '0.5rem',
                        textTransform: 'uppercase'
                    }}>
                        <Swords size={32} /> <span className="label-text">{t('guides.combat_tactics')}</span>
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
                        fontFamily: 'var(--font-hero)',
                        fontSize: '2rem',
                        color: 'var(--accent-blue)',
                        marginBottom: '1.5rem',
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        borderBottom: '1px solid var(--border)',
                        paddingBottom: '0.5rem',
                        textTransform: 'uppercase'
                    }}>
                        <Coins size={32} /> <span className="label-text">{t('guides.economy')}</span>
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

        </>
    );
}
