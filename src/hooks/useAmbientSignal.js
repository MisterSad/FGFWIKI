import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const T0 = Date.UTC(2026, 4, 12, 0, 0, 0);
const T1 = Date.UTC(2026, 4, 20, 0, 0, 0);

const INITIAL_DELAY_MS = 600;
const REPOSITION_INTERVAL_MS = 22000;
const REAPPEAR_AFTER_CLOSE_MS = 1200;
const ROUTE_REPOSITION_DELAY_MS = 500;
const MIN_TOP_PX = 180;
const BOTTOM_PADDING_PX = 200;

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

const pickPosition = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return { topPx: MIN_TOP_PX, leftPct: 50 };
    }
    const docHeight = Math.max(
        document.documentElement?.scrollHeight || 0,
        document.body?.scrollHeight || 0,
        window.innerHeight || 0,
    );
    const maxTop = Math.max(MIN_TOP_PX + 80, docHeight - BOTTOM_PADDING_PX);
    return {
        topPx: MIN_TOP_PX + Math.random() * (maxTop - MIN_TOP_PX),
        leftPct: 8 + Math.random() * 84,
    };
};

export default function useAmbientSignal() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState(pickPosition);
    const showTimerRef = useRef(null);
    const repositionTimerRef = useRef(null);
    const reappearTimerRef = useRef(null);
    const windowEndTimerRef = useRef(null);
    const routeRepositionTimerRef = useRef(null);
    const location = useLocation();

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
            if (routeRepositionTimerRef.current) clearTimeout(routeRepositionTimerRef.current);
        };
    }, []);

    useEffect(() => {
        const preview = isPreviewMode();
        if (!preview && !inWindow()) return undefined;
        if (routeRepositionTimerRef.current) clearTimeout(routeRepositionTimerRef.current);
        routeRepositionTimerRef.current = setTimeout(() => {
            setPosition(pickPosition());
        }, ROUTE_REPOSITION_DELAY_MS);
        return () => {
            if (routeRepositionTimerRef.current) clearTimeout(routeRepositionTimerRef.current);
        };
    }, [location.pathname]);

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
