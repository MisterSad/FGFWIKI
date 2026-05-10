import { useEffect, useRef, useState } from 'react';

const T0 = Date.UTC(2026, 4, 12, 0, 0, 0);
const T1 = Date.UTC(2026, 4, 20, 0, 0, 0);

const PROBABILITY = 0.07;
const MIN_DELAY_MS = 4000;
const MAX_DELAY_MS = 12000;
const AUTO_HIDE_MS = 45000;
const COOLDOWN_MS = 90000;

const CD_KEY = 'fgfwiki_amb_cd';

const inWindow = () => {
    const now = Date.now();
    return now >= T0 && now < T1;
};

const isPreviewMode = () => {
    try {
        return new URLSearchParams(window.location.search).get('_pv') === 'fg2026';
    } catch {
        return false;
    }
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
        const preview = isPreviewMode();
        if (!preview) {
            if (!inWindow()) return undefined;
            if (Date.now() - readCooldown() < COOLDOWN_MS) return undefined;
            if (Math.random() > PROBABILITY) return undefined;
        }

        const delay = preview
            ? 800
            : MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);

        showTimerRef.current = setTimeout(() => {
            if (!preview && !inWindow()) return;
            setPosition(pickPosition());
            setVisible(true);
            if (!preview) writeCooldown(Date.now());
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
