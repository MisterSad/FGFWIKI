import React from 'react';

// ── Foundation Design System Tokens ──
export const V = {
    bgVoid: "#060710", bgSurface: "#0D0E14", bgElev: "#1A1B26",
    gold: "#C9A84C", goldBr: "#E8C96A", goldDim: "#8A6F2F", bronze: "#A08240",
    txPri: "#E8E4D9", txSec: "#8A8778", txDim: "#FFFFFF",
    teal: "#4ECDC4",
    border: "rgba(201,168,76,0.15)", borderHov: "rgba(201,168,76,0.35)",
};

// ── Foundation Sub-Components ──
export function Corners() {
    const s = { position: "absolute", width: 12, height: 12, opacity: 0.25, pointerEvents: "none" };
    return (
        <>
            <div style={{ ...s, top: 6, left: 6, borderTop: `1px solid ${V.gold}`, borderLeft: `1px solid ${V.gold}` }} />
            <div style={{ ...s, bottom: 6, right: 6, borderBottom: `1px solid ${V.gold}`, borderRight: `1px solid ${V.gold}` }} />
        </>
    );
}

export function GoldLine({ style: sx }) {
    return <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${V.gold},transparent)`, ...sx }} />;
}

export function Card({ children, accent, style }) {
    return (
        <div style={{ position: "relative", background: V.bgSurface, border: `1px solid ${accent ? V.borderHov : V.border}`, borderRadius: 2, padding: "28px 24px", marginBottom: 28, transition: "border-color 0.3s ease-out", ...style }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${V.gold},transparent)` }} />
            <Corners />{children}
        </div>
    );
}

export function SectionTitle({ children }) {
    return <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, letterSpacing: 4, color: V.txSec, margin: "0 0 22px", textTransform: "uppercase" }}>{children}</h2>;
}

export function Label({ children }) {
    return <label style={{ fontFamily: "'Orbitron'", fontSize: 9, letterSpacing: 3, color: V.txDim, display: "block", marginBottom: 6, textTransform: "uppercase" }}>{children}</label>;
}
