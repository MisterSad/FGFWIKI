import React, { useState } from 'react';
import { eventsData } from '../data/gameData';
import { Clock, AlertTriangle, Star, Lightbulb, BarChart2, Swords, Calendar, Trophy, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function EventGuide() {
    const { t } = useTranslation();
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Close modal when clicking outside or on the close button
    const closeModal = () => setSelectedEvent(null);

    return (
        <>
            {/* TILE GRID VIEW */}
            {!selectedEvent && (
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
                                className="card reveal"
                                key={event.id}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '2rem',
                                    position: 'relative',
                                    height: '100%',
                                    boxSizing: 'border-box',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setSelectedEvent(event)}
                            >
                                <div className="scan-line"></div>
                                <div className="corner-tl"></div>
                                <div className="corner-br"></div>

                                {/* Decorative Icon Background */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    opacity: 0.05,
                                    transform: 'rotate(15deg)',
                                    pointerEvents: 'none',
                                    color: "#FFFFFF"
                                }}>
                                    <Calendar size={140} strokeWidth={1} />
                                </div>

                                <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                                    <h3 style={{
                                        color: 'var(--text-primary)',
                                        marginTop: 0,
                                        marginBottom: '1rem',
                                        borderBottom: '1px solid var(--border)',
                                        paddingBottom: '0.8rem',
                                        display: 'block'
                                    }}>
                                        {t(event.title)}
                                    </h3>

                                    <p style={{
                                        color: 'var(--text-secondary)',
                                        margin: 0,
                                        marginBottom: '1rem'
                                    }}>
                                        {t(event.type)}
                                    </p>

                                    {/* Frequency Badge */}
                                    <div className="label-text" style={{
                                        alignSelf: 'flex-start',
                                        color: 'var(--accent-teal)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem'
                                    }}>
                                        <Clock size={14} /> {t(event.cycle)}
                                    </div>
                                </div>

                                <div style={{
                                    marginTop: 'auto',
                                    paddingTop: '2rem',
                                    color: "#FFFFFF",
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
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* FULL PAGE DETAIL VIEW */}
            {selectedEvent && (
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
                            padding: '3rem',
                            border: '1px solid var(--gold)',
                            boxShadow: '0 0 50px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                            <h2 style={{ fontFamily: 'var(--font-hero)', textTransform: 'uppercase', margin: '0 0 0.5rem', fontSize: '2.5rem', color: 'var(--gold-bright)' }}>{t(selectedEvent.title)}</h2>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <span className="label-text" style={{
                                    background: 'var(--bg-void)',
                                    color: 'var(--accent-teal)',
                                    padding: '4px 12px',
                                    borderRadius: '2px',
                                }}>
                                    {t(selectedEvent.type)}
                                </span>
                                <span className="label-text" style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Clock size={16} /> {t(selectedEvent.cycle)}
                                </span>
                            </div>
                        </div>

                        {/* Warning Section */}
                        {selectedEvent.warning && (
                            <div style={{
                                background: 'var(--bg-elevated)',
                                borderLeft: '4px solid var(--accent-red)',
                                padding: '1rem',
                                borderRadius: '4px',
                                marginBottom: '1.5rem',
                                color: 'var(--accent-red)',
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
                                background: 'var(--bg-void)',
                                border: '1px solid var(--accent-teal)',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                marginBottom: '2rem',
                                textAlign: 'center'
                            }}>
                                <strong className="label-text" style={{ color: "#FFFFFF", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '1.1rem' }}>
                                    <Star size={20} color="#FFFFFF" /> {t('events_ui.golden_rule')}
                                </strong>
                                <span style={{ color: 'var(--text-main)', fontStyle: 'italic', fontSize: '1.1rem' }}>"{t(selectedEvent.goldenRule)}"</span>
                            </div>
                        )}

                        {/* Description */}
                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{ color: 'var(--text-main)', margin: 0, lineHeight: '1.7', fontSize: '1.05rem' }}>
                                {t(selectedEvent.description)}
                                {selectedEvent.essentials && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.8rem', color: "#FFFFFF", fontStyle: 'italic', background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '4px' }}>
                                        <Lightbulb size={18} /> {t(selectedEvent.essentials)}
                                    </span>
                                )}
                            </p>
                            {selectedEvent.image && (
                                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                    <img src={selectedEvent.image} alt={t(selectedEvent.title)} style={{ maxWidth: '100%', borderRadius: '4px', border: '1px solid var(--border)' }} />
                                </div>
                            )}
                        </div>

                        {/* Score Grid */}
                        {selectedEvent.scoreGrid && (
                            <div style={{ marginBottom: '2.5rem', overflowX: 'auto' }}>
                                <h4 style={{ margin: '0 0 1rem', color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <BarChart2 size={20} /> <span className="label-text">{t('events_ui.score_grid')}</span>
                                </h4>
                                <table style={{ fontFamily: 'var(--font-mono)', width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                            <th style={{ padding: '10px', textAlign: 'left', color: "#FFFFFF" }}>{t('events_ui.tier')}</th>
                                            {[1, 2, 3, 4, 5, 6].map(d => <th key={d} style={{ padding: '10px', textAlign: 'right', color: d >= 5 ? '#FFFFFF' : 'var(--text-primary)' }}>{t('events_ui.day')} {d}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedEvent.scoreGrid.map((row, idx) => (
                                            <tr key={idx} style={{ background: idx % 2 === 0 ? 'var(--bg-void)' : 'transparent' }}>
                                                <td style={{ padding: '10px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{t(row.tier)}</td>
                                                {row.values.map((val, vIdx) => (
                                                    <td key={vIdx} style={{ padding: '10px', textAlign: 'right', fontWeight: vIdx >= 4 ? 'bold' : 'normal', color: vIdx >= 4 ? '#FFFFFF' : 'inherit' }}>
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
                                <h4 style={{ margin: '0 0 1rem', color: "#FFFFFF", fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={20} /> <span className="label-text">{t('events_ui.pvp_schedule')}</span>
                                </h4>
                                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                                    {selectedEvent.schedulePhases.map((phase, idx) => (
                                        <div key={idx} style={{ background: 'var(--bg-void)', border: '1px solid var(--border)', padding: '1.2rem', borderRadius: '2px' }}>
                                            <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.8rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem' }}>{t(phase.title)}</strong>
                                            {phase.events.map((e, eIdx) => (
                                                <div key={eIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)' }}>{t(e.time)}</span>
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
                            <div style={{ marginBottom: '2rem', background: 'var(--bg-void)', border: '1px solid var(--border)', padding: '1.5rem', borderRadius: '2px' }}>
                                <h4 style={{ margin: '0 0 1rem', color: "#FFFFFF", fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={20} /> <span className="label-text">{t('events_ui.schedule')}</span>
                                </h4>
                                {selectedEvent.schedule.map((day, idx) => (
                                    <div key={idx} style={{ marginBottom: '0.6rem', fontSize: '1rem' }}>
                                        <strong style={{ color: 'var(--text-primary)' }}>{t(day.label)}: </strong>
                                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t(day.times)}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Event Stages */}
                        {selectedEvent.stages && (
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ margin: '0 0 1rem', color: "#FFFFFF", fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={20} /> <span className="label-text">{t('events_ui.stages')}</span>
                                </h4>
                                {selectedEvent.stagesImage && (
                                    <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                                        <img src={selectedEvent.stagesImage} alt="Stages Info" style={{ maxWidth: '100%', borderRadius: '4px', border: '1px solid var(--border)' }} />
                                    </div>
                                )}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    {selectedEvent.stages.map((stage, idx) => (
                                        <div key={idx} style={{ background: 'var(--bg-void)', padding: '1.2rem', border: '1px solid var(--border)', borderRadius: '2px', borderLeft: '3px solid var(--gold)' }}>
                                            <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '1rem', marginBottom: '0.4rem' }}>{t(stage.title)}</strong>
                                            <div style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.5' }}>{t(stage.description)}</div>
                                            {stage.image && (
                                                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                                    <img src={stage.image} alt={t(stage.title)} style={{ maxWidth: '100%', borderRadius: '4px', border: '1px solid var(--border)' }} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tactical Guide */}
                        {selectedEvent.tactics && (
                            <div style={{ marginBottom: '2rem', background: 'var(--bg-void)', padding: '1.5rem', borderRadius: '2px', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent-teal)' }}>
                                <h4 style={{ margin: '0 0 1rem', color: 'var(--accent-teal)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Swords size={20} /> <span className="label-text">{t('events_ui.tactical_guide')}</span>
                                </h4>
                                {selectedEvent.tactics.map((tactic, idx) => (
                                    <div key={idx} style={{ marginBottom: '1rem' }}>
                                        <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '1rem', marginBottom: '0.3rem' }}>{t(tactic.title)}</strong>
                                        <div style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.5' }}>{t(tactic.content)}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Generic Info Grid (Titles, etc.) */}
                        {selectedEvent.infoGrid && (
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ margin: '0 0 1rem', color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {selectedEvent.infoGrid.title === 'Titles & Boosts' && <Trophy size={20} />}
                                    <span className="label-text">{t(selectedEvent.infoGrid.title)}</span>
                                </h4>
                                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                                    {selectedEvent.infoGrid.items.map((item, idx) => (
                                        <div key={idx} style={{ background: 'var(--bg-void)', padding: '1rem', borderRadius: '2px', border: '1px solid var(--border)' }}>
                                            <div className="label-text" style={{ color: "#FFFFFF", fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '0.4rem' }}>{t(item.label)}</div>
                                            <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.4' }}>{t(item.value)}</div>
                                            {item.note && (
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '0.5rem', fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: '0.4rem' }}>
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
                                <h4 style={{ margin: '0 0 1rem', color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={20} /> <span className="label-text">{t('events_ui.daily_focus')}</span>
                                </h4>
                                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                                    {selectedEvent.dailyActions.map((day, idx) => (
                                        <div key={idx} style={{ background: 'var(--bg-void)', padding: '1rem', borderRadius: '2px', border: '1px solid var(--border)' }}>
                                            <div className="label-text" style={{ color: "#FFFFFF", fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '0.4rem' }}>{t(day.focus)}</div>
                                            <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.4' }}>{t(day.details)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Rewards Section */}
                        {selectedEvent.rewards && (
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Trophy size={20} /> <span className="label-text">{t('events_ui.rewards')}</span>
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                                    {selectedEvent.rewards.map((reward, idx) => (
                                        <div key={idx} style={{ background: 'var(--bg-void)', padding: '1rem', borderRadius: '2px', border: '1px solid var(--border)' }}>
                                            <div className="label-text" style={{ color: 'var(--accent-teal)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{t(reward.label)}</div>
                                            <div style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{t(reward.value)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Teams Section */}
                        {selectedEvent.teams && (
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 className="label-text" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '1.2rem' }}>{t('events_ui.recommended_teams')}</h4>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {selectedEvent.teams.map((team, idx) => (
                                        <div key={idx} style={{ background: 'var(--bg-void)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '2px' }}>
                                            <div style={{
                                                color: team.name.includes('Kinetic') ? '#FFFFFF' :
                                                    team.name.includes('Beam') ? 'var(--accent-teal)' :
                                                        team.name.includes('Ion') ? 'var(--accent-blue)' :
                                                            '#FFFFFF',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                marginBottom: '0.4rem'
                                            }}>{t(team.name)}</div>
                                            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
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
                            <div style={{ background: 'var(--bg-void)', border: '1px solid var(--border)', padding: '1.5rem', borderRadius: '2px', borderLeft: '4px solid var(--gold)', marginBottom: '1rem' }}>
                                <h4 style={{ margin: '0 0 1rem', color: "#FFFFFF", fontSize: '1.2rem' }}>{t('events_ui.pro_tips')}</h4>
                                {selectedEvent.proTips.map((tip, idx) => (
                                    <div key={idx} style={{ marginBottom: '0.8rem' }}>
                                        {tip.title && <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{t(tip.title)}: </strong>}
                                        <span style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.5' }}>{t(tip.content)}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Legacy Tips Support */}
                        {selectedEvent.tips && (
                            <div style={{ background: 'var(--bg-void)', border: '1px solid var(--border)', padding: '1.5rem', borderRadius: '2px', marginTop: '1rem' }}>
                                <h4 style={{ margin: '0 0 1rem', color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Lightbulb size={20} /> <span className="label-text">{t('events_ui.tips')}</span>
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
            )
            }
        </>
    );
}
