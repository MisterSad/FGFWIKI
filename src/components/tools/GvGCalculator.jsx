import React, { useState, useMemo, useEffect } from "react";
import { V, Card, SectionTitle, Label } from './ToolUI';
import { useAuth } from '../../context/AuthContext';
import { saveUserToolData, loadUserToolData } from '../../firebaseUtils';

const TIER1_LEVELS = [
  { gc: 80000, cc: 50, bonus: 10 }, { gc: 110000, cc: 50, bonus: 10 }, { gc: 150000, cc: 100, bonus: 10 },
  { gc: 200000, cc: 100, bonus: 10 }, { gc: 250000, cc: 200, bonus: 10 }, { gc: 320000, cc: 200, bonus: 10 },
  { gc: 400000, cc: 300, bonus: 10 }, { gc: 490000, cc: 300, bonus: 10 }, { gc: 600000, cc: 450, bonus: 10 },
  { gc: 730000, cc: 500, bonus: 10 },
];

const TIER6_LEVELS = [
  { gc: 720000, cc: 100, bonus: 2 }, { gc: 850000, cc: 100, bonus: 2 }, { gc: 1000000, cc: 200, bonus: 2 },
  { gc: 1150000, cc: 200, bonus: 2 }, { gc: 1350000, cc: 300, bonus: 2 }, { gc: 1600000, cc: 300, bonus: 2 },
  { gc: 1900000, cc: 450, bonus: 2 }, { gc: 2200000, cc: 450, bonus: 2 }, { gc: 2500000, cc: 600, bonus: 2 },
  { gc: 2800000, cc: 600, bonus: 2 },
];

