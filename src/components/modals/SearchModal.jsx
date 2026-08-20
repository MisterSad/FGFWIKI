import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { 
    Search, X, BookOpen, Trophy, Rocket, Calendar, 
    Hammer, Gift, Sparkles, Video, Crown, Flame, 
    ArrowRight, CornerDownLeft, FileText, Newspaper
} from 'lucide-react';
import { tips, eventsData, heroData, shipDecks } from '../../data/gameData';

const STATIC_TOOLS = [
    { id: 'build-time', path: '/tools', titleKey: 'tools_menu.build_time_title', icon: Hammer, category: 'tools' },
    { id: 'champion-upgrade', path: '/tools', titleKey: 'tools_menu.champion_upgrade_title', icon: Trophy, category: 'tools' },
    { id: 'nexus', path: '/tools', titleKey: 'tools_menu.nexus_title', icon: Sparkles, category: 'tools' },
    { id: 'gvg', path: '/tools', titleKey: 'tools_menu.gvg_title', icon: Flame, category: 'tools' },
    { id: 'combat-craft', path: '/tools', titleKey: 'tools_menu.combat_craft_title', icon: Rocket, category: 'tools' },
    { id: 'guild-tool', path: '/guild-tool', titleKey: 'navigation.guild_tool', icon: Crown, category: 'tools' },
    { id: 'gift-codes', path: '/gift-codes', titleKey: 'navigation.gift_codes', icon: Gift, category: 'codes' },
    { id: 'evolutions', path: '/evolutions', titleKey: 'navigation.game_evolutions', icon: Flame, category: 'guides' },
    { id: 'creators', path: '/creators', titleKey: 'navigation.creators', icon: Video, category: 'guides' }
];

