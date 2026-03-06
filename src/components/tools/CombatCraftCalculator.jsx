import React, { useState, useMemo, useEffect } from "react";
import { V, Card, SectionTitle, Label } from './ToolUI';
import { useAuth } from '../../context/AuthContext';
import { saveUserToolData, loadUserToolData } from '../../firebaseUtils';

const WEAPON_MOD = [
    { m: 180000, w: 180000, gc: 140000, cc: 100, b: 54 }, { m: 400000, w: 400000, gc: 320000, cc: 190, b: 54 },
    { m: 800000, w: 800000, gc: 640000, cc: 310, b: 54 }, { m: 1500000, w: 1500000, gc: 1200000, cc: 450, b: 54 },
    { m: 2500000, w: 2500000, gc: 2000000, cc: 620, b: 54 }, { m: 4100000, w: 4100000, gc: 3300000, cc: 820, b: 54 },
    { m: 7000000, w: 7000000, gc: 5600000, cc: 1200, b: 54 }, { m: 9500000, w: 9500000, gc: 7600000, cc: 1300, b: 54 },
    { m: 14000000, w: 14000000, gc: 11000000, cc: 1570, b: 54 }, { m: 19000000, w: 19000000, gc: 15000000, cc: 1870, b: 54 },
];
const INT_MOD = [
    { m: 220000, w: 220000, gc: 180000, cc: 150, b: 54 }, { m: 470000, w: 470000, gc: 380000, cc: 260, b: 54 },
    { m: 920000, w: 920000, gc: 740000, cc: 390, b: 54 }, { m: 1700000, w: 1700000, gc: 1400000, cc: 550, b: 54 },
    { m: 2800000, w: 2800000, gc: 2200000, cc: 740, b: 54 }, { m: 4500000, w: 4500000, gc: 3600000, cc: 960, b: 54 },
    { m: 7000000, w: 7000000, gc: 5600000, cc: 1200, b: 54 }, { m: 10000000, w: 10000000, gc: 8000000, cc: 1460, b: 54 },
    { m: 15000000, w: 15000000, gc: 12000000, cc: 1760, b: 54 }, { m: 21000000, w: 21000000, gc: 17000000, cc: 2070, b: 54 },
];
const ARMOR_MOD = [
    { m: 250000, w: 250000, gc: 200000, cc: 200, b: 54 }, { m: 500000, w: 500000, gc: 400000, cc: 320, b: 54 },
    { m: 1000000, w: 1000000, gc: 800000, cc: 470, b: 54 }, { m: 1800000, w: 1800000, gc: 1400000, cc: 650, b: 54 },
    { m: 3100000, w: 3100000, gc: 2500000, cc: 850, b: 54 }, { m: 4900000, w: 4900000, gc: 3900000, cc: 1080, b: 54 },
    { m: 7500000, w: 7500000, gc: 6000000, cc: 1330, b: 54 }, { m: 11000000, w: 11000000, gc: 9000000, cc: 1610, b: 54 },
    { m: 16000000, w: 16000000, gc: 13000000, cc: 1910, b: 54 }, { m: 22000000, w: 22000000, gc: 18000000, cc: 2240, b: 54 },
];
const HULL_MOD = [
    { m: 290000, w: 290000, gc: 230000, cc: 250, b: 2400 }, { m: 560000, w: 560000, gc: 450000, cc: 390, b: 2400 },
    { m: 1100000, w: 1100000, gc: 880000, cc: 550, b: 2400 }, { m: 2000000, w: 2000000, gc: 1600000, cc: 730, b: 2400 },
    { m: 3400000, w: 3400000, gc: 2700000, cc: 950, b: 2400 }, { m: 5300000, w: 5300000, gc: 4200000, cc: 1190, b: 2400 },
    { m: 8000000, w: 8000000, gc: 6400000, cc: 1450, b: 2400 }, { m: 11000000, w: 11000000, gc: 9000000, cc: 1740, b: 2400 },
    { m: 16000000, w: 16000000, gc: 13000000, cc: 2060, b: 2400 }, { m: 23000000, w: 23000000, gc: 18000000, cc: 2400, b: 2400 },
];
const CC_WEAPON_ARMOR = [
    { m: 320000, w: 320000, gc: 260000, cc: 600, b: 36 }, { m: 610000, w: 610000, gc: 480000, cc: 800, b: 36 },
    { m: 1100000, w: 1100000, gc: 900000, cc: 1020, b: 36 }, { m: 2200000, w: 2200000, gc: 1800000, cc: 1270, b: 36 },
    { m: 3600000, w: 3600000, gc: 2900000, cc: 1540, b: 36 }, { m: 5700000, w: 5700000, gc: 4600000, cc: 1840, b: 36 },
    { m: 8500000, w: 8500000, gc: 6800000, cc: 2170, b: 36 }, { m: 12000000, w: 12000000, gc: 9600000, cc: 2520, b: 36 },
    { m: 18000000, w: 18000000, gc: 14000000, cc: 2890, b: 36 }, { m: 27000000, w: 24000000, gc: 19000000, cc: 3290, b: 36 },
];
const CC_INT_MOD = [
    { m: 360000, w: 360000, gc: 290000, cc: 350, b: 36 }, { m: 680000, w: 680000, gc: 550000, cc: 510, b: 36 },
    { m: 1300000, w: 1300000, gc: 1000000, cc: 690, b: 36 }, { m: 2400000, w: 2400000, gc: 1900000, cc: 900, b: 36 },
    { m: 3800000, w: 2800000, gc: 3000000, cc: 1130, b: 36 }, { m: 6000000, w: 6000000, gc: 4800000, cc: 1390, b: 36 },
    { m: 9000000, w: 9000000, gc: 7200000, cc: 1680, b: 36 }, { m: 13000000, w: 13000000, gc: 10000000, cc: 1990, b: 36 },
    { m: 18000000, w: 18000000, gc: 14000000, cc: 2320, b: 36 }, { m: 25000000, w: 25000000, gc: 20000000, cc: 2680, b: 36 },
];
const CC_HULL_MOD = [
    { m: 360000, w: 360000, gc: 290000, cc: 350, b: 1600 }, { m: 680000, w: 680000, gc: 550000, cc: 510, b: 1600 },
    { m: 1300000, w: 1300000, gc: 1000000, cc: 690, b: 1600 }, { m: 2400000, w: 2400000, gc: 1900000, cc: 900, b: 1600 },
    { m: 3800000, w: 2800000, gc: 3000000, cc: 1130, b: 1600 }, { m: 6000000, w: 6000000, gc: 4800000, cc: 1390, b: 1600 },
    { m: 9000000, w: 9000000, gc: 7200000, cc: 1680, b: 1600 }, { m: 13000000, w: 13000000, gc: 10000000, cc: 1990, b: 1600 },
    { m: 18000000, w: 18000000, gc: 14000000, cc: 2320, b: 1600 }, { m: 25000000, w: 25000000, gc: 20000000, cc: 2680, b: 1600 },
];
const ASSEMBLY_LINE = [
    { m: 400000, w: 400000, gc: 320000, cc: 400, b: 1.5 }, { m: 790000, w: 790000, gc: 630000, cc: 570, b: 1.5 },
    { m: 1500000, w: 1500000, gc: 1200000, cc: 760, b: 1.5 }, { m: 2500000, w: 2500000, gc: 2000000, cc: 970, b: 1.5 },
    { m: 4100000, w: 4100000, gc: 3300000, cc: 1220, b: 1.5 }, { m: 6300000, w: 6300000, gc: 5000000, cc: 1490, b: 1.5 },
    { m: 9400000, w: 9400000, gc: 7600000, cc: 1780, b: 1.5 }, { m: 14000000, w: 14000000, gc: 11000000, cc: 2100, b: 1.5 },
    { m: 19000000, w: 19000000, gc: 15000000, cc: 2440, b: 1.5 }, { m: 26000000, w: 26000000, gc: 21000000, cc: 2810, b: 1.5 },
];

