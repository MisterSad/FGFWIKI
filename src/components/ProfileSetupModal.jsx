import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';

const NICKNAME_MAX = 24;
const SERVER_MAX = 99999;

export default function ProfileSetupModal({ onClose }) {
    const { t } = useTranslation();
    const { userProfile, saveProfile } = useAuth();
    const [displayName, setDisplayName] = useState(() => (userProfile ? userProfile.displayName : ''));
    const [serverNumber, setServerNumber] = useState(() => (userProfile ? String(userProfile.serverNumber) : ''));
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function validate() {
        const name = displayName.trim();
        if (name.length < 2 || name.length > NICKNAME_MAX) {
            return t('comments.error_nickname', 'Nickname must be 2 to 24 characters.');
        }
        const server = Number(serverNumber);
        if (!Number.isInteger(server) || server < 1 || server > SERVER_MAX) {
            return t('comments.error_server', 'Server number must be between 1 and 99999.');
        }
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError('');
        setLoading(true);
        try {
            await saveProfile(displayName.trim(), Number(serverNumber));
            onClose();
        } catch {
            setError(t('comments.error_save', 'Could not save your profile. Please try again.'));
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
                padding: 'clamp(1.25rem, 5vw, 2rem)', border: '1px solid var(--gold)',
                boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',
                maxHeight: 'calc(100dvh - 2rem)',
                overflowY: 'auto',
                boxSizing: 'border-box'
            }}>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={t('common.close', 'Close')}
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
                    textAlign: 'center', margin: '0 0 0.5rem', letterSpacing: '2px'
                }}>
                    {t('comments.setup_title', 'YOUR TRADER PROFILE')}
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--text-dim)', margin: '0 0 1.5rem', fontSize: '0.95rem' }}>
                    {t('comments.setup_desc', 'Choose a nickname and your server number. They will appear on your comments.')}
                </p>

                {error && (
                    <div style={{
                        background: 'rgba(255, 50, 50, 0.1)', border: '1px solid #ff4444',
                        color: '#ff4444', padding: '10px', borderRadius: '4px',
                        marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                        {t('comments.nickname_label', 'Nickname')}
                    </label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder={t('comments.nickname_placeholder', 'e.g. HawkEye')}
                        maxLength={NICKNAME_MAX}
                        autoFocus
                        style={{
                            width: '100%', boxSizing: 'border-box', padding: '12px',
                            background: 'var(--bg-void)', color: '#FFFFFF',
                            border: '1px solid var(--border)', borderRadius: '2px',
                            marginBottom: '1rem', fontSize: '1rem'
                        }}
                    />

                    <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                        {t('comments.server_label', 'Server number')}
                    </label>
                    <input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={SERVER_MAX}
                        value={serverNumber}
                        onChange={(e) => setServerNumber(e.target.value)}
                        placeholder={t('comments.server_placeholder', 'e.g. 1058')}
                        style={{
                            width: '100%', boxSizing: 'border-box', padding: '12px',
                            background: 'var(--bg-void)', color: '#FFFFFF',
                            border: '1px solid var(--border)', borderRadius: '2px',
                            marginBottom: '1.5rem', fontSize: '1rem'
                        }}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="label-text"
                        style={{
                            width: '100%', padding: '14px', cursor: 'pointer',
                            background: 'var(--gold)', color: 'var(--bg-void)',
                            border: 'none', fontSize: '1rem', letterSpacing: '2px',
                            opacity: loading ? 0.6 : 1
                        }}
                    >
                        {loading ? t('comments.saving', 'SAVING…') : t('comments.save', 'SAVE')}
                    </button>
                </form>
            </div>
        </div>
    );
}