export default function SearchModal({ isOpen, onClose }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const resultsRef = useRef(null);

    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleClose = useCallback(() => {
        setQuery('');
        setSelectedIndex(0);
        onClose();
    }, [onClose]);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]);

    // Aggregate searchable database
    const searchableItems = useMemo(() => {
        const items = [];

        // 1. Guides & News
        tips.forEach((tip) => {
            const title = t(tip.title, { defaultValue: tip.title });
            const content = t(tip.content, { defaultValue: '' });
            const isNews = tip.category === 'news';
            items.push({
                id: `tip-${tip.id}`,
                title,
                subtitle: isNews ? t('navigation.news') : t('navigation.guides'),
                category: isNews ? 'news' : 'guides',
                icon: isNews ? Newspaper : BookOpen,
                url: isNews ? `/news/${tip.id}` : `/guides/${tip.id}`,
                badge: isNews ? 'NEWS' : 'GUIDE',
                rawSearch: `${title} ${content} ${tip.id}`.toLowerCase()
            });
        });

        // 2. Champions
        (heroData || []).forEach((hero) => {
            const name = t(hero.name, { defaultValue: hero.name });
            items.push({
                id: `hero-${hero.name}`,
                title: name,
                subtitle: `${hero.tier} Tier · ${hero.role} · ${hero.energyType}`,
                category: 'champions',
                icon: Trophy,
                url: '/champions',
                badge: `${hero.tier} TIER`,
                rawSearch: `${name} ${hero.role} ${hero.energyType} ${hero.tier}`.toLowerCase()
            });
        });

        // 3. Flagships & Decks
        (shipDecks || []).forEach((deck, idx) => {
            const title = t(deck.title, { defaultValue: deck.title });
            const desc = t(deck.description, { defaultValue: '' });
            items.push({
                id: `deck-${idx}`,
                title,
                subtitle: t('navigation.flagships'),
                category: 'flagships',
                icon: Rocket,
                url: '/flagships',
                badge: 'META DECK',
                rawSearch: `${title} ${desc}`.toLowerCase()
            });
        });

        // 4. Events
        (eventsData || []).forEach((event) => {
            const title = t(event.title, { defaultValue: event.title });
            const desc = t(event.description, { defaultValue: '' });
            items.push({
                id: `event-${event.id}`,
                title,
                subtitle: t('navigation.events'),
                category: 'events',
                icon: Calendar,
                url: `/events/${event.id}`,
                badge: 'EVENT',
                rawSearch: `${title} ${desc}`.toLowerCase()
            });
        });

        // 5. Calculators & Tools
        STATIC_TOOLS.forEach((tool) => {
            const title = t(tool.titleKey, { defaultValue: tool.id });
            items.push({
                id: `tool-${tool.id}`,
                title,
                subtitle: t('navigation.builder'),
                category: tool.category,
                icon: tool.icon,
                url: tool.path,
                badge: 'TOOL',
                rawSearch: `${title} tool calculator`.toLowerCase()
            });
        });

        return items;
    }, [t]);

    // Filter results
    const filteredResults = useMemo(() => {
        const cleanQuery = query.trim().toLowerCase();
        return searchableItems.filter((item) => {
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory || (selectedCategory === 'guides' && (item.category === 'guides' || item.category === 'news'));
            if (!matchesCategory) return false;
            if (!cleanQuery) return true;
            return item.rawSearch.includes(cleanQuery);
        }).slice(0, 12);
    }, [searchableItems, query, selectedCategory]);

    const handleSelect = useCallback((item) => {
        if (!item) return;
        navigate(item.url);
        onClose();
    }, [navigate, onClose]);

    // Keyboard navigation within list
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredResults[selectedIndex]) {
                handleSelect(filteredResults[selectedIndex]);
            }
        }
    };

    if (!isOpen) return null;

    const CATEGORIES = [
        { id: 'all', label: t('search_modal.filter_all', { defaultValue: 'All' }) },
        { id: 'guides', label: t('navigation.guides', { defaultValue: 'Guides' }) },
        { id: 'champions', label: t('navigation.champions', { defaultValue: 'Champions' }) },
        { id: 'flagships', label: t('navigation.flagships', { defaultValue: 'Flagships' }) },
        { id: 'tools', label: t('navigation.builder', { defaultValue: 'Tools' }) },
        { id: 'events', label: t('navigation.events', { defaultValue: 'Events' }) },
        { id: 'codes', label: t('navigation.gift_codes', { defaultValue: 'Gift Codes' }) }
    ];

    return (
        <div 
            className="modal-overlay fade-in" 
            onClick={handleClose}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(6, 7, 10, 0.85)',
                backdropFilter: 'blur(8px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: 'clamp(1rem, 5vw, 4rem) 1rem',
                overflowY: 'auto'
            }}
        >
            <div 
                role="dialog"
                aria-modal="true"
                aria-label={t('search_modal.title', { defaultValue: 'Search Encyclopedia' })}
                className="scale-in"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: '680px',
                    background: 'var(--bg-elevated, #151821)',
                    border: '1px solid rgba(201, 168, 76, 0.25)',
                    borderRadius: '14px',
                    boxShadow: '0 24px 64px rgba(0, 0, 0, 0.7), 0 0 32px rgba(201, 168, 76, 0.1)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Search Bar Input */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '1rem 1.25rem',
                    borderBottom: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
                    background: 'rgba(0, 0, 0, 0.2)'
                }}>
                    <Search size={20} color="var(--gold, #C9A84C)" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSelectedIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={t('search_modal.placeholder', { defaultValue: 'Search guides, heroes, flagship decks, calculators...' })}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--text-primary, #E8E4D9)',
                            fontSize: '1.05rem',
                            fontFamily: 'var(--font-main, sans-serif)'
                        }}
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-dim, #5E5B50)',
                                cursor: 'pointer',
                                padding: '4px'
                            }}
                            aria-label="Clear search"
                        >
                            <X size={16} />
                        </button>
                    )}
                    <kbd style={{
                        padding: '3px 8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'var(--text-dim, #5E5B50)',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono, monospace)'
                    }}>
                        ESC
                    </kbd>
                </div>

                {/* Filter Category Pills */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    padding: '0.65rem 1.25rem',
                    overflowX: 'auto',
                    borderBottom: '1px solid var(--border, rgba(255, 255, 255, 0.05))',
                    background: 'rgba(0, 0, 0, 0.1)'
                }}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                                setSelectedCategory(cat.id);
                                setSelectedIndex(0);
                            }}
                            style={{
                                padding: '0.3rem 0.75rem',
                                borderRadius: '20px',
                                border: selectedCategory === cat.id ? '1px solid var(--gold, #C9A84C)' : '1px solid rgba(255, 255, 255, 0.08)',
                                background: selectedCategory === cat.id ? 'rgba(201, 168, 76, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                                color: selectedCategory === cat.id ? 'var(--gold, #C9A84C)' : 'var(--text-secondary, #8A8778)',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Search Results List */}
                <div 
                    ref={resultsRef}
                    style={{
                        maxHeight: '380px',
                        overflowY: 'auto',
                        padding: '0.5rem'
                    }}
                >
                    {filteredResults.length === 0 ? (
                        <div style={{
                            padding: '3rem 1rem',
                            textAlign: 'center',
                            color: 'var(--text-dim, #5E5B50)'
                        }}>
                            <FileText size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
                            <div style={{ fontSize: '0.95rem', fontWeight: '500' }}>
                                {t('search_modal.no_results', { defaultValue: 'No matching entries found.' })}
                            </div>
                            <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                {t('search_modal.try_another', { defaultValue: 'Try searching with a hero name, energy type, or game mechanic.' })}
                            </div>
                        </div>
                    ) : (
                        filteredResults.map((item, idx) => {
                            const IconComponent = item.icon;
                            const isSelected = idx === selectedIndex;

                            return (
                                <div
                                    key={item.id}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleSelect(item)}
                                    onMouseEnter={() => setSelectedIndex(idx)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '0.85rem',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        background: isSelected ? 'rgba(201, 168, 76, 0.12)' : 'transparent',
                                        border: isSelected ? '1px solid rgba(201, 168, 76, 0.25)' : '1px solid transparent',
                                        cursor: 'pointer',
                                        transition: 'all 0.12s ease'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            width: '34px',
                                            height: '34px',
                                            borderRadius: '8px',
                                            background: isSelected ? 'rgba(201, 168, 76, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: isSelected ? 'var(--gold, #C9A84C)' : 'var(--text-secondary, #8A8778)',
                                            flexShrink: 0
                                        }}>
                                            <IconComponent size={18} />
                                        </div>
                                        <div style={{ minWidth: 0 }}>
                                            <div style={{
                                                color: isSelected ? '#FFFFFF' : 'var(--text-primary, #E8E4D9)',
                                                fontWeight: '600',
                                                fontSize: '0.95rem',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {item.title}
                                            </div>
                                            <div style={{
                                                color: 'var(--text-dim, #5E5B50)',
                                                fontSize: '0.8rem',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {item.subtitle}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                                        <span style={{
                                            padding: '2px 8px',
                                            background: 'rgba(255, 255, 255, 0.04)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            borderRadius: '4px',
                                            fontSize: '0.68rem',
                                            fontWeight: '700',
                                            letterSpacing: '0.5px',
                                            color: 'var(--text-dim, #5E5B50)',
                                            textTransform: 'uppercase'
                                        }}>
                                            {item.badge}
                                        </span>
                                        {isSelected && (
                                            <ArrowRight size={16} color="var(--gold, #C9A84C)" />
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer Keyboard Hints */}
                <div style={{
                    padding: '0.65rem 1.25rem',
                    borderTop: '1px solid var(--border, rgba(255, 255, 255, 0.05))',
                    background: 'rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'var(--text-dim, #5E5B50)',
                    fontSize: '0.75rem'
                }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <span>
                            <kbd style={{ padding: '1px 5px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '3px', marginRight: '4px' }}>↓</kbd>
                            <kbd style={{ padding: '1px 5px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '3px', marginRight: '4px' }}>↑</kbd>
                            {t('search_modal.hint_navigate', { defaultValue: 'Navigate' })}
                        </span>
                        <span>
                            <kbd style={{ padding: '1px 5px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '3px', marginRight: '4px' }}>↵</kbd>
                            {t('search_modal.hint_select', { defaultValue: 'Open' })}
                        </span>
                    </div>
                    <span>FGF WIKI Spotlight</span>
                </div>
            </div>
        </div>
    );
}