const TREES = [
    { id: "kw", name: "Kinetic Weapon Mod", bonus: "Base ATK Kinetic", tier: 1, levels: WEAPON_MOD, bUnit: "" },
    { id: "bw", name: "Beam Weapon Mod", bonus: "Base ATK Beam", tier: 1, levels: WEAPON_MOD, bUnit: "" },
    { id: "iw", name: "Ion Weapon Mod", bonus: "Base ATK Ion", tier: 1, levels: WEAPON_MOD, bUnit: "" },

    { id: "ki", name: "Kinetic INT Mod", bonus: "Base INT Kinetic", tier: 2, levels: INT_MOD, bUnit: "" },
    { id: "bi", name: "Beam INT Mod", bonus: "Base INT Beam", tier: 2, levels: INT_MOD, bUnit: "" },
    { id: "ii", name: "Ion INT Mod", bonus: "Base INT Ion", tier: 2, levels: INT_MOD, bUnit: "" },

    {
        id: "aerial", name: "Aerial Combat Optimization", bonus: "Increase Damage of all fleets", tier: 3, levels: [
            { m: 470000, w: 470000, gc: 380000, cc: 350, b: 0.5 }, { m: 920000, w: 920000, gc: 740000, cc: 510, b: 0.5 },
            { m: 1700000, w: 1700000, gc: 1400000, cc: 690, b: 0.5 }, { m: 2800000, w: 2800000, gc: 2200000, cc: 900, b: 0.5 },
            { m: 4500000, w: 4500000, gc: 3600000, cc: 1130, b: 0.5 }, { m: 7000000, w: 7000000, gc: 5600000, cc: 1390, b: 0.5 },
            { m: 10000000, w: 10000000, gc: 8000000, cc: 1680, b: 0.5 }, { m: 15000000, w: 15000000, gc: 12000000, cc: 1990, b: 0.5 },
            { m: 21000000, w: 21000000, gc: 17000000, cc: 2320, b: 0.5 }, { m: 28000000, w: 28000000, gc: 22000000, cc: 2680, b: 0.5 },
        ], bUnit: "%"
    },

    { id: "ka", name: "Kinetic Armor Mod", bonus: "Base DEF Kinetic", tier: 4, levels: ARMOR_MOD, bUnit: "" },
    { id: "ba", name: "Beam Armor Mod", bonus: "Base DEF Beam", tier: 4, levels: ARMOR_MOD, bUnit: "" },
    { id: "ia", name: "Ion Armor Mod", bonus: "Base DEF Ion", tier: 4, levels: ARMOR_MOD, bUnit: "" },

    { id: "kh", name: "Kinetic Hull Mod", bonus: "Base Health Kinetic", tier: 5, levels: HULL_MOD, bUnit: "" },
    { id: "bh", name: "Beam Hull Mod", bonus: "Base Health Beam", tier: 5, levels: HULL_MOD, bUnit: "" },
    { id: "ih", name: "Ion Hull Mod", bonus: "Base Health Ion", tier: 5, levels: HULL_MOD, bUnit: "" },

    {
        id: "density", name: "Armor Density Upgrade", bonus: "All Fleet DMG Reduction", tier: 6, levels: [
            { m: 610000, w: 610000, gc: 490000, cc: 550, b: 0.5 }, { m: 1100000, w: 1100000, gc: 900000, cc: 740, b: 0.5 },
            { m: 2000000, w: 2000000, gc: 1600000, cc: 960, b: 0.5 }, { m: 3400000, w: 3400000, gc: 2700000, cc: 1200, b: 0.5 },
            { m: 5400000, w: 5400000, gc: 4300000, cc: 1470, b: 0.5 }, { m: 8100000, w: 8100000, gc: 6500000, cc: 1760, b: 0.5 },
            { m: 12000000, w: 12000000, gc: 9600000, cc: 2070, b: 0.5 }, { m: 17000000, w: 17000000, gc: 14000000, cc: 2420, b: 0.5 },
            { m: 23000000, w: 23000000, gc: 18000000, cc: 2780, b: 0.5 }, { m: 32000000, w: 32000000, gc: 26000000, cc: 3170, b: 0.5 },
        ], bUnit: "%"
    },

    { id: "ccw", name: "CC Weapon Mod", bonus: "Base ATK all CC", tier: 7, levels: CC_WEAPON_ARMOR, bUnit: "" },
    { id: "cca", name: "CC Armor Mod", bonus: "Base DEF all CC", tier: 7, levels: CC_WEAPON_ARMOR, bUnit: "" },

    { id: "cci", name: "CC INT Mod", bonus: "Base INT all CC", tier: 8, levels: CC_INT_MOD, bUnit: "" },
    { id: "cch", name: "CC Hull Mod", bonus: "Base Health all CC", tier: 8, levels: CC_HULL_MOD, bUnit: "" },

    {
        id: "decision", name: "Decision Networks", bonus: "Command Points", tier: 9, levels: [
            { m: 760000, w: 760000, gc: 610000, cc: 750, b: 1 }, { m: 1400000, w: 1400000, gc: 1100000, cc: 970, b: 1 },
            { m: 2400000, w: 2400000, gc: 1900000, cc: 1210, b: 1 }, { m: 3900000, w: 3900000, gc: 3100000, cc: 1480, b: 1 },
            { m: 6100000, w: 6100000, gc: 4900000, cc: 1770, b: 1 }, { m: 9200000, w: 9200000, gc: 7400000, cc: 2090, b: 1 },
            { m: 13000000, w: 13000000, gc: 10000000, cc: 2430, b: 1 }, { m: 19000000, w: 19000000, gc: 15000000, cc: 2800, b: 1 },
            { m: 26000000, w: 26000000, gc: 21000000, cc: 3190, b: 1 }, { m: 35000000, w: 35000000, gc: 28000000, cc: 3610, b: 1 },
        ], bUnit: ""
    },

    { id: "alk", name: "Assembly Line — Kinetic", bonus: "Manufacturing Speed", tier: 10, levels: ASSEMBLY_LINE, bUnit: "%" },
    { id: "alb", name: "Assembly Line — Beam", bonus: "Manufacturing Speed", tier: 10, levels: ASSEMBLY_LINE, bUnit: "%" },
    { id: "ali", name: "Assembly Line — Ion", bonus: "Manufacturing Speed", tier: 10, levels: ASSEMBLY_LINE, bUnit: "%" },

    {
        id: "warframe", name: "Warframe", bonus: "Unlock T7 Kinetic", tier: 11, isGate: true, levels: [
            { m: 43000000, w: 43000000, gc: 34000000, cc: 10000, b: 0 }
        ], bUnit: ""
    },
    {
        id: "justicar", name: "Justicar", bonus: "Unlock T7 Beam", tier: 11, isGate: true, levels: [
            { m: 43000000, w: 43000000, gc: 34000000, cc: 10000, b: 0 }
        ], bUnit: ""
    },
    {
        id: "hermit", name: "Hermit", bonus: "Unlock T7 Ion", tier: 11, isGate: true, levels: [
            { m: 43000000, w: 43000000, gc: 34000000, cc: 10000, b: 0 }
        ], bUnit: ""
    },
];

