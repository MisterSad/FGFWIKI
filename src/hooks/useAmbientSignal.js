import { useEffect, useRef, useState } from 'react';

const T0 = Date.UTC(2026, 4, 12, 0, 0, 0);
const T1 = Date.UTC(2026, 4, 20, 0, 0, 0);

const INITIAL_DELAY_MS = 600;
const REPOSITION_INTERVAL_MS = 22000;
const REAPPEAR_AFTER_CLOSE_MS = 1200;

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

const pickPosition = () => ({
    topPct: 18 + Math.random() * 64,
    leftPct: 8 + Math.random() * 84,
});

export default function useAmbientSignal() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState(pickPosition);
    const showTimerRef = useRef(null);
    const repositionTimerRef = useRef(null);
    const reappearTimerRef = useRef(null);
    const windowEndTimerRef = useRef(null);

    useEffect(() => {
        const preview = isPreviewMode();
        if (!preview && !inWindow()) return undefined;

        showTimerRef.current = setTimeout(() => {
            if (!preview && !inWindow()) return;
            setPosition(pickPosition());
            setVisible(true);
        }, INITIAL_DELAY_MS);

        repositionTimerRef.current = setInterval(() => {
            if (!preview && !inWindow()) return;
            setPosition(pickPosition());
        }, REPOSITION_INTERVAL_MS);

        if (!preview) {
            const msUntilEnd = T1 - Date.now();
            if (msUntilEnd > 0) {
                windowEndTimerRef.current = setTimeout(() => {
                    setVisible(false);
                    if (repositionTimerRef.current) {
                        clearInterval(repositionTimerRef.current);
                        repositionTimerRef.current = null;
                    }
                    if (reappearTimerRef.current) {
                        clearTimeout(reappearTimerRef.current);
                        reappearTimerRef.current = null;
                    }
                }, msUntilEnd);
            }
        }

        return () => {
            if (showTimerRef.current) clearTimeout(showTimerRef.current);
            if (repositionTimerRef.current) clearInterval(repositionTimerRef.current);
            if (reappearTimerRef.current) clearTimeout(reappearTimerRef.current);
            if (windowEndTimerRef.current) clearTimeout(windowEndTimerRef.current);
        };
    }, []);

    const hide = () => {
        setVisible(false);
        if (reappearTimerRef.current) clearTimeout(reappearTimerRef.current);
        const preview = isPreviewMode();
        reappearTimerRef.current = setTimeout(() => {
            if (!preview && !inWindow()) return;
            setPosition(pickPosition());
            setVisible(true);
        }, REAPPEAR_AFTER_CLOSE_MS);
    };

    return { visible, position, hide };
}
