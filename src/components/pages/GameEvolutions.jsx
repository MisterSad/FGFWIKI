import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router';
import { 
    Flame, Star, Zap, Lightbulb, Search, Plus, MessageSquare, 
    CheckCircle2, Clock, AlertTriangle, Trash2, 
    ArrowUpDown, ShieldCheck, X, ChevronRight, Share2, Check,
    Sparkles, Layers, CheckCircle, User, Server, LogIn
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { 
    subscribeEvolutionThreads, 
    addEvolutionThread, 
    toggleVoteEvolution, 
    updateEvolutionStatus, 
    deleteEvolutionThread,
    subscribeEvolutionComments,
    addEvolutionComment,
    deleteEvolutionComment
} from '../../services/firebaseUtils';
import ProfileSetupModal from '../modals/ProfileSetupModal';
import TranslatableText from '../common/TranslatableText';
import { 
    calculateCommunityScore, 
    getDynamicDemandTier, 
    getDynamicTimelineProgress 
} from '../../lib/evolutions';

// Category metadata (100% English)
const CATEGORIES = [
    { id: 'all', label: 'All Categories', color: '#c9a84c' },
    { id: 'gameplay', label: 'Gameplay & Mechanics', color: '#38bdf8' },
    { id: 'qol', label: 'Quality of Life (QoL)', color: '#4ade80' },
    { id: 'balance', label: 'Balance & Meta', color: '#f59e0b' },
    { id: 'ships', label: 'Fleets & Flagships', color: '#a855f7' },
    { id: 'heroes', label: 'Heroes & Crew', color: '#ec4899' },
    { id: 'economy', label: 'Economy & Trade', color: '#eab308' },
    { id: 'pvp', label: 'PvP & GvG', color: '#ef4444' },
    { id: 'bugs', label: 'Bugs & Issues', color: '#f43f5e' },
    { id: 'general', label: 'General', color: '#94a3b8' },
];

// Visual Dynamic Demand Timeline Component (Frise de Demande Évolutive)
function DemandTimeline({ thread, allThreads = [], isCompact = false }) {
    const tier = getDynamicDemandTier(thread, allThreads);
    const progress = getDynamicTimelineProgress(thread, allThreads);

    const milestones = [
        { id: 'low', label: 'Emerging', icon: Lightbulb, color: '#64748b' },
        { id: 'moderate', label: 'Moderate', icon: Zap, color: '#06b6d4' },
        { id: 'high', label: 'High Priority', icon: Star, color: '#eab308' },
        { id: 'critical', label: 'Top Demand', icon: Flame, color: '#ef4444' },
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
                {/* Dynamic Gradient Fill */}
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

                {/* Dynamic Cursor Indicator */}
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

            {/* Evolutive Scale Labels */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                marginTop: '0.35rem',
                fontSize: isCompact ? '0.65rem' : '0.74rem',
                color: 'var(--text-dim)',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)'
            }}>
                {milestones.map((m) => {
                    const isActive = tier.id === m.id;
                    const IconComponent = m.icon;
                    return (
                        <div 
                            key={m.id}
                            style={{
                                color: isActive ? m.color : 'var(--text-dim)',
                                fontWeight: isActive ? 'bold' : 'normal',
                                opacity: isActive ? 1 : 0.65,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '3px'
                            }}
                        >
                            <IconComponent size={isCompact ? 10 : 12} />
                            <span>{m.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function GameEvolutions() {
    const { threadId: routeThreadId } = useParams();
    const { currentUser, userProfile, saveProfile, signInWithGoogle } = useAuth();

    // Admin detection: strictly authenticated admin email
    const isAdmin = useMemo(() => {
        if (!currentUser) return false;
        const email = (currentUser.email || '').trim().toLowerCase();
        return email === 'fgfwiwi@gmail.com' || email === 'vieira.andre@proton.me';
    }, [currentUser]);

    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTier, setSelectedTier] = useState('all');
    const [selectedStatus] = useState('all');
    const [sortBy, setSortBy] = useState('votes'); // 'votes' | 'newest' | 'comments' | 'status'
    const [adminViewQueue, setAdminViewQueue] = useState(false);

    // Modals & Selected Thread
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
    const [selectedThreadId, setSelectedThreadId] = useState(routeThreadId || null);
    const [copiedLink, setCopiedLink] = useState(false);

    // Derived active thread
    const selectedThread = useMemo(() => {
        const targetId = selectedThreadId || routeThreadId;
        if (!targetId || threads.length === 0) return null;
        return threads.find(t => t.id === targetId) || null;
    }, [selectedThreadId, routeThreadId, threads]);

    // Comments State for selected thread
    const [threadComments, setThreadComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [commentDraft, setCommentDraft] = useState('');
    const [postingComment, setPostingComment] = useState(false);

    const setSelectedThread = useCallback((threadOrId) => {
        if (!threadOrId) {
            setSelectedThreadId(null);
            setLoadingComments(false);
        } else if (typeof threadOrId === 'string') {
            setSelectedThreadId(threadOrId);
            setLoadingComments(true);
        } else {
            setSelectedThreadId(threadOrId.id);
            setLoadingComments(true);
        }
    }, []);

    // Creation Form state (Username & Server mandatory)
    const [authorName, setAuthorName] = useState(() => userProfile?.displayName || currentUser?.displayName || '');
    const [serverNumber, setServerNumber] = useState(() => (userProfile?.serverNumber ? String(userProfile.serverNumber) : ''));
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('gameplay');
    const [newDescription, setNewDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const [formError, setFormError] = useState('');

    const openCreateModal = useCallback(() => {
        if (userProfile?.displayName) setAuthorName(userProfile.displayName);
        else if (currentUser?.displayName) setAuthorName(currentUser.displayName);
        if (userProfile?.serverNumber) setServerNumber(String(userProfile.serverNumber));
        setFormError('');
        setFormSuccess(false);
        setIsCreateOpen(true);
    }, [userProfile, currentUser]);

    // 1. Subscribe to threads
    useEffect(() => {
        let active = true;
        const unsubscribe = subscribeEvolutionThreads((data) => {
            if (!active) return;
            setThreads(data || []);
            setLoading(false);
        });
        return () => {
            active = false;
            unsubscribe();
        };
    }, []);

    // 2. Subscribe to comments when a thread is selected
    useEffect(() => {
        const activeId = selectedThread?.id;
        if (!activeId) return;
        let isCurrent = true;
        const unsubscribe = subscribeEvolutionComments(activeId, (commentsList) => {
            if (isCurrent) {
                setThreadComments(commentsList || []);
                setLoadingComments(false);
            }
        });
        return () => {
            isCurrent = false;
            unsubscribe();
            setThreadComments([]);
        };
    }, [selectedThread?.id]);

    // Statistics counts calculated dynamically
    const stats = useMemo(() => {
        const publicThreads = threads.filter(t => t.status !== 'pending' && t.status !== 'rejected');
        const implementedCount = publicThreads.filter(t => t.status === 'implemented').length;
        
        // Count threads in top dynamic demand tiers
        const topRequested = publicThreads.filter(t => {
            const tier = getDynamicDemandTier(t, publicThreads);
            return tier.id === 'critical' || tier.id === 'high';
        }).length;

        return {
            total: publicThreads.length,
            implemented: implementedCount,
            topRequested
        };
    }, [threads]);

    // Filter threads based on search, category, dynamic tier, status, and admin queue
    const filteredThreads = useMemo(() => {
        const publicPool = threads.filter(t => t.status !== 'pending' && t.status !== 'rejected');

        return threads.filter(thread => {
            // Admin moderation queue filter
            if (adminViewQueue) {
                if (thread.status !== 'pending') return false;
            } else {
                // Public list: show approved, in_progress, implemented, and current user's own pending threads
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

            // Dynamic Tier filter
            if (selectedTier !== 'all') {
                const tier = getDynamicDemandTier(thread, publicPool);
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
                const scoreB = calculateCommunityScore(b.votesCount, b.commentCount);
                const scoreA = calculateCommunityScore(a.votesCount, a.commentCount);
                const diff = scoreB - scoreA;
                if (diff !== 0) return diff;
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            }
            if (sortBy === 'newest') {
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            }
            if (sortBy === 'comments') {
                return (b.commentCount || 0) - (a.commentCount || 0);
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
            window.alert('Please sign in to vote for this evolution proposal.');
            return;
        }
        try {
            await toggleVoteEvolution(thread.id, currentUser.uid);
        } catch (err) {
            console.error("Vote failed:", err);
        }
    }, [currentUser]);

    // Handle Create Submission (Mandatory Username & Server Number)
    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!currentUser) {
            setFormError('You must be signed in to submit a proposal.');
            return;
        }

        const trimmedAuthor = authorName.trim();
        const parsedServer = parseInt(serverNumber, 10);

        if (!trimmedAuthor) {
            setFormError('In-game Commander Name is required.');
            return;
        }

        if (!parsedServer || parsedServer <= 0 || parsedServer > 99999) {
            setFormError('Please provide a valid Server Number (e.g. 1061).');
            return;
        }

        if (!newTitle.trim() || !newDescription.trim() || submitting) return;

        setSubmitting(true);
        try {
            // Save/Update user profile in Firestore so it persists
            if (saveProfile) {
                try {
                    await saveProfile(trimmedAuthor, parsedServer);
                } catch (saveErr) {
                    console.warn("Could not persist profile update:", saveErr);
                }
            }

            await addEvolutionThread({
                title: newTitle,
                category: newCategory,
                description: newDescription,
                displayName: trimmedAuthor,
                serverNumber: parsedServer,
            }, currentUser.uid, isAdmin);
            
            setFormSuccess(true);
            setTimeout(() => {
                setFormSuccess(false);
                setIsCreateOpen(false);
                setNewTitle('');
                setNewDescription('');
            }, 1800);
        } catch (err) {
            console.error("Error creating thread:", err);
            setFormError(err.message || 'Failed to submit proposal. Please try again.');
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
        if (!window.confirm('Are you sure you want to permanently delete this evolution thread?')) return;
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
        if (!content || !selectedThread || postingComment || !currentUser) return;

        const profileData = userProfile || {
            displayName: authorName.trim() || currentUser.displayName || 'Commander',
            serverNumber: parseInt(serverNumber, 10) || 1
        };

        setPostingComment(true);
        try {
            await addEvolutionComment(selectedThread.id, content, profileData, currentUser.uid, isAdmin);
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

    // Helper for category label
    const getCategoryLabel = (catId) => {
        const found = CATEGORIES.find(c => c.id === catId);
        return found ? found.label : 'General';
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
                    GAME EVOLUTIONS
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
                    Community feedback & feature request hub for Foundation: Galactic Frontier. Propose ideas and vote on the priority timeline: a monthly digest of top community requests is sent directly to the Content Creator relations team to be forwarded to the game developers.
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
                        <span><strong>{stats.topRequested}</strong> high demand</span>
                    </div>
                    {stats.implemented > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4ade80' }}>
                            <CheckCircle size={14} />
                            <span><strong>{stats.implemented}</strong> implemented in-game 🎉</span>
                        </div>
                    )}
                </div>

                {/* Single Primary Action Button */}
                <div>
                    <button
                        onClick={openCreateModal}
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
                        Propose an Evolution
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
                            placeholder="Search evolutions, keywords, problems or ideas..."
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

                    {/* Sort Selector: Dynamic Score (default), Newest, Comments */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ArrowUpDown size={13} />
                            Sort by:
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
                                { id: 'votes', label: '🔥 Top Priority' },
                                { id: 'newest', label: '🆕 Newest' },
                                { id: 'comments', label: '💬 Most Discussed' },
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

                    {/* Admin Moderation Queue Switch */}
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
                            <span>Admin Queue</span>
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

                {/* Categories Filter Row */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
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
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Dynamic Demand Tier Filter */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    flexWrap: 'wrap',
                    fontSize: '0.76rem'
                }}>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginRight: '4px' }}>
                        Demand Tier:
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
                        All Tiers
                    </button>
                    {[
                        { id: 'critical', color: '#ef4444', label: '🔥 Top Demand' },
                        { id: 'high', color: '#eab308', label: '⭐ High Priority' },
                        { id: 'moderate', color: '#06b6d4', label: '⚡ Moderate' },
                        { id: 'low', color: '#64748b', label: '💡 Emerging' },
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
                        {sortedThreads.length} {sortedThreads.length === 1 ? 'suggestion found' : 'suggestions found'}
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
                        Reset search filters
                    </button>
                </div>
            )}

            {/* ========================================== */}
            {/* EVOLUTION THREADS LIST                     */}
            {/* ========================================== */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-dim)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
                        Loading community proposals...
                    </div>
                </div>
            ) : sortedThreads.length === 0 ? (
                <div className="glass-panel" style={{
                    padding: '3.5rem 1.5rem',
                    textAlign: 'center',
                    borderRadius: '12px',
                    border: '1px dashed var(--border)'
                }}>
                    <Lightbulb size={36} style={{ color: 'var(--gold)', marginBottom: '0.75rem', opacity: 0.7 }} />
                    <h3 style={{ color: 'var(--text-primary)', margin: '0 0 0.4rem', fontSize: '1.2rem' }}>
                        {threads.length === 0 ? 'No Evolutions Submitted Yet' : 'No Results Found'}
                    </h3>
                    <p style={{ color: 'var(--text-dim)', margin: '0 0 1.25rem', fontSize: '0.9rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                        {threads.length === 0 
                            ? 'Be the first commander to submit a game feature request or improvement for the development team!' 
                            : 'No proposals match your search or filters. Try adjusting your search query.'}
                    </p>
                    {threads.length === 0 ? (
                        <button
                            onClick={openCreateModal}
                            style={{
                                background: 'var(--gold)',
                                color: '#000',
                                fontWeight: 'bold',
                                padding: '8px 18px',
                                borderRadius: '6px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.88rem'
                            }}
                        >
                            + Propose the First Evolution
                        </button>
                    ) : (
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
                            View All Suggestions
                        </button>
                    )}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {sortedThreads.map((thread) => {
                        const hasVoted = currentUser && Array.isArray(thread.votes) && thread.votes.includes(currentUser.uid);
                        const isPending = thread.status === 'pending';
                        const isImplemented = thread.status === 'implemented';

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
                                            {getCategoryLabel(thread.category)}
                                        </span>

                                        {/* Status Badges */}
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
                                                Pending Review
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
                                                Implemented in-game 🎉
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
                                        title={hasVoted ? 'You upvoted this proposal' : 'Upvote this proposal'}
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

                                {/* Dynamic Demand Timeline (Frise de Demande Évolutive) */}
                                <DemandTimeline thread={thread} allThreads={threads} isCompact={true} />

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
                                            {thread.commentCount || 0} comments
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--gold)' }}>
                                            Join Discussion <ChevronRight size={13} />
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
                                                    Approve
                                                </button>
                                            )}
                                            {thread.status === 'implemented' ? (
                                                <button
                                                    onClick={(e) => handleStatusChange(e, thread.id, 'approved')}
                                                    style={{
                                                        padding: '2px 7px',
                                                        background: 'rgba(255, 255, 255, 0.1)',
                                                        color: 'var(--text-dim)',
                                                        border: '1px solid var(--border)',
                                                        borderRadius: '4px',
                                                        fontSize: '0.72rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Revert to Approved
                                                </button>
                                            ) : (
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
                                                    Mark Implemented 🎉
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
                                                title="Delete Thread"
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
                        maxWidth: '640px',
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
                            PROPOSE A GAME EVOLUTION
                        </h2>
                        <p style={{ color: 'var(--text-dim)', margin: '0 0 1.25rem', fontSize: '0.88rem', lineHeight: '1.5' }}>
                            All proposals must be written in English so they can be forwarded directly to the game developers. Submissions will be reviewed by the fgfwiki moderation team before appearing publicly.
                        </p>

                        {/* Sign in prompt banner if user is not authenticated */}
                        {!currentUser && (
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(234, 179, 8, 0.12)',
                                border: '1px solid rgba(234, 179, 8, 0.35)',
                                borderRadius: '8px',
                                marginBottom: '1.25rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.6rem',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                <div style={{ color: '#eab308', fontSize: '0.88rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <LogIn size={16} />
                                    Authentication Required
                                </div>
                                <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.82rem' }}>
                                    Please sign in with your account to propose an evolution.
                                </p>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        try {
                                            if (signInWithGoogle) await signInWithGoogle();
                                        } catch (e) {
                                            console.error("Google sign in failed:", e);
                                        }
                                    }}
                                    style={{
                                        padding: '6px 14px',
                                        background: 'var(--gold)',
                                        color: '#000',
                                        fontWeight: 'bold',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.82rem',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    Sign In with Google
                                </button>
                            </div>
                        )}

                        {/* Success Banner */}
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
                                {isAdmin ? '🎉 Evolution posted live successfully!' : '🎉 Proposal submitted successfully! It is now pending review.'}
                            </div>
                        )}

                        {/* Error Banner */}
                        {formError && (
                            <div style={{
                                padding: '0.85rem',
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid #ef4444',
                                color: '#ef4444',
                                borderRadius: '8px',
                                marginBottom: '1.25rem',
                                textAlign: 'center',
                                fontSize: '0.88rem'
                            }}>
                                {formError}
                            </div>
                        )}

                        <form onSubmit={handleCreateSubmit}>
                            {/* Player Info Row: Username & Server Number (MANDATORY) */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: '0.85rem',
                                marginBottom: '1rem'
                            }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                        Commander / In-Game Username *
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                                        <input
                                            type="text"
                                            required
                                            value={authorName}
                                            onChange={(e) => setAuthorName(e.target.value)}
                                            placeholder="e.g. HawkTuah"
                                            style={{
                                                width: '100%',
                                                padding: '0.65rem 0.8rem 0.65rem 2.1rem',
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
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                        Server Number (e.g. 1061) *
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Server size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            max="99999"
                                            value={serverNumber}
                                            onChange={(e) => setServerNumber(e.target.value)}
                                            placeholder="e.g. 1061"
                                            style={{
                                                width: '100%',
                                                padding: '0.65rem 0.8rem 0.65rem 2.1rem',
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
                                </div>
                            </div>

                            {/* Title Field */}
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                    Evolution Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder='e.g. Add a "Claim All" button for mailbox rewards'
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
                                        Similar ideas already exist! Consider voting for them instead:
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
                                    Category *
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
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Detailed Description */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                    Detailed Problem & Proposed Solution *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    placeholder="Describe the current issue in detail and how you suggest resolving or improving it..."
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
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting || !currentUser}
                                    style={{
                                        padding: '0.65rem 1.4rem',
                                        background: 'var(--gold)',
                                        color: '#000',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontWeight: 'bold',
                                        fontSize: '0.88rem',
                                        cursor: (submitting || !currentUser) ? 'not-allowed' : 'pointer',
                                        opacity: (submitting || !currentUser) ? 0.6 : 1
                                    }}
                                >
                                    {submitting ? 'Submitting...' : 'Submit for Review'}
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
                                    {getCategoryLabel(selectedThread.category)}
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
                                        Pending Review
                                    </span>
                                )}
                                {selectedThread.status === 'implemented' && (
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        background: 'rgba(74, 222, 128, 0.15)',
                                        color: '#4ade80',
                                        border: '1px solid #4ade80',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '3px'
                                    }}>
                                        <CheckCircle2 size={12} />
                                        Implemented in-game 🎉
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
                                {copiedLink ? 'Link Copied!' : 'Share'}
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
                            <span>Proposed by: <strong>{selectedThread.displayName || 'Commander'}</strong> (Server {selectedThread.serverNumber || 1})</span>
                        </div>

                        {/* Description Body */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <TranslatableText
                                text={selectedThread.description}
                                as="div"
                                style={{
                                    color: 'var(--text-primary)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.65',
                                    whiteSpace: 'pre-wrap',
                                    background: 'rgba(0,0,0,0.25)',
                                    padding: '1.1rem',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            />
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
                                Dynamic Demand & Priority Timeline
                            </h4>
                            <DemandTimeline thread={selectedThread} allThreads={threads} isCompact={false} />
                            
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
                                        ? 'Voted (+1)'
                                        : 'I Support this Feature'}
                                </button>
                            </div>
                        </div>

                        {/* Comments & Discussions Section */}
                        <div style={{ marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <MessageSquare size={18} color="var(--gold)" />
                                <h3 style={{ margin: 0, color: 'var(--gold)', fontSize: '1.1rem' }}>
                                    Discussions & Comments ({threadComments.length})
                                </h3>
                            </div>

                            {/* Comment Input */}
                            {currentUser ? (
                                <form onSubmit={handlePostComment} style={{ marginBottom: '1.5rem' }}>
                                    <textarea
                                        rows={3}
                                        value={commentDraft}
                                        onChange={(e) => setCommentDraft(e.target.value)}
                                        placeholder="Write a constructive comment or additional feedback (in English)..."
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
                                            {postingComment ? 'Posting...' : 'Post Comment'}
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
                                    Please sign in to join the discussion and post comments.
                                </div>
                            )}

                            {/* Comments List */}
                            {loadingComments ? (
                                <div style={{ color: 'var(--text-dim)', fontStyle: 'italic', textAlign: 'center' }}>
                                    Loading discussion comments...
                                </div>
                            ) : threadComments.length === 0 ? (
                                <div style={{ color: 'var(--text-dim)', fontStyle: 'italic', textAlign: 'center', padding: '1.25rem 0' }}>
                                    No comments yet. Be the first to share your thoughts!
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                    {threadComments.map((comm) => {
                                        const isCommAuthor = currentUser && comm.authorUid === currentUser.uid;
                                        const isCommAdmin = Boolean(comm.isAdmin);

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
                                                                if (!window.confirm('Delete this comment permanently?')) return;
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
                                                            title="Delete Comment"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    )}
                                                </div>
                                                <TranslatableText
                                                    text={comm.content}
                                                    as="p"
                                                    style={{
                                                        margin: 0,
                                                        color: 'var(--text-primary)',
                                                        fontSize: '0.88rem',
                                                        lineHeight: '1.45',
                                                        whiteSpace: 'pre-wrap'
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Setup Modal fallback */}
            {isProfileSetupOpen && (
                <ProfileSetupModal onClose={() => setIsProfileSetupOpen(false)} />
            )}
        </div>
    );
}