const TIER_LABELS = {
    1: "Tier 1: Weapon ATK", 2: "Tier 2: Weapon INT", 3: "Tier 3: Fleet Damage",
    4: "Tier 4: Armor DEF", 5: "Tier 5: Hull Health",
    6: "Tier 6: Fleet Reduction", 7: "Tier 7: All CC ATK/DEF", 8: "Tier 8: All CC INT/Health",
    9: "Tier 9: Command", 10: "Tier 10: Assembly Lines", 11: "Tier 11: T7 Unlock",
};

const fmt = (n) => n.toLocaleString("en-US");

const RES_COLORS = { m: "#b0b8c8", w: "#5b9bd5", gc: "#C9A84C", cc: "#a78bfa" };
const RES_LABELS = { m: "Metal", w: "Water", gc: "Galactic Coins", cc: "Cosmic Coins" };

function TreeCard({ tree, currentLevel, onChange }) {
    const [open, setOpen] = useState(false);
    const maxLvl = tree.levels.length;
    const remaining = tree.levels.slice(currentLevel).reduce(
        (a, l) => ({ m: a.m + l.m, w: a.w + l.w, gc: a.gc + l.gc, cc: a.cc + l.cc }),
        { m: 0, w: 0, gc: 0, cc: 0 }
    );
    const currentBonus = tree.levels.slice(0, currentLevel).reduce((s, l) => s + l.b, 0);
    const pct = (currentLevel / maxLvl) * 100;
    const done = currentLevel === maxLvl;

    return (
        <div style={{
            background: done
                ? "linear-gradient(135deg, rgba(40,180,99,0.12), rgba(30,60,40,0.25))"
                : V.bgElev,
            border: `1px solid ${done ? "rgba(40,180,99,0.4)" : tree.isGate ? "rgba(255,190,60,0.5)" : "rgba(201,168,76,0.25)"}`,
            borderRadius: 2, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10,
            position: "relative", overflow: "hidden", minWidth: 0, minHeight: 180,
            gridColumn: open ? "1 / -1" : "auto",
        }}>
            <div style={{
                position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%",
                background: tree.isGate ? "radial-gradient(circle,rgba(255,190,60,0.08),transparent 70%)" : `radial-gradient(circle, ${V.gold}20, transparent 70%)`,
                pointerEvents: "none"
            }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div style={{ minHeight: 48, display: "flex", flexDirection: "column" }}>
                    <div style={{
                        fontFamily: "'Rajdhani', sans-serif", fontSize: 16, fontWeight: 700,
                        color: "#FFFFFF", letterSpacing: 0.5, lineHeight: 1.2, textTransform: "uppercase"
                    }}>
                        {tree.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#FFFFFF", marginTop: "auto", lineHeight: 1.2, fontFamily: "'Rajdhani', sans-serif" }}>
                        {tree.bonus}
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: done ? "#28b463" : V.txSec, whiteSpace: "nowrap" }}>
                        {currentLevel}/{maxLvl}
                    </div>
                </div>
            </div>

            <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <div style={{
                    height: "100%", width: `${pct}%`, borderRadius: 2, transition: "width 0.4s ease",
                    background: done ? "linear-gradient(90deg,#28b463,#2ecc71)" : tree.isGate ? "linear-gradient(90deg,#e6a817,#ffbe3c)" : `linear-gradient(90deg, ${V.goldDim}, ${V.gold})`
                }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 4 }}>
                <label style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, color: "#FFFFFF", flexShrink: 0, textTransform: "uppercase", width: 45 }}>Level</label>
                <input type="range" min={0} max={maxLvl} value={currentLevel}
                    onChange={(e) => onChange(tree.id, parseInt(e.target.value))}
                    style={{ flex: 1, accentColor: tree.isGate ? "#ffbe3c" : V.gold, height: 3, maxWidth: "calc(100% - 50px)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px", marginTop: 8 }}>
                {[["m", "Metal"], ["w", "Water"], ["gc", "Galactic Coins"], ["cc", "Cosmic Comp."]].map(([k, label]) => (
                    <div key={k}>
                        <div style={{ fontFamily: "'Orbitron'", fontSize: 9, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace", fontSize: 14, fontWeight: 600,
                            color: done ? "#FFFFFF" : RES_COLORS[k], marginTop: 2
                        }}>
                            {fmt(remaining[k])}
                        </div>
                    </div>
                ))}
                {!tree.isGate && (
                    <div>
                        <div style={{ fontFamily: "'Orbitron'", fontSize: 9, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: 1 }}>Bonus</div>
                        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 14, fontWeight: 600, color: "#2ecc71", marginTop: 2 }}>
                            +{Number.isInteger(currentBonus) ? currentBonus : currentBonus.toFixed(1)}{tree.bUnit}
                        </div>
                    </div>
                )}
            </div>

            <div style={{ flex: 1 }} />
            <div style={{ alignSelf: "flex-end", width: "100%", marginTop: "auto" }}>
                <LevelDetails tree={tree} currentLevel={currentLevel} open={open} setOpen={setOpen} />
            </div>
        </div>
    );
}

