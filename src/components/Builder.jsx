import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BuildTimeCalculator from "./tools/BuildTimeCalculator";
import NexusCalculator from "./tools/NexusCalculator";
import GvGCalculator from "./tools/GvGCalculator";
import CombatCraftCalculator from "./tools/CombatCraftCalculator";

export default function Builder() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("build-time");

    return (
        <div style={{ position: "relative" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600;700;800;900&family=Share+Tech+Mono&display=swap');
        *{box-sizing:border-box}
        ::selection{background:rgba(201,168,76,0.3);color:#E8E4D9}
        input[type="range"]{-webkit-appearance:none;appearance:none;height:3px;background:rgba(201,168,76,0.15);border-radius:1px;outline:none;cursor:pointer}
        input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:1px;background:#C9A84C;cursor:pointer;border:none}
        input[type="range"]::-moz-range-thumb{width:12px;height:12px;border-radius:1px;background:#C9A84C;cursor:pointer;border:none}
        select{-webkit-appearance:none;appearance:none}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes titleReveal{from{opacity:0;letter-spacing:12px}to{opacity:1;letter-spacing:6px}}
        @keyframes expandLine{from{width:0;opacity:0}to{width:120px;opacity:1}}
        
        .tool-tab {
            font-family: 'Rajdhani', sans-serif;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding: 12px 24px;
            background: transparent;
            border: none;
            color: var(--tx-dim, #FFFFFF);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        .tool-tab.active {
            color: #FFFFFF;
        }
        .tool-tab::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: var(--gold, #C9A84C);
            transition: width 0.3s ease;
        }
        .tool-tab.active::after {
            width: 70%;
        }
        .tool-tab:hover {
            color: #FFFFFF;
        }
      `}</style>

            {/* Header */}
            <header style={{ position: "relative", zIndex: 1, padding: "48px 20px 24px", textAlign: "center" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
                    <h1 className="guide-title text-gradient" style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(18px,4vw,28px)", fontWeight: 800, letterSpacing: 6, margin: 0, textTransform: "uppercase", position: "relative", animation: "titleReveal 1.2s ease-out" }}>
                        {t('builder_ui.title') || 'Tools'}
                    </h1>
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32, animation: "fadeUp 0.6s ease-out" }}>
                    <button
                        className={`tool-tab ${activeTab === 'build-time' ? 'active' : ''}`}
                        onClick={() => setActiveTab('build-time')}
                        style={{ color: activeTab === 'build-time' ? '#FFFFFF' : '#8A8778' }}
                    >
                        Build Time
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'nexus' ? 'active' : ''}`}
                        onClick={() => setActiveTab('nexus')}
                        style={{ color: activeTab === 'nexus' ? '#FFFFFF' : '#8A8778' }}
                    >
                        Nexus
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'gvg' ? 'active' : ''}`}
                        onClick={() => setActiveTab('gvg')}
                        style={{ color: activeTab === 'gvg' ? '#FFFFFF' : '#8A8778' }}
                    >
                        Guild vs Guild
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'combat-craft' ? 'active' : ''}`}
                        onClick={() => setActiveTab('combat-craft')}
                        style={{ color: activeTab === 'combat-craft' ? '#FFFFFF' : '#8A8778' }}
                    >
                        Combat Craft
                    </button>
                </div>

                <div style={{ height: 1, background: `linear-gradient(90deg,transparent,#C9A84C,transparent)`, margin: "0 auto", maxWidth: 400, marginTop: 12 }} />
            </header>

            {/* Content */}
            <main style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto", padding: "0 20px 60px" }}>
                {activeTab === 'build-time' && <BuildTimeCalculator />}
                {activeTab === 'nexus' && <NexusCalculator />}
                {activeTab === 'gvg' && <GvGCalculator />}
                {activeTab === 'combat-craft' && <CombatCraftCalculator />}
            </main>
        </div>
    );
}
