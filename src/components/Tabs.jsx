import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, BookOpen, Rocket, Calendar, Trophy, Hammer, Gift, Menu, X, Heart, MoreHorizontal } from 'lucide-react';

// Map route paths to icons and translation labels
const NAV_ITEMS = [
    { path: '/home', labelKey: 'navigation.home', icon: Home },
    { path: '/guides', labelKey: 'navigation.guides', icon: BookOpen },
    { path: '/champions', labelKey: 'navigation.champions', icon: Trophy },
    { path: '/flagships', labelKey: 'navigation.flagships', icon: Rocket },
    { path: '/events', labelKey: 'navigation.events', icon: Calendar },
    { path: '/tools', labelKey: 'navigation.builder', icon: Hammer },
    { path: '/gift-codes', labelKey: 'navigation.gift_codes', icon: Gift },
    { path: '/support', labelKey: 'navigation.support', icon: Heart },
];

export default function Tabs() {
    const { t } = useTranslation();
    const location = useLocation();
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    // Active state checkers for mobile bottom nav
    const isHomeActive = location.pathname.startsWith('/home') || location.pathname === '/';
    const isGuidesActive = location.pathname.startsWith('/guides');
    const isChampionsActive = location.pathname.startsWith('/champions');
    const isToolsActive = location.pathname.startsWith('/tools');
    
    const morePaths = ['/flagships', '/events', '/gift-codes', '/support'];
    const isMoreActive = morePaths.some(p => location.pathname.startsWith(p));

    return (
        <>
            {/* 1. Desktop Top Navigation Bar */}
            <div className="tabs-desktop">
                <div className="tabs-container">
                    <div className="tabs-scroll-area">
                        {NAV_ITEMS.map(item => {
                            const IconComponent = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className="tab-icon">
                                                <IconComponent size={14} />
                                            </span>
                                            <span className="tab-label">{t(item.labelKey)}</span>
                                            {isActive && <div className="tab-indicator" />}
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 2. Mobile Bottom Navigation Bar */}
            <div className="tabs-mobile">
                <nav className="mobile-bottom-nav">
                    {/* Home */}
                    <NavLink
                        to="/home"
                        className={() => `mobile-tab-item ${isHomeActive ? 'active' : ''}`}
                        onClick={() => setIsMoreOpen(false)}
                    >
                        <Home size={20} />
                        <span className="mobile-label">{t('navigation.home')}</span>
                    </NavLink>

                    {/* Guides */}
                    <NavLink
                        to="/guides"
                        className={() => `mobile-tab-item ${isGuidesActive ? 'active' : ''}`}
                        onClick={() => setIsMoreOpen(false)}
                    >
                        <BookOpen size={20} />
                        <span className="mobile-label">{t('navigation.guides')}</span>
                    </NavLink>

                    {/* Champions */}
                    <NavLink
                        to="/champions"
                        className={() => `mobile-tab-item ${isChampionsActive ? 'active' : ''}`}
                        onClick={() => setIsMoreOpen(false)}
                    >
                        <Trophy size={20} />
                        <span className="mobile-label">{t('navigation.champions')}</span>
                    </NavLink>

                    {/* Tools */}
                    <NavLink
                        to="/tools"
                        className={() => `mobile-tab-item ${isToolsActive ? 'active' : ''}`}
                        onClick={() => setIsMoreOpen(false)}
                    >
                        <Hammer size={20} />
                        <span className="mobile-label">{t('navigation.builder')}</span>
                    </NavLink>

                    {/* More button */}
                    <button
                        type="button"
                        className={`mobile-tab-item ${isMoreActive ? 'active' : ''} ${isMoreOpen ? 'active' : ''}`}
                        onClick={() => setIsMoreOpen(!isMoreOpen)}
                    >
                        {isMoreOpen ? <X size={20} /> : <MoreHorizontal size={20} />}
                        <span className="mobile-label">Plus</span>
                    </button>
                </nav>

                {/* More Drawer Overlay */}
                {isMoreOpen && (
                    <>
                        <div
                            className="mobile-more-overlay"
                            onClick={() => setIsMoreOpen(false)}
                        />
                        <div className="mobile-more-drawer">
                            <div className="mobile-more-grid">
                                {/* Flagships */}
                                <NavLink
                                    to="/flagships"
                                    className={() => `mobile-more-card ${location.pathname.startsWith('/flagships') ? 'active' : ''}`}
                                    onClick={() => setIsMoreOpen(false)}
                                >
                                    <Rocket className="mobile-more-card__icon" size={24} />
                                    <span className="mobile-more-card__label">{t('navigation.flagships')}</span>
                                </NavLink>

                                {/* Events */}
                                <NavLink
                                    to="/events"
                                    className={() => `mobile-more-card ${location.pathname.startsWith('/events') ? 'active' : ''}`}
                                    onClick={() => setIsMoreOpen(false)}
                                >
                                    <Calendar className="mobile-more-card__icon" size={24} />
                                    <span className="mobile-more-card__label">{t('navigation.events')}</span>
                                </NavLink>

                                {/* Gift Codes */}
                                <NavLink
                                    to="/gift-codes"
                                    className={() => `mobile-more-card ${location.pathname.startsWith('/gift-codes') ? 'active' : ''}`}
                                    onClick={() => setIsMoreOpen(false)}
                                >
                                    <Gift className="mobile-more-card__icon" size={24} />
                                    <span className="mobile-more-card__label">{t('navigation.gift_codes')}</span>
                                </NavLink>

                                {/* Support */}
                                <NavLink
                                    to="/support"
                                    className={() => `mobile-more-card ${location.pathname.startsWith('/support') ? 'active' : ''}`}
                                    onClick={() => setIsMoreOpen(false)}
                                >
                                    <Heart className="mobile-more-card__icon" size={24} />
                                    <span className="mobile-more-card__label">{t('navigation.support')}</span>
                                </NavLink>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
