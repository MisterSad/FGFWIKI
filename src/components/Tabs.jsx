import React, { useState } from 'react';
import { categories } from '../data/gameData';
import { Home, BookOpen, Swords, Rocket, Layers, Users, Calendar, Trophy, Coins, Hammer, Gift, CheckSquare, Menu, X, Heart } from 'lucide-react';

const CATEGORY_ICONS = {
    all: Home,
    guides: BookOpen,
    daily_tasks: CheckSquare,
    meta_ships: Rocket,
    flagship_decks: Layers,
    ground: Users,
    events: Calendar,
    tier_list: Trophy,
    builder: Hammer,
    gift_codes: Gift,
    support: Heart
};

import { useTranslation } from 'react-i18next';

export default function Tabs({ activeCategory, setActiveCategory }) {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Combine "Home" with categories from data
    const tabs = [
        { id: 'all', label: t('navigation.home') },
        ...categories.map(c => ({ ...c, label: t(c.label) }))
    ];

    return (
        <div className="tabs-container">
            {/* Mobile Hamburger Button */}
            <div className="mobile-menu-header">
                <span className="mobile-active-label" style={{
                    fontFamily: 'var(--font-label)',
                    color: "#FFFFFF",
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    {CATEGORY_ICONS[activeCategory] && React.createElement(CATEGORY_ICONS[activeCategory], { size: 16 })}
                    {tabs.find(t => t.id === activeCategory)?.label}
                </span>
                <button
                    className="hamburger-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Navigation Menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Desktop Tabs & Mobile Dropdown */}
            <div className={`tabs-scroll-area ${isMenuOpen ? 'mobile-open' : ''}`}>
                {tabs.map(tab => {
                    const IconComponent = CATEGORY_ICONS[tab.id] || Home; // Fallback to Home if icon missing
                    return (
                        <button
                            key={tab.id}
                            className={`tab-item ${activeCategory === tab.id ? 'active' : ''}`}
                            onClick={() => {
                                setActiveCategory(tab.id);
                                setIsMenuOpen(false); // Close menu on selection in mobile
                            }}
                        >
                            <span className="tab-icon">
                                <IconComponent size={14} />
                            </span>
                            <span className="tab-label">{tab.label}</span>
                            {activeCategory === tab.id && <div className="tab-indicator" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

