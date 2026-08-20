import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Home, BookOpen, Rocket, Calendar, Trophy, Hammer, Gift, Menu, X, MoreHorizontal, Newspaper, Video, Crown, Flame } from 'lucide-react';

// Map route paths to icons and translation labels in logical order
const NAV_ITEMS = [
    { path: '/home', labelKey: 'navigation.home', icon: Home },
    { path: '/news', labelKey: 'navigation.news', icon: Newspaper },
    { path: '/guides', labelKey: 'navigation.guides', icon: BookOpen },
    { path: '/champions', labelKey: 'navigation.champions', icon: Trophy },
    { path: '/flagships', labelKey: 'navigation.flagships', icon: Rocket },
    { path: '/events', labelKey: 'navigation.events', icon: Calendar },
    { path: '/tools', labelKey: 'navigation.builder', icon: Hammer },
    { path: '/guild-tool', labelKey: 'navigation.guild_tool', icon: Crown },
    { path: '/gift-codes', labelKey: 'navigation.gift_codes', icon: Gift },
    { path: '/evolutions', labelKey: 'navigation.game_evolutions', icon: Flame },
    { path: '/creators', labelKey: 'navigation.creators', icon: Video },
];

export default function Tabs() {
    const { t } = useTranslation();
    const location = useLocation();
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    // Active state checkers for mobile bottom nav
    const isHomeActive = location.pathname.startsWith('/home') || location.pathname === '/';
    const isNewsActive = location.pathname.startsWith('/news');
    const isGuidesActive = location.pathname.startsWith('/guides');
    const isChampionsActive = location.pathname.startsWith('/champions');
    
    const morePaths = ['/guild-tool', '/evolutions', '/tools', '/flagships', '/events', '/gift-codes', '/creators'];
    const isMoreActive = morePaths.some(p => location.pathname.startsWith(p));

    return (
        <>
            {/* 1. Desktop Top Navigation Bar */}
            <div className="tabs-desktop">
                <div className="tabs-container">
                    <div className="tabs-scroll-area">
                        {NAV_ITEMS
                            .map(item => {
                                const IconComponent = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `tab-item ${isActive ? 'active' : ''} ${item.featured ? 'tab-item-featured' : ''}`}
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
                                                {item.featured && (
                                                    <span className="tab-badge-featured">NEW</span>
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
                        <span className="mobile-label">{t('navigation.more', { defaultValue: 'More' })}</span>
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
                                {/* Guild Management Tool */}
                                <NavLink
                                    to="/guild-tool"
                                    className={() => `mobile-more-card ${location.pathname.startsWith('/guild-tool') ? 'active' : ''}`}
                                    onClick={() => setIsMoreOpen(false)}
                                >
                                    <Crown className="mobile-more-card__icon" size={24} />
                                    <span className="mobile-more-card__label">{t('navigation.guild_tool')}</span>
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

                                {/* Tools */}
                                <NavLink
                                    to="/tools"
                                    className={() => `mobile-more-card ${location.pathname.startsWith('/tools') ? 'active' : ''}`}
                                    onClick={() => setIsMoreOpen(false)}
                                >
                                    <Hammer className="mobile-more-card__icon" size={24} />
                                    <span className="mobile-more-card__label">{t('navigation.builder')}</span>
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

                                {/* Game Evolutions */}
                                <NavLink
                                    to="/evolutions"
                                    className={() => `mobile-more-card ${location.pathname.startsWith('/evolutions') ? 'active' : ''}`}
                                    onClick={() => setIsMoreOpen(false)}
                                >
                                    <Flame className="mobile-more-card__icon" size={24} style={{ color: '#ef4444' }} />
                                    <span className="mobile-more-card__label">{t('navigation.game_evolutions')}</span>
                                </NavLink>

                                {/* Creators Corner */}
                                <NavLink
                                    to="/creators"
                                    className={() => `mobile-more-card ${location.pathname.startsWith('/creators') ? 'active' : ''}`}
                                    onClick={() => setIsMoreOpen(false)}
                                >
                                    <Video className="mobile-more-card__icon" size={24} />
                                    <span className="mobile-more-card__label">{t('navigation.creators')}</span>
                                </NavLink>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
