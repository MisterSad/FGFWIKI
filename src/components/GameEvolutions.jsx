import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router';
import { 
    Flame, Star, Zap, Lightbulb, Search, Plus, MessageSquare, 
    CheckCircle2, Clock, AlertTriangle, Trash2, 
    ArrowUpDown, ShieldCheck, X, ChevronRight, Share2, Check,
    Send, Sparkles, Filter, Layers, CheckCircle
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

// Category metadata
const CATEGORIES = [
    { id: 'all', color: '#c9a84c' },
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

// Priority / Demand Tiers along the timeline
export function getDemandTier(votesCount = 0) {
    if (votesCount >= 30) {
        return {
            id: 'critical',
            level: 4,
            key: 'tier_critical',
            color: '#ef4444',
            gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
            icon: Flame,
            glow: 'rgba(239, 68, 68, 0.45)',
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
            glow: 'rgba(234, 179, 8, 0.35)',
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
            glow: 'rgba(6, 182, 212, 0.35)',
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
        glow: 'rgba(100, 116, 139, 0.25)',
        labelEn: 'Low Demand',
        labelFr: 'Faible demande'
    };
}

// Calculate progress percentage on the timeline (0% to 100%)
function getTimelineProgress(votesCount = 0) {
    if (votesCount <= 0) return 4;
    if (votesCount < 5) {
        return 4 + (votesCount / 4) * 21; // 4% -> 25%
    }
    if (votesCount < 15) {
        return 25 + ((votesCount - 5) / 10) * 25; // 25% -> 50%
    }
    if (votesCount < 30) {
        return 50 + ((votesCount - 15) / 15) * 25; // 50% -> 75%
    }
    return Math.min(100, 75 + ((votesCount - 30) / 30) * 25); // 75% -> 100%
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
        <div style={{ width: '100%', margin: isCompact ? '0.4rem 0' : '1.25rem 0' }}>
            {/* Timeline Progress Bar Track */}
            <div style={{
                position: 'relative',
                height: isCompact ? '6px' : '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6)'
            }}>
                {/* Gradient Fill */}
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #64748b 0%, #06b6d4 33%, #eab308 66%, #ef4444 100%)',
                    borderRadius: '6px',
                    boxShadow: `0 0 8px ${tier.glow}`,
                    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
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
                    width: isCompact ? '12px' : '16px',
                    height: isCompact ? '12px' : '16px',
                    background: '#fff',
                    borderRadius: '50%',
                    border: `2px solid ${tier.color}`,
                    boxShadow: `0 0 10px ${tier.color}`,
                    zIndex: 3,
                    transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
            </div>

            {/* Scale Labels below */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                marginTop: '0.35rem',
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
                                opacity: isActive ? 1 : 0.6,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '3px'
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
    const [selectedStatus, setSelectedStatus] = useState('all');
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

    // Statistics counts
    const stats = useMemo(() => {
        const publicThreads = threads.filter(t => t.status !== 'pending' && t.status !== 'rejected');
        const inProgressCount = publicThreads.filter(t => t.status === 'in_progress').length;
        const implementedCount = publicThreads.filter(t => t.status === 'implemented').length;
        const topRequested = publicThreads.filter(t => (t.votesCount || 0) >= 15).length;
        return {
            total: publicThreads.length,
            inProgress: inProgressCount,
            implemented: implementedCount,
            topRequested
        };
    }, [threads]);

    // Filter threads based on search, category, tier, status, and admin queue
    const filteredThreads = useMemo(() => {
        return threads.filter(thread => {
            // Admin moderation queue filter
            if (adminViewQueue) {
                if (thread.status !== 'pending') return false;
            } else {
                // Public list: only show approved, in_progress, implemented
                const isAuthor = currentUser && thread.authorUid === currentUser.uid;
                if (thread.status === 'pending' && !isAuthor && !isAdmin) {
                    return false;
                }
            }

            // Status filter
            if (selectedStatus !== 'all' && thread.status !== selectedStatus) {
                return false;
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
    }, [threads, adminViewQueue, selectedStatus, selectedCategory, selectedTier, searchQuery, currentUser, isAdmin]);

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
        <div className="container" style={{ maxWidth: '1050px', margin: '0 auto', padding: '1.5rem 1rem 6rem' }}>
            
            {/* ========================================== */}
            {/* HERO HEADER: DIRECT DEVELOPER PIPELINE    */}
            {/* ========================================== */}
            <div style={{
                textAlign: 'center',
                marginBottom: '2rem',
                position: 'relative'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '4px 12px',
                    background: 'rgba(201, 168, 76, 0.1)',
                    border: '1px solid var(--gold)',
                    borderRadius: '20px',
                    color: 'var(--gold-bright)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.75rem',
                    letterSpacing: '1px'
                }}>
                    <Sparkles size={13} />
                    <span>DIRECT DEVELOPER PIPELINE</span>
                </div>

                <h1 className="guide-title text-gradient" style={{ margin: '0 0 0.75rem', fontSize: 'clamp(1.8rem, 5vw, 2.6rem)' }}>
                    {t('evolutions.title', 'Game Evolutions')}
                </h1>

                {/* Subtitle / Monthly Extraction Notice */}
                <div style={{
                    maxWidth: '820px',
                    margin: '0 auto 1.5rem',
                    padding: '1rem 1.25rem',
                    background: 'linear-gradient(135deg, rgba(201, 168, 76, 0.08), rgba(0, 0, 0, 0.3))',
                    border: '1px solid rgba(201, 168, 76, 0.25)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    lineHeight: '1.6'
                }}>
                    {t('evolutions.subtitle')}
                </div>

                {/* Quick Statistics Row */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1.25rem',
                    flexWrap: 'wrap',
                    marginBottom: '1.5rem',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-dim)' }}>
                        <Layers size={14} color="var(--gold)" />
                        <span><strong>{stats.total}</strong> suggestions</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ef4444' }}>
                        <Flame size={14} />
                        <span><strong>{stats.topRequested}</strong> prioritaires</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#38bdf8' }}>
                        <Zap size={14} />
                        <span><strong>{stats.inProgress}</strong> à l'étude</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4ade80' }}>
                        <CheckCircle size={14} />
                        <span><strong>{stats.implemented}</strong> intégrées 🎉</span>
                    </div>
                </div>

                {/* Single Primary Action Button */}
                <div>
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
                        style={{
                            padding: '0.75rem 1.75rem',
                            background: 'linear-gradient(135deg, var(--gold), #b38b2d)',
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: '0.95rem',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 18px rgba(201, 168, 76, 0.25)',
                            fontFamily: 'var(--font-hero)',
                            letterSpacing: '1px'
                        }}
                    >
                        <Plus size={18} />
                        {t('evolutions.propose_btn', 'Proposer une évolution')}
                    </button>
                </div>
            </div>

            {/* ========================================== */}
            {/* UNIFIED CONTROLS & FILTER BAR              */}
            {/* ========================================== */}
            <div className="glass-panel" style={{
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
            }}>
                {/* Search & Sort Row */}
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {/* Live Search Input */}
                    <div style={{
                        position: 'relative',
                        flex: '1 1 280px',
                        minWidth: '220px'
                    }}>
                        <Search 
                            size={16} 
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
                            placeholder={t('evolutions.search_placeholder', 'Rechercher une idée, problème...')}
                            style={{
                                width: '100%',
                                padding: '0.65rem 2.2rem 0.65rem 2.4rem',
                                background: 'var(--bg-void)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '0.9rem',
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
                                <X size={15} />
                            </button>
                        )}
                    </div>

                    {/* Sort Selector: Votes (default), Newest, Comments, Status */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ArrowUpDown size={13} />
                            {t('evolutions.sort_by', 'Trier')}:
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
                                { id: 'votes', label: '🔥 ' + t('evolutions.sort_votes', 'Votes') },
                                { id: 'newest', label: '🆕 ' + t('evolutions.sort_newest', 'Récents') },
                                { id: 'comments', label: '💬 ' + t('evolutions.sort_discussed', 'Commentés') },
                                { id: 'status', label: '🎯 ' + t('evolutions.sort_status', 'Statut') },
                            ].map(sOption => (
                                <button
                                    key={sOption.id}
                                    onClick={() => setSortBy(sOption.id)}
                                    style={{
                                        padding: '5px 10px',
                                        background: sortBy === sOption.id ? 'var(--gold)' : 'transparent',
                                        color: sortBy === sOption.id ? '#000' : 'var(--text-dim)',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '0.78rem',
                                        fontWeight: sortBy === sOption.id ? 'bold' : 'normal',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    {sOption.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Admin Moderation Queue Switch (Discreet & Sleek) */}
                    {isAdmin && (
                        <button
                            onClick={() => setAdminViewQueue(!adminViewQueue)}
                            style={{
                                padding: '5px 12px',
                                background: adminViewQueue ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)',
                                color: adminViewQueue ? '#ef4444' : 'var(--text-dim)',
                                border: '1px solid',
                                borderColor: adminViewQueue ? '#ef4444' : 'var(--border)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <ShieldCheck size={14} color={adminViewQueue ? '#ef4444' : 'var(--text-dim)'} />
                            <span>File Admin</span>
                            {pendingCount > 0 && (
                                <span style={{
                                    background: '#ef4444',
                                    color: '#fff',
                                    fontSize: '0.7rem',
                                    padding: '1px 5px',
                                    borderRadius: '8px'
                                }}>
                                    {pendingCount}
                                </span>
                            )}
                        </button>
                    )}
                </div>

                {/* Categories & Frise Tier Filter Row */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    {/* Category Dropdown / Quick Select */}
                    <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '2px', scrollbarWidth: 'none' }}>
                        {CATEGORIES.map(cat => {
                            const isSelected = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    style={{
                                        padding: '4px 10px',
                                        background: isSelected ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.03)',
                                        border: '1px solid',
                                        borderColor: isSelected ? 'var(--gold)' : 'var(--border)',
                                        color: isSelected ? 'var(--gold-bright)' : 'var(--text-dim)',
                                        borderRadius: '16px',
                                        fontSize: '0.76rem',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    {t(`evolutions.categories.${cat.id}`, cat.id)}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Frise Tier Quick Filters */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    flexWrap: 'wrap',
                    fontSize: '0.76rem'
                }}>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginRight: '4px' }}>
                        {t('evolutions.filter_tier', 'Frise')}:
                    </span>
                    <button
                        onClick={() => setSelectedTier('all')}
                        style={{
                            padding: '2px 8px',
                            background: selectedTier === 'all' ? 'var(--text-primary)' : 'transparent',
                            color: selectedTier === 'all' ? '#000' : 'var(--text-dim)',
                            border: '1px solid var(--border)',
                            borderRadius: '10px',
                            fontSize: '0.72rem',
                            cursor: 'pointer'
                        }}
                    >
                        {t('evolutions.filter_all', 'Tous')}
                    </button>
                    {[
                        { id: 'critical', color: '#ef4444', label: '🔥 ' + t('evolutions.timeline.tier_critical', 'Très Important') },
                        { id: 'high', color: '#eab308', label: '⭐ ' + t('evolutions.timeline.tier_high', 'Important') },
                        { id: 'moderate', color: '#06b6d4', label: '⚡ ' + t('evolutions.timeline.tier_moderate', 'Modéré') },
                        { id: 'low', color: '#64748b', label: '💡 ' + t('evolutions.timeline.tier_low', 'Faible') },
                    ].map(tierOption => (
                        <button
                            key={tierOption.id}
                            onClick={() => setSelectedTier(selectedTier === tierOption.id ? 'all' : tierOption.id)}
                            style={{
                                padding: '2px 8px',
                                background: selectedTier === tierOption.id ? `rgba(255,255,255,0.1)` : 'transparent',
                                border: '1px solid',
                                borderColor: selectedTier === tierOption.id ? tierOption.color : 'var(--border)',
                                color: selectedTier === tierOption.id ? tierOption.color : 'var(--text-dim)',
                                borderRadius: '10px',
                                fontSize: '0.72rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            {tierOption.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active search results counter / reset banner */}
            {(searchQuery || selectedCategory !== 'all' || selectedTier !== 'all' || adminViewQueue) && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    color: 'var(--text-dim)',
                    fontSize: '0.82rem'
                }}>
                    <span>
                        {sortedThreads.length} {sortedThreads.length === 1 ? 'suggestion trouvée' : 'suggestions trouvées'}
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
                            fontSize: '0.78rem',
                            textDecoration: 'underline'
                        }}
                    >
                        Réinitialiser la recherche
                    </button>
                </div>
            )}

            {/* ========================================== */}
            {/* EVOLUTION THREADS LIST                     */}
            {/* ========================================== */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-dim)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
                        Chargement des propositions communautaires...
                    </div>
                </div>
            ) : sortedThreads.length === 0 ? (
                <div className="glass-panel" style={{
                    padding: '3rem 1.5rem',
                    textAlign: 'center',
                    borderRadius: '12px',
                    border: '1px dashed var(--border)'
                }}>
                    <Lightbulb size={32} style={{ color: 'var(--gold)', marginBottom: '0.75rem', opacity: 0.7 }} />
                    <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.4rem', fontSize: '1.1rem' }}>
                        {t('evolutions.details.empty_results', 'Aucune évolution trouvée.')}
                    </h3>
                    <p style={{ color: 'var(--text-dim)', margin: '0 0 1rem', fontSize: '0.9rem' }}>
                        Modifiez vos critères de recherche ou réinitialisez les filtres.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                            setSelectedTier('all');
                            setAdminViewQueue(false);
                        }}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--gold)',
                            color: 'var(--gold)',
                            padding: '6px 14px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.82rem'
                        }}
                    >
                        Voir toutes les suggestions
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
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
                                    padding: '1.1rem 1.25rem',
                                    borderRadius: '12px',
                                    border: isPending ? '1px dashed #eab308' : isImplemented ? '1px solid rgba(74, 222, 128, 0.4)' : '1px solid var(--border)',
                                    background: isPending ? 'linear-gradient(135deg, rgba(234, 179, 8, 0.05), var(--bg-elevated))' : 'var(--bg-elevated)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.6rem',
                                    position: 'relative'
                                }}
                            >
                                {/* Header Info: Category, Status, Author */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                                        {/* Category Badge */}
                                        <span style={{
                                            fontSize: '0.72rem',
                                            padding: '2px 7px',
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
                                                fontSize: '0.72rem',
                                                padding: '2px 7px',
                                                borderRadius: '4px',
                                                background: 'rgba(234, 179, 8, 0.15)',
                                                color: '#eab308',
                                                border: '1px solid #eab308',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '3px'
                                            }}>
                                                <Clock size={11} />
                                                {t('evolutions.statuses.pending', 'En attente')}
                                            </span>
                                        )}
                                        {isInProgress && (
                                            <span style={{
                                                fontSize: '0.72rem',
                                                padding: '2px 7px',
                                                borderRadius: '4px',
                                                background: 'rgba(56, 189, 248, 0.15)',
                                                color: '#38bdf8',
                                                border: '1px solid #38bdf8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '3px'
                                            }}>
                                                <Zap size={11} />
                                                {t('evolutions.statuses.in_progress', 'À l\'étude')}
                                            </span>
                                        )}
                                        {isImplemented && (
                                            <span style={{
                                                fontSize: '0.72rem',
                                                padding: '2px 7px',
                                                borderRadius: '4px',
                                                background: 'rgba(74, 222, 128, 0.15)',
                                                color: '#4ade80',
                                                border: '1px solid #4ade80',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '3px'
                                            }}>
                                                <CheckCircle2 size={11} />
                                                {t('evolutions.statuses.implemented', 'Intégré 🎉')}
                                            </span>
                                        )}
                                    </div>

                                    {/* Author & Server */}
                                    <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                                        {thread.displayName || 'Commander'} (S{thread.serverNumber || 1})
                                    </div>
                                </div>

                                {/* Body Row: Upvote Button + Title & Snippet */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    {/* Upvote Button on Left */}
                                    <button
                                        onClick={(e) => handleVote(e, thread)}
                                        style={{
                                            padding: '0.5rem 0.75rem',
                                            background: hasVoted ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(249, 115, 22, 0.25))' : 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid',
                                            borderColor: hasVoted ? '#ef4444' : 'var(--border)',
                                            color: hasVoted ? '#ef4444' : 'var(--text-primary)',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minWidth: '50px',
                                            gap: '2px',
                                            transition: 'all 0.2s ease',
                                            flexShrink: 0
                                        }}
                                        title={hasVoted ? t('evolutions.timeline.voted_btn') : t('evolutions.timeline.vote_btn')}
                                    >
                                        <Flame size={17} fill={hasVoted ? '#ef4444' : 'none'} />
                                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
                                            {thread.votesCount || 0}
                                        </span>
                                    </button>

                                    {/* Content Title & Snippet */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h3 style={{
                                            margin: '0 0 0.35rem',
                                            fontSize: '1.08rem',
                                            color: 'var(--text-primary)',
                                            lineHeight: '1.35'
                                        }}>
                                            {thread.title}
                                        </h3>
                                        <p style={{
                                            margin: 0,
                                            color: 'var(--text-dim)',
                                            fontSize: '0.85rem',
                                            lineHeight: '1.45',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {thread.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Dynamic Demand Timeline (Frise de Demande) */}
                                <DemandTimeline votesCount={thread.votesCount || 0} isCompact={true} />

                                {/* Bottom Info Row */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingTop: '0.35rem',
                                    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                                    fontSize: '0.78rem',
                                    color: 'var(--text-dim)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <MessageSquare size={13} />
                                            {thread.commentCount || 0} avis
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--gold)' }}>
                                            Participer à la discussion <ChevronRight size={13} />
                                        </span>
                                    </div>

                                    {/* Admin Controls on Card */}
                                    {isAdmin && (
                                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                            {isPending && (
                                                <button
                                                    onClick={(e) => handleStatusChange(e, thread.id, 'approved')}
                                                    style={{
                                                        padding: '2px 7px',
                                                        background: '#22c55e',
                                                        color: '#000',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        fontSize: '0.72rem',
                                                        fontWeight: 'bold',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Valider
                                                </button>
                                            )}
                                            {thread.status !== 'in_progress' && (
                                                <button
                                                    onClick={(e) => handleStatusChange(e, thread.id, 'in_progress')}
                                                    style={{
                                                        padding: '2px 7px',
                                                        background: 'rgba(56, 189, 248, 0.2)',
                                                        color: '#38bdf8',
                                                        border: '1px solid #38bdf8',
                                                        borderRadius: '4px',
                                                        fontSize: '0.72rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    À l'étude
                                                </button>
                                            )}
                                            {thread.status !== 'implemented' && (
                                                <button
                                                    onClick={(e) => handleStatusChange(e, thread.id, 'implemented')}
                                                    style={{
                                                        padding: '2px 7px',
                                                        background: 'rgba(74, 222, 128, 0.2)',
                                                        color: '#4ade80',
                                                        border: '1px solid #4ade80',
                                                        borderRadius: '4px',
                                                        fontSize: '0.72rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Intégré 🎉
                                                </button>
                                            )}
                                            <button
                                                onClick={(e) => handleDeleteThread(e, thread.id)}
                                                style={{
                                                    padding: '2px 5px',
                                                    background: 'transparent',
                                                    color: '#f43f5e',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                                title={t('evolutions.admin.delete')}
                                            >
                                                <Trash2 size={13} />
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
                        maxWidth: '620px',
                        padding: 'clamp(1.25rem, 5vw, 2rem)',
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
                            <X size={22} />
                        </button>

                        <h2 style={{
                            fontFamily: 'var(--font-hero)',
                            color: 'var(--gold)',
                            margin: '0 0 0.4rem',
                            letterSpacing: '1.2px',
                            fontSize: '1.25rem'
                        }}>
                            {t('evolutions.modal.create_title', 'PROPOSER UNE ÉVOLUTION DU JEU')}
                        </h2>
                        <p style={{ color: 'var(--text-dim)', margin: '0 0 1.25rem', fontSize: '0.88rem', lineHeight: '1.5' }}>
                            {t('evolutions.modal.moderation_notice')}
                        </p>

                        {formSuccess && (
                            <div style={{
                                padding: '0.85rem',
                                background: 'rgba(74, 222, 128, 0.15)',
                                border: '1px solid #4ade80',
                                color: '#4ade80',
                                borderRadius: '8px',
                                marginBottom: '1.25rem',
                                textAlign: 'center',
                                fontSize: '0.9rem'
                            }}>
                                {t('evolutions.modal.success_msg')}
                            </div>
                        )}

                        <form onSubmit={handleCreateSubmit}>
                            {/* Title Field */}
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
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
                                        padding: '0.7rem 0.9rem',
                                        background: 'var(--bg-void)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            {/* Live Duplicate Warning Box */}
                            {duplicateMatches.length > 0 && (
                                <div style={{
                                    marginBottom: '1rem',
                                    padding: '0.75rem 0.9rem',
                                    background: 'rgba(234, 179, 8, 0.08)',
                                    border: '1px solid rgba(234, 179, 8, 0.3)',
                                    borderRadius: '8px'
                                }}>
                                    <div style={{
                                        color: '#eab308',
                                        fontSize: '0.78rem',
                                        fontWeight: 'bold',
                                        marginBottom: '0.4rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.35rem'
                                    }}>
                                        <AlertTriangle size={14} />
                                        {t('evolutions.modal.duplicate_warning')}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                        {duplicateMatches.map(dm => (
                                            <div 
                                                key={dm.id}
                                                onClick={() => {
                                                    setIsCreateOpen(false);
                                                    setSelectedThread(dm);
                                                }}
                                                style={{
                                                    fontSize: '0.82rem',
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
                                                <span style={{ color: 'var(--gold)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                                                    {dm.votesCount || 0} votes →
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Category Field */}
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                    {t('evolutions.modal.category_label', 'Catégorie')} *
                                </label>
                                <select
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem 0.9rem',
                                        background: 'var(--bg-void)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '0.9rem',
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
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                    {t('evolutions.modal.description_label')} *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    placeholder={t('evolutions.modal.description_placeholder')}
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem 0.9rem',
                                        background: 'var(--bg-void)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.5',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsCreateOpen(false)}
                                    style={{
                                        padding: '0.65rem 1.1rem',
                                        background: 'transparent',
                                        border: '1px solid var(--border)',
                                        color: 'var(--text-dim)',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.88rem'
                                    }}
                                >
                                    {t('evolutions.modal.cancel', 'Annuler')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    style={{
                                        padding: '0.65rem 1.4rem',
                                        background: 'var(--gold)',
                                        color: '#000',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontWeight: 'bold',
                                        fontSize: '0.88rem',
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
                        maxWidth: '820px',
                        padding: 'clamp(1.25rem, 5vw, 2.25rem)',
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
                            <X size={22} />
                        </button>

                        {/* Top Badges & Share */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.75rem',
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{
                                    fontSize: '0.75rem',
                                    padding: '2px 8px',
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
                                        fontSize: '0.75rem',
                                        padding: '2px 8px',
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
                                    fontSize: '0.78rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem'
                                }}
                            >
                                {copiedLink ? <Check size={13} /> : <Share2 size={13} />}
                                {copiedLink ? 'Lien copié !' : 'Partager'}
                            </button>
                        </div>

                        {/* Thread Title */}
                        <h2 style={{
                            color: 'var(--text-primary)',
                            margin: '0 0 0.75rem',
                            fontSize: '1.35rem',
                            lineHeight: '1.35'
                        }}>
                            {selectedThread.title}
                        </h2>

                        {/* Author metadata */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: 'var(--text-dim)',
                            fontSize: '0.8rem',
                            fontFamily: 'var(--font-mono)',
                            marginBottom: '1.25rem',
                            paddingBottom: '0.75rem',
                            borderBottom: '1px solid var(--border)'
                        }}>
                            <span>{t('evolutions.details.proposed_by')}: <strong>{selectedThread.displayName || 'Commander'}</strong> (Serveur {selectedThread.serverNumber || 1})</span>
                        </div>

                        {/* Description Body */}
                        <div style={{
                            color: 'var(--text-primary)',
                            fontSize: '0.95rem',
                            lineHeight: '1.65',
                            whiteSpace: 'pre-wrap',
                            marginBottom: '1.5rem',
                            background: 'rgba(0,0,0,0.25)',
                            padding: '1.1rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            {selectedThread.description}
                        </div>

                        {/* Large Interactive Demand Timeline */}
                        <div style={{
                            padding: '1.1rem',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            marginBottom: '1.75rem'
                        }}>
                            <h4 style={{ margin: '0 0 0.4rem', color: 'var(--gold-bright)', fontSize: '0.9rem' }}>
                                {t('evolutions.timeline.title', 'Frise de Demande & Priorité')}
                            </h4>
                            <DemandTimeline votesCount={selectedThread.votesCount || 0} isCompact={false} />
                            
                            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                                <button
                                    onClick={(e) => handleVote(e, selectedThread)}
                                    style={{
                                        padding: '0.65rem 1.75rem',
                                        background: (currentUser && Array.isArray(selectedThread.votes) && selectedThread.votes.includes(currentUser.uid))
                                            ? 'linear-gradient(135deg, #ef4444, #f97316)'
                                            : 'rgba(255,255,255,0.08)',
                                        color: '#fff',
                                        border: '1px solid',
                                        borderColor: (currentUser && Array.isArray(selectedThread.votes) && selectedThread.votes.includes(currentUser.uid)) ? '#ef4444' : 'var(--border)',
                                        borderRadius: '8px',
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: (currentUser && Array.isArray(selectedThread.votes) && selectedThread.votes.includes(currentUser.uid)) ? '0 0 15px rgba(239,68,68,0.4)' : 'none'
                                    }}
                                >
                                    <Flame size={18} />
                                    {(currentUser && Array.isArray(selectedThread.votes) && selectedThread.votes.includes(currentUser.uid))
                                        ? t('evolutions.timeline.voted_btn', 'Voté (+1)')
                                        : t('evolutions.timeline.vote_btn', 'Je soutiens cette idée')}
                                </button>
                            </div>
                        </div>

                        {/* Comments & Discussions Section */}
                        <div style={{ marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <MessageSquare size={18} color="var(--gold)" />
                                <h3 style={{ margin: 0, color: 'var(--gold)', fontSize: '1.1rem' }}>
                                    {t('evolutions.details.comments_title')} ({threadComments.length})
                                </h3>
                            </div>

                            {/* Comment Input */}
                            {currentUser ? (
                                <form onSubmit={handlePostComment} style={{ marginBottom: '1.5rem' }}>
                                    <textarea
                                        rows={3}
                                        value={commentDraft}
                                        onChange={(e) => setCommentDraft(e.target.value)}
                                        placeholder={t('evolutions.details.comment_placeholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.7rem 0.9rem',
                                            background: 'var(--bg-void)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            fontSize: '0.9rem',
                                            lineHeight: '1.5',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            marginBottom: '0.4rem'
                                        }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button
                                            type="submit"
                                            disabled={postingComment || !commentDraft.trim()}
                                            style={{
                                                padding: '0.45rem 1.1rem',
                                                background: 'var(--gold)',
                                                color: '#000',
                                                border: 'none',
                                                borderRadius: '6px',
                                                fontWeight: 'bold',
                                                fontSize: '0.82rem',
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
                                    padding: '0.85rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    textAlign: 'center',
                                    color: 'var(--text-dim)',
                                    marginBottom: '1.25rem',
                                    fontSize: '0.85rem'
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
                                <div style={{ color: 'var(--text-dim)', fontStyle: 'italic', textAlign: 'center', padding: '1.25rem 0' }}>
                                    {t('evolutions.details.no_comments')}
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                    {threadComments.map((comm) => {
                                        const isCommAuthor = currentUser && comm.authorUid === currentUser.uid;
                                        const isCommAdmin = comm.isAdmin || (comm.displayName || '').toLowerCase() === 'fgfwiki';

                                        return (
                                            <div
                                                key={comm.id}
                                                style={{
                                                    padding: '0.75rem 0.9rem',
                                                    background: isCommAdmin ? 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(0,0,0,0.3))' : 'rgba(255,255,255,0.03)',
                                                    borderRadius: '8px',
                                                    border: isCommAdmin ? '1px solid var(--gold)' : '1px solid var(--border)'
                                                }}
                                            >
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '0.3rem',
                                                    fontSize: '0.78rem'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                        <strong style={{ color: isCommAdmin ? 'var(--gold-bright)' : 'var(--text-primary)' }}>
                                                            {comm.displayName || 'Commander'}
                                                        </strong>
                                                        <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                                                            (S{comm.serverNumber || 1})
                                                        </span>
                                                        {isCommAdmin && (
                                                            <span style={{
                                                                background: 'var(--gold)',
                                                                color: '#000',
                                                                fontSize: '0.62rem',
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
                                                            <Trash2 size={12} />
                                                        </button>
                                                    )}
                                                </div>
                                                <p style={{
                                                    margin: 0,
                                                    color: 'var(--text-primary)',
                                                    fontSize: '0.88rem',
                                                    lineHeight: '1.45',
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
