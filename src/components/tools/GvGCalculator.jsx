import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from 'react-i18next';
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
    id: "speedup", nameKey: "gvg.speedup_name", bonusKey: "gvg.speedup_bonus", tier: 1, position: "left",
    levels: TIER1_LEVELS,
  },
  {
    id: "virtuous", nameKey: "gvg.virtuous_name", bonusKey: "gvg.virtuous_bonus", tier: 1, position: "center",
    levels: TIER1_LEVELS,
  },
  {
    id: "evil", nameKey: "gvg.evil_name", bonusKey: "gvg.evil_bonus", tier: 1, position: "right",
    levels: TIER1_LEVELS,
  },
  // --- Glory Ascension I ---
  {
    id: "glory1", nameKey: "gvg.glory1_name", bonusKey: "gvg.glory1_bonus", tier: 1.5, position: "center",
    levels: [{ gc: 1200000, cc: 500, bonus: 0 }], isGate: true,
  },
  // --- Tier 2 ---
  {
    id: "elite", nameKey: "gvg.elite_name", bonusKey: "gvg.elite_bonus", tier: 2, position: "left",
    levels: [
      { gc: 200000, cc: 50, bonus: 10 }, { gc: 260000, cc: 50, bonus: 10 }, { gc: 330000, cc: 100, bonus: 10 },
      { gc: 410000, cc: 100, bonus: 10 }, { gc: 500000, cc: 200, bonus: 10 }, { gc: 610000, cc: 200, bonus: 10 },
      { gc: 740000, cc: 300, bonus: 10 }, { gc: 880000, cc: 300, bonus: 10 }, { gc: 1000000, cc: 450, bonus: 10 },
      { gc: 1200000, cc: 450, bonus: 10 },
    ],
  },
  {
    id: "flagship", nameKey: "gvg.flagship_name", bonusKey: "gvg.flagship_bonus", tier: 2, position: "right",
    levels: [
      { gc: 80000, cc: 50, bonus: 10 }, { gc: 260000, cc: 50, bonus: 10 }, { gc: 330000, cc: 100, bonus: 10 },
      { gc: 410000, cc: 100, bonus: 10 }, { gc: 500000, cc: 200, bonus: 10 }, { gc: 610000, cc: 200, bonus: 10 },
      { gc: 740000, cc: 300, bonus: 10 }, { gc: 880000, cc: 300, bonus: 10 }, { gc: 1000000, cc: 450, bonus: 10 },
      { gc: 1200000, cc: 450, bonus: 10 },
    ],
  },
  {
    id: "welldev", nameKey: "gvg.welldev_name", bonusKey: "gvg.welldev_bonus", tier: 3, position: "left",
    levels: [
      { gc: 80000, cc: 50, bonus: 10 }, { gc: 260000, cc: 50, bonus: 10 }, { gc: 330000, cc: 100, bonus: 10 },
      { gc: 410000, cc: 100, bonus: 10 }, { gc: 500000, cc: 200, bonus: 10 }, { gc: 610000, cc: 200, bonus: 10 },
      { gc: 740000, cc: 300, bonus: 10 }, { gc: 880000, cc: 300, bonus: 10 }, { gc: 1000000, cc: 450, bonus: 10 },
      { gc: 1200000, cc: 500, bonus: 10 },
    ],
  },
  {
    id: "warready", nameKey: "gvg.warready_name", bonusKey: "gvg.warready_bonus", tier: 3, position: "right",
    levels: [
      { gc: 80000, cc: 50, bonus: 10 }, { gc: 260000, cc: 50, bonus: 10 }, { gc: 330000, cc: 100, bonus: 10 },
      { gc: 410000, cc: 100, bonus: 10 }, { gc: 500000, cc: 200, bonus: 10 }, { gc: 610000, cc: 200, bonus: 10 },
      { gc: 740000, cc: 300, bonus: 10 }, { gc: 880000, cc: 300, bonus: 10 }, { gc: 1000000, cc: 450, bonus: 10 },
      { gc: 1200000, cc: 500, bonus: 10 },
    ],
  },
  // --- Mobilization Expert ---
  {
    id: "mobil", nameKey: "gvg.mobil_name", bonusKey: "gvg.mobil_bonus", tier: 4, position: "center",
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
    id: "honor", nameKey: "gvg.honor_name", bonusKey: "gvg.honor_bonus", tier: 5, position: "left",
    levels: [
      { gc: 320000, cc: 50, bonus: 10 }, { gc: 400000, cc: 50, bonus: 10 }, { gc: 490000, cc: 100, bonus: 10 },
      { gc: 600000, cc: 100, bonus: 10 }, { gc: 730000, cc: 200, bonus: 10 }, { gc: 870000, cc: 200, bonus: 10 },
      { gc: 1000000, cc: 300, bonus: 10 }, { gc: 1150000, cc: 300, bonus: 10 }, { gc: 1300000, cc: 450, bonus: 10 },
      { gc: 1500000, cc: 500, bonus: 10 },
    ],
  },
  {
    id: "combat", nameKey: "gvg.combat_name", bonusKey: "gvg.combat_bonus", tier: 5, position: "right",
    levels: [
      { gc: 320000, cc: 50, bonus: 10 }, { gc: 400000, cc: 50, bonus: 10 }, { gc: 490000, cc: 100, bonus: 10 },
      { gc: 600000, cc: 100, bonus: 10 }, { gc: 730000, cc: 200, bonus: 10 }, { gc: 870000, cc: 200, bonus: 10 },
      { gc: 1000000, cc: 300, bonus: 10 }, { gc: 1150000, cc: 300, bonus: 10 }, { gc: 1300000, cc: 450, bonus: 10 },
      { gc: 1500000, cc: 500, bonus: 10 },
    ],
  },
  // --- Glory Ascension II ---
  {
    id: "glory2", nameKey: "gvg.glory2_name", bonusKey: "gvg.glory2_bonus", tier: 5.5, position: "center",
    levels: [{ gc: 4000000, cc: 2000, bonus: 0 }], isGate: true,
  },
  // --- Tier 6 (Combat) ---
  {
    id: "lockon", nameKey: "gvg.lockon_name", bonusKey: "gvg.lockon_bonus", tier: 6, position: "left",
    levels: TIER6_LEVELS,
  },
  {
    id: "caliber", nameKey: "gvg.caliber_name", bonusKey: "gvg.caliber_bonus", tier: 6, position: "center",
    levels: TIER6_LEVELS,
  },
  {
    id: "intercept", nameKey: "gvg.intercept_name", bonusKey: "gvg.intercept_bonus", tier: 6, position: "right",
    levels: TIER6_LEVELS,
  },
];

