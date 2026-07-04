import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Video, ArrowLeft, ArrowUpRight, Search, ChevronDown, MessageSquare } from 'lucide-react';
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
        playlistId: "UUkwuVMbcFtaKk37i2_5CR5A" // uploads playlist ID
    }
];

const interviewQuestions = [
    {
        category: "Inspiration & Motivation",
        categoryFr: "Inspiration & Motivation",
        question: "What first inspired you to start creating video guides for Foundation: Galactic Frontier, and what keeps you motivated to produce and share content with the community week after week?",
        questionFr: "Qu'est-ce qui vous a d'abord inspiré à créer des guides vidéo pour Foundation: Galactic Frontier, et qu'est-ce qui vous motive à produire et à partager du contenu avec la communauté semaine après semaine ?",
        answer: "I have been making content on mobile and PC games for about 9 years now. I was looking for a new game to cover when I found FGF, I liked it when I tried it and it had the features I was looking for so I chose it. My motivation is that I just love to talk about games that I am interested in and playing, I also love to teach others how to do things better and with more efficiency so it's a great fit for me.",
        answerFr: "Je crée du contenu sur les jeux mobiles et PC depuis environ 9 ans maintenant. Je cherchais un nouveau jeu à couvrir quand j'ai découvert FGF. J'ai aimé le jeu en l'essayant et il avait les fonctionnalités que je recherchais, alors je l'ai choisi. Ma motivation vient du fait que j'adore tout simplement parler des jeux qui m'intéressent et auxquels je joue. J'aime aussi enseigner aux autres comment faire les choses mieux et plus efficacement, c'est donc un choix idéal pour moi."
    },
    {
        category: "Theorycrafting & Analytical Process",
        categoryFr: "Théorie & Processus Analytique",
        question: "Your hero tier lists and fleet optimization guides are highly detailed. Could you walk us through your process for researching new updates and translating complex numbers into accessible guides for your viewers?",
        questionFr: "Vos tier lists de héros et vos guides d'optimisation de flotte sont extrêmement détaillés. Pouvez-vous nous expliquer votre processus de recherche lors des nouvelles mises à jour et comment vous traduisez des chiffres complexes en guides accessibles pour vos spectateurs ?",
        answer: "Experience is the key, I won't make content on something unless I understand it and feel like I can teach others about it first, combined with the experience I have had over the years doing this same thing in other games that makes this process old hat for me. Know it first, before you try to teach it has always been my gameplan.",
        answerFr: "L'expérience est la clé. Je ne ferai pas de contenu sur un sujet à moins de le comprendre et de sentir que je peux l'enseigner aux autres d'abord. Combiné avec l'expérience que j'ai acquise au fil des ans en faisant la même chose dans d'autres jeux, ce processus est devenu une seconde nature pour moi. Ma stratégie a toujours été de maîtriser le sujet avant d'essayer de l'enseigner."
    },
    {
        category: "Creative Preferences",
        categoryFr: "Préférences Créatives",
        question: "Between writing structured theorycrafting guides and recording intense, real-time PvP/SvS battles, which type of video do you find the most rewarding and fun to make, and why?",
        questionFr: "Entre la rédaction de guides théoriques structurés et l'enregistrement de combats PvP/SvS intenses en temps réel, quel type de vidéo trouvez-vous le plus gratifiant et le plus amusant à réaliser, et pourquoi ?",
        answer: "That question depends on the game really, I have always usually been that theory crafting, economy nerd in the past, but in FGF I have found PVP to be extremely fun and rewarding and honestly as my playlist can attest, I have enjoyed that gameplay mechanic the best in this game.",
        answerFr: "Cette question dépend vraiment du jeu. Par le passé, j'ai généralement été le genre de geek branché théorie et économie, mais dans FGF, je trouve le PvP extrêmement amusant et gratifiant. Honnêtement, comme ma playlist en témoigne, c'est la mécanique de jeu que j'ai le plus appréciée dans ce jeu."
    },
    {
        category: "Community-driven Topics",
        categoryFr: "Sujets Communautaires",
        question: "How much does viewer feedback and guild requests influence the topics of your upcoming videos, and how do you balance making videos you are personally passionate about with what the community wants to see?",
        questionFr: "À quel point les retours des spectateurs et les demandes de guilde rencontrent-ils les sujets de vos prochaines vidéos, et comment équilibrez-vous la création de vidéos qui vous passionnent personnellement avec ce que la communauté souhaite voir ?",
        answer: "I love it when my community and guild members suggest content they'd like to see. Their ideas give me inspiration and motivation, and there's nothing better than being able to create something they requested and seeing them enjoy it. Most of the time, my interests in the game line up with what the community wants to see, so it ends up being a win-win for everyone.",
        answerFr: "J'adore quand ma communauté et les membres de ma guilde suggèrent du contenu qu'ils aimeraient voir. Leurs idées me donnent de l'inspiration et de la motivation, et il n'y a rien de mieux que de pouvoir créer quelque chose qu'ils ont demandé et de les voir l'apprécier. La plupart du temps, mes intérêts dans le jeu s'alignent avec ce que la communauté veut voir, donc tout le monde y trouve son compte."
    },
    {
        category: "Advising New Creators",
        categoryFr: "Conseils aux Nouveaux Créateurs",
        question: "As a well-established voice in the mobile strategy space, what is the single most important piece of advice you would give to a gamer looking to start their own content creation channel today?",
        questionFr: "En tant que voix reconnue dans le domaine de la stratégie mobile, quel est le conseil le plus important que vous donneriez à un joueur qui souhaite lancer sa propre chaîne de création de contenu aujourd'hui ?",
        answer: "My number one piece of advice is to choose a game you genuinely love and enjoy playing. When you're passionate about the game, creating content feels fun instead of feeling like a job. That enjoyment shows in your videos, and it makes a huge difference when it comes to staying consistent. Building a successful channel takes time, and if you actually enjoy the process, you're much more likely to stick with it long enough for your channel to grow and reach its potential.",
        answerFr: "Mon conseil numéro un est de choisir un jeu que vous aimez sincèrement et auquel vous prenez plaisir à jouer. Quand vous êtes passionné par le jeu, créer du contenu est amusant au lieu de ressembler à un travail. Ce plaisir se ressent dans vos vidéos, et cela fait une énorme différence pour rester régulier. Construire une chaîne à succès prend du temps, et si vous appréciez réellement le processus, vous avez beaucoup plus de chances de persévérer suffisamment longtemps pour que votre chaîne grandisse et atteigne son potentiel."
    }
];

