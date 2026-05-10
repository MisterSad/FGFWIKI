import { useEffect, useRef, useState } from 'react';

// PREVIEW MODE — DO NOT COMMIT. Forces the dot to always appear.
const T0 = 0;
const T1 = Number.MAX_SAFE_INTEGER;

const PROBABILITY = 1;
const MIN_DELAY_MS = 800;
const MAX_DELAY_MS = 1500;
const AUTO_HIDE_MS = 600000;
const COOLDOWN_MS = 0;

const CD_KEY = 'fgfwiki_amb_cd';

const inWindow = () => {
    const now = Date.now();
    return now >= T0 && now < T1;
};

const readCooldown = () => {
    try {
        const raw = sessionStorage.getItem(CD_KEY);
        return raw ? parseInt(raw, 10) || 0 : 0;
    } catch {
        return 0;
    }
};

const writeCooldown = (timestamp) => {
    try {
        sessionStorage.setItem(CD_KEY, String(timestamp));
    } catch {
        // Storage unavailable — ignore
    }
};

const pickPosition = () => ({
    topPct: 18 + Math.random() * 64,
    leftPct: 8 + Math.random() * 84,
});

export default function useAmbientSignal() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState(pickPosition);
    const showTimerRef = useRef(null);
    const hideTimerRef = useRef(null);

    useEffect(() => {
        if (!inWindow()) return undefined;
        if (Date.now() - readCooldown() < COOLDOWN_MS) return undefined;
        if (Math.random() > PROBABILITY) return undefined;

        const delay = MIN_DELAY_MS
            + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);

        showTimerRef.current = setTimeout(() => {
            if (!inWindow()) return;
            setPosition(pickPosition());
            setVisible(true);
            writeCooldown(Date.now());
            hideTimerRef.current = setTimeout(() => {
                setVisible(false);
            }, AUTO_HIDE_MS);
        }, delay);

        return () => {
            if (showTimerRef.current) clearTimeout(showTimerRef.current);
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, []);

    const hide = () => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
        setVisible(false);
    };

    return { visible, position, hide };
}
