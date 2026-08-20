import React from 'react';
import { User, LogOut, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ onLoginClick, onSearchClick, onProfileClick }) {
    const { currentUser, userProfile, logout } = useAuth();
    const { t } = useTranslation();

    const isAdmin = React.useMemo(() => {
        if (!currentUser) return false;
        const email = (currentUser.email || '').trim().toLowerCase();
        const adminList = [
            'fgfwiki@gmail.com',
            'fgfwiki@google.com',
            'fgfwiwi@gmail.com',
            'vieira.andre@proton.me'
        ];
        return adminList.includes(email);
    }, [currentUser]);

    // Format user display name with server number if configured
    const userDisplayName = React.useMemo(() => {
        if (!currentUser) return '';
        if (userProfile?.displayName) {
            return `${userProfile.displayName}${userProfile.serverNumber ? ` (S${userProfile.serverNumber})` : ''}`;
        }
        if (currentUser.displayName) return currentUser.displayName;
        if (currentUser.email) return currentUser.email.split('@')[0];
        return 'Commander';
    }, [currentUser, userProfile]);

    return (
        <header className="sticky-nav header-container">
            <div className="header-spacer" aria-hidden="true" />

            <Link to="/home" className="header-text-wrapper" style={{ textDecoration: 'none' }}>
                <div className="header-title-main" aria-label="FGF Wiki">
                    <span className="header-title-accent">FGF</span>
                    <span className="header-title-sep" aria-hidden="true">·</span>
                    <span className="header-title-base">WIKI</span>
                </div>
                <div className="header-subtitle">{t('header_ui.subtitle')}</div>
            </Link>

            <div className="header-auth-container">
                <button
                    type="button"
                    onClick={onSearchClick}
                    className="header-btn-icon"
                    title={t('search_modal.title', { defaultValue: 'Search (Cmd+K)' })}
                    aria-label={t('search_modal.title', { defaultValue: 'Search' })}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0.45rem 0.75rem',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        color: 'var(--text-secondary, #8A8778)',
                        cursor: 'pointer'
                    }}
                >
                    <Search size={15} color="var(--gold, #C9A84C)" />
                    <span style={{ fontSize: '0.8rem', fontWeight: '500', display: 'none' }}>{t('navigation.search', { defaultValue: 'Search' })}</span>
                    <kbd style={{
                        padding: '1px 5px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        color: 'var(--text-dim, #5E5B50)',
                        fontFamily: 'var(--font-mono, monospace)'
                    }}>
                        ⌘K
                    </kbd>
                </button>
                <LanguageSwitcher />
                {currentUser ? (
                    <>
                        <div className="header-user-info" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <button
                                type="button"
                                onClick={onProfileClick}
                                className="header-user-btn"
                                title={t('comments.edit_profile_tooltip', { defaultValue: 'Edit Commander Profile (Nickname & Server)' })}
                                aria-label={t('comments.edit_profile_tooltip', { defaultValue: 'Edit Commander Profile' })}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    borderRadius: '20px',
                                    padding: '4px 10px',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                    color: 'var(--gold, #C9A84C)'
                                }}
                            >
                                <User size={13} color="var(--gold, #C9A84C)" />
                                <span className="header-user-email" style={{ maxWidth: '140px' }}>
                                    {userDisplayName}
                                </span>
                            </button>
                            {isAdmin && (
                                <span style={{
                                    padding: '2px 6px',
                                    background: 'rgba(201, 168, 76, 0.2)',
                                    border: '1px solid var(--gold, #C9A84C)',
                                    borderRadius: '4px',
                                    color: 'var(--gold, #C9A84C)',
                                    fontSize: '0.65rem',
                                    fontWeight: 'bold',
                                    letterSpacing: '0.5px',
                                    flexShrink: 0,
                                    whiteSpace: 'nowrap'
                                }}>
                                    ADMIN
                                </span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={logout}
                            className="header-btn-icon"
                            title={t('header_ui.disconnect')}
                            aria-label={t('header_ui.disconnect')}
                        >
                            <LogOut size={16} />
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={onLoginClick}
                        className="header-btn-login"
                        aria-label={t('header_ui.login')}
                    >
                        <User size={16} />
                        <span className="header-btn-label">{t('header_ui.login')}</span>
                    </button>
                )}
            </div>
        </header>
    );
}