export default function CreatorsCorner() {
    const { t, i18n } = useTranslation();
    const lang = (i18n.language || 'en').split('-')[0];
    const { creatorId } = useParams();
    const navigate = useNavigate();

    const selectedCreator = creatorId ? creators.find(c => c.id === creatorId) : null;

    // Videos and UI states
    const [videos, setVideos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(12);
    const [loading, setLoading] = useState(false);

    // Collapsible Interview States
    const [isInterviewOpen, setIsInterviewOpen] = useState(false);
    const [openQuestions, setOpenQuestions] = useState({ 0: true }); // First question open by default

    // Toggle individual question
    const toggleQuestion = (index) => {
        setOpenQuestions(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Expand all questions
    const expandAll = (e) => {
        e.stopPropagation(); // Avoid triggering main panel collapse
        setOpenQuestions({ 0: true, 1: true, 2: true, 3: true, 4: true });
    };

    // Collapse all questions
    const collapseAll = (e) => {
        e.stopPropagation(); // Avoid triggering main panel collapse
        setOpenQuestions({});
    };

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
                    
                    // Filter: Only include videos about Foundation, exclude other games like Godforge/Dune
                    if (videoId && title && !title.toLowerCase().includes('godforge') && !title.toLowerCase().includes('dune')) {
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

                {/* Collapsible Interview Section */}
                {selectedCreator.id === 'mirandus-plays' && (
                    <div
                        className="glass-panel"
                        style={{
                            padding: '2rem',
                            border: '1px solid var(--gold)',
                            borderRadius: '8px',
                            marginBottom: '4rem',
                            background: 'rgba(13, 14, 20, 0.75)',
                            backdropFilter: 'blur(12px)',
                            boxShadow: isInterviewOpen ? '0 0 35px rgba(212, 175, 55, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative'
                        }}
                    >
                        <div className="corner-tl"></div>
                        <div className="corner-br"></div>
                        <div className="scan-line" style={{ pointerEvents: 'none' }}></div>

                        {/* Header Toggle */}
                        <div
                            onClick={() => setIsInterviewOpen(!isInterviewOpen)}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                userSelect: 'none'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', textAlign: 'left' }}>
                                <div style={{
                                    background: 'rgba(201, 168, 76, 0.1)',
                                    border: '1px solid var(--gold)',
                                    borderRadius: '50%',
                                    width: '48px',
                                    height: '48px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--gold-bright)',
                                    boxShadow: '0 0 15px rgba(201, 168, 76, 0.15)',
                                    flexShrink: 0
                                }}>
                                    <MessageSquare size={22} />
                                </div>
                                <div>
                                    <h3 style={{
                                        margin: 0,
                                        fontFamily: 'var(--font-hero)',
                                        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                                        color: isInterviewOpen ? 'var(--gold-bright)' : '#FFFFFF',
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase',
                                        transition: 'color 0.3s ease'
                                    }}>
                                        {t('creators_page.interview_title', 'EXCLUSIVE CREATOR INTERVIEW: 5 QUESTIONS WITH MIRANDUS')}
                                    </h3>
                                    <p style={{
                                        margin: '0.3rem 0 0 0',
                                        fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.4'
                                    }}>
                                        {t('creators_page.interview_subtitle', 'Deep dive into his motivation, process, and advice.')}
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                color: 'var(--gold-bright)',
                                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: isInterviewOpen ? 'rotate(180deg)' : 'rotate(0)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginLeft: '1rem'
                            }}>
                                <ChevronDown size={28} />
                            </div>
                        </div>

                        {/* Content Wrapper */}
                        <div style={{
                            maxHeight: isInterviewOpen ? '2500px' : '0px',
                            opacity: isInterviewOpen ? 1 : 0,
                            overflow: 'hidden',
                            transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
                            marginTop: isInterviewOpen ? '2rem' : '0'
                        }}>
                            {isInterviewOpen && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {/* Expand/Collapse buttons */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: '1.5rem',
                                        borderBottom: '1px solid rgba(201, 168, 76, 0.1)',
                                        paddingBottom: '1rem',
                                        marginTop: '0.5rem'
                                    }}>
                                        <button
                                            type="button"
                                            onClick={expandAll}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'var(--gold-bright)',
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.8rem',
                                                cursor: 'pointer',
                                                letterSpacing: '1px',
                                                textTransform: 'uppercase',
                                                padding: '4px 8px',
                                                transition: 'color 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                                            onMouseLeave={(e) => e.target.style.color = 'var(--gold-bright)'}
                                        >
                                            {t('creators_page.expand_all', '[ EXPAND ALL ]')}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={collapseAll}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'var(--text-secondary)',
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.8rem',
                                                cursor: 'pointer',
                                                letterSpacing: '1px',
                                                textTransform: 'uppercase',
                                                padding: '4px 8px',
                                                transition: 'color 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                                            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                                        >
                                            {t('creators_page.collapse_all', '[ COLLAPSE ALL ]')}
                                        </button>
                                    </div>

                                    {/* Questions Accordion */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {interviewQuestions.map((q, idx) => {
                                            const isOpen = !!openQuestions[idx];
                                            const qCategory = lang === 'fr' ? q.categoryFr : q.category;
                                            const qQuestion = lang === 'fr' ? q.questionFr : q.question;
                                            const qAnswer = lang === 'fr' ? q.answerFr : q.answer;

                                            return (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        border: isOpen ? '1px solid rgba(201, 168, 76, 0.4)' : '1px solid rgba(201, 168, 76, 0.15)',
                                                        borderRadius: '6px',
                                                        background: isOpen ? 'rgba(13, 14, 20, 0.6)' : 'rgba(255, 255, 255, 0.01)',
                                                        overflow: 'hidden',
                                                        transition: 'all 0.3s ease',
                                                        boxShadow: isOpen ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none'
                                                    }}
                                                >
                                                    {/* Question header */}
                                                    <div
                                                        onClick={() => toggleQuestion(idx)}
                                                        style={{
                                                            padding: '1.2rem 1.5rem',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            cursor: 'pointer',
                                                            background: isOpen ? 'rgba(201, 168, 76, 0.04)' : 'transparent',
                                                            userSelect: 'none',
                                                            transition: 'background 0.3s ease'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (!isOpen) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (!isOpen) e.currentTarget.style.background = 'transparent';
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', width: '90%', textAlign: 'left' }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                flexShrink: 0
                                                            }}>
                                                                <span style={{
                                                                    fontFamily: 'var(--font-mono)',
                                                                    fontSize: '0.8rem',
                                                                    color: 'var(--gold)',
                                                                    fontWeight: 'bold',
                                                                    letterSpacing: '1px'
                                                                }}>
                                                                    0{idx + 1}
                                                                </span>
                                                                <span style={{
                                                                    fontSize: '0.6rem',
                                                                    color: 'var(--gold-dim)',
                                                                    fontFamily: 'var(--font-mono)',
                                                                    textTransform: 'uppercase'
                                                                }}>
                                                                    Q&A
                                                                </span>
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                                                <span style={{
                                                                    fontFamily: 'var(--font-mono)',
                                                                    fontSize: '0.75rem',
                                                                    color: 'var(--gold-dim)',
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '1px'
                                                                }}>
                                                                    {qCategory}
                                                                </span>
                                                                <h4 style={{
                                                                    margin: 0,
                                                                    fontFamily: 'var(--font-label)',
                                                                    fontSize: '1rem',
                                                                    color: isOpen ? '#FFFFFF' : 'var(--text-primary)',
                                                                    fontWeight: '600',
                                                                    lineHeight: '1.4',
                                                                    transition: 'color 0.2s ease'
                                                                }}>
                                                                    {qQuestion}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                        <div style={{
                                                            color: 'var(--gold)',
                                                            transition: 'transform 0.3s ease',
                                                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                                                            flexShrink: 0,
                                                            marginLeft: '1rem'
                                                        }}>
                                                            <ChevronDown size={18} />
                                                        </div>
                                                    </div>

                                                    {/* Answer slide area */}
                                                    <div style={{
                                                        maxHeight: isOpen ? '850px' : '0px',
                                                        overflow: 'hidden',
                                                        transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        borderTop: isOpen ? '1px solid rgba(201, 168, 76, 0.1)' : '1px solid transparent'
                                                    }}>
                                                        {isOpen && (
                                                            <div style={{
                                                                padding: '1.5rem 1.8rem',
                                                                background: 'rgba(6, 7, 16, 0.4)',
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                gap: '1.5rem',
                                                                flexWrap: 'wrap',
                                                                alignItems: 'flex-start'
                                                            }}>
                                                                {/* Left Profile/Avatar column */}
                                                                <div style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    gap: '0.5rem',
                                                                    flex: '0 0 60px'
                                                                }}>
                                                                    <div style={{
                                                                        width: '44px',
                                                                        height: '44px',
                                                                        borderRadius: '50%',
                                                                        border: '2px solid var(--gold)',
                                                                        overflow: 'hidden',
                                                                        boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                                                                        background: 'var(--bg-elevated)',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'
                                                                    }}>
                                                                        <img
                                                                            src={selectedCreator.avatar}
                                                                            alt="Mirandus Avatar"
                                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                            onError={(e) => {
                                                                                e.target.style.display = 'none';
                                                                                e.target.parentNode.innerHTML = '<span style="font-family:var(--font-hero);color:var(--gold-bright);font-weight:bold;font-size:1rem;">M</span>';
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <span style={{
                                                                        fontFamily: 'var(--font-mono)',
                                                                        fontSize: '0.65rem',
                                                                        color: 'var(--gold-bright)',
                                                                        textTransform: 'uppercase',
                                                                        letterSpacing: '1px',
                                                                        fontWeight: 'bold'
                                                                    }}>
                                                                        Mirandus
                                                                    </span>
                                                                </div>

                                                                {/* Right Answer Text column */}
                                                                <div style={{
                                                                    flex: '1 1 250px',
                                                                    color: 'var(--text-primary)',
                                                                    fontSize: '1.05rem',
                                                                    lineHeight: '1.8',
                                                                    textAlign: 'left',
                                                                    borderLeft: '2px solid rgba(201, 168, 76, 0.4)',
                                                                    paddingLeft: '1.5rem',
                                                                    boxSizing: 'border-box'
                                                                }}>
                                                                    {qAnswer}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

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
