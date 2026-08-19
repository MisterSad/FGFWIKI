import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router';
import { 
    Flame, Star, Zap, Lightbulb, Search, Plus, MessageSquare, 
    CheckCircle2, Clock, AlertTriangle, Trash2, 
    ArrowUpDown, ShieldCheck, X, ChevronRight, Share2, Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
    subscribeEvolutionThreads, 
    addEvolutionThread, 
    toggleVoteEvolution, 
    updateEvolutionStatus, 
    deleteEvolutionThread,
    subscribeEvolutionComments,
    addEvolutionComment,
    deleteEvolutionComment
} from '../firebaseUtils';
import ProfileSetupModal from './ProfileSetupModal';
import useSEO from '../hooks/useSEO';

// Category color palettes and metadata
const CATEGORIES = [
    { id: 'all', icon: null },
    { id: 'gameplay', color: '#38bdf8' },
    { id: 'qol', color: '#4ade80' },
    { id: 'balance', color: '#f59e0b' },
    { id: 'ships', color: '#a855f7' },
    { id: 'heroes', color: '#ec4899' },
    { id: 'economy', color: '#eab308' },
    { id: 'pvp', color: '#ef4444' },
    { id: 'bugs', color: '#f43f5e' },
    { id: 'general', color: '#94a3b8' },
];

// Priority / Demand Tiers
export function getDemandTier(votesCount = 0) {
    if (votesCount >= 30) {
        return {
            id: 'critical',
            level: 4,
            key: 'tier_critical',
            color: '#ef4444',
            gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
            icon: Flame,
            glow: 'rgba(239, 68, 68, 0.4)',
            labelEn: 'Critical / Top Priority',
            labelFr: 'Très Important / Prioritaire'
        };
    }
    if (votesCount >= 15) {
        return {
            id: 'high',
            level: 3,
            key: 'tier_high',
            color: '#eab308',
            gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
            icon: Star,
            glow: 'rgba(234, 179, 8, 0.3)',
            labelEn: 'Important',
            labelFr: 'Important'
        };
    }
    if (votesCount >= 5) {
        return {
            id: 'moderate',
            level: 2,
            key: 'tier_moderate',
            color: '#06b6d4',
            gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            icon: Zap,
            glow: 'rgba(6, 182, 212, 0.3)',
            labelEn: 'Moderate',
            labelFr: 'Modéré'
        };
    }
    return {
        id: 'low',
        level: 1,
        key: 'tier_low',
        color: '#64748b',
        gradient: 'linear-gradient(135deg, #64748b, #475569)',
        icon: Lightbulb,
        glow: 'rgba(100, 116, 139, 0.2)',
        labelEn: 'Low Demand',
        labelFr: 'Faible demande'
    };
}

// Calculate percentage on the timeline (0% to 100%)
function getTimelineProgress(votesCount = 0) {
    if (votesCount <= 0) return 3;
    if (votesCount < 5) {
        // Tier 1: 1 to 4 votes -> 5% to 25%
        return 5 + (votesCount / 4) * 20;
    }
    if (votesCount < 15) {
        // Tier 2: 5 to 14 votes -> 25% to 50%
        return 25 + ((votesCount - 5) / 10) * 25;
    }
    if (votesCount < 30) {
        // Tier 3: 15 to 29 votes -> 50% to 75%
        return 50 + ((votesCount - 15) / 15) * 25;
    }
    // Tier 4: 30+ votes -> 75% to 100%
    return Math.min(100, 75 + ((votesCount - 30) / 30) * 25);
}

