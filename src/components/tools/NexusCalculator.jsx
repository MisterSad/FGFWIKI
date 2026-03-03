import React, { useState, useMemo } from "react";
import { NEXUS_DATA } from "../../data/nexusData";
import { V, Card, SectionTitle, Label } from './ToolUI';

const fmt = (n) => n.toLocaleString("en-US");

const WeaponIcon = ({ type, size = 20 }) => {
    const icons = {
        kinetic: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
        ),
        beam: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l16 16" />
                <path d="M4 4l4 0 0 4" />
                <path d="M20 20l-4 0 0-4" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
            </svg>
        ),
        ion: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
            </svg>
        ),
    };
    return icons[type];
};

export default function NexusCalculator() {
    const [weaponType, setWeaponType] = useState("kinetic");
    const [fromStage, setFromStage] = useState(1);
    const [toStage, setToStage] = useState(4);
    const [expandedStage, setExpandedStage] = useState(null);

    const weapon = NEXUS_DATA[weaponType];
    const stages = weapon.stages;

    const calculation = useMemo(() => {
        const from = Math.min(fromStage, toStage);
        const to = Math.max(fromStage, toStage);
        let totalMods = 0;
        let totalEchoes = 0;
        let totalLevels = 0;
        const stageBreakdown = [];

        for (let i = from - 1; i < to; i++) {
            if (i < 0 || i >= stages.length) continue;
            const s = stages[i];
            if (s.stage <= from) continue;
            totalMods += s.totalCompMods;
            totalEchoes += s.totalEchoes;
            const lvls = s.nodes.reduce((a, n) => a + n.levelsPerNode, 0);
            totalLevels += lvls;
            stageBreakdown.push({ ...s, levels: lvls });
        }

        return { totalMods, totalEchoes, totalLevels, stageBreakdown, from, to };
    }, [fromStage, toStage, stages]);

    const cumulativeTotal = useMemo(() => {
        return stages.reduce(
            (acc, s) => ({
                mods: acc.mods + s.totalCompMods,
                echoes: acc.echoes + s.totalEchoes,
            }),
            { mods: 0, echoes: 0 }
        );
    }, [stages]);

    const pctProgress = useMemo(() => {
        if (cumulativeTotal.mods === 0) return 0;
        const modsBeforeTo = stages
            .filter((s) => s.stage <= toStage)
            .reduce((a, s) => a + s.totalCompMods, 0);
        return Math.round((modsBeforeTo / cumulativeTotal.mods) * 100);
    }, [toStage, stages, cumulativeTotal]);

    return (
        <div style={{ animation: "fadeUp 0.8s ease-out" }}>
            <Card>
                <SectionTitle>Nexus Specialization</SectionTitle>
                <div style={{
                    display: "flex", gap: 12, justifyContent: "center", marginBottom: 32, flexWrap: "wrap"
                }}>
                    {Object.entries(NEXUS_DATA).map(([key, w]) => {
                        const active = key === weaponType;
                        return (
                            <button
                                key={key}
                                onClick={() => setWeaponType(key)}
                                style={{
                                    display: "flex", alignItems: "center", gap: 8,
                                    padding: "10px 20px",
                                    background: active ? `${w.color}15` : "rgba(0,0,0,.3)",
                                    border: `1px solid ${active ? w.color : V.border}`,
                                    borderRadius: 2,
                                    color: active ? w.color : V.txDim,
                                    cursor: "pointer",
                                    fontFamily: "'Rajdhani', sans-serif",
                                    fontSize: 16,
                                    fontWeight: active ? 600 : 500,
                                    letterSpacing: 1,
                                    textTransform: "uppercase",
                                    transition: "all 0.3s ease-out",
                                    boxShadow: active ? `0 0 20px ${w.glow}` : "none",
                                }}
                            >
                                <WeaponIcon type={key} size={18} />
                                {w.label}
                            </button>
                        );
                    })}
                </div>

                <div style={{
                    display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16,
                    alignItems: "end", marginBottom: 16,
                }}>
                    <div>
                        <Label>Current Stage</Label>
                        <select
                            value={fromStage}
                            onChange={(e) => setFromStage(Number(e.target.value))}
                            style={{
                                width: "100%", padding: "10px 14px",
                                background: "rgba(0,0,0,.4)", border: `1px solid ${V.border}`,
                                borderRadius: 2, color: V.txPri,
                                fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 600,
                                cursor: "pointer", outline: "none"
                            }}
                        >
                            {stages.map((s) => (
                                <option key={s.stage} value={s.stage}>
                                    Stage {s.stage}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{
                        fontSize: 24, color: weapon.color, paddingBottom: 6,
                        fontWeight: 300, fontFamily: "'Orbitron'", display: "flex", alignItems: "center"
                    }}>
                        →
                    </div>

                    <div>
                        <Label>Target Stage</Label>
                        <select
                            value={toStage}
                            onChange={(e) => setToStage(Number(e.target.value))}
                            style={{
                                width: "100%", padding: "10px 14px",
                                background: "rgba(0,0,0,.4)", border: `1px solid ${V.border}`,
                                borderRadius: 2, color: V.txPri,
                                fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 600,
                                cursor: "pointer", outline: "none"
                            }}
                        >
                            {stages.map((s) => (
                                <option key={s.stage} value={s.stage}>
                                    Stage {s.stage}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Card>

            {fromStage < toStage && (
                <Card accent style={{ borderColor: `${weapon.color}50` }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${weapon.color}, transparent)` }} />
                    <SectionTitle>Estimated Cost</SectionTitle>
                    <div style={{
                        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 20,
                        textAlign: "center", marginBottom: 24,
                    }}>
                        <div style={{ padding: 18, background: "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid ${weapon.color}30` }}>
                            <div style={{ fontFamily: "'Orbitron'", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: V.txDim, marginBottom: 8 }}>
                                Comp Mods
                            </div>
                            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 24, fontWeight: 700, color: weapon.color, textShadow: `0 0 20px ${weapon.glow}` }}>
                                {fmt(calculation.totalMods)}
                            </div>
                        </div>
                        <div style={{ padding: 18, background: "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid ${V.border}` }}>
                            <div style={{ fontFamily: "'Orbitron'", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: V.txDim, marginBottom: 8 }}>
                                Echoes
                            </div>
                            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 24, fontWeight: 700, color: V.txPri }}>
                                {fmt(calculation.totalEchoes)}
                            </div>
                        </div>
                        <div style={{ padding: 18, background: "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid ${V.border}` }}>
                            <div style={{ fontFamily: "'Orbitron'", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: V.txDim, marginBottom: 8 }}>
                                Total Levels
                            </div>
                            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 24, fontWeight: 700, color: V.txSec }}>
                                {fmt(calculation.totalLevels)}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 4, padding: "14px 16px", background: "rgba(201,168,76,0.04)", borderRadius: 2, border: `1px solid ${V.border}` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Rajdhani', sans-serif", fontSize: 16, color: V.gold, letterSpacing: 0.3, marginBottom: 8 }}>
                            <span>Progress to S{toStage}</span>
                            <span style={{ fontFamily: "'Share Tech Mono'" }}>{pctProgress}% of max</span>
                        </div>
                        <div style={{ height: 2, background: "rgba(201,168,76,0.1)", borderRadius: 1, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${pctProgress}%`, background: `linear-gradient(90deg, ${weapon.color}80, ${weapon.color})`, borderRadius: 1, transition: "width 0.4s ease" }} />
                        </div>
                    </div>
                </Card>
            )}

            {fromStage >= toStage ? (
                <Card>
                    <div style={{ textAlign: "center", color: V.txDim, padding: "20px 0", fontSize: 16, fontFamily: "'Rajdhani', sans-serif" }}>
                        Select a target stage higher than your current stage to see the cost.
                    </div>
                </Card>
            ) : (
                <Card>
                    <SectionTitle>Stage Breakdown</SectionTitle>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {calculation.stageBreakdown.map((s) => {
                            const isExpanded = expandedStage === s.stage;
                            return (
                                <div key={s.stage}>
                                    <button
                                        onClick={() => setExpandedStage(isExpanded ? null : s.stage)}
                                        style={{
                                            width: "100%", display: "grid", gridTemplateColumns: "36px 1fr 120px 100px", alignItems: "center", gap: 12,
                                            padding: "14px 16px", background: isExpanded ? "rgba(0,0,0,.4)" : "transparent",
                                            border: `1px solid ${isExpanded ? weapon.color + "50" : V.border}`, borderRadius: 2,
                                            cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", color: V.txPri, textAlign: "left", transition: "all 0.15s ease"
                                        }}
                                    >
                                        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 14, fontWeight: 700, color: weapon.color }}>
                                            S{s.stage}
                                        </span>
                                        <span style={{ fontSize: 14, color: V.txSec, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {s.milestone}
                                        </span>
                                        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 14, fontWeight: 600, textAlign: "right", color: weapon.color }}>
                                            {fmt(s.totalCompMods)}
                                        </span>
                                        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, textAlign: "right", color: V.txDim }}>
                                            {fmt(s.totalEchoes)} ech.
                                        </span>
                                    </button>

                                    {isExpanded && (
                                        <div style={{
                                            background: "rgba(0,0,0,.2)", border: `1px solid ${weapon.color}30`, borderTop: "none",
                                            borderRadius: "0 0 2px 2px", padding: "12px 16px"
                                        }}>
                                            <div style={{ display: "grid", gridTemplateColumns: "60px 80px 1fr 80px 60px", gap: "8px", fontFamily: "'Share Tech Mono', monospace", fontSize: 11, borderBottom: `1px solid ${V.border}`, paddingBottom: 8, marginBottom: 8 }}>
                                                <div style={{ color: V.txDim, textTransform: "uppercase", letterSpacing: 1 }}>Node</div>
                                                <div style={{ color: V.txDim, textTransform: "uppercase", letterSpacing: 1 }}>Stat</div>
                                                <div style={{ color: V.txDim, textTransform: "uppercase", letterSpacing: 1 }}>Lvl × Cost</div>
                                                <div style={{ color: V.txDim, textTransform: "uppercase", letterSpacing: 1, textAlign: "right" }}>Mods</div>
                                                <div style={{ color: V.txDim, textTransform: "uppercase", letterSpacing: 1, textAlign: "right" }}>Ech.</div>
                                            </div>
                                            <div style={{ display: "grid", gridTemplateColumns: "60px 80px 1fr 80px 60px", gap: "6px 8px", fontFamily: "'Share Tech Mono', monospace", fontSize: 12 }}>
                                                {s.nodes.map((n, i) => (
                                                    <React.Fragment key={i}>
                                                        <div style={{ color: V.txSec, padding: "2px 0" }}>{n.id}</div>
                                                        <div style={{ color: V.teal, padding: "2px 0" }}>{n.stat}</div>
                                                        <div style={{ color: V.txSec, padding: "2px 0" }}>
                                                            {n.levelsPerNode} × {fmt(n.compModsPerLevel)}
                                                        </div>
                                                        <div style={{ color: weapon.color, padding: "2px 0", textAlign: "right", fontWeight: 500 }}>
                                                            {fmt(n.totalCompMods)}
                                                        </div>
                                                        <div style={{ color: V.txSec, padding: "2px 0", textAlign: "right" }}>
                                                            {n.echoes}
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${V.border}`, fontFamily: "'Rajdhani', sans-serif", fontSize: 14, color: V.goldDim }}>
                                                ⬡ Milestone: {s.milestone}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Card>
            )}

            <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(0,0,0,.3)", border: `1px solid ${V.border}`, borderRadius: 2, display: "flex", justifyContent: "space-between", fontFamily: "'Orbitron'", fontSize: 10, color: V.txSec, letterSpacing: 2, textTransform: "uppercase" }}>
                <span>TOTAL S1→S10 : {fmt(cumulativeTotal.mods)} mods · {fmt(cumulativeTotal.echoes)} echoes</span>
                <span style={{ color: weapon.color }}>{weapon.label}</span>
            </div>
        </div>
    );
}