const TIER_LABEL_KEYS = {
  1: "gvg.tier_1",
  1.5: "gvg.tier_gate",
  2: "gvg.tier_2",
  3: "gvg.tier_3",
  4: "gvg.tier_4",
  5: "gvg.tier_5",
  5.5: "gvg.tier_gate",
  6: "gvg.tier_6",
};

const fmt = (n) => n.toLocaleString("en-US");

function TreeCard({ tree, currentLevel, onChange }) {
  const { t } = useTranslation();
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
      className="tree-card"
      style={{
        background: done
          ? "linear-gradient(135deg, rgba(40,180,99,0.12), rgba(30,60,40,0.25))"
          : V.bgElev,
        border: `1px solid ${done ? "rgba(40,180,99,0.4)" : tree.isGate ? "rgba(255,190,60,0.5)" : "rgba(201,168,76,0.25)"}`,
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
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
          <div className="tree-card-name">
            {t(tree.nameKey)}
          </div>
          <div style={{ fontSize: 11, color: "#FFFFFF", marginTop: 4, lineHeight: 1.3, fontFamily: "var(--font-body)" }}>
            {t(tree.bonusKey)}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, flexShrink: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
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
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <label style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#FFFFFF", flexShrink: 0, textTransform: "uppercase", letterSpacing: 1 }}>{t('tools_ui.level')}</label>
        <input
          type="range"
          className="tool-range"
          min={0}
          max={maxLvl}
          value={currentLevel}
          onChange={(e) => onChange(tree.id, parseInt(e.target.value))}
          style={{
            accentColor: tree.isGate ? "#ffbe3c" : V.gold,
          }}
        />
      </div>

      {/* Stats */}
      <div className={tree.isGate ? "tree-stats-grid-2" : "tree-stats-grid-3"}>
        <Stat label={t('resources.galactic_coins')} value={fmt(remaining.gc)} color="#C9A84C" dimmed={done} />
        <Stat label={t('resources.computational_component')} value={fmt(remaining.cc)} color="#a78bfa" dimmed={done} />
        {!tree.isGate && (
          <Stat label={t('tools_ui.bonus')} value={`+${currentBonus}%`} color="#2ecc71" dimmed={false} />
        )}
      </div>

      {/* Level detail (collapsible) */}
      <div style={{ flex: 1 }} />
      <div style={{ width: "100%", marginTop: "auto" }}>
        <LevelDetails tree={tree} currentLevel={currentLevel} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

function Stat({ label, value, color, dimmed }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontFamily: "var(--font-label)", fontSize: 9, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: 1, lineHeight: 1.2 }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 600,
          color: dimmed ? "#FFFFFF" : color,
          marginTop: 2,
          wordBreak: "break-word"
        }}
      >
        {value}
      </div>
    </div>
  );
}

