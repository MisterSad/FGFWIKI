import { describe, it, expect, vi, afterEach } from 'vitest';
import {
    DAILY_TASKS, TOTAL_TARGET, getUtcDateKey, msUntilNextUtcMidnight,
    createInitialState, isLegacyState, normalizeState, clampCounter,
    computeProgress, isTaskComplete,
} from '../src/lib/daily-tasks/tasks.js';

afterEach(() => {
    vi.useRealTimers();
});

describe('getUtcDateKey', () => {
    it('returns a YYYY-MM-DD key in UTC', () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-08-02T23:30:00Z'));
        expect(getUtcDateKey()).toBe('2026-08-02');
    });

    it('rolls over at UTC midnight', () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-08-02T00:00:00Z'));
        expect(getUtcDateKey()).toBe('2026-08-02');
        vi.setSystemTime(new Date('2026-08-01T23:59:59Z'));
        expect(getUtcDateKey()).toBe('2026-08-01');
    });
});

describe('msUntilNextUtcMidnight', () => {
    it('stays within ]0, 24h[', () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-08-02T12:00:00Z'));
        const ms = msUntilNextUtcMidnight();
        expect(ms).toBeGreaterThan(0);
        expect(ms).toBeLessThanOrEqual(12 * 60 * 60 * 1000);
    });
});

describe('createInitialState', () => {
    it('initializes all counters to 0 and toggles to false', () => {
        const s = createInitialState('2026-08-02');
        expect(s.progressDate).toBe('2026-08-02');
        for (const task of DAILY_TASKS) {
            if (task.type === 'counter') expect(s.counters[task.id]).toBe(0);
            else expect(s.toggles[task.id]).toBe(false);
        }
    });
});

describe('isLegacyState', () => {
    it('flags payloads without a progressDate', () => {
        expect(isLegacyState({ tribute_1: true })).toBe(true);
        expect(isLegacyState({})).toBe(true);
    });

    it('accepts current payloads and junk values', () => {
        expect(isLegacyState({ progressDate: '2026-08-02' })).toBe(false);
        expect(isLegacyState(null)).toBe(false);
        expect(isLegacyState('nope')).toBe(false);
    });
});

describe('normalizeState', () => {
    it('clamps counters and drops unknown keys', () => {
        const task = DAILY_TASKS.find(t => t.type === 'counter');
        const raw = {
            progressDate: '2026-08-02',
            counters: { [task.id]: task.target + 50, bogus: 7 },
            toggles: {},
        };
        const s = normalizeState(raw, '2026-08-02');
        expect(s.counters[task.id]).toBe(task.target);
        expect(s.counters.bogus).toBeUndefined();
    });

    it('keeps booleans for toggles and ignores non-boolean values', () => {
        const task = DAILY_TASKS.find(t => t.type === 'toggle');
        const raw = {
            counters: {},
            toggles: { [task.id]: true },
        };
        const s = normalizeState(raw, '2026-08-02');
        expect(s.toggles[task.id]).toBe(true);
    });

    it('falls back to a fresh state for garbage input', () => {
        const s = normalizeState('garbage', '2026-08-02');
        expect(s.progressDate).toBe('2026-08-02');
        expect(computeProgress(s).total).toBe(TOTAL_TARGET);
    });
});

describe('clampCounter', () => {
    it('clamps to [0, target]', () => {
        const task = DAILY_TASKS.find(t => t.type === 'counter');
        expect(clampCounter(task, -5)).toBe(0);
        expect(clampCounter(task, task.target + 10)).toBe(task.target);
        expect(clampCounter(task, 2.7)).toBe(2);
        expect(clampCounter(task, NaN)).toBe(0);
    });
});

describe('computeProgress', () => {
    it('reports 0% on a fresh state', () => {
        const s = createInitialState('2026-08-02');
        const p = computeProgress(s);
        expect(p.current).toBe(0);
        expect(p.total).toBe(TOTAL_TARGET);
        expect(p.percent).toBe(0);
    });

    it('clamps counters above target and rounds percentages', () => {
        const counter = DAILY_TASKS.find(t => t.type === 'counter');
        const toggle = DAILY_TASKS.find(t => t.type === 'toggle');
        const s = createInitialState('2026-08-02');
        s.counters[counter.id] = counter.target * 2;
        s.toggles[toggle.id] = true;
        const p = computeProgress(s);
        expect(p.current).toBe(counter.target + toggle.target);
        expect(p.percent).toBe(Math.round((p.current / p.total) * 100));
    });
});

describe('isTaskComplete', () => {
    it('checks counter thresholds and toggles', () => {
        const counter = DAILY_TASKS.find(t => t.type === 'counter');
        const toggle = DAILY_TASKS.find(t => t.type === 'toggle');
        const s = createInitialState('2026-08-02');
        expect(isTaskComplete(s, counter)).toBe(false);
        expect(isTaskComplete(s, toggle)).toBe(false);
        s.counters[counter.id] = counter.target;
        s.toggles[toggle.id] = true;
        expect(isTaskComplete(s, counter)).toBe(true);
        expect(isTaskComplete(s, toggle)).toBe(true);
    });
});
