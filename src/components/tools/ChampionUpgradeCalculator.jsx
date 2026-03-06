import React, { useState, useMemo, useEffect, useCallback } from "react";
import { V, Card, SectionTitle, Label } from './ToolUI';
import { useAuth } from '../../context/AuthContext';
import { saveUserToolData, loadUserToolData } from '../../firebaseUtils';

// Cost per level ranges
const COST_TABLE = [
    { from: 1, to: 9, cost: 10 },
    { from: 10, to: 19, cost: 12 },
    { from: 20, to: 29, cost: 14 },
    { from: 30, to: 39, cost: 16 },
    { from: 40, to: 49, cost: 18 },
    { from: 50, to: 59, cost: 20 },
    { from: 60, to: 69, cost: 22 },
    { from: 70, to: 79, cost: 24 },
    { from: 80, to: 89, cost: 26 },
    { from: 90, to: 99, cost: 32 },
    { from: 100, to: 109, cost: 36 },
    { from: 110, to: 119, cost: 40 },
    { from: 120, to: 129, cost: 45 },
    { from: 130, to: 139, cost: 50 },
    { from: 140, to: 149, cost: 55 },
    { from: 150, to: 159, cost: 60 },
    { from: 160, to: 169, cost: 70 },
    { from: 170, to: 179, cost: 80 },
    { from: 180, to: 189, cost: 90 },
    { from: 190, to: 199, cost: 100 },
    { from: 200, to: 200, cost: 100 },
];

const MAX_LEVEL = 200;

function getCostForLevel(lvl) {
    const range = COST_TABLE.find(r => lvl >= r.from && lvl <= r.to);
    return range ? range.cost : 0;
}

function getTotalCost(fromLvl, toLvl) {
    let total = 0;
    for (let i = fromLvl; i < toLvl; i++) {
        total += getCostForLevel(i + 1);
    }
    return total;
}

// Milestone breakpoints
const MILESTONES = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200];

const fmt = (n) => n.toLocaleString("en-US");

