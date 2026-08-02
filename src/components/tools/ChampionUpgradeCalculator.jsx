import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { V, Card, SectionTitle, Label } from './ToolUI';
import { useAuth } from '../../context/AuthContext';
import { saveUserToolData, loadUserToolData } from '../../firebaseUtils';
import { MAX_LEVEL, MILESTONES, COST_TABLE, getTotalCost } from '../../lib/championCost';

const fmt = (n) => n.toLocaleString("en-US");

export default function ChampionUpgradeCalculator() {
    const { t } = useTranslation();
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
                <SectionTitle>{t('tools_ui.champion_levels')}</SectionTitle>

                <div className="tool-champion-controls" style={{ marginTop: 8 }}>
                    {/* Current Level */}
                    <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                            <Label>{t('tools_ui.current_level')}</Label>
                            <span style={{ fontFamily: "var(--font-label)", fontSize: 22, fontWeight: 700, color: V.teal }}>
                                {currentLevel}
                            </span>
                        </div>
                        <input type="range" className="tool-range" min={0} max={MAX_LEVEL} value={currentLevel}
                            onChange={(e) => {
                                const v = parseInt(e.target.value);
                                setCurrentLevel(v);
                                if (v > targetLevel) setTargetLevel(v);
                            }}
                            style={{ accentColor: V.teal }} />
                    </div>

                    {/* Target Level */}
                    <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                            <Label>{t('tools_ui.target_level')}</Label>
                            <span style={{ fontFamily: "var(--font-label)", fontSize: 22, fontWeight: 700, color: "#2ecc71" }}>
                                {targetLevel}
                            </span>
                        </div>
                        <input type="range" className="tool-range" min={0} max={MAX_LEVEL} value={targetLevel}
                            onChange={(e) => {
                                const v = parseInt(e.target.value);
                                setTargetLevel(v);
                                if (v < currentLevel) setCurrentLevel(v);
                            }}
                            style={{ accentColor: "#2ecc71" }} />
                    </div>

                    {/* Inventory */}
                    <div style={{ width: "100%", flex: "1 1 100%" }}>
                        <Label>{t('tools_ui.shards_available')}</Label>
                        <input type="text" value={inventory.toLocaleString("en-US")}
                            onChange={(e) => setInventory(Math.min(parseInt(e.target.value.replace(/\D/g, "")) || 0, 999999999))}
                            style={{
                                width: "100%", padding: "10px 14px",
                                background: "rgba(0,0,0,.4)", border: `1px solid rgba(167,139,250,0.3)`,
                                borderRadius: 2, color: "#a78bfa",
                                fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 600,
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
                    <SectionTitle>{t('tools_ui.estimated_cost')}</SectionTitle>

                    <div className="tool-grid-auto" style={{ textAlign: "center", marginBottom: 12 }}>
                        {/* Total Cost */}
                        <div style={{ padding: "14px 12px", background: "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid #f0c04030` }}>
                            <div style={{ fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: V.txDim, marginBottom: 6 }}>
                                {t('tools_ui.total_cost')}
                            </div>
                            <div className="tool-big-num" style={{ color: "#f0c040", textShadow: `0 0 20px rgba(240, 192, 64, 0.4)`, wordBreak: "break-word" }}>
                                {fmt(totalCost)}
                            </div>
                            <div style={{ fontSize: 11, color: V.txSec, marginTop: 6, fontFamily: "var(--font-body)" }}>
                                {t('tools_ui.for_n_levels', { count: targetLevel - currentLevel })}
                            </div>
                        </div>

                        {/* Surplus/Deficit */}
                        <div style={{ padding: "14px 12px", background: "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid ${surplus >= 0 ? '#2ecc7130' : '#e74c3c30'}` }}>
                            <div style={{ fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: V.txDim, marginBottom: 6 }}>
                                {t('tools_ui.surplus_deficit')}
                            </div>
                            <div className="tool-big-num" style={{ color: surplus >= 0 ? "#2ecc71" : "#e74c3c", opacity: surplus >= 0 ? 1 : 0.9, wordBreak: "break-word" }}>
                                {surplus >= 0 ? "+" : ""}{fmt(surplus)}
                            </div>
                            <div style={{ fontSize: 10, color: surplus >= 0 ? "#2ecc71" : "#e74c3c", marginTop: 6, opacity: 0.7, fontFamily: "var(--font-body)", textTransform: "uppercase", letterSpacing: 1 }}>
                                {surplus >= 0 ? t('tools_ui.enough_shards') : t('tools_ui.need_more_shards')}
                            </div>
                        </div>

                        {/* Avg Cost / Level */}
                        <div style={{ padding: "14px 12px", background: "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid ${V.border}` }}>
                            <div style={{ fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: V.txDim, marginBottom: 6 }}>
                                {t('tools_ui.avg_cost_level')}
                            </div>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(18px, 5vw, 24px)", fontWeight: 600, color: V.txPri, wordBreak: "break-word" }}>
                                {(totalCost / (targetLevel - currentLevel)).toFixed(1)}
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Cost breakdown & Milestones */}
            <div className="tool-champion-detail-grid">

                {/* Cost Breakdown */}
                <Card style={{ marginBottom: 0 }}>
                    <SectionTitle>{t('tools_ui.cost_breakdown')}</SectionTitle>

                    {breakdown.length === 0 ? (
                        <div style={{ fontSize: 14, color: V.txSec, padding: "20px 0", textAlign: "center", fontFamily: "var(--font-body)" }}>{t('tools_ui.select_range')}</div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <div className="tool-table-row header">
                                <span>{t('tools_ui.col_levels')}</span>
                                <span className="col-r">{t('tools_ui.col_per_lvl')}</span>
                                <span className="col-r">{t('tools_ui.col_count')}</span>
                                <span className="col-r">{t('tools_ui.col_subtotal')}</span>
                            </div>
                            {breakdown.map((r, i) => (
                                <div key={i} className="tool-table-row"
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(167,139,250,0.05)"; e.currentTarget.style.borderColor = "rgba(167,139,250,0.2)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,.2)"; e.currentTarget.style.borderColor = "transparent"; }}
                                >
                                    <span style={{ color: V.txSec }}>
                                        {r.from}-{r.to}
                                    </span>
                                    <span className="col-r" style={{ color: "#a78bfa" }}>{r.cost / r.levels}</span>
                                    <span className="col-r" style={{ color: V.txSec }}>×{r.levels}</span>
                                    <span className="col-r" style={{ fontWeight: 700, color: "#f0c040" }}>
                                        {fmt(r.cost)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

                {/* Milestones */}
                <Card style={{ marginBottom: 0 }}>
                    <SectionTitle>{t('tools_ui.milestones')}</SectionTitle>

                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <div className="tool-milestone-row header">
                            <span>{t('tools_ui.level')}</span>
                            <span className="col-r" style={{ textAlign: "right" }}>{t('tools_ui.col_total_zero')}</span>
                            <span className="col-r" style={{ textAlign: "right" }}>{t('tools_ui.col_from_current')}</span>
                        </div>
                        {milestoneData.map((m, i) => (
                            <div key={i} className="tool-milestone-row" style={{
                                background: m.reached ? "rgba(40,180,99,0.06)" : m.inRange ? "rgba(240,192,64,0.08)" : "rgba(0,0,0,.2)",
                                borderColor: m.inRange ? 'rgba(240,192,64,0.2)' : 'transparent'
                            }}>
                                <span style={{
                                    fontWeight: 700,
                                    color: m.reached ? "#28b463" : m.inRange ? "#f0c040" : V.txSec
                                }}>
                                    {m.level}
                                </span>
                                <span style={{
                                    textAlign: "right",
                                    color: m.reached ? V.txSec : V.txPri, opacity: m.reached ? 0.5 : 1,
                                    textDecoration: m.reached ? "line-through" : "none"
                                }}>
                                    {fmt(m.totalFromZero)}
                                </span>
                                <span style={{
                                    textAlign: "right", fontWeight: 700,
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
