import React from 'react';
import './tools.css';

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

export function Card({ children, accent, style, className }) {
    return (
        <div className={`tool-card${accent ? ' accent' : ''}${className ? ' ' + className : ''}`} style={style}>
            <div className="tool-card-top-line" />
            <Corners />{children}
        </div>
    );
}

export function SectionTitle({ children }) {
    return <h2 className="tool-section-title">{children}</h2>;
}

export function Label({ children }) {
    return <label className="tool-label">{children}</label>;
}
