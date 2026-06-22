import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ onLoginClick }) {
    const { currentUser, logout } = useAuth();
    const { t } = useTranslation();

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
                <LanguageSwitcher />
                {currentUser ? (
                    <>
                        <span className="header-user-email">
                            {currentUser.email.split('@')[0]}
                        </span>
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
