import React from 'react';
import { categories } from '../data/gameData';
import { Home, BookOpen, Swords, Rocket, Layers, Users, Calendar, Trophy, Coins, Hammer, Gift } from 'lucide-react';

const CATEGORY_ICONS = {
    all: Home,
    guides: BookOpen,
    meta_ships: Rocket,
    flagship_decks: Layers,
    ground: Users,
    events: Calendar,
    tier_list: Trophy,
    builder: Hammer,
    gift_codes: Gift
};

import { useTranslation } from 'react-i18next';

export default function Tabs({ activeCategory, setActiveCategory }) {
    const { t } = useTranslation();

    // Combine "Home" with categories from data
    const tabs = [
        { id: 'all', label: t('navigation.home') },
        ...categories.map(c => ({ ...c, label: t(c.label) }))
    ];

    return (
        <div className="tabs-container">
            <div className="tabs-scroll-area">
                {tabs.map(tab => {
                    const IconComponent = CATEGORY_ICONS[tab.id] || Home; // Fallback to Home if icon missing
                    return (
                        <button
                            key={tab.id}
                            className={`tab-item ${activeCategory === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(tab.id)}
                        >
                            <span className="tab-icon">
                                <IconComponent size={18} />
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

