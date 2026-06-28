import React from 'react';
import { useTranslation } from 'react-i18next';
import { Video, ArrowUpRight } from 'lucide-react';

export default function CreatorsCorner() {
    const { t } = useTranslation();

    const creators = [
        {
            name: "Mirandus Plays",
            youtubeUrl: "https://www.youtube.com/@mirandusplaysmobile",
            avatar: "/images/creator_mirandus.jpg",
            descKey: "creators_page.mirandus_desc",
            isPartner: true,
            youtubeHandle: "@mirandusplaysmobile"
        }
    ];

    return (
        <div className="container fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem', paddingTop: '2rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <h1 className="guide-title text-gradient" style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    margin: '0 0 1rem 0'
                }}>
                    {t('creators_page.title', 'CREATORS CORNER')}
                </h1>
                <p style={{
                    color: 'var(--text-dim)',
                    fontSize: 'clamp(0.95rem, 2.4vw, 1.25rem)',
                    maxWidth: '650px',
                    margin: '0 auto',
                    lineHeight: '1.6'
                }}>
                    {t('creators_page.subtitle', 'Highlighting the outstanding content creators of the Foundation: Galactic Frontier community.')}
                </p>
                <div style={{
                    width: '60px',
                    height: '2px',
                    background: 'var(--gold)',
                    margin: '2rem auto 0'
                }}></div>
            </div>

            {/* Creators List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {creators.map((creator, index) => (
                    <div
                        key={index}
                        className="glass-panel reveal visible"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: '2rem',
                            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                            border: '1px solid var(--border)',
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: '8px',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            alignItems: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--gold)';
                            e.currentTarget.style.boxShadow = '0 0 35px rgba(212, 175, 55, 0.15)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            const avatar = e.currentTarget.querySelector('.creator-avatar');
                            if (avatar) avatar.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'none';
                            const avatar = e.currentTarget.querySelector('.creator-avatar');
                            if (avatar) avatar.style.transform = 'none';
                        }}
                    >
                        {/* Scan Line effect */}
                        <div className="scan-line" style={{ pointerEvents: 'none' }}></div>

                        {/* Gold Ornaments */}
                        <div className="corner-tl"></div>
                        <div className="corner-br"></div>

                        {/* Left Side: Avatar */}
                        <div style={{
                            flex: '0 0 auto',
                            width: 'clamp(100px, 20vw, 160px)',
                            height: 'clamp(100px, 20vw, 160px)',
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            overflow: 'hidden',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                            margin: '0 auto'
                        }}>
                            <img
                                src={creator.avatar}
                                alt={creator.name}
                                className="creator-avatar"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.4s ease'
                                }}
                            />
                        </div>

                        {/* Right Side: Info */}
                        <div style={{
                            flex: '1 1 350px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            textAlign: 'left'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                <h2 style={{
                                    margin: 0,
                                    fontFamily: 'var(--font-label)',
                                    fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                                    color: '#FFFFFF',
                                    letterSpacing: '1px'
                                }}>
                                    {creator.name}
                                </h2>
                                {creator.isPartner && (
                                    <span style={{
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        border: '1px solid var(--gold)',
                                        color: 'var(--gold-bright)',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        padding: '4px 10px',
                                        borderRadius: '2px',
                                        letterSpacing: '2px',
                                        fontFamily: 'var(--font-mono)',
                                        textTransform: 'uppercase'
                                    }}>
                                        PARTNER
                                    </span>
                                )}
                            </div>

                            <p style={{
                                color: 'var(--text-main)',
                                fontSize: '1.1rem',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                {t(creator.descKey)}
                            </p>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                marginTop: '0.5rem',
                                flexWrap: 'wrap'
                            }}>
                                <a
                                    href={creator.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.6rem',
                                        background: 'var(--gold)',
                                        color: 'var(--bg-void)',
                                        fontFamily: 'var(--font-label)',
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                        padding: '0.8rem 1.8rem',
                                        borderRadius: '4px',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = 'var(--gold)';
                                        e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.4)';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--gold)';
                                        e.currentTarget.style.color = 'var(--bg-void)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.2)';
                                        e.currentTarget.style.transform = 'none';
                                    }}
                                >
                                    <Video size={18} />
                                    {t('creators_page.youtube_btn', 'Visit YouTube Channel')}
                                    <ArrowUpRight size={16} />
                                </a>

                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--text-dim)',
                                    fontSize: '0.95rem'
                                }}>
                                    {creator.youtubeHandle}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
