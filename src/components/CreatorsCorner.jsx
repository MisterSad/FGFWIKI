import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Video, ArrowLeft, ArrowUpRight, Search } from 'lucide-react';
import staticVideos from '../data/mirandusVideos.json';

// Creators data list static configuration
const creators = [
    {
        id: "mirandus-plays",
        name: "Mirandus Plays",
        youtubeUrl: "https://www.youtube.com/@mirandusplaysmobile",
        avatar: "/images/Mirandus.jpg",
        descKey: "creators_page.mirandus_desc",
        isPartner: true,
        youtubeHandle: "@mirandusplaysmobile",
        xUrl: "https://x.com/miranduscrafter",
        xHandle: "@miranduscrafter",
        playlistId: "PL2VyftArNQtQ2EbXMAmgwrPH0P4EvBVAR" // dedicated playlist ID
    }
];

export default function CreatorsCorner() {
    const { t } = useTranslation();
    const { creatorId } = useParams();
    const navigate = useNavigate();

    const selectedCreator = creatorId ? creators.find(c => c.id === creatorId) : null;

    // Videos and UI states
    const [videos, setVideos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(12);
    const [loading, setLoading] = useState(false);

    // Robust RSS tag content retriever helper
    const getTagContent = (element, tag) => {
        let el = element.querySelector(tag);
        if (!el) {
            // Try namespace format
            const nsTag = tag.includes(':') ? tag.replace(':', '\\:') : tag;
            el = element.querySelector(nsTag);
        }
        if (!el && tag.includes(':')) {
            const parts = tag.split(':');
            el = element.getElementsByTagName(parts[1])[0] || element.getElementsByTagName(tag)[0];
        }
        return el ? el.textContent : '';
    };

    useEffect(() => {
        if (!selectedCreator) return;

        const fetchLatestVideos = async () => {
            setLoading(true);
            try {
                // Fetch the channel's uploads RSS feed through a CORS proxy
                const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${selectedCreator.playlistId}`;
                const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`;
                
                const response = await fetch(proxyUrl);
                if (!response.ok) throw new Error('Failed to fetch uploads RSS feed');
                const text = await response.text();

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, 'text/xml');
                const entries = xmlDoc.querySelectorAll('entry');
                
                const fetchedVideos = [];
                entries.forEach((entry) => {
                    const videoId = getTagContent(entry, 'yt:videoId') || getTagContent(entry, 'videoId');
                    const title = getTagContent(entry, 'title') || '';
                    const published = getTagContent(entry, 'published') || '';
                    
                    // Filter: Only include videos about Foundation, exclude other games like Godforge
                    if (videoId && title && !title.toLowerCase().includes('godforge')) {
                        fetchedVideos.push({
                            id: videoId,
                            title: title,
                            published: published
                        });
                    }
                });

                // Merge real-time fetched videos with our static JSON file data
                const mergedMap = new Map();
                
                // 1. Insert fetched videos first (to keep latest versions)
                fetchedVideos.forEach(v => mergedMap.set(v.id, v));
                
                // 2. Insert static videos if not already present
                staticVideos.forEach(v => {
                    if (!mergedMap.has(v.id)) {
                        mergedMap.set(v.id, v);
                    }
                });

                const mergedList = Array.from(mergedMap.values());
                
                // Sort by date (most recent first)
                mergedList.sort((a, b) => new Date(b.published) - new Date(a.published));
                setVideos(mergedList);
            } catch (err) {
                console.error('Failed to retrieve YouTube feed, falling back to static database:', err);
                const sortedStatic = [...staticVideos].sort((a, b) => new Date(b.published) - new Date(a.published));
                setVideos(sortedStatic);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestVideos();
    }, [creatorId]);

    // Filter videos by search query
    const filteredVideos = videos.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

                        {/* Social Links Row */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            marginTop: '0.5rem'
                        }}>
                            {/* YouTube */}
                            <a
                                href={selectedCreator.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(212, 175, 55, 0.3)',
                                    borderRadius: '4px',
                                    color: '#FFFFFF',
                                    padding: '0.6rem 1.2rem',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.3s ease',
                                    fontFamily: 'var(--font-mono)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--gold)';
                                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                                    e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <Video size={16} style={{ color: 'var(--gold)' }} />
                                <span>YouTube: <strong>{selectedCreator.youtubeHandle}</strong></span>
                                <ArrowUpRight size={14} style={{ opacity: 0.6 }} />
                            </a>

                            {/* X / Twitter */}
                            {selectedCreator.xUrl && (
                                <a
                                    href={selectedCreator.xUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.8rem',
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)',
                                        borderRadius: '4px',
                                        color: '#FFFFFF',
                                        padding: '0.6rem 1.2rem',
                                        textDecoration: 'none',
                                        fontSize: '0.95rem',
                                        transition: 'all 0.3s ease',
                                        fontFamily: 'var(--font-mono)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--gold)';
                                        e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                                        e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <span style={{ color: 'var(--gold)', fontWeight: 'bold', fontSize: '0.9rem', fontFamily: 'var(--font-hero)', width: '16px', textAlign: 'center' }}>X</span>
                                    <span>X: <strong>{selectedCreator.xHandle}</strong></span>
                                    <ArrowUpRight size={14} style={{ opacity: 0.6 }} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Video Gallery Title & Search Filter */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1.5rem',
                    marginBottom: '2rem',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '1.25rem'
                }}>
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
                        <Video size={24} style={{ color: 'var(--gold)' }} /> {t('creators_page.playlist_title', 'VIDEO DATABASE')}
                    </h2>

                    {/* Search Field */}
                    <div style={{ position: 'relative', width: 'clamp(200px, 100%, 320px)' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}>
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder={t('creators_page.search_placeholder', 'Search guides & videos...')}
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setVisibleCount(12); // Reset count on search
                            }}
                            style={{
                                width: '100%',
                                padding: '0.65rem 1rem 0.65rem 2.25rem',
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid var(--border)',
                                color: '#FFFFFF',
                                borderRadius: '4px',
                                fontSize: '0.95rem',
                                fontFamily: 'var(--font-label)',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'var(--gold)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.04)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'var(--border)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.02)';
                            }}
                        />
                    </div>
                </div>

                {/* Loading state indicator */}
                {loading && videos.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                        {t('common.loading', 'Loading video files...')}
                    </div>
                )}

                {/* Grid of videos */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredVideos.slice(0, visibleCount).map((video, vIdx) => (
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
                                    src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                                    title={video.title}
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
                                    fontSize: '1.15rem',
                                    fontFamily: 'var(--font-label)',
                                    letterSpacing: '0.5px',
                                    lineHeight: '1.4',
                                    height: '2.8rem',
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}>
                                    {video.title}
                                </h3>
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--text-dim)',
                                    fontSize: '0.85rem'
                                }}>
                                    {new Date(video.published).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No results message */}
                {filteredVideos.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
                        {t('common.no_results', 'No videos match your search.')}
                    </div>
                )}

                {/* Paginate / Load More button */}
                {visibleCount < filteredVideos.length && (
                    <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
                        <button
                            type="button"
                            onClick={() => setVisibleCount(prev => prev + 12)}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--gold)',
                                color: 'var(--gold)',
                                fontFamily: 'var(--font-label)',
                                fontWeight: 'bold',
                                fontSize: '0.95rem',
                                padding: '1rem 2.5rem',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.05)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--gold)';
                                e.currentTarget.style.color = 'var(--bg-void)';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.3)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--gold)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.05)';
                                e.currentTarget.style.transform = 'none';
                            }}
                        >
                            {t('creators_page.load_more', 'Load More Videos')}
                        </button>
                    </div>
                )}
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