const TREES = [
  // --- Tier 1 ---
  {
    id: "speedup", name: "Speed-Up Boost", bonus: "Increases points for speedups", tier: 1, position: "left",
    levels: TIER1_LEVELS,
  },
  {
    id: "virtuous", name: "Virtuous Trader", bonus: "Increase points for Commissions", tier: 1, position: "center",
    levels: TIER1_LEVELS,
  },
  {
    id: "evil", name: "Evil's Bane", bonus: "Increases points for PvE Day", tier: 1, position: "right",
    levels: TIER1_LEVELS,
  },
  // --- Glory Ascension I ---
  {
    id: "glory1", name: "Glory Ascension I", bonus: "Unlocks chests 4–6", tier: 1.5, position: "center",
    levels: [{ gc: 1200000, cc: 500, bonus: 0 }], isGate: true,
  },
  // --- Tier 2 ---
  {
    id: "elite", name: "Elite Training", bonus: "Increases points for Power Crystals", tier: 2, position: "left",
    levels: [
      { gc: 200000, cc: 50, bonus: 10 }, { gc: 260000, cc: 50, bonus: 10 }, { gc: 330000, cc: 100, bonus: 10 },
      { gc: 410000, cc: 100, bonus: 10 }, { gc: 500000, cc: 200, bonus: 10 }, { gc: 610000, cc: 200, bonus: 10 },
      { gc: 740000, cc: 300, bonus: 10 }, { gc: 880000, cc: 300, bonus: 10 }, { gc: 1000000, cc: 450, bonus: 10 },
      { gc: 1200000, cc: 450, bonus: 10 },
    ],
  },
  {
    id: "flagship", name: "Star Flagship", bonus: "Increase points by FS BPs", tier: 2, position: "right",
    levels: [
      { gc: 80000, cc: 50, bonus: 10 }, { gc: 260000, cc: 50, bonus: 10 }, { gc: 330000, cc: 100, bonus: 10 },
      { gc: 410000, cc: 100, bonus: 10 }, { gc: 500000, cc: 200, bonus: 10 }, { gc: 610000, cc: 200, bonus: 10 },
      { gc: 740000, cc: 300, bonus: 10 }, { gc: 880000, cc: 300, bonus: 10 }, { gc: 1000000, cc: 450, bonus: 10 },
      { gc: 1200000, cc: 450, bonus: 10 },
    ],
  },
  {
    id: "welldev", name: "Well Developed", bonus: "Increase Champion Power", tier: 3, position: "left",
    levels: [
      { gc: 80000, cc: 50, bonus: 10 }, { gc: 260000, cc: 50, bonus: 10 }, { gc: 330000, cc: 100, bonus: 10 },
      { gc: 410000, cc: 100, bonus: 10 }, { gc: 500000, cc: 200, bonus: 10 }, { gc: 610000, cc: 200, bonus: 10 },
      { gc: 740000, cc: 300, bonus: 10 }, { gc: 880000, cc: 300, bonus: 10 }, { gc: 1000000, cc: 450, bonus: 10 },
      { gc: 1200000, cc: 500, bonus: 10 },
    ],
  },
  {
    id: "warready", name: "War Readiness", bonus: "Increase FS & Component Pwr", tier: 3, position: "right",
    levels: [
      { gc: 80000, cc: 50, bonus: 10 }, { gc: 260000, cc: 50, bonus: 10 }, { gc: 330000, cc: 100, bonus: 10 },
      { gc: 410000, cc: 100, bonus: 10 }, { gc: 500000, cc: 200, bonus: 10 }, { gc: 610000, cc: 200, bonus: 10 },
      { gc: 740000, cc: 300, bonus: 10 }, { gc: 880000, cc: 300, bonus: 10 }, { gc: 1000000, cc: 450, bonus: 10 },
      { gc: 1200000, cc: 500, bonus: 10 },
    ],
  },
  // --- Mobilization Expert ---
  {
    id: "mobil", name: "Mobilization Expert", bonus: "Increase all points", tier: 4, position: "center",
    levels: [
      { gc: 320000, cc: 50, bonus: 5 }, { gc: 400000, cc: 50, bonus: 5 }, { gc: 490000, cc: 100, bonus: 5 },
      { gc: 600000, cc: 100, bonus: 5 }, { gc: 730000, cc: 200, bonus: 5 }, { gc: 870000, cc: 200, bonus: 5 },
      { gc: 1000000, cc: 300, bonus: 5 }, { gc: 1150000, cc: 300, bonus: 5 }, { gc: 1350000, cc: 400, bonus: 5 },
      { gc: 1600000, cc: 400, bonus: 5 }, { gc: 1900000, cc: 500, bonus: 5 }, { gc: 2200000, cc: 600, bonus: 5 },
      { gc: 2500000, cc: 750, bonus: 5 }, { gc: 3200000, cc: 900, bonus: 5 }, { gc: 3600000, cc: 900, bonus: 5 },
      { gc: 3600000, cc: 1050, bonus: 5 }, { gc: 4000000, cc: 1050, bonus: 5 }, { gc: 4500000, cc: 1200, bonus: 5 },
      { gc: 5000000, cc: 1200, bonus: 5 }, { gc: 5600000, cc: 1500, bonus: 5 },
    ],
  },
  // --- Tier 5 ---
  {
    id: "honor", name: "Tremendous Honor", bonus: "Obtain Glory", tier: 5, position: "left",
    levels: [
      { gc: 320000, cc: 50, bonus: 10 }, { gc: 400000, cc: 50, bonus: 10 }, { gc: 490000, cc: 100, bonus: 10 },
      { gc: 600000, cc: 100, bonus: 10 }, { gc: 730000, cc: 200, bonus: 10 }, { gc: 870000, cc: 200, bonus: 10 },
      { gc: 1000000, cc: 300, bonus: 10 }, { gc: 1150000, cc: 300, bonus: 10 }, { gc: 1300000, cc: 450, bonus: 10 },
      { gc: 1500000, cc: 500, bonus: 10 },
    ],
  },
  {
    id: "combat", name: "Combat Craft Hunter", bonus: "Destroy Combat Crafts", tier: 5, position: "right",
    levels: [
      { gc: 320000, cc: 50, bonus: 10 }, { gc: 400000, cc: 50, bonus: 10 }, { gc: 490000, cc: 100, bonus: 10 },
      { gc: 600000, cc: 100, bonus: 10 }, { gc: 730000, cc: 200, bonus: 10 }, { gc: 870000, cc: 200, bonus: 10 },
      { gc: 1000000, cc: 300, bonus: 10 }, { gc: 1150000, cc: 300, bonus: 10 }, { gc: 1300000, cc: 450, bonus: 10 },
      { gc: 1500000, cc: 500, bonus: 10 },
    ],
  },
  // --- Glory Ascension II ---
  {
    id: "glory2", name: "Glory Ascension II", bonus: "Unlocks chests 7–9", tier: 5.5, position: "center",
    levels: [{ gc: 4000000, cc: 2000, bonus: 0 }], isGate: true,
  },
  // --- Tier 6 (Combat) ---
  {
    id: "lockon", name: "Lock-On Missiles", bonus: "Increase Major Damage", tier: 6, position: "left",
    levels: TIER6_LEVELS,
  },
  {
    id: "caliber", name: "5M Caliber", bonus: "Increase Damage", tier: 6, position: "center",
    levels: TIER6_LEVELS,
  },
  {
    id: "intercept", name: "Auto Interceptor", bonus: "Reduce Major Damage", tier: 6, position: "right",
    levels: TIER6_LEVELS,
  },
];

