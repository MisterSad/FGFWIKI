import React, { useState } from 'react';
import { eventsData } from '../data/gameData';
import { Clock, AlertTriangle, Star, Lightbulb, BarChart2, Swords, Calendar, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function EventGuide() {
    const { t } = useTranslation();
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Close modal when clicking outside or on the close button
    const closeModal = () => setSelectedEvent(null);

    return (
        <>
            {/* TILE GRID VIEW */}
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '1.5rem',
                    paddingBottom: '4rem',
                    alignItems: 'stretch'
                }}>
                    {eventsData.map(event => (
                        <div
                            key={event.id}
                            style={{
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
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedEvent(event)}
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
                                <Calendar size={120} />
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
                                    {t(event.title)}
                                </h3>

                                <p style={{
                                    color: 'var(--text-dim)',
                                    lineHeight: '1.6',
                                    fontSize: '0.85rem',
                                    position: 'relative',
                                    zIndex: 1,
                                    margin: 0,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    fontWeight: 'bold'
                                }}>
                                    {t(event.type)}
                                </p>
                            </div>

                            {/* Frequency Badge */}
                            <div style={{
                                marginTop: '1.5rem',
                                alignSelf: 'flex-start',
                                background: 'rgba(0, 243, 255, 0.1)',
                                color: 'var(--primary-neon)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                border: '1px solid var(--primary-neon)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem'
                            }}>
                                <Clock size={14} /> {t(event.cycle)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FULL SCREEN MODAL */}
            {selectedEvent && (
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
                            boxShadow: '0 0 50px rgba(0, 243, 255, 0.2)'
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
                            <h2 style={{ margin: '0 0 0.5rem', fontSize: '2rem', color: 'var(--primary-neon)' }}>{t(selectedEvent.title)}</h2>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <span style={{
                                    background: 'rgba(0, 243, 255, 0.1)',
                                    color: 'var(--primary-neon)',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    fontSize: '0.85rem',
                                    fontWeight: 'bold'
                                }}>
                                    {t(selectedEvent.type)}
                                </span>
                                <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Clock size={16} /> {t(selectedEvent.cycle)}
                                </span>
                            </div>
                        </div>

                        {/* Warning Section */}
                        {selectedEvent.warning && (
                            <div style={{
                                background: 'rgba(255, 69, 58, 0.15)',
                                borderLeft: '4px solid #ff4444',
                                padding: '1rem',
                                borderRadius: '4px',
                                marginBottom: '1.5rem',
                                color: '#ff4444',
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}>
                                <AlertTriangle size={18} /> {t(selectedEvent.warning)}
                            </div>
                        )}

                        {/* Golden Rule */}
                        {selectedEvent.goldenRule && (
                            <div style={{
                                background: 'rgba(255, 215, 0, 0.1)',
                                border: '1px solid #ffd700',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                marginBottom: '2rem',
                                textAlign: 'center'
                            }}>
                                <strong style={{ color: '#ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '1.1rem' }}>
                                    <Star size={20} fill="#ffd700" /> {t('events_ui.golden_rule')}
                                </strong>
                                <span style={{ color: 'var(--text-main)', fontStyle: 'italic', fontSize: '1.1rem' }}>"{t(selectedEvent.goldenRule)}"</span>
                            </div>
                        )}

                        {/* Description */}
                        <p style={{ color: 'var(--text-main)', marginBottom: '2rem', lineHeight: '1.7', fontSize: '1.05rem' }}>
                            {t(selectedEvent.description)}
                            {selectedEvent.essentials && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.8rem', color: '#ffd700', fontStyle: 'italic', background: 'rgba(255, 215, 0, 0.05)', padding: '0.5rem', borderRadius: '4px' }}>
                                    <Lightbulb size={18} /> {t(selectedEvent.essentials)}
                                </span>
                            )}
                        </p>

                        {/* Score Grid */}
                        {selectedEvent.scoreGrid && (
                            <div style={{ marginBottom: '2.5rem', overflowX: 'auto' }}>
                                <h4 style={{ margin: '0 0 1rem', color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <BarChart2 size={20} /> {t('events_ui.score_grid')}
                                </h4>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                            <th style={{ padding: '10px', textAlign: 'left', color: 'var(--primary-neon)' }}>{t('events_ui.tier')}</th>
                                            {[1, 2, 3, 4, 5, 6].map(d => <th key={d} style={{ padding: '10px', textAlign: 'right', color: d >= 5 ? '#ffd700' : 'white' }}>{t('events_ui.day')} {d}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedEvent.scoreGrid.map((row, idx) => (
                                            <tr key={idx} style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                                                <td style={{ padding: '10px', fontWeight: 'bold', color: 'white' }}>{t(row.tier)}</td>
                                                {row.values.map((val, vIdx) => (
                                                    <td key={vIdx} style={{ padding: '10px', textAlign: 'right', fontWeight: vIdx >= 4 ? 'bold' : 'normal', color: vIdx >= 4 ? '#ffd700' : 'inherit' }}>
                                                        {val.toLocaleString()}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Schedule Phases */}
                        {selectedEvent.schedulePhases && (
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ margin: '0 0 1rem', color: 'var(--primary-neon)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={20} /> {t('events_ui.pvp_schedule')}
                                </h4>
                                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                                    {selectedEvent.schedulePhases.map((phase, idx) => (
                                        <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.2rem', borderRadius: '8px' }}>
                                            <strong style={{ display: 'block', color: 'white', marginBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>{t(phase.title)}</strong>
                                            {phase.events.map((e, eIdx) => (
                                                <div key={eIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                                    <span style={{ color: 'var(--secondary-neon)' }}>{t(e.time)}</span>
                                                    <span style={{ color: 'var(--text-dim)' }}>{t(e.action)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Simple Schedule */}
                        {selectedEvent.schedule && !selectedEvent.schedulePhases && (
                            <div style={{ marginBottom: '2rem', background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', borderRadius: '8px' }}>
                                <h4 style={{ margin: '0 0 1rem', color: 'var(--primary-neon)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={20} /> {t('events_ui.schedule')}
                                </h4>
                                {selectedEvent.schedule.map((day, idx) => (
                                    <div key={idx} style={{ marginBottom: '0.6rem', fontSize: '1rem' }}>
                                        <strong style={{ color: 'white' }}>{t(day.label)}: </strong>
                                        <span style={{ color: 'var(--text-dim)' }}>{t(day.times)}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tactical Guide */}
                        {selectedEvent.tactics && (
                            <div style={{ marginBottom: '2rem', background: 'rgba(0, 243, 255, 0.05)', padding: '1.5rem', borderRadius: '8px', borderLeft: '3px solid var(--primary-neon)' }}>
                                <h4 style={{ margin: '0 0 1rem', color: 'var(--primary-neon)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Swords size={20} /> {t('events_ui.tactical_guide')}
                                </h4>
                                {selectedEvent.tactics.map((tactic, idx) => (
                                    <div key={idx} style={{ marginBottom: '1rem' }}>
                                        <strong style={{ color: 'white', display: 'block', fontSize: '1rem', marginBottom: '0.3rem' }}>{t(tactic.title)}</strong>
                                        <div style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.5' }}>{t(tactic.content)}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Generic Info Grid (Titles, etc.) */}
                        {selectedEvent.infoGrid && (
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ margin: '0 0 1rem', color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {selectedEvent.infoGrid.title === 'Titles & Boosts' && <Trophy size={20} />}
                                    {t(selectedEvent.infoGrid.title)}
                                </h4>
                                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                                    {selectedEvent.infoGrid.items.map((item, idx) => (
                                        <div key={idx} style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ color: 'var(--secondary-neon)', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '0.4rem' }}>{t(item.label)}</div>
                                            <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.4' }}>{t(item.value)}</div>
                                            {item.note && (
                                                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.5rem', fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.4rem' }}>
                                                    {t(item.note)}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Daily Actions Breakdown */}
                        {selectedEvent.dailyActions && (
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ margin: '0 0 1rem', color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={20} /> {t('events_ui.daily_focus')}
                                </h4>
                                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                                    {selectedEvent.dailyActions.map((day, idx) => (
                                        <div key={idx} style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ color: 'var(--secondary-neon)', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '0.4rem' }}>{t(day.focus)}</div>
                                            <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.4' }}>{t(day.details)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Rewards Section */}
                        {selectedEvent.rewards && (
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Trophy size={20} /> {t('events_ui.rewards')}
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                                    {selectedEvent.rewards.map((reward, idx) => (
                                        <div key={idx} style={{ background: 'rgba(188, 19, 254, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(188, 19, 254, 0.2)' }}>
                                            <div style={{ color: 'var(--secondary-neon)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{t(reward.label)}</div>
                                            <div style={{ color: 'white', fontSize: '1rem' }}>{t(reward.value)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Teams Section */}
                        {selectedEvent.teams && (
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '1.2rem' }}>{t('events_ui.recommended_teams')}</h4>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {selectedEvent.teams.map((team, idx) => (
                                        <div key={idx} style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                                            <div style={{
                                                color: team.name.includes('Kinetic') ? '#FFD700' :
                                                    team.name.includes('Beam') ? '#00F3FF' :
                                                        team.name.includes('Ion') ? '#BF55EC' :
                                                            'var(--primary-neon)',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                marginBottom: '0.4rem'
                                            }}>{t(team.name)}</div>
                                            <div style={{ color: 'white', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                                                {team.composition.join(' + ')}
                                            </div>
                                            {team.note && (
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                                                    {t(team.note)}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Pro Tips Section */}
                        {selectedEvent.proTips && (
                            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ffd700', marginBottom: '1rem' }}>
                                <h4 style={{ margin: '0 0 1rem', color: '#ffd700', fontSize: '1.2rem' }}>{t('events_ui.pro_tips')}</h4>
                                {selectedEvent.proTips.map((tip, idx) => (
                                    <div key={idx} style={{ marginBottom: '0.8rem' }}>
                                        {tip.title && <strong style={{ color: 'white', fontSize: '1rem' }}>{t(tip.title)}: </strong>}
                                        <span style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.5' }}>{t(tip.content)}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Legacy Tips Support */}
                        {selectedEvent.tips && (
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
                                <h4 style={{ margin: '0 0 1rem', color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Lightbulb size={20} /> {t('events_ui.tips')}
                                </h4>
                                <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-dim)' }}>
                                    {selectedEvent.tips.map((tip, idx) => (
                                        <li key={idx} style={{ marginBottom: '0.6rem', fontSize: '0.95rem', lineHeight: '1.5' }}>{t(tip)}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