// Visual Demand Timeline Component (Frise de Demande)
function DemandTimeline({ votesCount = 0, isCompact = false }) {
    const { t } = useTranslation();
    const tier = getDemandTier(votesCount);
    const progress = getTimelineProgress(votesCount);

    const tiersList = [
        { id: 'low', min: 1, label: t('evolutions.timeline.tier_low', 'Faible'), icon: Lightbulb, color: '#64748b' },
        { id: 'moderate', min: 5, label: t('evolutions.timeline.tier_moderate', 'Modéré'), icon: Zap, color: '#06b6d4' },
        { id: 'high', min: 15, label: t('evolutions.timeline.tier_high', 'Important'), icon: Star, color: '#eab308' },
        { id: 'critical', min: 30, label: t('evolutions.timeline.tier_critical', 'Très Important'), icon: Flame, color: '#ef4444' },
    ];

    return (
        <div style={{ width: '100%', margin: isCompact ? '0.6rem 0' : '1.25rem 0' }}>
            {/* Top row: Current Status indicator badge */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.4rem',
                fontSize: '0.8rem'
            }}>
                <span style={{ 
                    color: 'var(--text-dim)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.35rem',
                    fontFamily: 'var(--font-mono)'
                }}>
                    <tier.icon size={13} style={{ color: tier.color }} />
                    <strong style={{ color: tier.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {t(`evolutions.timeline.${tier.key}`)}
                    </strong>
                </span>
                <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    color: 'var(--text-primary)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)'
                }}>
                    <strong>{votesCount}</strong> {votesCount > 1 ? t('evolutions.timeline.votes_count_other', { count: votesCount, defaultValue: 'votes' }) : t('evolutions.timeline.votes_count_one', { count: votesCount, defaultValue: 'vote' })}
                </span>
            </div>

            {/* Timeline Progress Bar Track */}
            <div style={{
                position: 'relative',
                height: isCompact ? '8px' : '12px',
                background: 'rgba(255, 255, 255, 0.07)',
                borderRadius: '8px',
                overflow: 'visible',
                border: '1px solid var(--border)',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
            }}>
                {/* Gradient Fill */}
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #64748b 0%, #06b6d4 33%, #eab308 66%, #ef4444 100%)',
                    borderRadius: '8px',
                    boxShadow: `0 0 10px ${tier.glow}`,
                    transition: 'width 0.4s ease'
                }} />

                {/* Milestone Dividers */}
                {[25, 50, 75].map((pct, idx) => (
                    <div 
                        key={idx}
                        style={{
                            position: 'absolute',
                            left: `${pct}%`,
                            top: '-2px',
                            bottom: '-2px',
                            width: '2px',
                            background: progress >= pct ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)',
                            zIndex: 2,
                            borderRadius: '1px'
                        }}
                    />
                ))}

                {/* Cursor Indicator */}
                <div style={{
                    position: 'absolute',
                    left: `${progress}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isCompact ? '14px' : '18px',
                    height: isCompact ? '14px' : '18px',
                    background: '#fff',
                    borderRadius: '50%',
                    border: `2px solid ${tier.color}`,
                    boxShadow: `0 0 12px ${tier.color}`,
                    zIndex: 3,
                    transition: 'left 0.4s ease'
                }} />
            </div>

            {/* Scale Labels below */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                marginTop: '0.4rem',
                fontSize: isCompact ? '0.65rem' : '0.72rem',
                color: 'var(--text-dim)',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)'
            }}>
                {tiersList.map((tItem) => {
                    const isActive = tier.id === tItem.id;
                    return (
                        <div 
                            key={tItem.id}
                            style={{
                                color: isActive ? tItem.color : 'var(--text-dim)',
                                fontWeight: isActive ? 'bold' : 'normal',
                                opacity: isActive ? 1 : 0.65,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1px'
                            }}
                        >
                            <span>{tItem.label}</span>
                            {!isCompact && (
                                <span style={{ fontSize: '0.6rem', opacity: 0.8 }}>({tItem.min}+)</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function GameEvolutions() {
    useSEO();
    const { t } = useTranslation();
    const { threadId: routeThreadId } = useParams();
    const { currentUser, userProfile } = useAuth();

    // Admin detection: user named 'fgfwiki' or known admin email
    const isAdmin = useMemo(() => {
        if (!currentUser) return false;
        const name = (userProfile?.displayName || '').trim().toLowerCase();
        const email = (currentUser.email || '').trim().toLowerCase();
        return name === 'fgfwiki' || email.includes('fgfwiki') || email === 'vieira.andre@proton.me';
    }, [currentUser, userProfile]);

    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTier, setSelectedTier] = useState('all');
    const [sortBy, setSortBy] = useState('votes'); // 'votes' | 'newest' | 'comments' | 'status'
    const [adminViewQueue, setAdminViewQueue] = useState(false);

    // Modals
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
    const [selectedThread, setSelectedThread] = useState(null);
    const [copiedLink, setCopiedLink] = useState(false);

    // Creation Form state
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('gameplay');
    const [newDescription, setNewDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);

    // Comments State for selected thread
    const [threadComments, setThreadComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [commentDraft, setCommentDraft] = useState('');
    const [postingComment, setPostingComment] = useState(false);

    // 1. Subscribe to threads
    useEffect(() => {
        let active = true;
        const unsubscribe = subscribeEvolutionThreads((data) => {
            if (!active) return;
            setThreads(data);
            setLoading(false);
        });
        return () => {
            active = false;
            unsubscribe();
        };
    }, []);

    // 2. Open thread from URL param or deep link
    useEffect(() => {
        if (routeThreadId && threads.length > 0) {
            const found = threads.find(t => t.id === routeThreadId);
            if (found) setSelectedThread(found);
        }
    }, [routeThreadId, threads]);

    // 3. Subscribe to comments when a thread is selected
    useEffect(() => {
        if (!selectedThread?.id) {
            setThreadComments([]);
            return;
        }
        setLoadingComments(true);
        const unsubscribe = subscribeEvolutionComments(selectedThread.id, (commentsList) => {
            setThreadComments(commentsList);
            setLoadingComments(false);
        });
        return () => unsubscribe();
    }, [selectedThread?.id]);

    // Filter threads based on search, category, tier, and admin queue
    const filteredThreads = useMemo(() => {
        return threads.filter(thread => {
            // Admin moderation queue filter
            if (adminViewQueue) {
                if (thread.status !== 'pending') return false;
            } else {
                // Public list: only show approved, in_progress, implemented
                // or if current user is the author of a pending submission
                const isAuthor = currentUser && thread.authorUid === currentUser.uid;
                if (thread.status === 'pending' && !isAuthor && !isAdmin) {
                    return false;
                }
            }

            // Category filter
            if (selectedCategory !== 'all' && thread.category !== selectedCategory) {
                return false;
            }

            // Tier filter
            if (selectedTier !== 'all') {
                const tier = getDemandTier(thread.votesCount || 0);
                if (tier.id !== selectedTier) return false;
            }

            // Keyword search (title + description + author)
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim();
                const matchTitle = (thread.title || '').toLowerCase().includes(q);
                const matchDesc = (thread.description || '').toLowerCase().includes(q);
                const matchAuthor = (thread.displayName || '').toLowerCase().includes(q);
                if (!matchTitle && !matchDesc && !matchAuthor) return false;
            }

            return true;
        });
    }, [threads, adminViewQueue, selectedCategory, selectedTier, searchQuery, currentUser, isAdmin]);

    // Sort threads
    const sortedThreads = useMemo(() => {
        return [...filteredThreads].sort((a, b) => {
            if (sortBy === 'votes') {
                const diff = (b.votesCount || 0) - (a.votesCount || 0);
                if (diff !== 0) return diff;
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            }
            if (sortBy === 'newest') {
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            }
            if (sortBy === 'comments') {
                return (b.commentCount || 0) - (a.commentCount || 0);
            }
            if (sortBy === 'status') {
                const order = { 'implemented': 1, 'in_progress': 2, 'approved': 3, 'pending': 4, 'rejected': 5 };
                return (order[a.status] || 99) - (order[b.status] || 99);
            }
            return 0;
        });
    }, [filteredThreads, sortBy]);

    // Live duplicate detection for the creation modal
    const duplicateMatches = useMemo(() => {
        if (!newTitle.trim() || newTitle.trim().length < 3) return [];
        const words = newTitle.toLowerCase().trim().split(/\s+/).filter(w => w.length > 2);
        if (words.length === 0) return [];
        
        return threads
            .filter(t => t.status !== 'rejected')
            .map(thread => {
                const tText = `${thread.title} ${thread.description}`.toLowerCase();
                const score = words.filter(word => tText.includes(word)).length;
                return { thread, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(item => item.thread);
    }, [newTitle, threads]);

    // Count pending submissions for admin badge
    const pendingCount = useMemo(() => {
        return threads.filter(t => t.status === 'pending').length;
    }, [threads]);

    // Handle vote click
    const handleVote = useCallback(async (e, thread) => {
        e.stopPropagation();
        if (!currentUser) {
            window.alert(t('evolutions.timeline.login_to_vote', 'Veuillez vous connecter pour voter.'));
            return;
        }
        try {
            await toggleVoteEvolution(thread.id, currentUser.uid);
        } catch (err) {
            console.error("Vote failed:", err);
        }
    }, [currentUser, t]);

    // Handle Create Submission
    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newDescription.trim() || submitting) return;
        if (!currentUser) return;
        if (!userProfile) {
            setIsProfileSetupOpen(true);
            return;
        }

        setSubmitting(true);
        try {
            await addEvolutionThread({
                title: newTitle,
                category: newCategory,
                description: newDescription,
            }, userProfile, currentUser.uid);
            
            setFormSuccess(true);
            setTimeout(() => {
                setFormSuccess(false);
                setIsCreateOpen(false);
                setNewTitle('');
                setNewDescription('');
            }, 1800);
        } catch (err) {
            console.error("Error creating thread:", err);
        }
        setSubmitting(false);
    };

    // Handle Admin Status Update
    const handleStatusChange = async (e, threadId, newStatus) => {
        e.stopPropagation();
        try {
            await updateEvolutionStatus(threadId, newStatus);
            if (selectedThread && selectedThread.id === threadId) {
                setSelectedThread(prev => ({ ...prev, status: newStatus }));
            }
        } catch (err) {
            console.error("Admin status update failed:", err);
        }
    };

    // Handle Delete Thread
    const handleDeleteThread = async (e, threadId) => {
        e.stopPropagation();
        if (!window.confirm(t('evolutions.admin.delete_confirm', 'Supprimer définitivement ce sujet ?'))) return;
        try {
            await deleteEvolutionThread(threadId);
            if (selectedThread && selectedThread.id === threadId) {
                setSelectedThread(null);
            }
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    // Handle Comment Post
    const handlePostComment = async (e) => {
        e.preventDefault();
        const content = commentDraft.trim();
        if (!content || !selectedThread || postingComment || !currentUser || !userProfile) return;

        setPostingComment(true);
        try {
            await addEvolutionComment(selectedThread.id, content, userProfile, currentUser.uid, isAdmin);
            setCommentDraft('');
        } catch (err) {
            console.error("Comment post error:", err);
        }
        setPostingComment(false);
    };

    // Copy link to thread
    const handleShareLink = (thread) => {
        const url = `${window.location.origin}/evolutions/${thread.id}`;
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    return (
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem 6rem' }}>
            
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '4px 12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '20px',
                    color: '#ef4444',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '1rem',
                    letterSpacing: '1px'
                }}>
                    <Flame size={14} />
                    <span>COMMUNITY EVOLUTIONS & ROADMAP</span>
                </div>
                <h1 className="guide-title text-gradient" style={{ margin: '0 0 0.75rem' }}>
                    {t('evolutions.title', 'Game Evolutions')}
                </h1>
                <p className="guide-subtitle" style={{ maxWidth: '750px', margin: '0 auto 1.75rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
                    {t('evolutions.subtitle')}
                </p>

                {/* Primary CTA: Propose an Evolution */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => {
                            if (!currentUser) {
                                window.alert(t('evolutions.modal.login_required_desc'));
                                return;
                            }
                            if (!userProfile) {
                                setIsProfileSetupOpen(true);
                                return;
                            }
                            setIsCreateOpen(true);
                        }}
                        className="header-btn-login"
                        style={{
                            padding: '0.85rem 1.75rem',
                            background: 'linear-gradient(135deg, var(--gold), #b38b2d)',
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 20px rgba(201, 168, 76, 0.3)',
                            fontFamily: 'var(--font-hero)',
                            letterSpacing: '1px'
                        }}
                    >
                        <Plus size={18} />
                        {t('evolutions.propose_btn', 'Proposer une évolution')}
                    </button>
                </div>
            </div>

            {/* Admin Toolbar (Only visible to admin fgfwiki) */}
            {isAdmin && (
                <div style={{
                    marginBottom: '2rem',
                    padding: '1rem 1.5rem',
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(0,0,0,0.4))',
                    border: '1px solid #ef4444',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <ShieldCheck size={22} color="#ef4444" />
                        <div>
                            <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{t('evolutions.admin.title')}</strong>
                            <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                                Connecté en tant qu'administrateur vérifié.
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <button
                            onClick={() => setAdminViewQueue(!adminViewQueue)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: adminViewQueue ? '#ef4444' : 'rgba(255,255,255,0.05)',
                                color: adminViewQueue ? '#000' : 'var(--text-primary)',
                                border: '1px solid #ef4444',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Clock size={16} />
                            {adminViewQueue ? t('evolutions.admin.view_all') : t('evolutions.admin.view_pending')}
                            {pendingCount > 0 && (
                                <span style={{
                                    background: adminViewQueue ? '#000' : '#ef4444',
                                    color: '#fff',
                                    fontSize: '0.75rem',
                                    padding: '1px 6px',
                                    borderRadius: '10px'
                                }}>
                                    {pendingCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Search & Sort Controls Bar */}
            <div className="glass-panel" style={{
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {/* Live Search Input */}
                    <div style={{
                        position: 'relative',
                        flex: '1 1 300px',
                        minWidth: '240px'
                    }}>
                        <Search 
                            size={18} 
                            style={{ 
                                position: 'absolute', 
                                left: '12px', 
                                top: '50%', 
                                transform: 'translateY(-50%)', 
                                color: 'var(--text-dim)' 
                            }} 
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('evolutions.search_placeholder', 'Rechercher une évolution...')}
                            style={{
                                width: '100%',
                                padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                                background: 'var(--bg-void)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '0.95rem',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-dim)',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Sort Selector: Votes (default), Newest, Comments, Status */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ArrowUpDown size={14} />
                            {t('evolutions.sort_by', 'Trier par')}:
                        </span>
                        <div style={{
                            display: 'flex',
                            background: 'var(--bg-void)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            padding: '2px',
                            overflow: 'hidden'
                        }}>
                            {[
                                { id: 'votes', labelKey: 'sort_votes', defaultLabel: '🔥 Votes' },
                                { id: 'newest', labelKey: 'sort_newest', defaultLabel: '🆕 Récents' },
                                { id: 'comments', labelKey: 'sort_discussed', defaultLabel: '💬 Commentés' },
                                { id: 'status', labelKey: 'sort_status', defaultLabel: '🎯 Statut' },
                            ].map(sOption => (
                                <button
                                    key={sOption.id}
                                    onClick={() => setSortBy(sOption.id)}
                                    style={{
                                        padding: '6px 12px',
                                        background: sortBy === sOption.id ? 'var(--gold)' : 'transparent',
                                        color: sortBy === sOption.id ? '#000' : 'var(--text-dim)',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        fontWeight: sortBy === sOption.id ? 'bold' : 'normal',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {t(`evolutions.${sOption.labelKey}`, sOption.defaultLabel)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Categories filter pills */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    overflowX: 'auto',
                    paddingBottom: '4px',
                    scrollbarWidth: 'none'
                }}>
                    {CATEGORIES.map(cat => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                style={{
                                    padding: '5px 12px',
                                    background: isSelected ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.03)',
                                    border: '1px solid',
                                    borderColor: isSelected ? 'var(--gold)' : 'var(--border)',
                                    color: isSelected ? 'var(--gold-bright)' : 'var(--text-dim)',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.15s ease',
                                    fontFamily: 'var(--font-body)'
                                }}
                            >
                                {t(`evolutions.categories.${cat.id}`, cat.id)}
                            </button>
                        );
                    })}
                </div>

                {/* Priority / Timeline Tier filter pills */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    paddingTop: '4px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '0.8rem'
                }}>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                        {t('evolutions.filter_tier', 'Frise de Demande')}:
                    </span>
                    <button
                        onClick={() => setSelectedTier('all')}
                        style={{
                            padding: '3px 10px',
                            background: selectedTier === 'all' ? 'var(--text-primary)' : 'transparent',
                            color: selectedTier === 'all' ? '#000' : 'var(--text-dim)',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                        }}
                    >
                        {t('evolutions.filter_all', 'Tous')}
                    </button>
                    {[
                        { id: 'critical', icon: Flame, color: '#ef4444', label: '🔥 ' + t('evolutions.timeline.tier_critical', 'Très Important') },
                        { id: 'high', icon: Star, color: '#eab308', label: '⭐ ' + t('evolutions.timeline.tier_high', 'Important') },
                        { id: 'moderate', icon: Zap, color: '#06b6d4', label: '⚡ ' + t('evolutions.timeline.tier_moderate', 'Modéré') },
                        { id: 'low', icon: Lightbulb, color: '#64748b', label: '💡 ' + t('evolutions.timeline.tier_low', 'Faible') },
                    ].map(tierOption => (
                        <button
                            key={tierOption.id}
                            onClick={() => setSelectedTier(selectedTier === tierOption.id ? 'all' : tierOption.id)}
                            style={{
                                padding: '3px 10px',
                                background: selectedTier === tierOption.id ? `rgba(${tierOption.id === 'critical' ? '239,68,68' : tierOption.id === 'high' ? '234,179,8' : tierOption.id === 'moderate' ? '6,182,212' : '100,116,139'}, 0.2)` : 'transparent',
                                border: '1px solid',
                                borderColor: selectedTier === tierOption.id ? tierOption.color : 'var(--border)',
                                color: selectedTier === tierOption.id ? tierOption.color : 'var(--text-dim)',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            {tierOption.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Filters Summary if searching */}
            {(searchQuery || selectedCategory !== 'all' || selectedTier !== 'all' || adminViewQueue) && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    color: 'var(--text-dim)',
                    fontSize: '0.85rem'
                }}>
                    <span>
                        {sortedThreads.length} {sortedThreads.length === 1 ? 'résultat trouvé' : 'résultats trouvés'}
                    </span>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                            setSelectedTier('all');
                            setAdminViewQueue(false);
                        }}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--gold)',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            textDecoration: 'underline'
                        }}
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            )}

            {/* Threads List / Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-dim)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
                        Chargement des propositions communautaires...
                    </div>
                </div>
            ) : sortedThreads.length === 0 ? (
                <div className="glass-panel" style={{
                    padding: '3.5rem 1.5rem',
                    textAlign: 'center',
                    borderRadius: '12px',
                    border: '1px dashed var(--border)'
                }}>
                    <Lightbulb size={36} style={{ color: 'var(--gold)', marginBottom: '1rem', opacity: 0.6 }} />
                    <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>
                        {t('evolutions.details.empty_results', 'Aucune évolution trouvée avec ces filtres.')}
                    </h3>
                    <p style={{ color: 'var(--text-dim)', margin: '0 0 1.5rem', fontSize: '0.95rem' }}>
                        {t('evolutions.details.empty_cta', 'Soyez le premier à proposer cette idée !')}
                    </p>
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="header-btn-login"
                        style={{
                            padding: '0.65rem 1.25rem',
                            background: 'var(--gold)',
                            color: '#000',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        <Plus size={16} />
                        {t('evolutions.propose_btn', 'Proposer une évolution')}
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {sortedThreads.map((thread) => {
                        const hasVoted = currentUser && Array.isArray(thread.votes) && thread.votes.includes(currentUser.uid);
                        const isPending = thread.status === 'pending';
                        const isImplemented = thread.status === 'implemented';
                        const isInProgress = thread.status === 'in_progress';

                        return (
                            <div
                                key={thread.id}
                                onClick={() => setSelectedThread(thread)}
                                className="glass-panel"
                                style={{
                                    padding: '1.25rem 1.5rem',
                                    borderRadius: '12px',
                                    border: isPending ? '1px dashed #eab308' : isImplemented ? '1px solid #4ade80' : '1px solid var(--border)',
                                    background: isPending ? 'linear-gradient(135deg, rgba(234, 179, 8, 0.05), var(--bg-elevated))' : 'var(--bg-elevated)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem',
                                    position: 'relative'
                                }}
                            >
                                {/* Top Row: Category, Status Badges & Date */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        {/* Category Badge */}
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            background: 'rgba(255,255,255,0.06)',
                                            color: 'var(--text-primary)',
                                            fontFamily: 'var(--font-mono)',
                                            border: '1px solid var(--border)'
                                        }}>
                                            {t(`evolutions.categories.${thread.category || 'general'}`)}
                                        </span>

                                        {/* Status Badge */}
                                        {isPending && (
                                            <span style={{
                                                fontSize: '0.75rem',
                                                padding: '2px 8px',
                                                borderRadius: '4px',
                                                background: 'rgba(234, 179, 8, 0.15)',
                                                color: '#eab308',
                                                border: '1px solid #eab308',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <Clock size={12} />
                                                {t('evolutions.statuses.pending', 'En attente fgfwiki')}
                                            </span>
                                        )}
                                        {isInProgress && (
                                            <span style={{
                                                fontSize: '0.75rem',
                                                padding: '2px 8px',
                                                borderRadius: '4px',
                                                background: 'rgba(56, 189, 248, 0.15)',
                                                color: '#38bdf8',
                                                border: '1px solid #38bdf8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <Zap size={12} />
                                                {t('evolutions.statuses.in_progress', 'En cours d\'étude')}
                                            </span>
                                        )}
                                        {isImplemented && (
                                            <span style={{
                                                fontSize: '0.75rem',
                                                padding: '2px 8px',
                                                borderRadius: '4px',
                                                background: 'rgba(74, 222, 128, 0.15)',
                                                color: '#4ade80',
                                                border: '1px solid #4ade80',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <CheckCircle2 size={12} />
                                                {t('evolutions.statuses.implemented', 'Intégré en jeu 🎉')}
                                            </span>
                                        )}
                                    </div>

                                    {/* Author & Timestamp */}
                                    <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                                        {thread.displayName || 'Commander'} (S{thread.serverNumber || 1})
                                    </div>
                                </div>

                                {/* Title & Main Content Preview */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '1rem'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{
                                            margin: '0 0 0.5rem',
                                            fontSize: '1.15rem',
                                            color: 'var(--text-primary)',
                                            lineHeight: '1.4'
                                        }}>
                                            {thread.title}
                                        </h3>
                                        <p style={{
                                            margin: 0,
                                            color: 'var(--text-dim)',
                                            fontSize: '0.9rem',
                                            lineHeight: '1.5',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {thread.description}
                                        </p>
                                    </div>

                                    {/* Upvote Button Card Side */}
                                    <button
                                        onClick={(e) => handleVote(e, thread)}
                                        style={{
                                            padding: '0.6rem 0.9rem',
                                            background: hasVoted ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.2))' : 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid',
                                            borderColor: hasVoted ? '#ef4444' : 'var(--border)',
                                            color: hasVoted ? '#ef4444' : 'var(--text-primary)',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minWidth: '55px',
                                            gap: '2px',
                                            transition: 'all 0.2s ease'
                                        }}
                                        title={hasVoted ? t('evolutions.timeline.voted_btn') : t('evolutions.timeline.vote_btn')}
                                    >
                                        <Flame size={18} fill={hasVoted ? '#ef4444' : 'none'} />
                                        <span style={{ fontSize: '0.95rem', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
                                            {thread.votesCount || 0}
                                        </span>
                                    </button>
                                </div>

                                {/* Dynamic Demand Timeline Bar (Frise de Demande) */}
                                <DemandTimeline votesCount={thread.votesCount || 0} isCompact={true} />

                                {/* Bottom Info Row & Admin Controls */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingTop: '0.5rem',
                                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                                    fontSize: '0.8rem',
                                    color: 'var(--text-dim)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <MessageSquare size={14} />
                                            {thread.commentCount || 0}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gold)' }}>
                                            Voir le sujet <ChevronRight size={14} />
                                        </span>
                                    </div>

                                    {/* Admin Quick Action Buttons */}
                                    {isAdmin && (
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            {isPending && (
                                                <button
                                                    onClick={(e) => handleStatusChange(e, thread.id, 'approved')}
                                                    style={{
                                                        padding: '3px 8px',
                                                        background: '#22c55e',
                                                        color: '#000',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 'bold',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {t('evolutions.admin.approve', 'Valider')}
                                                </button>
                                            )}
                                            {thread.status !== 'in_progress' && (
                                                <button
                                                    onClick={(e) => handleStatusChange(e, thread.id, 'in_progress')}
                                                    style={{
                                                        padding: '3px 8px',
                                                        background: 'rgba(56, 189, 248, 0.2)',
                                                        color: '#38bdf8',
                                                        border: '1px solid #38bdf8',
                                                        borderRadius: '4px',
                                                        fontSize: '0.75rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    En cours
                                                </button>
                                            )}
                                            {thread.status !== 'implemented' && (
                                                <button
                                                    onClick={(e) => handleStatusChange(e, thread.id, 'implemented')}
                                                    style={{
                                                        padding: '3px 8px',
                                                        background: 'rgba(74, 222, 128, 0.2)',
                                                        color: '#4ade80',
                                                        border: '1px solid #4ade80',
                                                        borderRadius: '4px',
                                                        fontSize: '0.75rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Intégré 🎉
                                                </button>
                                            )}
                                            <button
                                                onClick={(e) => handleDeleteThread(e, thread.id)}
                                                style={{
                                                    padding: '3px 6px',
                                                    background: 'transparent',
                                                    color: '#f43f5e',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                                title={t('evolutions.admin.delete')}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ========================================== */}
            {/* CREATE PROPOSAL MODAL                      */}
            {/* ========================================== */}
            {isCreateOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.85)',
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backdropFilter: 'blur(6px)',
                    padding: '1rem',
                    boxSizing: 'border-box'
                }}>
                    <div className="glass-panel" style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '650px',
                        padding: 'clamp(1.25rem, 5vw, 2.25rem)',
                        border: '1px solid var(--gold)',
                        boxShadow: '0 0 50px rgba(0, 0, 0, 0.6)',
                        maxHeight: 'calc(100dvh - 2rem)',
                        overflowY: 'auto',
                        boxSizing: 'border-box'
                    }}>
                        <button
                            type="button"
                            onClick={() => setIsCreateOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-dim)',
                                cursor: 'pointer'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <h2 style={{
                            fontFamily: 'var(--font-hero)',
                            color: 'var(--gold)',
                            margin: '0 0 0.5rem',
                            letterSpacing: '1.5px',
                            fontSize: '1.3rem'
                        }}>
                            {t('evolutions.modal.create_title', 'PROPOSER UNE ÉVOLUTION DU JEU')}
                        </h2>
                        <p style={{ color: 'var(--text-dim)', margin: '0 0 1.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                            {t('evolutions.modal.moderation_notice')}
                        </p>

                        {formSuccess && (
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(74, 222, 128, 0.15)',
                                border: '1px solid #4ade80',
                                color: '#4ade80',
                                borderRadius: '8px',
                                marginBottom: '1.5rem',
                                textAlign: 'center',
                                fontSize: '0.95rem'
                            }}>
                                {t('evolutions.modal.success_msg')}
                            </div>
                        )}

                        <form onSubmit={handleCreateSubmit}>
                            {/* Title Field */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                    {t('evolutions.modal.title_label', 'Titre de l\'évolution')} *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder={t('evolutions.modal.title_placeholder')}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        background: 'var(--bg-void)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            {/* Live Duplicate Warning Box */}
                            {duplicateMatches.length > 0 && (
                                <div style={{
                                    marginBottom: '1.25rem',
                                    padding: '0.85rem 1rem',
                                    background: 'rgba(234, 179, 8, 0.08)',
                                    border: '1px solid rgba(234, 179, 8, 0.3)',
                                    borderRadius: '8px'
                                }}>
                                    <div style={{
                                        color: '#eab308',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        marginBottom: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem'
                                    }}>
                                        <AlertTriangle size={15} />
                                        {t('evolutions.modal.duplicate_warning')}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        {duplicateMatches.map(dm => (
                                            <div 
                                                key={dm.id}
                                                onClick={() => {
                                                    setIsCreateOpen(false);
                                                    setSelectedThread(dm);
                                                }}
                                                style={{
                                                    fontSize: '0.85rem',
                                                    color: 'var(--text-primary)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '4px 8px',
                                                    background: 'rgba(255,255,255,0.03)',
                                                    borderRadius: '4px'
                                                }}
                                            >
                                                <span style={{ textDecoration: 'underline' }}>{dm.title}</span>
                                                <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                                                    {dm.votesCount || 0} votes →
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Category Field */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                    {t('evolutions.modal.category_label', 'Catégorie')} *
                                </label>
                                <select
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        background: 'var(--bg-void)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                                        <option key={c.id} value={c.id}>
                                            {t(`evolutions.categories.${c.id}`, c.id)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Detailed Description */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                    {t('evolutions.modal.description_label')} *
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    placeholder={t('evolutions.modal.description_placeholder')}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        background: 'var(--bg-void)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.5',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsCreateOpen(false)}
                                    style={{
                                        padding: '0.75rem 1.25rem',
                                        background: 'transparent',
                                        border: '1px solid var(--border)',
                                        color: 'var(--text-dim)',
                                        borderRadius: '6px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {t('evolutions.modal.cancel', 'Annuler')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: 'var(--gold)',
                                        color: '#000',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontWeight: 'bold',
                                        cursor: submitting ? 'not-allowed' : 'pointer',
                                        opacity: submitting ? 0.7 : 1
                                    }}
                                >
                                    {submitting ? t('evolutions.modal.submitting') : t('evolutions.modal.submit_btn')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================== */}
            {/* THREAD DETAIL & COMMENTS MODAL             */}
            {/* ========================================== */}
            {selectedThread && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.85)',
                    zIndex: 9998,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backdropFilter: 'blur(6px)',
                    padding: '1rem',
                    boxSizing: 'border-box'
                }}>
                    <div className="glass-panel" style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '850px',
                        padding: 'clamp(1.25rem, 5vw, 2.5rem)',
                        border: '1px solid var(--gold)',
                        boxShadow: '0 0 60px rgba(0, 0, 0, 0.7)',
                        maxHeight: 'calc(100dvh - 2rem)',
                        overflowY: 'auto',
                        boxSizing: 'border-box'
                    }}>
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setSelectedThread(null)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-dim)',
                                cursor: 'pointer'
                            }}
                        >
                            <X size={24} />
                        </button>

                        {/* Top Badges & Share */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{
                                    fontSize: '0.8rem',
                                    padding: '3px 10px',
                                    borderRadius: '4px',
                                    background: 'rgba(255,255,255,0.08)',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'var(--font-mono)',
                                    border: '1px solid var(--border)'
                                }}>
                                    {t(`evolutions.categories.${selectedThread.category || 'general'}`)}
                                </span>
                                {selectedThread.status === 'pending' && (
                                    <span style={{
                                        fontSize: '0.8rem',
                                        padding: '3px 10px',
                                        borderRadius: '4px',
                                        background: 'rgba(234, 179, 8, 0.15)',
                                        color: '#eab308',
                                        border: '1px solid #eab308'
                                    }}>
                                        {t('evolutions.statuses.pending')}
                                    </span>
                                )}
                            </div>

                            <button
                                onClick={() => handleShareLink(selectedThread)}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid var(--border)',
                                    color: copiedLink ? '#4ade80' : 'var(--text-dim)',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem'
                                }}
                            >
                                {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
                                {copiedLink ? 'Lien copié !' : 'Partager'}
                            </button>
                        </div>

                        {/* Thread Title */}
                        <h2 style={{
                            color: 'var(--text-primary)',
                            margin: '0 0 1rem',
                            fontSize: '1.4rem',
                            lineHeight: '1.4'
                        }}>
                            {selectedThread.title}
                        </h2>

                        {/* Author metadata */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: 'var(--text-dim)',
                            fontSize: '0.85rem',
                            fontFamily: 'var(--font-mono)',
                            marginBottom: '1.5rem',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid var(--border)'
                        }}>
                            <span>{t('evolutions.details.proposed_by')}: <strong>{selectedThread.displayName || 'Commander'}</strong> (Serveur {selectedThread.serverNumber || 1})</span>
                        </div>

                        {/* Description Body */}
                        <div style={{
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            lineHeight: '1.7',
                            whiteSpace: 'pre-wrap',
                            marginBottom: '1.75rem',
                            background: 'rgba(0,0,0,0.25)',
                            padding: '1.25rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            {selectedThread.description}
                        </div>

                        {/* Large Interactive Demand Timeline */}
                        <div style={{
                            padding: '1.25rem',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            marginBottom: '2rem'
                        }}>
                            <h4 style={{ margin: '0 0 0.5rem', color: 'var(--gold-bright)', fontSize: '0.95rem' }}>
                                {t('evolutions.timeline.title', 'Frise de Demande & Priorité')}
                            </h4>
                            <DemandTimeline votesCount={selectedThread.votesCount || 0} isCompact={false} />
                            
                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <button
                                    onClick={(e) => handleVote(e, selectedThread)}
                                    style={{
                                        padding: '0.75rem 2rem',
                                        background: (currentUser && Array.isArray(selectedThread.votes) && selectedThread.votes.includes(currentUser.uid))
                                            ? 'linear-gradient(135deg, #ef4444, #f97316)'
                                            : 'rgba(255,255,255,0.08)',
                                        color: '#fff',
                                        border: '1px solid',
                                        borderColor: (currentUser && Array.isArray(selectedThread.votes) && selectedThread.votes.includes(currentUser.uid)) ? '#ef4444' : 'var(--border)',
                                        borderRadius: '8px',
                                        fontWeight: 'bold',
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: (currentUser && Array.isArray(selectedThread.votes) && selectedThread.votes.includes(currentUser.uid)) ? '0 0 15px rgba(239,68,68,0.4)' : 'none'
                                    }}
                                >
                                    <Flame size={20} />
                                    {(currentUser && Array.isArray(selectedThread.votes) && selectedThread.votes.includes(currentUser.uid))
                                        ? t('evolutions.timeline.voted_btn', 'Voté (+1)')
                                        : t('evolutions.timeline.vote_btn', 'Je soutiens cette idée')}
                                </button>
                            </div>
                        </div>

                        {/* Comments & Discussions Section */}
                        <div style={{ marginTop: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                <MessageSquare size={20} color="var(--gold)" />
                                <h3 style={{ margin: 0, color: 'var(--gold)', fontSize: '1.2rem' }}>
                                    {t('evolutions.details.comments_title')} ({threadComments.length})
                                </h3>
                            </div>

                            {/* Comment Input */}
                            {currentUser ? (
                                <form onSubmit={handlePostComment} style={{ marginBottom: '1.75rem' }}>
                                    <textarea
                                        rows={3}
                                        value={commentDraft}
                                        onChange={(e) => setCommentDraft(e.target.value)}
                                        placeholder={t('evolutions.details.comment_placeholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'var(--bg-void)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            fontSize: '0.95rem',
                                            lineHeight: '1.5',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            marginBottom: '0.5rem'
                                        }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button
                                            type="submit"
                                            disabled={postingComment || !commentDraft.trim()}
                                            style={{
                                                padding: '0.5rem 1.25rem',
                                                background: 'var(--gold)',
                                                color: '#000',
                                                border: 'none',
                                                borderRadius: '6px',
                                                fontWeight: 'bold',
                                                fontSize: '0.85rem',
                                                cursor: postingComment || !commentDraft.trim() ? 'not-allowed' : 'pointer',
                                                opacity: postingComment || !commentDraft.trim() ? 0.6 : 1
                                            }}
                                        >
                                            {postingComment ? 'Envoi...' : t('evolutions.details.post_comment', 'Publier le commentaire')}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div style={{
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    textAlign: 'center',
                                    color: 'var(--text-dim)',
                                    marginBottom: '1.5rem',
                                    fontSize: '0.9rem'
                                }}>
                                    {t('evolutions.modal.login_required_desc')}
                                </div>
                            )}

                            {/* Comments List */}
                            {loadingComments ? (
                                <div style={{ color: 'var(--text-dim)', fontStyle: 'italic', textAlign: 'center' }}>
                                    Chargement des discussions...
                                </div>
                            ) : threadComments.length === 0 ? (
                                <div style={{ color: 'var(--text-dim)', fontStyle: 'italic', textAlign: 'center', padding: '1.5rem 0' }}>
                                    {t('evolutions.details.no_comments')}
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {threadComments.map((comm) => {
                                        const isCommAuthor = currentUser && comm.authorUid === currentUser.uid;
                                        const isCommAdmin = comm.isAdmin || (comm.displayName || '').toLowerCase() === 'fgfwiki';

                                        return (
                                            <div
                                                key={comm.id}
                                                style={{
                                                    padding: '0.85rem 1rem',
                                                    background: isCommAdmin ? 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(0,0,0,0.3))' : 'rgba(255,255,255,0.03)',
                                                    borderRadius: '8px',
                                                    border: isCommAdmin ? '1px solid var(--gold)' : '1px solid var(--border)'
                                                }}
                                            >
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '0.35rem',
                                                    fontSize: '0.8rem'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                        <strong style={{ color: isCommAdmin ? 'var(--gold-bright)' : 'var(--text-primary)' }}>
                                                            {comm.displayName || 'Commander'}
                                                        </strong>
                                                        <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                                                            (S{comm.serverNumber || 1})
                                                        </span>
                                                        {isCommAdmin && (
                                                            <span style={{
                                                                background: 'var(--gold)',
                                                                color: '#000',
                                                                fontSize: '0.65rem',
                                                                fontWeight: 'bold',
                                                                padding: '1px 5px',
                                                                borderRadius: '3px'
                                                            }}>
                                                                ADMIN FGF WIKI
                                                            </span>
                                                        )}
                                                    </div>

                                                    {(isCommAuthor || isAdmin) && (
                                                        <button
                                                            onClick={async () => {
                                                                if (!window.confirm(t('evolutions.details.delete_comment_confirm', 'Supprimer ce commentaire ?'))) return;
                                                                try {
                                                                    await deleteEvolutionComment(selectedThread.id, comm.id);
                                                                } catch (err) {
                                                                    console.error("Error deleting comment:", err);
                                                                }
                                                            }}
                                                            style={{
                                                                background: 'transparent',
                                                                border: 'none',
                                                                color: 'var(--text-dim)',
                                                                cursor: 'pointer',
                                                                padding: '2px'
                                                            }}
                                                            title={t('evolutions.details.delete_comment')}
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    )}
                                                </div>
                                                <p style={{
                                                    margin: 0,
                                                    color: 'var(--text-primary)',
                                                    fontSize: '0.9rem',
                                                    lineHeight: '1.5',
                                                    whiteSpace: 'pre-wrap'
                                                }}>
                                                    {comm.content}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Setup Modal if user hasn't configured a nickname / server number */}
            {isProfileSetupOpen && (
                <ProfileSetupModal onClose={() => setIsProfileSetupOpen(false)} />
            )}
        </div>
    );
}
