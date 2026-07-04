import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsData } from '../data/gameData';
import { Clock, AlertTriangle, Star, Lightbulb, BarChart2, Swords, Calendar, Trophy, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function EventGuide() {
    const { t } = useTranslation();
    const { eventId } = useParams();
    const navigate = useNavigate();

    const selectedEvent = eventId ? eventsData.find(e => e.id === eventId) : null;

    // Close modal when clicking outside or on the close button
    const closeModal = () => navigate('/events');

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
                        {[...eventsData]
                            .filter(e => !e.publishDate || new Date() >= new Date(e.publishDate))
                            .sort((a, b) => {
                                // 1. isNew flag overrides everything
                                if (a.isNew !== b.isNew) return a.isNew ? -1 : 1;
                                
                                // 2. Sort by publishDate descending (newest first)
                                const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
                                const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
                                if (dateA !== dateB) return dateB - dateA;
                                
                                // 3. Fallback: newer elements (higher index in gameData.js) go first
                                const indexA = eventsData.indexOf(a);
                                const indexB = eventsData.indexOf(b);
                                return indexB - indexA;
                            })
                            .map(event => (
                            <div
                                className="card reveal"
                                key={event.id}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: 'clamp(1rem, 4vw, 2rem)',
                                    position: 'relative',
                                    height: '100%',
                                    boxSizing: 'border-box',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer',
                                    overflow: 'hidden'
                                }}
                                onClick={() => navigate(`/events/${event.id}`)}
                            >
                                <div className="scan-line"></div>
                                <div className="corner-tl"></div>
                                <div className="corner-br"></div>

                                {event.isNew && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '-35px',
                                        background: 'var(--gold)',
                                        color: 'var(--bg-void)',
                                        padding: '5px 40px',
                                        transform: 'rotate(45deg)',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        zIndex: 10,
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                        textAlign: 'center'
                                    }}>
                                        {t('events.new_event', 'New Event')}
                                    </div>
                                )}

                                {event.isLimited && (
                                    <div className="label-text" style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(90deg, var(--accent-red-soft), var(--accent-red))',
                                        color: '#FFFFFF',
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        zIndex: 5,
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                                    }}>
                                        <Clock size={14} />
                                        {t(event.limitedLabel || 'events_ui.limited_event', 'Limited Time')}
                                    </div>
                                )}

                                {event.status === 'suspended' && (
                                    <div className="label-text" style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(90deg, #ef4444, #b91c1c)',
                                        color: '#FFFFFF',
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        zIndex: 5,
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                                    }}>
                                        <AlertTriangle size={14} />
                                        {t('events_ui.currently_suspended', 'Currently Suspended')}
                                    </div>
                                )}

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

                                <div style={{ flex: 1, position: 'relative', zIndex: 2, paddingTop: (event.isLimited || event.status === 'suspended') ? '1.5rem' : 0 }}>
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
                            padding: 'clamp(1rem, 5vw, 3rem)',
                            border: '1px solid var(--gold)',
                            boxShadow: '0 0 50px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                            <h1 style={{ fontFamily: 'var(--font-hero)', textTransform: 'uppercase', margin: '0 0 0.5rem', fontSize: 'clamp(1.4rem, 5vw, 2.5rem)', color: 'var(--gold-bright)' }}>{t(selectedEvent.title)}</h1>
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

                        {/* Suspended Warning */}
                        {selectedEvent.status === 'suspended' && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                borderLeft: '4px solid var(--accent-red)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderLeftWidth: '4px',
                                padding: '1rem',
                                borderRadius: '4px',
                                marginBottom: '1.5rem',
                                color: 'var(--accent-red)',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem'
                            }}>
                                <AlertTriangle size={20} /> {t('events_ui.currently_suspended')}
                            </div>
                        )}

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

                        {/* Graphical League Ranks Section */}
                        {selectedEvent.leagueRanks && (
                            <div style={{ marginBottom: '2.5rem' }}>
                                <h4 style={{ margin: '0 0 1.2rem', color: 'var(--gold-bright)', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                                    <Trophy size={20} color="var(--gold)" />
                                    <span className="label-text">{t('events_ui.league_ranks')}</span>
                                </h4>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                    gap: '1rem',
                                    marginBottom: '2rem'
                                }}>
                                    {selectedEvent.leagueRanks.map((rankObj) => {
                                        let rankColor = 'var(--text-secondary)';
                                        let rankBg = 'rgba(255,255,255,0.02)';
                                        let rankBorder = 'rgba(255,255,255,0.05)';
                                        let rankGlow = 'rgba(255,255,255,0)';
                                        
                                        if (rankObj.rank === 'bronze') {
                                            rankColor = '#A08240';
                                            rankBg = 'linear-gradient(135deg, rgba(160, 130, 64, 0.05) 0%, rgba(160, 130, 64, 0.15) 100%)';
                                            rankBorder = 'rgba(160, 130, 64, 0.3)';
                                        } else if (rankObj.rank === 'silver') {
                                            rankColor = '#C0C0C0';
                                            rankBg = 'linear-gradient(135deg, rgba(192, 192, 192, 0.05) 0%, rgba(192, 192, 192, 0.15) 100%)';
                                            rankBorder = 'rgba(192, 192, 192, 0.3)';
                                        } else if (rankObj.rank === 'gold') {
                                            rankColor = 'var(--gold-bright)';
                                            rankBg = 'linear-gradient(135deg, rgba(232, 201, 106, 0.05) 0%, rgba(232, 201, 106, 0.15) 100%)';
                                            rankBorder = 'rgba(232, 201, 106, 0.3)';
                                            rankGlow = 'rgba(232, 201, 106, 0.1)';
                                        } else if (rankObj.rank === 'platinum') {
                                            rankColor = '#4ECDC4';
                                            rankBg = 'linear-gradient(135deg, rgba(78, 205, 196, 0.05) 0%, rgba(78, 205, 196, 0.15) 100%)';
                                            rankBorder = 'rgba(78, 205, 196, 0.3)';
                                            rankGlow = 'rgba(78, 205, 196, 0.1)';
                                        } else if (rankObj.rank === 'diamond') {
                                            rankColor = '#63B3ED';
                                            rankBg = 'linear-gradient(135deg, rgba(99, 179, 237, 0.05) 0%, rgba(99, 179, 237, 0.15) 100%)';
                                            rankBorder = 'rgba(99, 179, 237, 0.3)';
                                            rankGlow = 'rgba(99, 179, 237, 0.15)';
                                        } else if (rankObj.rank === 'master') {
                                            rankColor = '#B794F4';
                                            rankBg = 'linear-gradient(135deg, rgba(183, 148, 244, 0.05) 0%, rgba(183, 148, 244, 0.15) 100%)';
                                            rankBorder = 'rgba(183, 148, 244, 0.3)';
                                            rankGlow = 'rgba(183, 148, 244, 0.2)';
                                        }
                                        
                                        return (
                                            <div 
                                                key={rankObj.rank} 
                                                style={{
                                                    background: rankBg,
                                                    border: `1px solid ${rankBorder}`,
                                                    borderRadius: '4px',
                                                    padding: '1rem',
                                                    textAlign: 'center',
                                                    position: 'relative',
                                                    boxShadow: `0 4px 20px ${rankGlow}`,
                                                    transition: 'all 0.3s ease',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <div style={{ 
                                                    textTransform: 'uppercase', 
                                                    fontWeight: 'bold', 
                                                    fontSize: '1rem', 
                                                    color: rankColor, 
                                                    letterSpacing: '1px',
                                                    marginBottom: '0.4rem'
                                                }}>
                                                    {t(`events.commerce_guild_duel_league_${rankObj.rank}`)}
                                                </div>
                                                <div style={{ 
                                                    fontFamily: 'var(--font-mono)', 
                                                    fontSize: '0.85rem', 
                                                    color: 'var(--text-primary)',
                                                    marginBottom: '0.8rem'
                                                }}>
                                                    {rankObj.points}
                                                </div>
                                                
                                                <div style={{
                                                    fontSize: '0.7rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.25rem',
                                                    color: rankObj.demote ? 'var(--accent-red)' : 'var(--accent-teal)',
                                                    background: rankObj.demote ? 'rgba(196, 48, 48, 0.1)' : 'rgba(78, 205, 196, 0.1)',
                                                    padding: '2px 6px',
                                                    borderRadius: '2px',
                                                    fontWeight: '600'
                                                }}>
                                                    {rankObj.demote ? (
                                                        <>
                                                            <AlertTriangle size={10} />
                                                            {t('events_ui.demotion_active')}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Star size={10} />
                                                            {t('events_ui.demotion_safe')}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Graphical Nametags Section */}
                        {selectedEvent.leagueNametags && (
                            <div style={{ marginBottom: '2.5rem' }}>
                                <h4 style={{ margin: '0 0 1.2rem', color: 'var(--gold-bright)', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                                    <Star size={20} color="var(--gold)" />
                                    <span className="label-text">{t('events_ui.league_nametags')}</span>
                                </h4>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.8rem',
                                    background: 'var(--bg-void)',
                                    border: '1px solid var(--border)',
                                    padding: '1.2rem',
                                    borderRadius: '4px'
                                }}>
                                    {selectedEvent.leagueNametags.map((tag) => {
                                        let borderGlow = 'rgba(255,255,255,0.2)';
                                        let tagBg = 'rgba(255,255,255,0.02)';
                                        let rankBadgeColor = '#C0C0C0';
                                        
                                        if (tag.rank === 'silver') {
                                            borderGlow = '#C0C0C0';
                                            tagBg = 'rgba(192, 192, 192, 0.05)';
                                            rankBadgeColor = '#C0C0C0';
                                        } else if (tag.rank === 'gold') {
                                            borderGlow = 'var(--gold)';
                                            tagBg = 'rgba(201, 168, 76, 0.05)';
                                            rankBadgeColor = 'var(--gold-bright)';
                                        } else if (tag.rank === 'platinum') {
                                            borderGlow = '#4ECDC4';
                                            tagBg = 'rgba(78, 205, 196, 0.05)';
                                            rankBadgeColor = '#4ECDC4';
                                        } else if (tag.rank === 'diamond') {
                                            borderGlow = '#63B3ED';
                                            tagBg = 'rgba(99, 179, 237, 0.05)';
                                            rankBadgeColor = '#90CDF4';
                                        } else if (tag.rank === 'master') {
                                            borderGlow = '#B794F4';
                                            tagBg = 'rgba(183, 148, 244, 0.05)';
                                            rankBadgeColor = '#D6BCFA';
                                        }
                                        
                                        return (
                                            <div 
                                                key={tag.rank}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    gap: '1rem',
                                                    padding: '0.8rem 1.2rem',
                                                    background: tagBg,
                                                    border: `1px solid rgba(255, 255, 255, 0.05)`,
                                                    borderLeft: `4px solid ${borderGlow}`,
                                                    borderRadius: '2px',
                                                    flexWrap: 'wrap'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1', minWidth: '200px' }}>
                                                    <span style={{ 
                                                        fontSize: '0.75rem', 
                                                        fontWeight: 'bold', 
                                                        textTransform: 'uppercase', 
                                                        color: rankBadgeColor,
                                                        background: 'rgba(0,0,0,0.3)',
                                                        padding: '3px 8px',
                                                        borderRadius: '2px',
                                                        border: `1px solid ${borderGlow}33`
                                                    }}>
                                                        {t(`events.commerce_guild_duel_league_${tag.rank}`)}
                                                    </span>
                                                    
                                                    <div style={{
                                                        background: '#090B10',
                                                        border: `1px solid ${borderGlow}`,
                                                        boxShadow: `0 0 10px ${borderGlow}33`,
                                                        padding: '5px 12px',
                                                        borderRadius: '2px',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        position: 'relative'
                                                    }}>
                                                        <span style={{
                                                            color: rankBadgeColor,
                                                            fontSize: '0.8rem',
                                                            fontWeight: 'bold',
                                                            fontFamily: 'var(--font-label)',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '1px',
                                                            textShadow: `0 0 6px ${borderGlow}`
                                                        }}>
                                                            {t(tag.nameKey)}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div style={{
                                                    fontSize: '0.85rem',
                                                    color: 'var(--text-secondary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.4rem'
                                                }}>
                                                    <Clock size={14} />
                                                    <span>{tag.duration} {t('events_ui.days')}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

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
                                    <Calendar size={20} /> <span className="label-text">{t(selectedEvent.stagesTitle || 'events_ui.stages')}</span>
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
                        {selectedEvent.tactics && (!selectedEvent.rewardsRevealAt || new Date() >= new Date(selectedEvent.rewardsRevealAt)) && (
                            <div style={{ marginBottom: '2rem', background: 'var(--bg-void)', padding: '1.5rem', borderRadius: '2px', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent-teal)' }}>
                                <h4 style={{ margin: '0 0 1rem', color: 'var(--accent-teal)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Swords size={20} /> <span className="label-text">{t(selectedEvent.tacticsTitle || 'events_ui.tactical_guide')}</span>
                                </h4>
                                {selectedEvent.tactics.map((tactic, idx) => (
                                    <div key={idx} style={{ marginBottom: '1.5rem' }}>
                                        <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>{t(tactic.title)}</strong>
                                        <div style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.5' }}>{t(tactic.content)}</div>
                                        {tactic.image && (
                                            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                                <img src={tactic.image} alt={t(tactic.title)} style={{ maxWidth: '100%', borderRadius: '4px', border: '1px solid var(--border)' }} />
                                            </div>
                                        )}
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
                        {selectedEvent.rewards && (!selectedEvent.rewardsRevealAt || new Date() >= new Date(selectedEvent.rewardsRevealAt)) && (
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
                    {/* Author Credit */}
                    {selectedEvent.credit && (
                        <div style={{
                            marginTop: '3rem',
                            borderTop: '1px solid var(--border)',
                            paddingTop: '1.5rem',
                            textAlign: 'right',
                            fontSize: '0.9rem',
                            color: 'var(--text-dim)',
                            fontStyle: 'italic'
                        }}>
                            {t(selectedEvent.credit)}
                        </div>
                    )}
                    </div>
                </div>
            )
            }
        </>
    );
}
