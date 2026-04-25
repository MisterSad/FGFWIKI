import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
    const { login, signup, signInWithGoogle, sendMagicLink } = useAuth();
    const { t } = useTranslation();
    const [isLogin, setIsLogin] = useState(true);
    const [useMagicLink, setUseMagicLink] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            if (useMagicLink) {
                await sendMagicLink(email);
                setMessage(t('login_modal.magic_link_sent'));
            } else if (isLogin) {
                await login(email, password);
                onClose();
            } else {
                await signup(email, password);
                onClose();
            }
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError(t('login_modal.error_email_in_use'));
            } else if (err.code === 'auth/invalid-credential') {
                setError(t('login_modal.error_invalid_credential'));
            } else if (err.code === 'auth/weak-password') {
                setError(t('login_modal.error_weak_password'));
            } else {
                setError(t('login_modal.error_auth_failed'));
            }
        }

        setLoading(false);
    }

    async function handleGoogleLogin() {
        setError('');
        setLoading(true);
        try {
            await signInWithGoogle();
            onClose();
        } catch (err) {
            console.error(err);
            setError(t('login_modal.error_google_failed'));
        }
        setLoading(false);
    }

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', zIndex: 9999,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(5px)',
            padding: '1rem',
            boxSizing: 'border-box'
        }}>
            <div className="glass-panel" style={{
                position: 'relative', width: '100%', maxWidth: '400px',
                padding: '2rem', border: '1px solid var(--gold)',
                boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',
                maxHeight: 'calc(100vh - 2rem)',
                overflowY: 'auto',
                boxSizing: 'border-box'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '15px', right: '15px',
                        background: 'transparent', border: 'none', color: 'var(--text-dim)',
                        cursor: 'pointer'
                    }}
                >
                    <X size={24} />
                </button>

                <h2 style={{
                    fontFamily: 'var(--font-hero)', color: 'var(--gold)',
                    textAlign: 'center', margin: '0 0 1.5rem', letterSpacing: '2px'
                }}>
                    {isLogin ? t('login_modal.login') : t('login_modal.register')}
                </h2>

                {error && (
                    <div style={{
                        background: 'rgba(255, 50, 50, 0.1)', border: '1px solid #ff4444',
                        color: '#ff4444', padding: '10px', borderRadius: '4px',
                        marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {message && (
                    <div style={{
                        background: 'rgba(50, 255, 50, 0.1)', border: '1px solid #44ff44',
                        color: '#44ff44', padding: '10px', borderRadius: '4px',
                        marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center'
                    }}>
                        {message}
                    </div>
                )}

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px', background: '#FFFFFF', color: '#000',
                        border: 'none', borderRadius: '2px', cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        marginBottom: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '1.1rem'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {t('login_modal.continue_google')}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', color: 'var(--text-secondary)' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                    <span style={{ margin: '0 10px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>{t('login_modal.or')}</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ color: 'var(--text-dim)', fontSize: '0.85rem', display: 'block', marginBottom: '5px' }}>
                            {t('login_modal.email')}
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--border)', color: '#fff', outline: 'none',
                                fontFamily: 'var(--font-mono)'
                            }}
                        />
                    </div>

                    {!useMagicLink && (
                        <div>
                            <label style={{ color: 'var(--text-dim)', fontSize: '0.85rem', display: 'block', marginBottom: '5px' }}>
                                {t('login_modal.password')}
                            </label>
                            <input
                                type="password"
                                required={!useMagicLink}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--border)', color: '#fff', outline: 'none',
                                    fontFamily: 'var(--font-mono)'
                                }}
                            />
                        </div>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        style={{
                            marginTop: '1rem', padding: '12px',
                            background: 'var(--gold)', color: '#000',
                            border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold', letterSpacing: '2px',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {useMagicLink ? t('login_modal.send_magic_link') : (isLogin ? t('login_modal.login') : t('login_modal.register'))}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                            type="button"
                            onClick={() => { setUseMagicLink(!useMagicLink); setError(''); setMessage(''); }}
                            style={{
                                background: 'transparent', border: 'none',
                                color: 'var(--gold-dim)', cursor: 'pointer',
                                textDecoration: 'underline', fontSize: '0.9rem'
                            }}
                        >
                            {useMagicLink ? t('login_modal.use_password') : t('login_modal.use_magic_link')}
                        </button>

                        {!useMagicLink && (
                            <button
                                type="button"
                                onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}
                                style={{
                                    background: 'transparent', border: 'none',
                                    color: 'var(--text-dim)', cursor: 'pointer',
                                    textDecoration: 'underline', fontSize: '0.9rem'
                                }}
                            >
                                {isLogin ? t('login_modal.need_register') : t('login_modal.already_active_link')}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