function LevelDetails({ tree, currentLevel, open, setOpen }) {
  const { t } = useTranslation();
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
          padding: "6px 8px",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontFamily: "var(--font-body)",
          width: "100%",
          textAlign: "center",
          marginTop: 10,
          transition: "all 0.2s"
        }}
      >
        {open ? t('tools_ui.hide') : t('tools_ui.details')}
      </button>
      {open && (
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 2 }}>
          {tree.levels.map((l, i) => {
            const done = i < currentLevel;
            const next = i === currentLevel;
            return (
              <div
                key={i}
                className="tool-leveldetail-row"
                style={{
                  background: next
                    ? "rgba(201,168,76,0.1)"
                    : done
                      ? "rgba(0,0,0,0.2)"
                      : "transparent",
                  color: done ? "#FFFFFF" : V.txPri,
                  textDecoration: done ? "line-through" : "none",
                }}
              >
                <span className="ld-idx" style={{ fontWeight: next ? 700 : 400, color: next ? "#FFFFFF" : "inherit" }}>
                  {next ? "▶" : ""} {i + 1}
                </span>
                <span className="ld-gc" style={{ color: done ? "#FFFFFF" : "#C9A84C" }}>
                  {fmt(l.gc)}
                </span>
                <span className="ld-cc" style={{ color: done ? "#FFFFFF" : (l.cc === 0 ? "#FFFFFF" : "#a78bfa") }}>
                  {l.cc === 0 ? "—" : fmt(l.cc)}
                </span>
                <span className="ld-bonus" style={{ color: done ? "#FFFFFF" : "#2ecc71" }}>
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
  const { t } = useTranslation();
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
        <SectionTitle>{t('gvg.tech_progress')}</SectionTitle>

        {/* Inventory */}
        <div
          style={{
            background: "rgba(0,0,0,0.2)",
            border: `1px solid ${V.border}`,
            borderRadius: 2,
            padding: "14px 16px",
            marginBottom: 18,
          }}
        >
          <Label>{t('tools_ui.current_inventory')}</Label>
          <div className="tool-inv-row">
            <div className="tool-inv-input">
              <span className="inv-label">{t('resources.galactic_coins')}</span>
              <input
                type="text"
                value={inventory.gc.toLocaleString("en-US")}
                onChange={(e) => {
                  const v = Math.min(parseInt(e.target.value.replace(/\D/g, "")) || 0, 999999999);
                  setInventory((p) => ({ ...p, gc: v }));
                }}
                style={{
                  border: `1px solid rgba(201,168,76,0.3)`,
                  color: "#C9A84C",
                }}
              />
            </div>
            <div className="tool-inv-input">
              <span className="inv-label">{t('resources.computational_component')}</span>
              <input
                type="text"
                value={inventory.cc.toLocaleString("en-US")}
                onChange={(e) => {
                  const v = Math.min(parseInt(e.target.value.replace(/\D/g, "")) || 0, 999999999);
                  setInventory((p) => ({ ...p, cc: v }));
                }}
                style={{
                  border: `1px solid rgba(167,139,250,0.3)`,
                  color: "#a78bfa",
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
            padding: "16px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 16,
            alignItems: "end",
          }}
        >
          <div>
            <Label>{t('tools_ui.missing_suffix', { label: t('resources.galactic_coins') })}</Label>
            <div
              className="tool-big-num"
              style={{
                color: surplusGC < 0 ? "#e74c3c" : "#2ecc71",
                wordBreak: "break-word"
              }}
            >
              {fmt(Math.max(0, -surplusGC))}
            </div>
          </div>
          <div>
            <Label>{t('tools_ui.missing_suffix', { label: t('resources.computational_component') })}</Label>
            <div
              className="tool-big-num"
              style={{
                color: surplusCC < 0 ? "#e74c3c" : "#2ecc71",
                wordBreak: "break-word"
              }}
            >
              {fmt(Math.max(0, -surplusCC))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button
              onClick={resetAll}
              style={{
                background: "rgba(0,0,0,0.3)",
                border: `1px solid ${V.border}`,
                borderRadius: 2,
                padding: "10px 14px",
                color: "#FFFFFF",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 600,
                width: "100%"
              }}
            >
              {t('tools_ui.reset')}
            </button>
          </div>
        </div>
      </Card>

      {/* Trees by tier */}
      {tiers.map((tier) => {
        const treesInTier = TREES.filter((t) => t.tier === tier);
        if (treesInTier.length === 0) return null;
        const gridClass = treesInTier.length === 1 ? 'tool-grid-trees-1' : treesInTier.length === 2 ? 'tool-grid-trees-2' : 'tool-grid-trees-3';
        return (
          <div key={tier} style={{ marginBottom: 24 }}>
            <div className="tool-tier-header">
              {TIER_LABEL_KEYS[tier] ? t(TIER_LABEL_KEYS[tier]) : t('gvg.tier_n', { n: tier })}
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${V.border}, transparent)` }} />
            </div>
            <div className={gridClass} style={{ alignItems: "start" }}>
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