function LevelDetails({ tree, currentLevel, open, setOpen }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <button onClick={() => setOpen(!open)} style={{
                background: "rgba(0,0,0,0.2)", border: `1px solid ${V.border}`, borderRadius: 2,
                color: V.txSec, fontSize: 10, cursor: "pointer", padding: "4px 8px",
                textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Rajdhani', sans-serif",
                width: "100%", textAlign: "center", marginTop: 12, transition: "all 0.2s"
            }}>
                {open ? "HAIL" : "DETAILS"}
            </button>
            {open && (
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 2 }}>
                    {tree.levels.map((l, i) => {
                        const isDone = i < currentLevel;
                        const next = i === currentLevel;
                        return (
                            <div key={i} style={{
                                display: "flex", gap: 6, fontSize: 11, padding: "4px 6px", borderRadius: 2, alignItems: "center",
                                background: next ? "rgba(201,168,76,0.1)" : isDone ? "rgba(0,0,0,0.2)" : "transparent",
                                color: isDone ? "#FFFFFF" : V.txPri,
                                textDecoration: isDone ? "line-through" : "none",
                                fontFamily: "'Share Tech Mono', monospace"
                            }}>
                                <span style={{ width: 20, flexShrink: 0, fontWeight: next ? 700 : 400, color: next ? "#FFFFFF" : "inherit" }}>
                                    {next ? "▶" : ""} {i + 1}
                                </span>
                                <span style={{ flex: 1, textAlign: "right", color: isDone ? "#FFFFFF" : RES_COLORS.m }}>{fmt(l.m)}</span>
                                <span style={{ flex: 1, textAlign: "right", color: isDone ? "#FFFFFF" : RES_COLORS.w }}>{fmt(l.w)}</span>
                                <span style={{ flex: 1.2, textAlign: "right", color: isDone ? "#FFFFFF" : RES_COLORS.gc }}>{fmt(l.gc)}</span>
                                <span style={{ flex: 0.8, textAlign: "right", color: isDone ? "#FFFFFF" : (l.cc === 0 ? "#FFFFFF" : RES_COLORS.cc) }}>{l.cc === 0 ? "—" : fmt(l.cc)}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function CombatCraftCalculator() {
    const { currentUser } = useAuth();
    const [levels, setLevels] = useState(() => {
        const init = {};
        TREES.forEach((t) => (init[t.id] = 0));
        return init;
    });
    const [inventory, setInventory] = useState({ m: 0, w: 0, gc: 0, cc: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from Firebase
    useEffect(() => {
        const loadData = async () => {
            if (currentUser) {
                const data = await loadUserToolData(currentUser.uid, 'combatCraft');
                if (data) {
                    if (data.levels) setLevels(data.levels);
                    if (data.inventory) setInventory(data.inventory);
                }
            } else {
                // Reset to default on logout
                const init = {};
                TREES.forEach((t) => (init[t.id] = 0));
                setLevels(init);
                setInventory({ m: 0, w: 0, gc: 0, cc: 0 });
            }
            setIsLoaded(true);
        };
        loadData();
    }, [currentUser]);

    // Save data to Firebase (debounced)
    useEffect(() => {
        if (!isLoaded || !currentUser) return;

        const timeoutId = setTimeout(() => {
            saveUserToolData(currentUser.uid, 'combatCraft', {
                levels,
                inventory
            });
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [levels, inventory, currentUser, isLoaded]);

    const setLevel = (id, val) => setLevels((p) => ({ ...p, [id]: val }));

    const totals = useMemo(() => {
        let tM = 0, tW = 0, tGC = 0, tCC = 0, sM = 0, sW = 0, sGC = 0, sCC = 0;
        TREES.forEach((t) => {
            t.levels.forEach((l, i) => {
                tM += l.m; tW += l.w; tGC += l.gc; tCC += l.cc;
                if (i < levels[t.id]) { sM += l.m; sW += l.w; sGC += l.gc; sCC += l.cc; }
            });
        });
        return { remainM: tM - sM, remainW: tW - sW, remainGC: tGC - sGC, remainCC: tCC - sCC };
    }, [levels]);

    const surplus = {
        m: inventory.m - totals.remainM,
        w: inventory.w - totals.remainW,
        gc: inventory.gc - totals.remainGC,
        cc: inventory.cc - totals.remainCC,
    };

    const tiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const resetAll = () => { const n = {}; TREES.forEach(t => n[t.id] = 0); setLevels(n); };

    const InvInput = ({ rKey, label }) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 calc(50% - 12px)" }}>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, color: V.txSec, textTransform: "uppercase", width: 140 }}>{label}</span>
            <input type="text" value={inventory[rKey].toLocaleString("en-US")}
                onChange={(e) => { const v = parseInt(e.target.value.replace(/\D/g, "")) || 0; setInventory(p => ({ ...p, [rKey]: v })); }}
                style={{
                    flex: 1, background: "rgba(0,0,0,0.4)", border: `1px solid ${RES_COLORS[rKey]}50`, borderRadius: 2,
                    padding: "6px 12px", color: RES_COLORS[rKey], fontFamily: "'Share Tech Mono', monospace", fontSize: 16,
                    fontWeight: 600, width: "100%", textAlign: "right", outline: "none"
                }} />
        </div>
    );

    const SummaryItem = ({ label, remain, surp, color }) => {
        const missing = Math.max(0, -surp);
        return (
            <div style={{ minWidth: 140 }}>
                <Label>{label} Missing</Label>
                <div style={{
                    fontFamily: "'Share Tech Mono', monospace", fontSize: 24, fontWeight: 700,
                    color: missing > 0 ? "#e74c3c" : "#2ecc71"
                }}>
                    {fmt(missing)}
                </div>
            </div>
        );
    };

    return (
        <div style={{ animation: "fadeUp 0.8s ease-out" }}>
            <Card>
                <SectionTitle>Combat Craft Tech Progress</SectionTitle>

                {/* Inventory */}
                <div style={{
                    background: "rgba(0,0,0,0.2)", border: `1px solid ${V.border}`,
                    borderRadius: 2, padding: "16px 20px", marginBottom: 24
                }}>
                    <Label>Current Inventory</Label>
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
                        <InvInput rKey="m" label="Metal" />
                        <InvInput rKey="w" label="Water" />
                        <InvInput rKey="gc" label="Galactic Coins" />
                        <InvInput rKey="cc" label="Cosmic Comp." />
                    </div>
                </div>

                {/* Summary */}
                <div style={{
                    background: "rgba(0,0,0,0.2)", border: `1px solid ${V.border}`,
                    borderRadius: 2, padding: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                    gap: 20, alignItems: "end"
                }}>

                    <SummaryItem label="Metal" remain={totals.remainM} surp={surplus.m} color={RES_COLORS.m} />
                    <SummaryItem label="Water" remain={totals.remainW} surp={surplus.w} color={RES_COLORS.w} />
                    <SummaryItem label="Galactic Coins" remain={totals.remainGC} surp={surplus.gc} color={RES_COLORS.gc} />
                    <SummaryItem label="Cosmic Comp." remain={totals.remainCC} surp={surplus.cc} color={RES_COLORS.cc} />

                    <div style={{ display: "flex", gap: 10, flexDirection: "column", justifySelf: "flex-end" }}>
                        <button onClick={resetAll} style={{
                            background: "rgba(0,0,0,0.3)", border: `1px solid ${V.border}`, borderRadius: 2,
                            padding: "8px 14px", color: "#FFFFFF", fontSize: 12, cursor: "pointer",
                            fontFamily: "'Rajdhani', sans-serif", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600
                        }}>Reset</button>
                    </div>
            </Card>

            {/* Trees */}
            {tiers.map((tier) => {
                const treesInTier = TREES.filter((t) => t.tier === tier);
                if (!treesInTier.length) return null;
                const cols = treesInTier.length === 1 ? "1fr" : treesInTier.length === 2 ? "1fr 1fr" : "1fr 1fr 1fr";
                return (
                    <div key={tier} style={{ marginBottom: 32 }}>
                        <div style={{
                            fontFamily: "'Orbitron', sans-serif", fontSize: 12, fontWeight: 700, color: "#FFFFFF",
                            letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, paddingLeft: 4, display: "flex", alignItems: "center", gap: 12
                        }}>
                            {TIER_LABELS[tier] || `Tier ${tier}`}
                            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${V.border}, transparent)` }} />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 16, alignItems: "start" }}>
                            {treesInTier.map((tree) => (
                                <TreeCard key={tree.id} tree={tree} currentLevel={levels[tree.id]} onChange={setLevel} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
