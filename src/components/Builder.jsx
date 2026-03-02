import React, { useState, useCallback, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { BUILDING_CATEGORIES, BUILD_SPEED_MODIFIERS, BUILD_TIME_DATA, ESTIMATED_FLAGS } from '../data/builderData';

// ── Foundation Design System Tokens ──
const V = {
    bgVoid: "#060710", bgSurface: "#0D0E14", bgElev: "#1A1B26",
    gold: "#C9A84C", goldBr: "#E8C96A", goldDim: "#8A6F2F", bronze: "#A08240",
    txPri: "#E8E4D9", txSec: "#8A8778", txDim: "#5A5848",
    teal: "#4ECDC4",
    border: "rgba(201,168,76,0.15)", borderHov: "rgba(201,168,76,0.35)",
};

// ── Helpers ──
function fmtTime(s) { if (!s || s <= 0) return "0s"; s = Math.round(s); const d = Math.floor(s / 86400); s %= 86400; const h = Math.floor(s / 3600); s %= 3600; const m = Math.floor(s / 60); s %= 60; let p = []; if (d) p.push(`${d}d`); if (h || d) p.push(`${h}h`); p.push(`${String(m).padStart(2, "0")}m`); p.push(`${String(s).padStart(2, "0")}s`); return p.join(" ") }
function fmtDDHHMMSS(t) { if (!t || t <= 0) return "00:00:00:00"; const s = Math.round(t); return `${String(Math.floor(s / 86400)).padStart(2, "0")}:${String(Math.floor((s % 86400) / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}` }
function parseTimeStr(str) { if (!str?.trim()) return 0; const p = str.trim().split(":").map(Number); if (p.some(isNaN)) return 0; if (p.length === 4) return p[0] * 86400 + p[1] * 3600 + p[2] * 60 + p[3]; if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2]; if (p.length === 2) return p[0] * 60 + p[1]; return p[0] }
function getModPct(mod, val) { if (mod.type === "level") return mod.values[val] || 0; if (mod.type === "toggle") return mod.opts[val].v; return val || 0 }

// ── Foundation Sub-Components ──
function Corners() {
    const s = { position: "absolute", width: 12, height: 12, opacity: 0.25, pointerEvents: "none" };
    return <><div style={{ ...s, top: 6, left: 6, borderTop: `1px solid ${V.gold}`, borderLeft: `1px solid ${V.gold}` }} /><div style={{ ...s, bottom: 6, right: 6, borderBottom: `1px solid ${V.gold}`, borderRight: `1px solid ${V.gold}` }} /></>;
}
function GoldLine({ style: sx }) { return <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${V.gold},transparent)`, ...sx }} /> }

function Card({ children, accent }) {
    return (
        <div style={{ position: "relative", background: V.bgSurface, border: `1px solid ${accent ? V.borderHov : V.border}`, borderRadius: 2, padding: "28px 24px", marginBottom: 28, transition: "border-color 0.3s ease-out" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${V.gold},transparent)` }} />
            <Corners />{children}
        </div>
    );
}

function SectionTitle({ children }) {
    return <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, letterSpacing: 4, color: V.txSec, margin: "0 0 22px", textTransform: "uppercase" }}>{children}</h2>;
}

function Label({ children }) {
    return <label style={{ fontFamily: "'Orbitron'", fontSize: 9, letterSpacing: 3, color: V.txDim, display: "block", marginBottom: 6, textTransform: "uppercase" }}>{children}</label>;
}

