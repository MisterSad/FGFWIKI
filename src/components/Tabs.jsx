import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, BookOpen, Rocket, Layers, Users, Calendar, Trophy, Hammer, Gift, CheckSquare, Menu, X, Heart } from 'lucide-react';

// Map route paths to icons and translation labels
const NAV_ITEMS = [
    { path: '/home', labelKey: 'navigation.home', icon: Home },
    { path: '/guides', labelKey: 'navigation.guides', icon: BookOpen },
    { path: '/daily-tasks', labelKey: 'navigation.daily_tasks', icon: CheckSquare },
    { path: '/champions', labelKey: 'navigation.champions', icon: Trophy },
    { path: '/flagships', labelKey: 'navigation.flagships', icon: Rocket },
    { path: '/flagship-decks', labelKey: 'navigation.flagship_decks', icon: Layers },
    { path: '/ground-teams', labelKey: 'navigation.ground_teams', icon: Users },
    { path: '/events', labelKey: 'navigation.events', icon: Calendar },
    { path: '/tools', labelKey: 'navigation.builder', icon: Hammer },
    { path: '/gift-codes', labelKey: 'navigation.gift_codes', icon: Gift },
    { path: '/support', labelKey: 'navigation.support', icon: Heart },
];

export default function Tabs() {
    const { t } = useTranslation();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const activeItem = NAV_ITEMS.find(item => item.path === location.pathname) || NAV_ITEMS[0];
    const ActiveIcon = activeItem.icon;

    return (
        <div className="tabs-container">
            <div className="mobile-menu-header">
                <span className="mobile-active-label">
                    <ActiveIcon size={16} />
                    {t(activeItem.labelKey)}
                </span>
                <button
                    className="hamburger-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={t('tools_ui.toggle_menu')}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className={`tabs-scroll-area ${isMenuOpen ? 'mobile-open' : ''}`}>
                {NAV_ITEMS.map(item => {
                    const IconComponent = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
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
    );
}
