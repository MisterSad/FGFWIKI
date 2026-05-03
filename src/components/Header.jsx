import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ onLoginClick }) {
    const { currentUser, logout } = useAuth();
    const { t } = useTranslation();

    return (
        <header className="sticky-nav header-container">
            <div className="header-text-wrapper">
                <div className="header-title-main">
                    FOUNDATION
                </div>
                <div className="header-title-light">
                    GALACTIC FRONTIER
                </div>
                <div className="header-subtitle">
                    {t('header_ui.subtitle')}
                </div>
            </div>
            <div className="header-auth-container" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <LanguageSwitcher />
                {currentUser ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                            fontSize: '0.8rem', color: 'var(--gold)',
                            fontFamily: 'var(--font-mono)'
                        }}>
                            {currentUser.email.split('@')[0]}
                        </span>
                        <button
                            onClick={logout}
                            style={{
                                background: 'transparent', border: '1px solid var(--border)',
                                color: 'var(--text-dim)', padding: '5px 10px',
                                borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center'
                            }}
                            title={t('header_ui.disconnect')}
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onLoginClick}
                        style={{
                            background: 'var(--gold)', border: 'none',
                            color: '#000', padding: '6px 14px',
                            fontWeight: 'bold', fontFamily: 'var(--font-label)',
                            borderRadius: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'
                        }}
                    >
                        <User size={16} /> {t('header_ui.login')}
                    </button>
                )}
            </div>
        </header>
    );
}
