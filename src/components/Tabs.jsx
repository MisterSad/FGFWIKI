import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, BookOpen, Rocket, Calendar, Trophy, Hammer, Gift, Menu, X, MoreHorizontal, Newspaper, Sparkles } from 'lucide-react';

// Map route paths to icons and translation labels
const NAV_ITEMS = [
    { path: '/home', labelKey: 'navigation.home', icon: Home },
    { path: '/news', labelKey: 'navigation.news', icon: Newspaper },
    { path: '/guides', labelKey: 'navigation.guides', icon: BookOpen },
    { path: '/champions', labelKey: 'navigation.champions', icon: Trophy },
    { path: '/flagships', labelKey: 'navigation.flagships', icon: Rocket },
    { path: '/events', labelKey: 'navigation.events', icon: Calendar },
    { path: '/tools', labelKey: 'navigation.builder', icon: Hammer },
    { path: '/gift-codes', labelKey: 'navigation.gift_codes', icon: Gift },
    { path: '/stella-anomaly', labelKey: 'navigation.stella_anomaly', icon: Sparkles, badge: 'EVENT' },
];

export default function Tabs() {
    const { t } = useTranslation();
    const location = useLocation();
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    // Event visibility checker (starts July 1st, 2026, ends August 31st, 2026)
    const now = new Date();
    const eventStartDate = new Date('2026-07-01T00:00:00Z');
    const eventEndDate = new Date('2026-08-31T23:59:59Z');
    const isEventActive = now >= eventStartDate && now <= eventEndDate;
    const isEventVisible = isEventActive || location.search.includes('debugPhase') || location.pathname.startsWith('/stella-anomaly');

    // Active state checkers for mobile bottom nav
    const isHomeActive = location.pathname.startsWith('/home') || location.pathname === '/';
    const isNewsActive = location.pathname.startsWith('/news');
    const isGuidesActive = location.pathname.startsWith('/guides');
    const isChampionsActive = location.pathname.startsWith('/champions');
    const isToolsActive = location.pathname.startsWith('/tools');
    
    const morePaths = ['/tools', '/flagships', '/events', '/gift-codes', '/stella-anomaly'];
    const isMoreActive = morePaths.some(p => location.pathname.startsWith(p));

    return (
        <>
            {/* 1. Desktop Top Navigation Bar */}
            <div className="tabs-desktop">
                <div className="tabs-container">
                    <div className="tabs-scroll-area">
                        {NAV_ITEMS
                            .filter(item => item.path !== '/stella-anomaly' || isEventVisible)
                            .map(item => {
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
                                            <span className="tab-label">
                                                {t(item.labelKey)}
                                                {item.badge && (
                                                    <span className="tab-badge-event" style={{
                                                        marginLeft: '6px',
                                                        background: 'var(--accent-teal)',
                                                        color: 'var(--bg-void)',
                                                        fontSize: '9px',
                                                        fontWeight: 'bold',
                                                        padding: '1px 5px',
                                                        borderRadius: '3px',
                                                        boxShadow: '0 0 8px rgba(78, 205, 196, 0.4)',
                                                        letterSpacing: '0'
                                                    }}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </span>
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

                    {/* News */}
                    <NavLink
                        to="/news"
                        className={() => `mobile-tab-item ${isNewsActive ? 'active' : ''}`}
                        onClick={() => setIsMoreOpen(false)}
                    >
                        <Newspaper size={20} />
                        <span className="mobile-label">{t('navigation.news')}</span>
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
                                {/* Stella Anomaly */}
                                {isEventVisible && (
                                    <NavLink
                                        to="/stella-anomaly"
                                        className={() => `mobile-more-card ${location.pathname.startsWith('/stella-anomaly') ? 'active' : ''}`}
                                        onClick={() => setIsMoreOpen(false)}
                                        style={{ position: 'relative' }}
                                    >
                                        <Sparkles className="mobile-more-card__icon" size={24} style={{ color: 'var(--accent-teal)' }} />
                                        <span className="mobile-more-card__label">{t('navigation.stella_anomaly')}</span>
                                        <span style={{
                                            position: 'absolute',
                                            top: '6px',
                                            right: '6px',
                                            background: 'var(--accent-teal)',
                                            color: 'var(--bg-void)',
                                            fontSize: '8px',
                                            fontWeight: 'bold',
                                            padding: '1px 4px',
                                            borderRadius: '2px',
                                            boxShadow: '0 0 6px rgba(78, 205, 196, 0.4)'
                                        }}>
                                            EVENT
                                        </span>
                                    </NavLink>
                                )}

                                {/* Tools */}
                                <NavLink
                                    to="/tools"
                                    className={() => `mobile-more-card ${location.pathname.startsWith('/tools') ? 'active' : ''}`}
                                    onClick={() => setIsMoreOpen(false)}
                                >
                                    <Hammer className="mobile-more-card__icon" size={24} />
                                    <span className="mobile-more-card__label">{t('navigation.builder')}</span>
                                </NavLink>

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
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
