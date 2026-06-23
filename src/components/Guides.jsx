import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { tips } from '../data/gameData';
import TipCard from './TipCard';
import DailyChecklist from './DailyChecklist';
import { BookOpen, Swords, Coins, Lightbulb, ArrowLeft, Shield, Home, Crown, Users, Calendar, Trophy, Heart, Gift, Star, Sparkles, MessageSquare, AlertTriangle, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Guides() {
    const { t } = useTranslation();
    const { guideId } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') === 'daily-tasks' ? 'daily-tasks' : 'list';

    const setActiveTab = (tab) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('tab', tab);
        setSearchParams(newParams);
    };

    const selectedTip = guideId ? tips.find(tip => String(tip.id) === guideId && tip.category !== 'news') : null;

    const closeModal = () => navigate('/guides');

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
                        color: "#FFFFFF",
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
                        padding: 'clamp(1rem, 5vw, 3rem)',
                        border: '1px solid var(--gold)',
                        boxShadow: '0 0 50px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    {/* Header */}
                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                        <h1 style={{ fontFamily: 'var(--font-hero)', textTransform: 'uppercase', margin: '0 0 0.5rem', fontSize: 'clamp(1.4rem, 5vw, 2.5rem)', color: 'var(--gold-bright)' }}>{t(selectedTip.title)}</h1>
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

                            {section.quotas && (
                                <div className="migration-quotas-container" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: '1.5rem',
                                    marginTop: '2rem',
                                    marginBottom: '2rem'
                                }}>
                                    {section.quotas.map((quotaGroup, qIdx) => (
                                        <div key={qIdx} className="quota-group-card" style={{
                                            background: 'rgba(255,255,255,0.01)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '6px',
                                            padding: '1.5rem',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--gold)';
                                            e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.1)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border)';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.transform = 'none';
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                                        }}
                                        >
                                            <div>
                                                <h4 style={{
                                                    margin: '0 0 0.5rem 0',
                                                    fontFamily: 'var(--font-label)',
                                                    fontSize: '1.25rem',
                                                    color: 'var(--gold)',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px'
                                                }}>{t(quotaGroup.tierName)}</h4>
                                                <p style={{
                                                    margin: '0 0 1.5rem 0',
                                                    fontSize: '0.85rem',
                                                    color: 'var(--text-dim)',
                                                    lineHeight: '1.4'
                                                }}>{t(quotaGroup.tierDesc)}</p>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                {quotaGroup.quotaDetails.map((detail, dIdx) => (
                                                    <div key={dIdx} style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: '0.5rem 0.75rem',
                                                        background: 'var(--bg-void)',
                                                        borderRadius: '4px',
                                                        borderLeft: `3px solid ${detail.color}`
                                                    }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{t(detail.label)}</span>
                                                            {detail.range && <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>{detail.range}</span>}
                                                        </div>
                                                        <span style={{
                                                            fontSize: '1.1rem',
                                                            fontFamily: 'var(--font-mono)',
                                                            fontWeight: 'bold',
                                                            color: '#FFFFFF',
                                                            background: 'rgba(255,255,255,0.05)',
                                                            padding: '2px 8px',
                                                            borderRadius: '3px'
                                                        }}>{detail.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {section.stages && (
                                <div className="migration-stages-flow" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                    gap: '1.5rem',
                                    marginTop: '2rem',
                                    marginBottom: '2rem'
                                }}>
                                    {section.stages.map((stage, sIdx) => (
                                        <div key={sIdx} className="stage-card" style={{
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '6px',
                                            padding: '1.5rem',
                                            position: 'relative',
                                            transition: 'all 0.3s ease',
                                            overflow: 'hidden'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--gold)';
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.02)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border)';
                                            e.currentTarget.style.transform = 'none';
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                        }}
                                        >
                                            <div style={{
                                                position: 'absolute',
                                                top: '-10px',
                                                right: '-5px',
                                                fontSize: '5rem',
                                                fontWeight: '900',
                                                fontFamily: 'var(--font-hero)',
                                                color: 'var(--gold)',
                                                opacity: 0.08,
                                                lineHeight: '1',
                                                pointerEvents: 'none'
                                            }}>
                                                {stage.number}
                                            </div>
                                            <div style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.8rem',
                                                color: 'var(--gold)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '2px',
                                                marginBottom: '0.5rem'
                                            }}>
                                                {t('common.phase', 'Phase')} 0{stage.number}
                                            </div>
                                            <h4 style={{
                                                color: 'var(--text-primary)',
                                                fontSize: '1.25rem',
                                                margin: '0 0 1rem 0',
                                                fontFamily: 'var(--font-label)',
                                                letterSpacing: '1px'
                                            }}>{t(stage.name)}</h4>
                                            <p style={{
                                                color: 'var(--text-dim)',
                                                fontSize: '0.95rem',
                                                lineHeight: '1.6',
                                                margin: 0
                                            }}>{t(stage.desc)}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {section.methods && (
                                <div className="magnetic-methods-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: '1.5rem',
                                    marginTop: '2rem',
                                    marginBottom: '2rem'
                                }}>
                                    {section.methods.map((method, mIdx) => {
                                        const IconComponent = {
                                            Shield, Home, Crown, Users,
                                            Calendar, Trophy, Heart, Coins, Gift, Star, Sparkles, MessageSquare
                                        }[method.icon] || Shield;
                                        return (
                                            <div key={mIdx} className="method-card" style={{
                                                background: 'rgba(255, 255, 255, 0.01)',
                                                border: '1px solid var(--border)',
                                                borderRadius: '8px',
                                                padding: '1.5rem',
                                                transition: 'all 0.3s ease',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '1rem',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--gold)';
                                                e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.1)';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--border)';
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.transform = 'none';
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                                            }}
                                            >
                                                <div style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    borderRadius: '6px',
                                                    background: 'rgba(212, 175, 55, 0.1)',
                                                    border: '1px solid rgba(212, 175, 55, 0.2)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'var(--gold)',
                                                    transition: 'all 0.3s ease'
                                                }}>
                                                    <IconComponent size={22} />
                                                </div>
                                                <div>
                                                    <h4 style={{
                                                        margin: '0 0 0.5rem 0',
                                                        fontFamily: 'var(--font-label)',
                                                        fontSize: '1.2rem',
                                                        color: 'var(--text-primary)',
                                                        letterSpacing: '0.5px'
                                                    }}>{t(method.title)}</h4>
                                                    <p style={{
                                                        margin: 0,
                                                        fontSize: '0.95rem',
                                                        color: 'var(--text-dim)',
                                                        lineHeight: '1.6'
                                                    }}>{t(method.desc)}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {section.serverGroups && (
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                    marginTop: '1.5rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    {section.serverGroups.map((group, gIdx) => (
                                        <div key={gIdx} style={{
                                            background: 'rgba(212, 175, 55, 0.05)',
                                            border: '1px solid rgba(212, 175, 55, 0.25)',
                                            borderRadius: '6px',
                                            padding: '0.8rem 1.5rem',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '1.1rem',
                                            color: 'var(--gold-bright)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--gold)';
                                            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                                            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.05)';
                                            e.currentTarget.style.transform = 'none';
                                        }}
                                        >
                                            <span style={{ opacity: 0.6, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>SV</span>
                                            <strong>{group}</strong>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {section.effects && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: '1.5rem',
                                    marginTop: '1.5rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    {/* Reset Column */}
                                    <div style={{
                                        background: 'rgba(255, 91, 91, 0.02)',
                                        border: '1px solid rgba(255, 91, 91, 0.15)',
                                        borderRadius: '8px',
                                        padding: '1.5rem'
                                    }}>
                                        <h4 style={{
                                            color: '#ff5b5b',
                                            margin: '0 0 1.5rem 0',
                                            fontFamily: 'var(--font-label)',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '1.1rem',
                                            textTransform: 'uppercase'
                                        }}>
                                            <AlertTriangle size={18} /> {t('common.reset_data', 'RESET DATA')}
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {section.effects.reset.map((item, rIdx) => (
                                                <div key={rIdx} style={{
                                                    display: 'flex',
                                                    gap: '0.8rem',
                                                    alignItems: 'flex-start',
                                                    background: 'rgba(0,0,0,0.2)',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '4px',
                                                    borderLeft: '3px solid #ff5b5b'
                                                }}>
                                                    <span style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.5' }}>{t(item)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Preserved Column */}
                                    <div style={{
                                        background: 'rgba(76, 217, 192, 0.02)',
                                        border: '1px solid rgba(76, 217, 192, 0.15)',
                                        borderRadius: '8px',
                                        padding: '1.5rem'
                                    }}>
                                        <h4 style={{
                                            color: 'var(--accent-teal)',
                                            margin: '0 0 1.5rem 0',
                                            fontFamily: 'var(--font-label)',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '1.1rem',
                                            textTransform: 'uppercase'
                                        }}>
                                            <CheckCircle size={18} /> {t('common.preserved_data', 'PRESERVED DATA')}
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {section.effects.preserved.map((item, pIdx) => (
                                                <div key={pIdx} style={{
                                                    display: 'flex',
                                                    gap: '0.8rem',
                                                    alignItems: 'flex-start',
                                                    background: 'rgba(0,0,0,0.2)',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '4px',
                                                    borderLeft: '3px solid var(--accent-teal)'
                                                }}>
                                                    <span style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.5' }}>{t(item)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {section.combatTypes && (
                                <div className="magnetic-combat-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: '1.5rem',
                                    marginTop: '2rem',
                                    marginBottom: '2rem'
                                }}>
                                    {section.combatTypes.map((type, cIdx) => {
                                        const IconComponent = { Swords, Users }[type.icon] || Swords;
                                        return (
                                            <div key={cIdx} className="combat-card" style={{
                                                background: 'rgba(255, 255, 255, 0.01)',
                                                border: '1px solid var(--border)',
                                                borderRadius: '8px',
                                                padding: '1.5rem',
                                                transition: 'all 0.3s ease',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '1rem',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--gold)';
                                                e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.1)';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--border)';
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.transform = 'none';
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                                            }}
                                            >
                                                <div style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    borderRadius: '6px',
                                                    background: 'rgba(212, 175, 55, 0.1)',
                                                    border: '1px solid rgba(212, 175, 55, 0.2)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'var(--gold)',
                                                    transition: 'all 0.3s ease'
                                                }}>
                                                    <IconComponent size={22} />
                                                </div>
                                                <div>
                                                    <h4 style={{
                                                        margin: '0 0 0.5rem 0',
                                                        fontFamily: 'var(--font-label)',
                                                        fontSize: '1.2rem',
                                                        color: 'var(--text-primary)',
                                                        letterSpacing: '0.5px'
                                                    }}>{t(type.title)}</h4>
                                                    <p style={{
                                                        margin: 0,
                                                        fontSize: '0.95rem',
                                                        color: 'var(--text-dim)',
                                                        lineHeight: '1.6'
                                                    }}>{t(type.desc)}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {section.image && (
                                <div style={{ margin: '2rem 0', textAlign: 'center' }}>
                                    <img
                                        src={section.image}
                                        alt={section.header ? t(section.header) : "Guide Illustration"}
                                        style={{
                                            maxWidth: section.imageMaxWidth || (section.image.includes('MSR') ? '500px' : '100%'),
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                                        }}
                                    />
                                    {section.disclaimer && (
                                        <p style={{
                                            marginTop: '0.75rem',
                                            fontSize: '0.85rem',
                                            color: 'var(--text-dim)',
                                            fontStyle: 'italic',
                                            opacity: 0.8
                                        }}>
                                            * {t(section.disclaimer)}
                                        </p>
                                    )}
                                </div>
                            )}

                            {section.grid && (
                                <div style={{ marginBottom: '2.5rem', overflowX: 'auto' }}>
                                    <table style={{ fontFamily: 'var(--font-mono)', width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
                                        <thead>
                                            <tr style={{ background: 'var(--bg-void)' }}>
                                                {section.grid.headers.map((header, hIdx) => (
                                                    <th key={hIdx} style={{ padding: '16px', textAlign: 'left', color: "#FFFFFF", borderBottom: '1px solid var(--border)' }}>
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

                            {section.cta && (
                                <div className="cta-panel" style={{
                                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(10, 10, 12, 0.95) 100%)',
                                    border: '1px solid var(--gold)',
                                    borderRadius: '8px',
                                    padding: '2.5rem',
                                    marginTop: '3rem',
                                    textAlign: 'center',
                                    boxShadow: '0 0 35px rgba(212, 175, 55, 0.1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1.5rem'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '-20%',
                                        right: '-10%',
                                        fontSize: '12rem',
                                        fontFamily: 'var(--font-hero)',
                                        color: 'var(--gold)',
                                        opacity: 0.03,
                                        pointerEvents: 'none',
                                        fontWeight: 'bold'
                                    }}>
                                        1061
                                    </div>
                                    <h3 style={{
                                        fontFamily: 'var(--font-hero)',
                                        fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                                        color: 'var(--gold-bright)',
                                        margin: 0,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>
                                        {t(section.cta.title)}
                                    </h3>
                                    <p style={{
                                        color: 'var(--text-dim)',
                                        fontSize: '1.1rem',
                                        lineHeight: '1.7',
                                        maxWidth: '700px',
                                        margin: 0
                                    }}>
                                        {t(section.cta.desc)}
                                    </p>
                                    <a
                                        href={section.cta.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                            background: 'var(--gold)',
                                            color: 'var(--bg-void)',
                                            border: '1px solid var(--gold)',
                                            fontFamily: 'var(--font-label)',
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                            padding: '1rem 2.5rem',
                                            borderRadius: '4px',
                                            textDecoration: 'none',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.25)',
                                            marginTop: '0.5rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = 'var(--gold)';
                                            e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.4)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'var(--gold)';
                                            e.currentTarget.style.color = 'var(--bg-void)';
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.25)';
                                            e.currentTarget.style.transform = 'none';
                                        }}
                                    >
                                        {t(section.cta.buttonText)} <ArrowUpRight size={20} />
                                    </a>
                                </div>
                            )}

                            {section.note && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1rem',
                                    marginTop: '1.5rem',
                                    color: "#FFFFFF",
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
                    {/* Author Credit */}
                    {selectedTip.credit && (
                        <div style={{
                            marginTop: '3rem',
                            borderTop: '1px solid var(--border)',
                            paddingTop: '1.5rem',
                            textAlign: 'right',
                            fontSize: '0.9rem',
                            color: 'var(--text-dim)',
                            fontStyle: 'italic'
                        }}>
                            {t(selectedTip.credit)}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '4rem', paddingTop: '2rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    color: "#FFFFFF",
                    textTransform: 'uppercase',
                    letterSpacing: 'clamp(1px, 0.4vw, 2px)',
                    marginBottom: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'
                }}>
                    <BookOpen size={40} /> {t('navigation.guides')}
                </h2>
                <p style={{ color: 'var(--text-dim)', fontSize: 'clamp(0.9rem, 2.4vw, 1.1rem)' }}>
                    {t('seo.guides.description')}
                </p>
            </div>

            {/* Sub-tab switcher */}
            <div className="sub-tabs-container">
                <button
                    className={`sub-tab-button ${activeTab === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveTab('list')}
                >
                    {t('navigation.guides')}
                </button>
                <button
                    className={`sub-tab-button ${activeTab === 'daily-tasks' ? 'active' : ''}`}
                    onClick={() => setActiveTab('daily-tasks')}
                >
                    {t('daily_checklist.title')}
                </button>
            </div>

            {activeTab === 'list' ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '1.5rem',
                    alignItems: 'stretch'
                }}>
                    {[...tips]
                        .filter(tip => tip.hasDetails && tip.category !== 'news')
                        .sort((a, b) => {
                            if (a.id === 'vip-program') return -1;
                            if (b.id === 'vip-program') return 1;
                            if (a.id === 'migration') return -1;
                            if (b.id === 'migration') return 1;
                            return new Date(b.publishDate || 0) - new Date(a.publishDate || 0);
                        })
                        .map(tip => (
                            <TipCard
                                key={tip.id}
                                tip={{
                                    ...tip,
                                    onClick: () => tip.hasDetails && navigate(`/guides/${tip.id}`)
                                }}
                            />
                        ))}
                </div>
            ) : (
                <div className="fade-in">
                    <DailyChecklist />
                </div>
            )}
        </div>
    );
}