function ModRow({ mod, value, onChange }) {
    const pct = getModPct(mod, value);
    return (
        <div style={{ padding: "10px 0", borderBottom: "1px solid rgba(201,168,76,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontFamily: "'Rajdhani'", fontSize: 16, fontWeight: 500, color: V.txPri, letterSpacing: 0.3 }}>{mod.label}</span>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 12, color: V.gold, letterSpacing: 1 }}>{mod.type === "custom" ? `${value}%` : `${pct.toFixed(1)}%`}</span>
            </div>
            {mod.type === "level" && <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input type="range" min={0} max={mod.max} value={value} onChange={e => onChange(+e.target.value)} style={{ flex: 1 }} />
                <span style={{ fontFamily: "'Orbitron'", fontSize: 9, fontWeight: 500, color: V.txSec, letterSpacing: 2, background: "rgba(201,168,76,0.08)", padding: "3px 10px", borderRadius: 2, minWidth: 48, textAlign: "center" }}>LV.{value}</span>
            </div>}
            {mod.type === "toggle" && <div style={{ display: "flex", gap: 4 }}>
                {mod.opts.map((o, i) => <button key={i} onClick={() => onChange(i)} style={{ fontFamily: "'Rajdhani'", fontSize: 14, fontWeight: 500, padding: "5px 14px", border: `1px solid ${value === i ? V.borderHov : V.border}`, borderRadius: 2, background: value === i ? "rgba(201,168,76,0.12)" : "transparent", color: value === i ? V.goldBr : V.txDim, cursor: "pointer", transition: "all 0.3s ease-out" }}>{o.l}</button>)}
            </div>}
            {mod.type === "custom" && <input type="number" min={0} max={100} step={0.5} value={value} onChange={e => onChange(+e.target.value || 0)} style={{ fontFamily: "'Share Tech Mono'", fontSize: 13, padding: "6px 10px", background: "rgba(0,0,0,.3)", border: `1px solid ${V.border}`, borderRadius: 2, color: V.gold, outline: "none", width: 80 }} />}
        </div>
    );
}

function ResBlock({ label, time, sub, highlight }) {
    return (
        <div style={{ position: "relative", padding: 18, background: highlight ? "rgba(201,168,76,0.04)" : "rgba(0,0,0,.25)", borderRadius: 2, border: `1px solid ${highlight ? V.borderHov : V.border}`, textAlign: "center" }}>
            {highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${V.gold},transparent)` }} />}
            <div style={{ fontFamily: "'Orbitron'", fontSize: 8, fontWeight: 500, letterSpacing: 3, color: V.txDim, marginBottom: 8, textTransform: "uppercase" }}>{label}</div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 20, color: V.txPri, letterSpacing: 1, marginBottom: 4 }}>{fmtDDHHMMSS(time)}</div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: V.goldDim, marginBottom: 6 }}>{fmtTime(time)}</div>
            {sub && <div style={{ fontSize: 14, color: V.txDim, fontFamily: "'Rajdhani'", letterSpacing: 0.3 }}>{sub}</div>}
        </div>
    );
}

// ═══════════════ MAIN ═══════════════
export default function Builder() {
    const { t } = useTranslation();
    const [building, setBuilding] = useState("Energy Core");
    const [levelFrom, setLevelFrom] = useState(28);
    const [manualTime, setManualTime] = useState("");
    const [cabin1, setCabin1] = useState(0);
    const [cabin2, setCabin2] = useState(0);
    const [crewBonus, setCrewBonus] = useState(0);
    const [bMods, setBMods] = useState(() => { const o = {}; BUILD_SPEED_MODIFIERS.forEach(m => { o[m.id] = m.type === "level" ? 0 : m.type === "toggle" ? 0 : (m.def || 0) }); return o });
    const updateB = useCallback((id, v) => setBMods(p => ({ ...p, [id]: v })), []);

    const baseTime = useMemo(() => manualTime.trim() ? parseTimeStr(manualTime) : BUILD_TIME_DATA[building]?.[levelFrom] || 0, [building, levelFrom, manualTime]);
    const isEstimated = useMemo(() => manualTime.trim() ? false : !!ESTIMATED_FLAGS[building]?.[levelFrom], [building, levelFrom, manualTime]);
    const availLevels = useMemo(() => { const bd = BUILD_TIME_DATA[building]; return bd ? Object.keys(bd).map(Number).sort((a, b) => a - b) : [] }, [building]);

    const buildRes = useMemo(() => {
        if (!baseTime) return null;
        const flatR = cabin1 * 147 + cabin2 * 126; let totalPct = 0; const bk = [];
        BUILD_SPEED_MODIFIERS.forEach(m => { const p = getModPct(m, bMods[m.id]); totalPct += p; if (p > 0) bk.push({ label: m.label, pct: p }) });
        const sf = totalPct / 100; const presented = baseTime / (1 + sf) - flatR; const afterInit = baseTime / (1 + sf + crewBonus / 100) - flatR;
        const indiv = bk.map(b => ({ ...b, red: baseTime * (b.pct / 100) / (1 + sf) }));
        return { baseTime, flatR, totalPct, presented: Math.max(0, presented), afterInit: Math.max(0, afterInit), indiv };
    }, [baseTime, cabin1, cabin2, bMods, crewBonus]);

    const savPct = buildRes ? (((buildRes.baseTime - buildRes.afterInit) / buildRes.baseTime) * 100).toFixed(1) : "0";

    return (
        <div style={{ color: V.txPri, fontFamily: "'Rajdhani',sans-serif", position: "relative" }}>
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
      `}</style>



            {/* Header */}
            <header style={{ position: "relative", zIndex: 1, padding: "48px 20px 32px", textAlign: "center" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
                    <h1 className="guide-title text-gradient" style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(18px,4vw,28px)", fontWeight: 800, letterSpacing: 6, margin: 0, textTransform: "uppercase", position: "relative", animation: "titleReveal 1.2s ease-out" }}>
                        Build Time Calculator
                    </h1>
                </div>
                <GoldLine style={{ margin: "28px auto 0", maxWidth: 400 }} />
            </header>

            {/* Content */}
            <main style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto", padding: "0 20px 60px", animation: "fadeUp 0.8s ease-out" }}>

                <Card>
                    <SectionTitle>Building Selection</SectionTitle>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <div style={{ flex: "1 1 220px" }}>
                            <Label>Building</Label>
                            <select value={building} onChange={e => { setBuilding(e.target.value); setManualTime(""); const firstLevel = Object.keys(BUILD_TIME_DATA[e.target.value]).map(Number).sort((a, b) => a - b)[0]; setLevelFrom(firstLevel || 1); }} style={{ fontFamily: "'Rajdhani'", fontSize: 16, fontWeight: 600, padding: "10px 14px", background: "rgba(0,0,0,.4)", border: `1px solid ${V.border}`, borderRadius: 2, color: V.txPri, outline: "none", width: "100%", cursor: "pointer" }}>
                                {BUILDING_CATEGORIES.map(c => <optgroup key={c.label} label={c.label}>{c.buildings.map(b => <option key={b} value={b}>{b}</option>)}</optgroup>)}
                            </select>
                        </div>
                        <div style={{ flex: "0 0 130px" }}>
                            <Label>Level</Label>
                            <select value={levelFrom} onChange={e => setLevelFrom(+e.target.value)} style={{ fontFamily: "'Rajdhani'", fontSize: 16, fontWeight: 600, padding: "10px 14px", background: "rgba(0,0,0,.4)", border: `1px solid ${V.border}`, borderRadius: 2, color: V.txPri, outline: "none", width: "100%", cursor: "pointer" }}>
                                {availLevels.map(l => <option key={l} value={l}>{l} → {l + 1}</option>)}
                            </select>
                        </div>
                    </div>

                    <div style={{ marginTop: 18, padding: "16px 20px", background: "rgba(0,0,0,.3)", borderRadius: 2, border: `1px solid ${isEstimated ? "rgba(232,201,106,0.25)" : V.border}` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 24, color: V.txPri, letterSpacing: 2 }}>{buildRes ? fmtDDHHMMSS(buildRes.presented) : "\u2014"}</span>
                            {isEstimated && <span style={{ fontFamily: "'Orbitron'", fontSize: 8, letterSpacing: 3, color: V.goldDim, background: "rgba(201,168,76,0.08)", padding: "4px 10px", borderRadius: 2, textTransform: "uppercase" }}>Estimated</span>}
                            {baseTime > 0 && !isEstimated && <span style={{ fontFamily: "'Orbitron'", fontSize: 8, letterSpacing: 3, color: V.teal, background: "rgba(78,205,196,0.08)", padding: "4px 10px", borderRadius: 2, textTransform: "uppercase" }}>Verified</span>}
                        </div>
                        <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 12, color: V.txDim, marginTop: 6 }}>{buildRes ? fmtTime(buildRes.presented) : "No data available"}</div>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <Label>Manual Override (dd:hh:mm:ss)</Label>
                        <input type="text" value={manualTime} onChange={e => setManualTime(e.target.value)} placeholder="Leave empty to use database" style={{ fontFamily: "'Share Tech Mono'", fontSize: 16, padding: "10px 14px", background: "rgba(0,0,0,.3)", border: `1px solid ${V.border}`, borderRadius: 2, color: V.gold, outline: "none", width: "100%", letterSpacing: 2 }} />
                        {(isEstimated || baseTime === 0) && (
                            <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, color: V.txDim, marginTop: 8, marginBottom: 0, letterSpacing: 0.3 }}>
                                💡 Tip: The database time is not verified for this level. We recommend entering the exact game time manually for accurate results.
                            </p>
                        )}
                    </div>
                </Card>

                <Card>
                    <SectionTitle>Flat Reductions — Crew Cabins</SectionTitle>
                    {[["Crew Cabin 1", cabin1, setCabin1, 147], ["Crew Cabin 2", cabin2, setCabin2, 126]].map(([n, v, set, p]) => (
                        <div key={n} style={{ padding: "10px 0", borderBottom: "1px solid rgba(201,168,76,0.06)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                <span style={{ fontFamily: "'Rajdhani'", fontSize: 16, fontWeight: 500, color: V.txPri, letterSpacing: 0.3 }}>{n}</span>
                                <span style={{ fontFamily: "'Share Tech Mono'", fontSize: 12, color: V.gold, letterSpacing: 1 }}>-{fmtTime(v * p)}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <input type="range" min={0} max={30} value={v} onChange={e => set(+e.target.value)} style={{ flex: 1 }} />
                                <span style={{ fontFamily: "'Orbitron'", fontSize: 9, color: V.txSec, letterSpacing: 2, background: "rgba(201,168,76,0.08)", padding: "3px 10px", borderRadius: 2, minWidth: 48, textAlign: "center" }}>LV.{v}</span>
                            </div>
                        </div>
                    ))}
                </Card>

                <Card>
                    <SectionTitle>Construction Speed</SectionTitle>
                    {BUILD_SPEED_MODIFIERS.map(m => <ModRow key={m.id} mod={m} value={bMods[m.id]} onChange={v => updateB(m.id, v)} />)}
                    {buildRes && <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(201,168,76,0.04)", borderRadius: 2, borderLeft: `2px solid ${V.gold}`, fontFamily: "'Share Tech Mono'", fontSize: 12, color: V.txSec, letterSpacing: 1 }}>
                        Total: <span style={{ color: V.goldBr }}>+{buildRes.totalPct.toFixed(1)}%</span>
                    </div>}
                </Card>

                <Card>
                    <SectionTitle>Crew Bonus — Post Initialization</SectionTitle>
                    <div style={{ padding: "10px 0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                            <span style={{ fontFamily: "'Rajdhani'", fontSize: 16, fontWeight: 500, color: V.txPri, letterSpacing: 0.3 }}>Crew Bonus (Build Slot)</span>
                            <span style={{ fontFamily: "'Share Tech Mono'", fontSize: 12, color: V.gold, letterSpacing: 1 }}>{crewBonus}%</span>
                        </div>
                        <input type="number" min={0} max={50} step={0.25} value={crewBonus} onChange={e => setCrewBonus(+e.target.value || 0)} style={{ fontFamily: "'Share Tech Mono'", fontSize: 13, padding: "6px 10px", background: "rgba(0,0,0,.3)", border: `1px solid ${V.border}`, borderRadius: 2, color: V.gold, outline: "none", width: 80 }} />
                    </div>
                    <p style={{ fontFamily: "'Rajdhani'", fontSize: 16, color: V.txDim, marginTop: 8, lineHeight: 1.7, letterSpacing: 0.3 }}>
                        The game recalculates total speed including crew bonus after initialization.
                    </p>
                </Card>

                {buildRes && <Card accent>
                    <SectionTitle>Computation Results</SectionTitle>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginBottom: 22 }}>
                        <ResBlock label="Base Time" time={buildRes.baseTime} sub="No reductions" />
                        <ResBlock label="Displayed Time" time={buildRes.presented} sub={`${buildRes.totalPct.toFixed(1)}% speed + cabins`} />
                        <ResBlock label="Actual Time (Post-Init)" time={buildRes.afterInit} sub={`Total: ${(buildRes.totalPct + crewBonus).toFixed(1)}%`} highlight />
                    </div>
                    <div style={{ padding: "14px 16px", background: "rgba(201,168,76,0.04)", borderRadius: 2, border: `1px solid ${V.border}` }}>
                        <div style={{ fontFamily: "'Rajdhani'", fontSize: 16, color: V.gold, letterSpacing: 0.3, marginBottom: 8 }}>
                            Saved: <strong style={{ fontFamily: "'Share Tech Mono'", letterSpacing: 1 }}>{fmtTime(buildRes.baseTime - buildRes.afterInit)}</strong>
                            <span style={{ marginLeft: 8, fontSize: 12, color: V.txDim }}>({savPct}%)</span>
                        </div>
                        <div style={{ height: 2, background: "rgba(201,168,76,0.1)", borderRadius: 1, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${Math.min(100, +savPct)}%`, background: `linear-gradient(90deg,${V.goldDim},${V.gold})`, borderRadius: 1, transition: "width 0.6s ease-out" }} />
                        </div>
                    </div>
                    {buildRes.indiv.length > 0 && <details style={{ marginTop: 18 }}>
                        <summary style={{ fontFamily: "'Orbitron'", fontSize: 9, letterSpacing: 3, color: V.txDim, cursor: "pointer", padding: "8px 0", textTransform: "uppercase" }}>Reduction Breakdown</summary>
                        <div style={{ marginTop: 10 }}>{buildRes.indiv.map((r, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(201,168,76,0.05)", fontFamily: "'Rajdhani'", fontSize: 16, color: V.txSec, letterSpacing: 0.3 }}>
                                <span>{r.label}</span>
                                <span style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: V.goldDim, letterSpacing: 1 }}>{r.pct.toFixed(1)}% → -{fmtTime(r.red)}</span>
                            </div>
                        ))}</div>
                    </details>}
                </Card>}
                <div style={{ padding: "0 20px 20px", textAlign: "center", lineHeight: 1.5 }}>
                    <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, color: V.txDim, letterSpacing: 0.5, margin: 0 }}>
                        Data collection powered by the incredible efforts of<br />
                        <strong style={{ color: V.goldDim }}>PapaBeebs, Knappe, Lou</strong> and their contributors.
                    </p>
                </div>
            </main>

        </div>
    );
}