const TIER_LABELS = {
  1: "Tier 1 — Scoring",
  1.5: "Gate",
  2: "Tier 2 — Scoring",
  3: "Tier 3 — Power",
  4: "Mobilization",
  5: "Tier 5 — PvP",
  5.5: "Gate",
  6: "Tier 6 — Combat",
};

const fmt = (n) => n.toLocaleString("en-US");

function TreeCard({ tree, currentLevel, onChange }) {
  const [open, setOpen] = useState(false);
  const maxLvl = tree.levels.length;

  const remaining = tree.levels.slice(currentLevel).reduce(
    (acc, l) => ({ gc: acc.gc + l.gc, cc: acc.cc + l.cc }),
    { gc: 0, cc: 0 }
  );

  const currentBonus = tree.levels
    .slice(0, currentLevel)
    .reduce((s, l) => s + l.bonus, 0);

  const pct = (currentLevel / maxLvl) * 100;
  const done = currentLevel === maxLvl;

  return (
    <div
      style={{
        background: done
          ? "linear-gradient(135deg, rgba(40,180,99,0.12), rgba(30,60,40,0.25))"
          : V.bgElev,
        border: `1px solid ${done ? "rgba(40,180,99,0.4)" : tree.isGate ? "rgba(255,190,60,0.5)" : "rgba(201,168,76,0.25)"}`,
        borderRadius: 2,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        overflow: "hidden",
        minWidth: 0,
        minHeight: 180,
        gridColumn: open ? "1 / -1" : "auto",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: tree.isGate
            ? "radial-gradient(circle, rgba(255,190,60,0.08), transparent 70%)"
            : `radial-gradient(circle, ${V.gold}20, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ minHeight: 48, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: 0.5,
              lineHeight: 1.2,
              textTransform: "uppercase"
            }}
          >
            {tree.name}
          </div>
          <div style={{ fontSize: 11, color: "#FFFFFF", marginTop: "auto", lineHeight: 1.2, fontFamily: "'Rajdhani', sans-serif" }}>
            {tree.bonus}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 12,
              color: done ? "#28b463" : V.txSec,
              whiteSpace: "nowrap",
            }}
          >
            {currentLevel}/{maxLvl}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 3,
          borderRadius: 2,
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 2,
            background: done
              ? "linear-gradient(90deg, #28b463, #2ecc71)"
              : tree.isGate
                ? "linear-gradient(90deg, #e6a817, #ffbe3c)"
                : `linear-gradient(90deg, ${V.goldDim}, ${V.gold})`,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Level selector */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 4 }}>
        <label style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, color: "#FFFFFF", flexShrink: 0, textTransform: "uppercase", width: 45 }}>Level</label>
        <input
          type="range"
          min={0}
          max={maxLvl}
          value={currentLevel}
          onChange={(e) => onChange(tree.id, parseInt(e.target.value))}
          style={{
            flex: 1,
            accentColor: tree.isGate ? "#ffbe3c" : V.gold,
            height: 3,
            maxWidth: "calc(100% - 50px)"
          }}
        />
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
        <Stat label="Galactic Coins" value={fmt(remaining.gc)} color="#C9A84C" dimmed={done} />
        <Stat label="Computational Component" value={fmt(remaining.cc)} color="#a78bfa" dimmed={done} />
        {!tree.isGate && (
          <Stat label="Bonus" value={`+${currentBonus}%`} color="#2ecc71" dimmed={false} />
        )}
      </div>

      {/* Level detail (collapsible) */}
      <div style={{ flex: 1 }} />
      <div style={{ alignSelf: "flex-end", width: "100%", marginTop: "auto" }}>
        <LevelDetails tree={tree} currentLevel={currentLevel} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

function Stat({ label, value, color, dimmed }) {
  return (
    <div style={{ minWidth: 60 }}>
      <div style={{ fontFamily: "'Orbitron'", fontSize: 9, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: 1 }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 14,
          fontWeight: 600,
          color: dimmed ? "#FFFFFF" : color,
          marginTop: 2,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function LevelDetails({ tree, currentLevel, open, setOpen }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "rgba(0,0,0,0.2)",
          border: `1px solid ${V.border}`,
          borderRadius: 2,
          color: V.txSec,
          fontSize: 10,
          cursor: "pointer",
          padding: "4px 8px",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontFamily: "'Rajdhani', sans-serif",
          width: "100%",
          textAlign: "center",
          marginTop: 12,
          transition: "all 0.2s"
        }}
      >
        {open ? "HAIL" : "DETAILS"}
      </button>
      {open && (
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 2 }}>
          {tree.levels.map((l, i) => {
            const done = i < currentLevel;
            const next = i === currentLevel;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  fontSize: 11,
                  padding: "4px 6px",
                  borderRadius: 2,
                  background: next
                    ? "rgba(201,168,76,0.1)"
                    : done
                      ? "rgba(0,0,0,0.2)"
                      : "transparent",
                  color: done ? "#FFFFFF" : V.txPri,
                  textDecoration: done ? "line-through" : "none",
                  alignItems: "center",
                  fontFamily: "'Share Tech Mono', monospace",
                }}
              >
                <span style={{ width: 20, flexShrink: 0, fontWeight: next ? 700 : 400, color: next ? "#FFFFFF" : "inherit" }}>
                  {next ? "▶" : ""} {i + 1}
                </span>
                <span style={{ flex: 1.5, textAlign: "right", color: done ? "#FFFFFF" : "#C9A84C" }}>
                  {fmt(l.gc)}
                </span>
                <span style={{ flex: 1, textAlign: "right", color: done ? "#FFFFFF" : (l.cc === 0 ? "#FFFFFF" : "#a78bfa") }}>
                  {l.cc === 0 ? "—" : fmt(l.cc)}
                </span>
                <span style={{ color: done ? "#FFFFFF" : "#2ecc71", flexShrink: 0, marginLeft: "auto", minWidth: 35, textAlign: "right" }}>
                  {l.bonus > 0 ? `+${l.bonus}%` : ""}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function GvGCalculator() {
  const { currentUser } = useAuth();
  const [levels, setLevels] = useState(() => {
    const init = {};
    TREES.forEach((t) => (init[t.id] = 0));
    return init;
  });

  const [inventory, setInventory] = useState({ gc: 0, cc: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from Firebase
  useEffect(() => {
    const loadData = async () => {
      if (currentUser) {
        const data = await loadUserToolData(currentUser.uid, 'gvg');
        if (data) {
          if (data.levels) setLevels(data.levels);
          if (data.inventory) setInventory(data.inventory);
        }
      } else {
        // Reset to default on logout
        const init = {};
        TREES.forEach((t) => (init[t.id] = 0));
        setLevels(init);
        setInventory({ gc: 0, cc: 0 });
      }
      setIsLoaded(true);
    };
    loadData();
  }, [currentUser]);

  // Save data to Firebase (debounced)
  useEffect(() => {
    if (!isLoaded || !currentUser) return;

    const timeoutId = setTimeout(() => {
      saveUserToolData(currentUser.uid, 'gvg', {
        levels,
        inventory
      });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [levels, inventory, currentUser, isLoaded]);

  const setLevel = (id, val) => setLevels((prev) => ({ ...prev, [id]: val }));

  const totals = useMemo(() => {
    let totalGC = 0, totalCC = 0, spentGC = 0, spentCC = 0;
    TREES.forEach((t) => {
      t.levels.forEach((l, i) => {
        totalGC += l.gc;
        totalCC += l.cc;
        if (i < levels[t.id]) {
          spentGC += l.gc;
          spentCC += l.cc;
        }
      });
    });
    return {
      totalGC, totalCC,
      remainGC: totalGC - spentGC,
      remainCC: totalCC - spentCC,
      spentGC, spentCC,
    };
  }, [levels]);

  const tiers = [1, 1.5, 2, 3, 4, 5, 5.5, 6];

  const setAllMax = () => {
    const n = {};
    TREES.forEach((t) => (n[t.id] = t.levels.length));
    setLevels(n);
  };
  const resetAll = () => {
    const n = {};
    TREES.forEach((t) => (n[t.id] = 0));
    setLevels(n);
  };

  const surplusGC = inventory.gc - totals.remainGC;
  const surplusCC = inventory.cc - totals.remainCC;

  return (
    <div style={{ animation: "fadeUp 0.8s ease-out" }}>
      <Card>
        <SectionTitle>GvG Tech Progress</SectionTitle>

        {/* Inventory */}
        <div
          style={{
            background: "rgba(0,0,0,0.2)",
            border: `1px solid ${V.border}`,
            borderRadius: 2,
            padding: "16px 20px",
            marginBottom: 24,
          }}
        >
          <Label>Current Inventory</Label>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, color: V.txSec, textTransform: "uppercase" }}>Galactic Coins</span>
              <input
                type="text"
                value={inventory.gc.toLocaleString("en-US")}
                onChange={(e) => {
                  const v = parseInt(e.target.value.replace(/\D/g, "")) || 0;
                  setInventory((p) => ({ ...p, gc: v }));
                }}
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: `1px solid rgba(201,168,76,0.3)`,
                  borderRadius: 2,
                  padding: "6px 12px",
                  color: "#C9A84C",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 16,
                  fontWeight: 600,
                  width: 140,
                  textAlign: "right",
                  outline: "none"
                }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 14, color: V.txSec, textTransform: "uppercase" }}>Computational Component</span>
              <input
                type="text"
                value={inventory.cc.toLocaleString("en-US")}
                onChange={(e) => {
                  const v = parseInt(e.target.value.replace(/\D/g, "")) || 0;
                  setInventory((p) => ({ ...p, cc: v }));
                }}
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: `1px solid rgba(167,139,250,0.3)`,
                  borderRadius: 2,
                  padding: "6px 12px",
                  color: "#a78bfa",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 16,
                  fontWeight: 600,
                  width: 100,
                  textAlign: "right",
                  outline: "none"
                }}
              />
            </div>
          </div>
        </div>

        {/* Summary bar */}
        <div
          style={{
            background: "rgba(0,0,0,0.2)",
            border: `1px solid ${V.border}`,
            borderRadius: 2,
            padding: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 20,
            alignItems: "end",
          }}
        >
          <div>
            <Label>Galactic Coins Total Cost</Label>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 20, fontWeight: 700, color: "#C9A84C" }}>
              {fmt(totals.remainGC)}
            </div>
          </div>
          <div>
            <Label>Computational Component Total Cost</Label>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 20, fontWeight: 700, color: "#a78bfa" }}>
              {fmt(totals.remainCC)}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Orbitron'", fontSize: 9, letterSpacing: 3, color: "#FFFFFF", display: "block", marginBottom: 6, marginTop: 12, textTransform: "uppercase" }}>
              Galactic Coins Missing
            </div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 20,
                fontWeight: 700,
                color: surplusGC < 0 ? "#e74c3c" : "#2ecc71",
              }}
            >
              {fmt(Math.max(0, -surplusGC))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Orbitron'", fontSize: 9, letterSpacing: 3, color: "#FFFFFF", display: "block", marginBottom: 6, marginTop: 12, textTransform: "uppercase" }}>
              Computational Component Missing
            </div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 20,
                fontWeight: 700,
                color: surplusCC < 0 ? "#e74c3c" : "#2ecc71",
              }}
            >
              {fmt(Math.max(0, -surplusCC))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
            <button
              onClick={setAllMax}
              style={{
                background: "rgba(46,204,113,0.1)",
                border: "1px solid rgba(46,204,113,0.3)",
                borderRadius: 2,
                padding: "8px 14px",
                color: "#2ecc71",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "'Rajdhani', sans-serif",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 600
              }}
            >
              Max All
            </button>
            <button
              onClick={resetAll}
              style={{
                background: "rgba(0,0,0,0.3)",
                border: `1px solid ${V.border}`,
                borderRadius: 2,
                padding: "8px 14px",
                color: "#FFFFFF",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "'Rajdhani', sans-serif",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 600
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </Card>

      {/* Trees by tier */}
      {tiers.map((tier) => {
        const treesInTier = TREES.filter((t) => t.tier === tier);
        if (treesInTier.length === 0) return null;
        return (
          <div key={tier} style={{ marginBottom: 32 }}>
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 16,
                paddingLeft: 4,
                display: "flex",
                alignItems: "center",
                gap: 12
              }}
            >
              {TIER_LABELS[tier] || `Tier ${tier}`}
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${V.border}, transparent)` }} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${treesInTier.length}, 1fr)`,
                gap: 16,
                alignItems: "start",
              }}
            >
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
