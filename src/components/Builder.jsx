import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BuildTimeCalculator from "./tools/BuildTimeCalculator";
import NexusCalculator from "./tools/NexusCalculator";
import GvGCalculator from "./tools/GvGCalculator";
import CombatCraftCalculator from "./tools/CombatCraftCalculator";
import ChampionUpgradeCalculator from "./tools/ChampionUpgradeCalculator";

// ── Tile icons (inline SVG, gold stroke, line-art) ──
const ICONS = {
    'build-time': (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="10" y="20" width="44" height="36" rx="1" />
            <path d="M10 28h44" />
            <path d="M22 20v-6h20v6" />
            <circle cx="32" cy="42" r="7" />
            <path d="M32 38v4l3 2" />
        </svg>
    ),
    'champion-upgrade': (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M32 8l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2z" />
            <path d="M22 50h20" />
            <path d="M24 56h16" />
        </svg>
    ),
    'nexus': (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="32" cy="32" r="22" />
            <circle cx="32" cy="32" r="6" />
            <path d="M32 10v8M32 46v8M10 32h8M46 32h8" />
            <path d="M16.5 16.5l5.5 5.5M42 42l5.5 5.5M16.5 47.5l5.5-5.5M42 22l5.5-5.5" />
        </svg>
    ),
    'gvg': (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M32 6l16 6v14c0 12-8 22-16 28-8-6-16-16-16-28V12z" />
            <path d="M24 28l6 6 12-12" />
        </svg>
    ),
    'combat-craft': (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 12l8 8M48 12l-8 8M16 52l8-8M48 52l-8-8" />
            <circle cx="32" cy="32" r="10" />
            <path d="M22 32h-8M50 32h-8M32 22v-8M32 50v-8" />
        </svg>
    ),
};

const TOOLS = [
    { id: 'build-time', titleKey: 'tools_ui.tab_build_time', descKey: 'tools_ui.tile_build_time_desc' },
    { id: 'champion-upgrade', titleKey: 'tools_ui.tab_champion_upgrade', descKey: 'tools_ui.tile_champion_upgrade_desc' },
    { id: 'nexus', titleKey: 'tools_ui.tab_nexus', descKey: 'tools_ui.tile_nexus_desc' },
    { id: 'gvg', titleKey: 'tools_ui.tab_gvg', descKey: 'tools_ui.tile_gvg_desc' },
    { id: 'combat-craft', titleKey: 'tools_ui.tab_combat_craft', descKey: 'tools_ui.tile_combat_craft_desc' },
];

const CALCULATORS = {
    'build-time': BuildTimeCalculator,
    'champion-upgrade': ChampionUpgradeCalculator,
    'nexus': NexusCalculator,
    'gvg': GvGCalculator,
    'combat-craft': CombatCraftCalculator,
};

export default function Builder() {
    const { t } = useTranslation();
    const [activeTool, setActiveTool] = useState(null);

    const ActiveCalculator = activeTool ? CALCULATORS[activeTool] : null;
    const activeMeta = activeTool ? TOOLS.find(tool => tool.id === activeTool) : null;

    return (
        <div style={{ position: "relative" }}>
            {/* Header */}
            <header style={{ position: "relative", zIndex: 1, padding: "clamp(20px, 5vw, 48px) clamp(12px, 4vw, 20px) clamp(16px, 3vw, 24px)", textAlign: "center" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
                    <h1 className="guide-title text-gradient" style={{ fontFamily: "var(--font-hero)", fontSize: "clamp(18px,4vw,28px)", fontWeight: 800, letterSpacing: 6, margin: 0, textTransform: "uppercase", position: "relative", animation: "titleReveal 1.2s ease-out" }}>
                        {activeMeta ? t(activeMeta.titleKey) : (t('builder_ui.title') || 'Tools')}
                    </h1>
                </div>

                {!activeTool && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 2.5vw, 15px)", color: "var(--text-secondary, #8A8778)", margin: "16px auto 0", maxWidth: 520, lineHeight: 1.5, padding: "0 12px" }}>
                        {t('tools_ui.tile_intro')}
                    </p>
                )}

                <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#C9A84C,transparent)", margin: "20px auto 0", maxWidth: 400 }} />
            </header>

            {/* Content */}
            <main style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 clamp(8px, 3vw, 24px) clamp(40px, 8vw, 60px)" }}>
                {!activeTool && (
                    <div className="tools-tile-grid" style={{ animation: "fadeUp 0.6s ease-out" }}>
                        {TOOLS.map(tool => (
                            <button
                                key={tool.id}
                                className="tools-tile"
                                onClick={() => setActiveTool(tool.id)}
                                aria-label={t(tool.titleKey)}
                            >
                                <span className="tools-tile-icon">{ICONS[tool.id]}</span>
                                <span className="tools-tile-title">{t(tool.titleKey)}</span>
                                <span className="tools-tile-desc">{t(tool.descKey)}</span>
                                <span className="tools-tile-cta" aria-hidden="true">→</span>
                            </button>
                        ))}
                    </div>
                )}

                {activeTool && ActiveCalculator && (
                    <div style={{ animation: "fadeUp 0.4s ease-out" }}>
                        <button
                            className="tools-back-btn"
                            onClick={() => setActiveTool(null)}
                            aria-label={t('tools_ui.back_to_tools')}
                        >
                            <span aria-hidden="true">←</span>
                            <span>{t('tools_ui.back_to_tools')}</span>
                        </button>
                        <ActiveCalculator />
                    </div>
                )}
            </main>
        </div>
    );
}