export default function ChampionUpgradeCalculator() {
    const { currentUser } = useAuth();
    const [currentLevel, setCurrentLevel] = useState(1);
    const [targetLevel, setTargetLevel] = useState(200);
    const [inventory, setInventory] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from Firebase
    useEffect(() => {
        const loadData = async () => {
            if (currentUser) {
                const data = await loadUserToolData(currentUser.uid, 'championUpgrade');
                if (data) {
                    if (data.currentLevel !== undefined) setCurrentLevel(data.currentLevel);
                    if (data.targetLevel !== undefined) setTargetLevel(data.targetLevel);
                    if (data.inventory !== undefined) setInventory(data.inventory);
                }
            } else {
                // Reset to default when logged out
                setCurrentLevel(1);
                setTargetLevel(200);
                setInventory(0);
            }
            setIsLoaded(true);
        };
        loadData();
    }, [currentUser]);

    // Save data to Firebase with debounce
    useEffect(() => {
        if (!isLoaded || !currentUser) return;

        const timeoutId = setTimeout(() => {
            saveUserToolData(currentUser.uid, 'championUpgrade', {
                currentLevel,
                targetLevel,
                inventory
            });
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [currentLevel, targetLevel, inventory, currentUser, isLoaded]);

    const totalCost = useMemo(() => getTotalCost(currentLevel, targetLevel), [currentLevel, targetLevel]);
    const surplus = inventory - totalCost;

    // Breakdown by range
    const breakdown = useMemo(() => {
        return COST_TABLE.map(range => {
            let cost = 0;
            let levelsInRange = 0;
            for (let i = range.from; i <= range.to; i++) {
                if (i > currentLevel && i <= targetLevel) {
                    cost += range.cost;
                    levelsInRange++;
                }
            }
            return { ...range, cost: cost, levels: levelsInRange, active: levelsInRange > 0 };
        }).filter(r => r.active);
    }, [currentLevel, targetLevel]);

    // Cumulative milestones
    const milestoneData = useMemo(() => {
        return MILESTONES.map(m => ({
            level: m,
            totalFromZero: getTotalCost(0, m),
            totalFromCurrent: m > currentLevel ? getTotalCost(currentLevel, Math.min(m, targetLevel)) : 0,
            reached: currentLevel >= m,
            inRange: m <= targetLevel && m > currentLevel,
        }));
    }, [currentLevel, targetLevel]);

    return (
        <div style={{ animation: "fadeUp 0.8s ease-out" }}>
            {/* Level selectors */}
            <Card>
                <SectionTitle>Champion Levels</SectionTitle>

                <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start", marginTop: 8 }}>
                    {/* Current Level */}
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                            <Label>Current Level</Label>
                            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 24, fontWeight: 700, color: V.teal }}>
                                {currentLevel}
                            </span>
                        </div>
                        <input type="range" min={0} max={MAX_LEVEL} value={currentLevel}
                            onChange={(e) => {
                                const v = parseInt(e.target.value);
                                setCurrentLevel(v);
                                if (v > targetLevel) setTargetLevel(v);
                            }}
                            style={{ width: "100%" }} />
                    </div>

                    {/* Target Level */}
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                            <Label>Target Level</Label>
                            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 24, fontWeight: 700, color: "#2ecc71" }}>
                                {targetLevel}
                            </span>
                        </div>
                        <input type="range" min={0} max={MAX_LEVEL} value={targetLevel}
                            onChange={(e) => {
                                const v = parseInt(e.target.value);
                                setTargetLevel(v);
                                if (v < currentLevel) setCurrentLevel(v);
                            }}
                            style={{ width: "100%", accentColor: "#2ecc71" }} />
                    </div>

                    {/* Inventory */}
                    <div style={{ minWidth: 160 }}>
                        <Label>Shards Available</Label>
                        <input type="text" value={inventory.toLocaleString("en-US")}
                            onChange={(e) => setInventory(Math.min(parseInt(e.target.value.replace(/\D/g, "")) || 0, 999999999))}
                            style={{
                                width: "100%", padding: "10px 14px",
                                background: "rgba(0,0,0,.4)", border: `1px solid rgba(167,139,250,0.3)`,
                                borderRadius: 2, color: "#a78bfa",
                                fontFamily: "'Share Tech Mono', monospace", fontSize: 20, fontWeight: 600,
                                textAlign: "right", outline: "none", transition: "border-color 0.3s ease"
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#a78bfa"}
                            onBlur={(e) => e.target.style.borderColor = "rgba(167,139,250,0.3)"}
                        />
                    </div>
                </div>
            </Card>

            {/* Summary */}
            {currentLevel < targetLevel && (
                <Card accent>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, #f0c040, transparent)` }} />
                    <SectionTitle>Estimated Cost</SectionTitle>

                    <div style={{
                        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 20,
                        textAlign: "center", marginBottom: 16,
                    }}>
                        {/* Total Cost */}
                        <div style={{ padding: 18, background: "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid #f0c04030` }}>
                            <div style={{ fontFamily: "'Orbitron'", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: V.txDim, marginBottom: 8 }}>
                                Total Cost
                            </div>
                            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 28, fontWeight: 700, color: "#f0c040", textShadow: `0 0 20px rgba(240, 192, 64, 0.4)` }}>
                                {fmt(totalCost)}
                            </div>
                            <div style={{ fontSize: 10, color: V.txSec, marginTop: 6, fontFamily: "'Rajdhani', sans-serif" }}>
                                For {targetLevel - currentLevel} levels
                            </div>
                        </div>

                        {/* Surplus/Deficit */}
                        <div style={{ padding: 18, background: "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid ${surplus >= 0 ? '#2ecc7130' : '#e74c3c30'}` }}>
                            <div style={{ fontFamily: "'Orbitron'", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: V.txDim, marginBottom: 8 }}>
                                Surplus / Deficit
                            </div>
                            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 28, fontWeight: 700, color: surplus >= 0 ? "#2ecc71" : "#e74c3c", opacity: surplus >= 0 ? 1 : 0.9 }}>
                                {surplus >= 0 ? "+" : ""}{fmt(surplus)}
                            </div>
                            <div style={{ fontSize: 10, color: surplus >= 0 ? "#2ecc71" : "#e74c3c", marginTop: 6, opacity: 0.7, fontFamily: "'Rajdhani', sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>
                                {surplus >= 0 ? "Enough shards" : "Need more shards"}
                            </div>
                        </div>

                        {/* Avg Cost / Level */}
                        <div style={{ padding: 18, background: "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid ${V.border}` }}>
                            <div style={{ fontFamily: "'Orbitron'", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: V.txDim, marginBottom: 8 }}>
                                Avg Cost / Level
                            </div>
                            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 24, fontWeight: 600, color: V.txPri }}>
                                {(totalCost / (targetLevel - currentLevel)).toFixed(1)}
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Cost breakdown & Milestones */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>

                {/* Cost Breakdown */}
                <Card style={{ marginBottom: 0 }}>
                    <SectionTitle>Cost Breakdown</SectionTitle>

                    {breakdown.length === 0 ? (
                        <div style={{ fontSize: 14, color: V.txSec, padding: "20px 0", textAlign: "center", fontFamily: "'Rajdhani', sans-serif" }}>Select a level range to view breakdown</div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <div style={{ display: "flex", gap: 8, fontSize: 11, color: V.txDim, padding: "0 4px", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Share Tech Mono', monospace", borderBottom: `1px solid ${V.border}`, paddingBottom: 8, marginBottom: 4 }}>
                                <span style={{ width: 70 }}>Levels</span>
                                <span style={{ width: 60, textAlign: "right" }}>Per Lvl</span>
                                <span style={{ width: 45, textAlign: "right" }}>Count</span>
                                <span style={{ flex: 1, textAlign: "right" }}>Subtotal</span>
                            </div>
                            {breakdown.map((r, i) => (
                                <div key={i} style={{
                                    display: "flex", gap: 8, fontSize: 14, padding: "6px 8px", borderRadius: 2,
                                    background: "rgba(0,0,0,.2)", alignItems: "center", border: `1px solid transparent`,
                                    transition: "all 0.2s ease"
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(167,139,250,0.05)"; e.currentTarget.style.borderColor = "rgba(167,139,250,0.2)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,.2)"; e.currentTarget.style.borderColor = "transparent"; }}
                                >
                                    <span style={{ fontFamily: "'Share Tech Mono', monospace", width: 70, color: V.txSec }}>
                                        {r.from}–{r.to}
                                    </span>
                                    <span style={{ fontFamily: "'Share Tech Mono', monospace", width: 60, textAlign: "right", color: "#a78bfa" }}>{r.cost / r.levels}</span>
                                    <span style={{ fontFamily: "'Share Tech Mono', monospace", width: 45, textAlign: "right", color: V.txSec }}>×{r.levels}</span>
                                    <span style={{ flex: 1, textAlign: "right", fontFamily: "'Share Tech Mono', monospace", fontWeight: 700, color: "#f0c040" }}>
                                        {fmt(r.cost)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

                {/* Milestones */}
                <Card style={{ marginBottom: 0 }}>
                    <SectionTitle>Milestones</SectionTitle>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ display: "flex", gap: 8, fontSize: 11, color: V.txDim, padding: "0 4px", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Share Tech Mono', monospace", borderBottom: `1px solid ${V.border}`, paddingBottom: 8, marginBottom: 4 }}>
                            <span style={{ width: 50 }}>Level</span>
                            <span style={{ flex: 1, textAlign: "right" }}>Total (0→X)</span>
                            <span style={{ flex: 1, textAlign: "right" }}>From Current</span>
                        </div>
                        {milestoneData.map((m, i) => (
                            <div key={i} style={{
                                display: "flex", gap: 8, fontSize: 14, padding: "6px 8px", borderRadius: 2,
                                background: m.reached ? "rgba(40,180,99,0.06)" : m.inRange ? "rgba(240,192,64,0.08)" : "rgba(0,0,0,.2)",
                                alignItems: "center", border: `1px solid ${m.inRange ? 'rgba(240,192,64,0.2)' : 'transparent'}`, transition: "all 0.2s ease"
                            }}>
                                <span style={{
                                    fontFamily: "'Share Tech Mono', monospace", width: 50, fontWeight: 700,
                                    color: m.reached ? "#28b463" : m.inRange ? "#f0c040" : V.txSec
                                }}>
                                    {m.level}
                                </span>
                                <span style={{
                                    flex: 1, textAlign: "right", fontFamily: "'Share Tech Mono', monospace",
                                    color: m.reached ? V.txSec : V.txPri, opacity: m.reached ? 0.5 : 1,
                                    textDecoration: m.reached ? "line-through" : "none"
                                }}>
                                    {fmt(m.totalFromZero)}
                                </span>
                                <span style={{
                                    flex: 1, textAlign: "right", fontFamily: "'Share Tech Mono', monospace", fontWeight: 700,
                                    color: m.reached ? V.txSec : m.inRange ? "#f0c040" : V.txSec, opacity: m.reached ? 0.3 : 1
                                }}>
                                    {m.reached ? "—" : m.inRange ? fmt(m.totalFromCurrent) : "—"}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
