import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { subscribeComments, addComment, deleteComment } from '../../services/firebaseUtils';
import { MessageSquare, Trash2 } from 'lucide-react';
import ProfileSetupModal from '../modals/ProfileSetupModal';
import TranslatableText from './TranslatableText';

const CONTENT_MAX = 2000;

export default function CommentSection({ type, itemId }) {
    const { t } = useTranslation();
    const { currentUser, userProfile, profileLoaded, signInWithGoogle } = useAuth();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [draft, setDraft] = useState('');
    const [posting, setPosting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [loginError, setLoginError] = useState('');
    const [setupOpen, setSetupOpen] = useState(false);

    useEffect(() => {
        let active = true;
        const unsubscribe = subscribeComments(type, itemId, (list) => {
            if (!active) return;
            setComments(list);
            setLoading(false);
        });
        return () => {
            active = false;
            unsubscribe();
        };
    }, [type, itemId]);

    async function handleGoogleLogin() {
        setLoginError('');
        try {
            await signInWithGoogle();
        } catch {
            setLoginError(t('comments.error_login', 'Google sign-in failed. Please try again.'));
        }
    }

    async function handlePost() {
        const content = draft.trim();
        if (!content || posting) return;
        setPosting(true);
        try {
            await addComment(type, itemId, content, userProfile, currentUser.uid);
            setDraft('');
        } catch {
            // The rules or network failed; keep the draft so nothing is lost.
        }
        setPosting(false);
    }

    const handleDelete = useCallback(async (commentId) => {
        if (deletingId) return;
        if (!window.confirm(t('comments.delete_confirm', 'Delete this comment?'))) return;
        setDeletingId(commentId);
        try {
            await deleteComment(commentId);
        } catch {
            // Rules or network failure — comment stays visible.
        }
        setDeletingId(null);
    }, [deletingId, t]);

    const formatDate = (createdAt) => {
        if (!createdAt) return '';
        const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
        return date.toLocaleDateString();
    };

    const canComment = !!currentUser;
    const hasProfile = !!userProfile && userProfile.uid === currentUser.uid;

    return (
        <div
            className="glass-panel"
            style={{
                marginTop: '2.5rem',
                padding: 'clamp(1.25rem, 4vw, 2.5rem)',
                border: '1px solid var(--gold)',
                boxShadow: '0 0 50px rgba(0, 0, 0, 0.3)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <MessageSquare size={22} color="var(--gold)" />
                <h2 style={{
                    fontFamily: 'var(--font-hero)', color: 'var(--gold)',
                    margin: 0, letterSpacing: '2px', fontSize: '1.4rem'
                }}>
                    {t('comments.title', 'COMMENTS')}
                </h2>
                <span style={{ color: 'var(--text-dim)', fontSize: '1rem' }}>({comments.length})</span>
            </div>

            {loading ? (
                <p style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
                    {t('comments.loading', 'Loading comments…')}
                </p>
            ) : comments.length === 0 ? (
                <p style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
                    {t('comments.empty', 'No comments yet. Be the first!')}
                </p>
            ) : (
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {comments.map((comment) => {
                        const isOwn = currentUser && comment.authorUid === currentUser.uid;
                        return (
                            <li
                                key={comment.id}
                                style={{
                                    padding: '1rem 0',
                                    borderBottom: '1px solid var(--border)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                    <span className="label-text" style={{
                                        background: 'var(--bg-void)',
                                        color: 'var(--accent-teal)',
                                        border: '1px solid var(--accent-teal)',
                                        padding: '4px 12px',
                                        borderRadius: '2px',
                                        fontSize: '0.95rem'
                                    }}>
                                        {comment.displayName} <span style={{ color: 'var(--gold)' }}>#{comment.serverNumber}</span>
                                    </span>
                                    <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                                        {formatDate(comment.createdAt)}
                                    </span>
                                </div>
                                <TranslatableText
                                    text={comment.content}
                                    as="p"
                                    style={{ margin: '0.75rem 0 0', color: '#FFFFFF', lineHeight: '1.6', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                                />
                                {isOwn && (
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(comment.id)}
                                        disabled={deletingId === comment.id}
                                        aria-label={t('comments.delete', 'Delete comment')}
                                        style={{
                                            marginTop: '0.5rem',
                                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                            background: 'transparent', border: 'none',
                                            color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.85rem'
                                        }}
                                    >
                                        <Trash2 size={14} /> {t('comments.delete', 'Delete')}
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}

            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                {!canComment ? (
                    <>
                        <p style={{ color: 'var(--text-dim)', margin: '0 0 1rem' }}>
                            {t('comments.login_prompt', 'Log in with Google to join the discussion.')}
                        </p>
                        {loginError && (
                            <p style={{ color: '#ff4444', fontSize: '0.9rem', margin: '0 0 1rem' }}>{loginError}</p>
                        )}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="label-text"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                                background: 'transparent', border: '1px solid var(--gold)',
                                color: 'var(--gold)', padding: '12px 24px', cursor: 'pointer',
                                fontSize: '0.95rem', letterSpacing: '1px'
                            }}
                        >
                            {t('comments.login_button', 'Continue with Google')}
                        </button>
                    </>
                ) : !profileLoaded ? (
                    <p style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
                        {t('comments.loading', 'Loading comments…')}
                    </p>
                ) : !hasProfile ? (
                    <>
                        <p style={{ color: 'var(--text-dim)', margin: '0 0 1rem' }}>
                            {t('comments.setup_prompt', 'Choose a nickname and your server number to start commenting.')}
                        </p>
                        <button
                            type="button"
                            onClick={() => setSetupOpen(true)}
                            className="label-text"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                                background: 'transparent', border: '1px solid var(--gold)',
                                color: 'var(--gold)', padding: '12px 24px', cursor: 'pointer',
                                fontSize: '0.95rem', letterSpacing: '1px'
                            }}
                        >
                            {t('comments.setup_button', 'Set up profile')}
                        </button>
                    </>
                ) : (
                    <div>
                        <textarea
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            maxLength={CONTENT_MAX}
                            placeholder={t('comments.placeholder', 'Write a comment…')}
                            rows={4}
                            style={{
                                width: '100%', boxSizing: 'border-box', padding: '12px',
                                background: 'var(--bg-void)', color: '#FFFFFF',
                                border: '1px solid var(--border)', borderRadius: '2px',
                                fontSize: '1rem', resize: 'vertical', fontFamily: 'inherit'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                            <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                                {userProfile.displayName} <span style={{ color: 'var(--gold)' }}>#{userProfile.serverNumber}</span>
                            </span>
                            <button
                                type="button"
                                onClick={handlePost}
                                disabled={posting || !draft.trim()}
                                className="label-text"
                                style={{
                                    padding: '10px 24px', cursor: 'pointer',
                                    background: 'var(--gold)', color: 'var(--bg-void)',
                                    border: 'none', fontSize: '0.95rem', letterSpacing: '1px',
                                    opacity: (posting || !draft.trim()) ? 0.5 : 1
                                }}
                            >
                                {posting ? t('comments.posting', 'POSTING…') : t('comments.post', 'POST')}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {setupOpen && (
                <ProfileSetupModal onClose={() => setSetupOpen(false)} />
            )}
        </div>
    );
}
