import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Video, ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function CreatorsCorner() {
    const { t } = useTranslation();
    const { creatorId } = useParams();
    const navigate = useNavigate();

    const creators = [
        {
            id: "mirandus-plays",
            name: "Mirandus Plays",
            youtubeUrl: "https://www.youtube.com/@mirandusplaysmobile",
            avatar: "/images/Mirandus.jpg",
            descKey: "creators_page.mirandus_desc",
            isPartner: true,
            youtubeHandle: "@mirandusplaysmobile",
            videos: [
                {
                    id: "Qd9P-zDmq3A",
                    titleKey: "creators_page.video1_title",
                    descKey: "creators_page.video1_desc"
                },
                {
                    id: "K6QhO12P5vI",
                    titleKey: "creators_page.video2_title",
                    descKey: "creators_page.video2_desc"
                },
                {
                    id: "W_j2P19y5tI",
                    titleKey: "creators_page.video3_title",
                    descKey: "creators_page.video3_desc"
                },
                {
                    id: "R_j8p24s7v8",
                    titleKey: "creators_page.video4_title",
                    descKey: "creators_page.video4_desc"
                },
                {
                    id: "_rGvT3l9K1E",
                    titleKey: "creators_page.video5_title",
                    descKey: "creators_page.video5_desc"
                },
                {
                    id: "V6lP-k1l9R2",
                    titleKey: "creators_page.video6_title",
                    descKey: "creators_page.video6_desc"
                },
                {
                    id: "F6lR9v1M2tI",
                    titleKey: "creators_page.video7_title",
                    descKey: "creators_page.video7_desc"
                },
                {
                    id: "N1k2pL9T4vI",
                    titleKey: "creators_page.video8_title",
                    descKey: "creators_page.video8_desc"
                },
                {
                    id: "A6lP9r2M3tI",
                    titleKey: "creators_page.video9_title",
                    descKey: "creators_page.video9_desc"
                },
                {
                    id: "U6lP1k2R8vI",
                    titleKey: "creators_page.video10_title",
                    descKey: "creators_page.video10_desc"
                },
                {
                    id: "D1k9pL2R3tI",
                    titleKey: "creators_page.video11_title",
                    descKey: "creators_page.video11_desc"
                },
                {
                    id: "G6lP2k9R8vM",
                    titleKey: "creators_page.video12_title",
                    descKey: "creators_page.video12_desc"
                }
            ]
        }
    ];

    const selectedCreator = creatorId ? creators.find(c => c.id === creatorId) : null;

    if (selectedCreator) {
        return (
            <div className="container fade-in" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem', paddingTop: '2rem' }}>
                {/* Back Button */}
                <button
                    onClick={() => navigate('/creators')}
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
                        marginBottom: '2.5rem',
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

                {/* Creator Header Profile Card */}
                <div
                    className="glass-panel"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '2.5rem',
                        padding: 'clamp(1.5rem, 5vw, 3rem)',
                        border: '1px solid var(--gold)',
                        boxShadow: '0 0 50px rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                        alignItems: 'center',
                        marginBottom: '4rem',
                        position: 'relative'
                    }}
                >
                    <div className="scan-line" style={{ pointerEvents: 'none' }}></div>
                    <div className="corner-tl"></div>
                    <div className="corner-br"></div>

                    {/* Avatar */}
                    <div style={{
                        flex: '0 0 auto',
                        width: 'clamp(120px, 25vw, 180px)',
                        height: 'clamp(120px, 25vw, 180px)',
                        borderRadius: '8px',
                        border: '2px solid rgba(212, 175, 55, 0.4)',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                        margin: '0 auto'
                    }}>
                        <img
                            src={selectedCreator.avatar}
                            alt={selectedCreator.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    {/* Profile details */}
                    <div style={{
                        flex: '1 1 400px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.2rem',
                        textAlign: 'left'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <h1 style={{
                                margin: 0,
                                fontFamily: 'var(--font-hero)',
                                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                color: 'var(--gold-bright)',
                                letterSpacing: '1px',
                                textTransform: 'uppercase'
                            }}>
                                {selectedCreator.name}
                            </h1>
                            {selectedCreator.isPartner && (
                                <span style={{
                                    background: 'rgba(212, 175, 55, 0.15)',
                                    border: '1px solid var(--gold)',
                                    color: 'var(--gold-bright)',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    padding: '4px 12px',
                                    borderRadius: '2px',
                                    letterSpacing: '2px',
                                    fontFamily: 'var(--font-mono)'
                                }}>
                                    PARTNER
                                </span>
                            )}
                        </div>

                        <p style={{
                            color: 'var(--text-main)',
                            fontSize: '1.15rem',
                            lineHeight: '1.8',
                            margin: 0
                        }}>
                            {t(selectedCreator.descKey)}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--text-dim)',
                                fontSize: '1rem'
                            }}>
                                YouTube: <strong>{selectedCreator.youtubeHandle}</strong>
                            </span>
                            <a
                                href={selectedCreator.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: 'var(--gold)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    fontFamily: 'var(--font-label)',
                                    fontWeight: 'bold'
                                }}
                            >
                                {t('creators_page.youtube_btn', 'Visit YouTube')} <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Video Gallery Section */}
                <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-hero)',
                        fontSize: '1.8rem',
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem'
                    }}>
                        <Video size={24} style={{ color: 'var(--gold)' }} /> {t('navigation.creators').toUpperCase()} VIDEOS
                    </h2>
                </div>

                {/* Grid of videos */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '2rem'
                }}>
                    {selectedCreator.videos.map((video, vIdx) => (
                        <div
                            key={vIdx}
                            className="glass-panel reveal visible"
                            style={{
                                padding: '1.25rem',
                                border: '1px solid var(--border)',
                                borderRadius: '6px',
                                background: 'rgba(255, 255, 255, 0.01)',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--gold)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                            }}
                        >
                            {/* Responsive Aspect Ratio iframe container (16:9) */}
                            <div style={{
                                position: 'relative',
                                paddingBottom: '56.25%',
                                height: 0,
                                overflow: 'hidden',
                                borderRadius: '4px',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                background: 'var(--bg-void)'
                            }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={t(video.titleKey)}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 0
                                    }}
                                />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <h3 style={{
                                    margin: '0 0 0.5rem 0',
                                    color: 'var(--text-primary)',
                                    fontSize: '1.2rem',
                                    fontFamily: 'var(--font-label)',
                                    letterSpacing: '0.5px',
                                    lineHeight: '1.4'
                                }}>
                                    {t(video.titleKey)}
                                </h3>
                                <p style={{
                                    margin: 0,
                                    color: 'var(--text-dim)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.5'
                                }}>
                                    {t(video.descKey)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/creators/${creator.id}`)}
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
                                <button
                                    type="button"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.6rem',
                                        background: 'var(--gold)',
                                        color: 'var(--bg-void)',
                                        border: '1px solid var(--gold)',
                                        fontFamily: 'var(--font-label)',
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                        padding: '0.8rem 1.8rem',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
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
                                    {t('creators_page.view_content', 'View Content')}
                                    <ArrowUpRight size={16} />
                                </button>

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
