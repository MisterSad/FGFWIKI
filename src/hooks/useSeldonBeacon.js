import { useEffect, useRef, useState } from 'react';

const EVENT_START_UTC = Date.UTC(2026, 4, 12, 0, 0, 0); // May 12, 2026 00:00 UTC
const EVENT_END_UTC = Date.UTC(2026, 4, 20, 0, 0, 0);   // May 20, 2026 00:00 UTC

const APPEAR_PROBABILITY = 0.07;
const MIN_APPEAR_DELAY_MS = 4000;
const MAX_APPEAR_DELAY_MS = 12000;
const AUTO_HIDE_MS = 45000;
const SESSION_COOLDOWN_MS = 90000;

const COOLDOWN_KEY = 'fgfwiki_seldon_cooldown';
const FOUND_KEY = 'fgfwiki_seldon_found';

const isEventActive = (now = Date.now()) =>
    now >= EVENT_START_UTC && now < EVENT_END_UTC;

const readCooldown = () => {
    try {
        const raw = sessionStorage.getItem(COOLDOWN_KEY);
        return raw ? parseInt(raw, 10) || 0 : 0;
    } catch {
        return 0;
    }
};

const writeCooldown = (timestamp) => {
    try {
        sessionStorage.setItem(COOLDOWN_KEY, String(timestamp));
    } catch {
        // sessionStorage unavailable (private mode etc.) — silently ignore
    }
};

const readFound = () => {
    try {
        return localStorage.getItem(FOUND_KEY) === '1';
    } catch {
        return false;
    }
};

const writeFound = () => {
    try {
        localStorage.setItem(FOUND_KEY, '1');
    } catch {
        // localStorage unavailable — silently ignore
    }
};

const pickRandomPosition = () => ({
    topPct: 18 + Math.random() * 64,
    leftPct: 8 + Math.random() * 84,
});

export default function useSeldonBeacon() {
    const [visible, setVisible] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const [position, setPosition] = useState(() => pickRandomPosition());
    const [alreadyFound, setAlreadyFound] = useState(() => readFound());
    const showTimerRef = useRef(null);
    const hideTimerRef = useRef(null);

    useEffect(() => {
        if (!isEventActive()) return undefined;

        const lastShown = readCooldown();
        if (Date.now() - lastShown < SESSION_COOLDOWN_MS) return undefined;

        if (Math.random() > APPEAR_PROBABILITY) return undefined;

        const delay = MIN_APPEAR_DELAY_MS
            + Math.random() * (MAX_APPEAR_DELAY_MS - MIN_APPEAR_DELAY_MS);

        showTimerRef.current = setTimeout(() => {
            if (!isEventActive()) return;
            setPosition(pickRandomPosition());
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

    const reveal = () => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
        if (!alreadyFound) {
            writeFound();
            setAlreadyFound(true);
        }
        setRevealed(true);
    };

    const dismiss = () => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
        setVisible(false);
        setRevealed(false);
    };

    return {
        visible,
        revealed,
        position,
        alreadyFound,
        eventActive: isEventActive(),
        reveal,
        dismiss,
    };
}
