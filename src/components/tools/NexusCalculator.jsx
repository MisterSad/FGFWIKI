import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NEXUS_DATA } from "../../data/nexusData";
import { V, Card, SectionTitle, Label } from './ToolUI';
import { useAuth } from '../../context/AuthContext';
import { saveUserToolData, loadUserToolData } from '../../firebaseUtils';

const fmt = (n) => n.toLocaleString("en-US");

// Map weaponType key to common.* translation key (Kinetic/Beam/Ion are shared)
const WEAPON_LABEL_KEYS = { kinetic: 'common.kinetic', beam: 'common.beam', ion: 'common.ion' };

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
    const { t } = useTranslation();
    const { currentUser } = useAuth();
    const [weaponType, setWeaponType] = useState("kinetic");
    const [fromStage, setFromStage] = useState(1);
    const [toStage, setToStage] = useState(4);
    const [expandedStage, setExpandedStage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from Firebase
    useEffect(() => {
        const loadData = async () => {
            if (currentUser) {
                const data = await loadUserToolData(currentUser.uid, 'nexus');
                if (data) {
                    if (data.weaponType) setWeaponType(data.weaponType);
                    if (data.fromStage !== undefined) setFromStage(data.fromStage);
                    if (data.toStage !== undefined) setToStage(data.toStage);
                }
            } else {
                // Reset to default
                setWeaponType("kinetic");
                setFromStage(1);
                setToStage(4);
            }
            setIsLoaded(true);
        };
        loadData();
    }, [currentUser]);

    // Save data to Firebase (debounced)
    useEffect(() => {
        if (!isLoaded || !currentUser) return;

        const timeoutId = setTimeout(() => {
            saveUserToolData(currentUser.uid, 'nexus', {
                weaponType,
                fromStage,
                toStage
            });
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [weaponType, fromStage, toStage, currentUser, isLoaded]);

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
                <SectionTitle>{t('nexus.title')}</SectionTitle>
                <div className="nexus-weapon-row">
                    {Object.entries(NEXUS_DATA).map(([key, w]) => {
                        const active = key === weaponType;
                        return (
                            <button
                                key={key}
                                className="nexus-weapon-btn"
                                onClick={() => setWeaponType(key)}
                                style={{
                                    background: active ? `${w.color}15` : "rgba(0,0,0,.3)",
                                    border: `1px solid ${active ? w.color : V.border}`,
                                    color: active ? w.color : V.txDim,
                                    fontWeight: active ? 600 : 500,
                                    boxShadow: active ? `0 0 20px ${w.glow}` : "none",
                                }}
                            >
                                <WeaponIcon type={key} size={16} />
                                {t(WEAPON_LABEL_KEYS[key] || key)}
                            </button>
                        );
                    })}
                </div>

                <div className="tool-stage-row">
                    <div>
                        <Label>{t('nexus.current_stage')}</Label>
                        <select
                            className="tool-select"
                            value={fromStage}
                            onChange={(e) => setFromStage(Number(e.target.value))}
                        >
                            {stages.map((s) => (
                                <option key={s.stage} value={s.stage}>
                                    {t('nexus.stage_n', { n: s.stage })}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{
                        fontSize: 20, color: weapon.color, paddingBottom: 6,
                        fontWeight: 300, fontFamily: "var(--font-label)", display: "flex", alignItems: "center"
                    }}>
                        →
                    </div>

                    <div>
                        <Label>{t('nexus.target_stage')}</Label>
                        <select
                            className="tool-select"
                            value={toStage}
                            onChange={(e) => setToStage(Number(e.target.value))}
                        >
                            {stages.map((s) => (
                                <option key={s.stage} value={s.stage}>
                                    {t('nexus.stage_n', { n: s.stage })}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Card>

            {fromStage < toStage && (
                <Card accent style={{ borderColor: `${weapon.color}50` }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${weapon.color}, transparent)` }} />
                    <SectionTitle>{t('nexus.estimated_cost')}</SectionTitle>
                    <div className="tool-grid-auto" style={{ textAlign: "center", marginBottom: 16 }}>
                        <div style={{ padding: "14px 12px", background: "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid ${weapon.color}30` }}>
                            <div style={{ fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: V.txDim, marginBottom: 6 }}>
                                {t('nexus.comp_mods')}
                            </div>
                            <div className="tool-big-num" style={{ color: weapon.color, textShadow: `0 0 20px ${weapon.glow}`, wordBreak: "break-word" }}>
                                {fmt(calculation.totalMods)}
                            </div>
                        </div>
                        <div style={{ padding: "14px 12px", background: "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid ${V.border}` }}>
                            <div style={{ fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: V.txDim, marginBottom: 6 }}>
                                {t('nexus.echoes')}
                            </div>
                            <div className="tool-big-num" style={{ color: V.txPri, wordBreak: "break-word" }}>
                                {fmt(calculation.totalEchoes)}
                            </div>
                        </div>
                        <div style={{ padding: "14px 12px", background: "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid ${V.border}` }}>
                            <div style={{ fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: V.txDim, marginBottom: 6 }}>
                                {t('nexus.total_levels_label')}
                            </div>
                            <div className="tool-big-num" style={{ color: V.txSec, wordBreak: "break-word" }}>
                                {fmt(calculation.totalLevels)}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 4, padding: "12px 14px", background: "rgba(201,168,76,0.04)", borderRadius: 2, border: `1px solid ${V.border}` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-body)", fontSize: 13, color: "#FFFFFF", letterSpacing: 0.3, marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
                            <span style={{ flex: "1 1 auto" }}>{t('nexus.progress_to', { stage: toStage })}</span>
                            <span style={{ fontFamily: "var(--font-mono)", flexShrink: 0 }}>{t('nexus.percent_of_max', { pct: pctProgress })}</span>
                        </div>
                        <div style={{ height: 2, background: "rgba(201,168,76,0.1)", borderRadius: 1, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${pctProgress}%`, background: `linear-gradient(90deg, ${weapon.color}80, ${weapon.color})`, borderRadius: 1, transition: "width 0.4s ease" }} />
                        </div>
                    </div>
                </Card>
            )}

            {fromStage >= toStage ? (
                <Card>
                    <div style={{ textAlign: "center", color: V.txDim, padding: "20px 0", fontSize: 14, fontFamily: "var(--font-body)" }}>
                        {t('nexus.select_higher_target')}
                    </div>
                </Card>
            ) : (
                <Card>
                    <SectionTitle>{t('nexus.stage_breakdown')}</SectionTitle>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {calculation.stageBreakdown.map((s) => {
                            const isExpanded = expandedStage === s.stage;
                            return (
                                <div key={s.stage}>
                                    <button
                                        className="nexus-stage-btn"
                                        onClick={() => setExpandedStage(isExpanded ? null : s.stage)}
                                        style={{
                                            background: isExpanded ? "rgba(0,0,0,.4)" : "transparent",
                                            borderColor: isExpanded ? weapon.color + "50" : V.border,
                                        }}
                                    >
                                        <span className="stage-tag" style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: weapon.color }}>
                                            S{s.stage}
                                        </span>
                                        <span className="stage-milestone" style={{ fontSize: 13, color: V.txSec }}>
                                            {s.milestone}
                                        </span>
                                        <span className="stage-mods" style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: weapon.color }}>
                                            {fmt(s.totalCompMods)} <span className="mobile-only" style={{ fontSize: 10, color: V.txDim, fontWeight: 400 }}>{t('nexus.comp_mods')}</span>
                                        </span>
                                        <span className="stage-echoes" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: V.txDim }}>
                                            {fmt(s.totalEchoes)} {t('nexus.echoes_short')}
                                        </span>
                                    </button>

                                    {isExpanded && (
                                        <div className="nexus-node-table" style={{
                                            border: `1px solid ${weapon.color}30`,
                                            borderTop: "none",
                                        }}>
                                            <div className="nexus-node-table-header">
                                                <div>{t('nexus.col_node')}</div>
                                                <div>{t('nexus.col_stat')}</div>
                                                <div>{t('nexus.col_lvl_cost')}</div>
                                                <div style={{ textAlign: "right" }}>{t('nexus.col_mods')}</div>
                                                <div style={{ textAlign: "right" }}>{t('nexus.col_ech')}</div>
                                            </div>
                                            {s.nodes.map((n, i) => (
                                                <div key={i} className="nexus-node-row">
                                                    <div className="node-id" style={{ color: V.txSec }}>
                                                        <span className="nx-mobile-label">{t('nexus.col_node')}</span>{n.id}
                                                    </div>
                                                    <div className="node-stat" style={{ color: V.teal }}>
                                                        <span className="nx-mobile-label">{t('nexus.col_stat')}</span>{n.stat}
                                                    </div>
                                                    <div className="node-cost" style={{ color: V.txSec }}>
                                                        <span className="nx-mobile-label">{t('nexus.col_lvl_cost')}</span>
                                                        {n.levelsPerNode} × {fmt(n.compModsPerLevel)}
                                                    </div>
                                                    <div className="node-mods" style={{ color: weapon.color }}>
                                                        <span className="nx-mobile-label">{t('nexus.col_mods')}</span>{fmt(n.totalCompMods)}
                                                    </div>
                                                    <div className="node-ech" style={{ color: V.txSec }}>
                                                        <span className="nx-mobile-label">{t('nexus.col_ech')}</span>{n.echoes}
                                                    </div>
                                                </div>
                                            ))}
                                            <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${V.border}`, fontFamily: "var(--font-body)", fontSize: 13, color: "#FFFFFF", lineHeight: 1.4 }}>
                                                ⬡ {t('nexus.milestone_label')}: {s.milestone}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Card>
            )}

            <div className="nexus-footer">
                <span>{t('nexus.total_summary', { mods: fmt(cumulativeTotal.mods), echoes: fmt(cumulativeTotal.echoes) })}</span>
                <span style={{ color: weapon.color }}>{t(WEAPON_LABEL_KEYS[weaponType] || weaponType)}</span>
            </div>
        </div>
    );
}
