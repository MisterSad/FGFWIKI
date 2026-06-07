import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    CheckCircle2,
    Circle,
    Minus,
    Plus,
    RefreshCw,
    Swords,
    Coins,
    Ship,
    Shield,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { saveUserToolData, loadUserToolData } from '../firebaseUtils';
import {
    DAILY_TASKS,
    clampCounter,
    computeProgress,
    createInitialState,
    getUtcDateKey,
    isLegacyState,
    isTaskComplete,
    msUntilNextUtcMidnight,
    normalizeState,
} from '../lib/daily-tasks/tasks';

const TOOL_ID = 'dailyTasks';
const STORAGE_KEY = 'dailyChecklist';

const GROUP_ICONS = {
    'daily_checklist.group.combat': Swords,
    'daily_checklist.group.economy': Coins,
    'daily_checklist.group.fleet': Ship,
    'daily_checklist.group.arena': Shield,
};

function readLocalState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function writeLocalState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // localStorage unavailable (private mode, quota): silently ignore.
    }
}

function formatCountdown(ms, t) {
    const totalMinutes = Math.max(0, Math.floor(ms / 60000));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const time = `${hours}h ${String(minutes).padStart(2, '0')}m`;
    return t('daily_checklist.reset_in', { time, defaultValue: `Resets in ${time}` });
}

function groupTasks(tasks) {
    /** @type {{ groupKey: string, items: typeof tasks }[]} */
    const groups = [];
    const indexByKey = new Map();
    for (const task of tasks) {
        if (!indexByKey.has(task.group)) {
            indexByKey.set(task.group, groups.length);
            groups.push({ groupKey: task.group, items: [] });
        }
        groups[indexByKey.get(task.group)].items.push(task);
    }
    return groups;
}

export default function DailyChecklist() {
    const { t } = useTranslation();
    const { currentUser } = useAuth();

    const [state, setState] = useState(() => {
        const local = readLocalState();
        if (!local || isLegacyState(local)) return createInitialState();
        return normalizeState(local);
    });
    const [_tick, setTick] = useState(0);

    // Persistence is gated by user interaction. Without this guard the persist
    // effect would fire on mount and on every `currentUser` change, racing the
    // Firestore load and overwriting remote data with stale local state.
    const userHasInteractedRef = useRef(false);

    const groups = useMemo(() => groupTasks(DAILY_TASKS), []);

    // Derive the displayed state: if the stored date doesn't match today (UTC)
    // the user sees a fresh state. The persisted `state` only updates on a real
    // interaction (handled by `applyChange` below), which avoids effect-driven
    // setState and keeps the rollover atomic.
    const todayKey = getUtcDateKey();
    const effectiveState = state.progressDate === todayKey
        ? state
        : createInitialState(todayKey);

    const progress = useMemo(() => computeProgress(effectiveState), [effectiveState]);
    const isComplete = progress.percent >= 100;

    // ── Tick: refresh the countdown every minute. When the tick crosses
    //    midnight UTC, `todayKey` recomputes and `effectiveState` flips fresh.
    useEffect(() => {
        const id = setInterval(() => setTick((n) => n + 1), 60_000);
        return () => clearInterval(id);
    }, []);

    // ── Load from Firestore when a user is signed in. Legacy payloads (the
    //    old `{ tribute_1: true, ... }` shape) are evicted immediately by
    //    writing a fresh state back.
    useEffect(() => {
        if (!currentUser) return;
        let cancelled = false;
        (async () => {
            const remote = await loadUserToolData(currentUser.uid, TOOL_ID);
            if (cancelled) return;
            if (remote && isLegacyState(remote)) {
                const fresh = createInitialState();
                setState(fresh);
                saveUserToolData(currentUser.uid, TOOL_ID, fresh);
            } else if (remote) {
                const normalized = normalizeState(remote);
                const today = getUtcDateKey();
                setState(normalized.progressDate === today
                    ? normalized
                    : createInitialState(today));
            }
        })();
        return () => { cancelled = true; };
    }, [currentUser]);

    // ── Persist on every state change, but only after the user has interacted.
    //    This prevents racing the Firestore load on first sign-in.
    useEffect(() => {
        if (!userHasInteractedRef.current) return;
        writeLocalState(state);
        if (currentUser) {
            saveUserToolData(currentUser.uid, TOOL_ID, state);
        }
    }, [state, currentUser]);

    // Helper: applies a producer to the current state, rolling over to a fresh
    // today's state first if the stored date is stale. Marks the interaction.
    const applyChange = useCallback((producer) => {
        userHasInteractedRef.current = true;
        setState((prev) => {
            const today = getUtcDateKey();
            const base = prev.progressDate === today ? prev : createInitialState(today);
            return producer(base);
        });
    }, []);

    const setCounter = useCallback((task, next) => {
        applyChange((base) => ({
            ...base,
            counters: { ...base.counters, [task.id]: clampCounter(task, next) },
        }));
    }, [applyChange]);

    const incrementCounter = useCallback((task, delta) => {
        applyChange((base) => {
            const current = base.counters[task.id] ?? 0;
            return {
                ...base,
                counters: { ...base.counters, [task.id]: clampCounter(task, current + delta) },
            };
        });
    }, [applyChange]);

    const toggleSwitch = useCallback((task) => {
        applyChange((base) => ({
            ...base,
            toggles: { ...base.toggles, [task.id]: !base.toggles[task.id] },
        }));
    }, [applyChange]);

    const handleResetAll = useCallback(() => {
        const msg = t('daily_checklist.reset_confirm', 'Are you sure you want to reset all your daily tasks?');
        if (window.confirm(msg)) {
            userHasInteractedRef.current = true;
            setState(createInitialState());
        }
    }, [t]);

    const countdownLabel = formatCountdown(msUntilNextUtcMidnight(), t);

    return (
        <div style={{ position: 'relative' }}>
            <ProgressGauge
                percent={progress.percent}
                current={progress.current}
                total={progress.total}
                isComplete={isComplete}
                countdownLabel={countdownLabel}
                title={t('daily_checklist.title')}
                progressLabel={t('daily_checklist.progress_label', 'Progress')}
                completedLabel={t('daily_checklist.completed', 'All tasks complete!')}
                onResetAll={handleResetAll}
                resetAllLabel={t('daily_checklist.reset_all', 'Reset all')}
            />

            <div className="card reveal" style={{
                background: 'var(--bg-void)',
                border: '1px solid var(--border)',
                borderTop: '2px solid var(--accent-teal)',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                marginBottom: 'clamp(1.5rem, 5vw, 3rem)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, height: '4px',
                    background: 'linear-gradient(90deg, transparent, var(--accent-teal), transparent)',
                    opacity: 0.5,
                }} />

                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    margin: '0 0 1.5rem 0',
                    lineHeight: 1.5,
                }}>
                    {t('daily_checklist.subtitle', 'Track your daily objectives. All progress resets at 00:00 UTC.')}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    {groups.map(({ groupKey, items }) => {
                        const Icon = GROUP_ICONS[groupKey] ?? CheckCircle2;
                        return (
                            <section key={groupKey}>
                                <h3 className="label-text" style={{
                                    fontSize: '1.05rem',
                                    color: 'var(--text-primary)',
                                    marginBottom: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                }}>
                                    <Icon size={18} style={{ color: 'var(--accent-teal)' }} />
                                    {t(groupKey)}
                                </h3>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: '0.75rem',
                                }}>
                                    {items.map((task) => (
                                        <TaskRow
                                            key={task.id}
                                            task={task}
                                            label={t(task.labelKey)}
                                            value={task.type === 'counter'
                                                ? (effectiveState.counters[task.id] ?? 0)
                                                : !!effectiveState.toggles[task.id]}
                                            complete={isTaskComplete(effectiveState, task)}
                                            onIncrement={(delta) => incrementCounter(task, delta)}
                                            onSetCounter={(v) => setCounter(task, v)}
                                            onToggle={() => toggleSwitch(task)}
                                        />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function ProgressGauge({
    percent, current, total, isComplete,
    countdownLabel, title, progressLabel, completedLabel,
    onResetAll, resetAllLabel,
}) {
    const barColor = isComplete ? 'var(--accent-teal)' : 'var(--accent-teal)';
    return (
        <div
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 5,
                background: 'var(--bg-void)',
                borderBottom: '1px solid var(--border)',
                padding: 'clamp(0.85rem, 2vw, 1.1rem) clamp(1rem, 3vw, 1.5rem)',
                marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
                boxShadow: isComplete
                    ? '0 0 24px rgba(78, 205, 196, 0.25)'
                    : '0 1px 0 rgba(0,0,0,0.4)',
                transition: 'box-shadow 0.4s ease',
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                flexWrap: 'wrap',
                marginBottom: '0.6rem',
            }}>
                <h2 style={{
                    fontFamily: 'var(--font-hero)',
                    fontSize: 'clamp(1rem, 2.6vw, 1.25rem)',
                    color: 'var(--accent-teal)',
                    textTransform: 'uppercase',
                    margin: 0,
                    letterSpacing: '0.1em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}>
                    {isComplete ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                    <span>{title}</span>
                </h2>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                }}>
                    <span
                        aria-live="polite"
                        style={{
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            letterSpacing: '0.08em',
                        }}
                    >
                        {countdownLabel}
                    </span>
                    <button
                        type="button"
                        onClick={onResetAll}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.4rem 0.85rem',
                            background: 'transparent',
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            borderRadius: 2,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--text-primary)';
                            e.currentTarget.style.borderColor = 'var(--text-secondary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.borderColor = 'var(--border)';
                        }}
                    >
                        <RefreshCw size={14} />
                        {resetAllLabel}
                    </button>
                </div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.4rem',
                gap: '0.5rem',
                flexWrap: 'wrap',
            }}>
                <span style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                }}>
                    {isComplete ? completedLabel : progressLabel}
                </span>
                <span style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.95rem',
                    color: isComplete ? 'var(--accent-teal)' : 'var(--text-primary)',
                    fontWeight: 600,
                }}>
                    {percent}% - {current}/{total}
                </span>
            </div>

            <div
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={progressLabel}
                style={{
                    width: '100%',
                    height: 8,
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        width: `${percent}%`,
                        height: '100%',
                        background: isComplete
                            ? 'linear-gradient(90deg, var(--accent-teal), #7be9e0, var(--accent-teal))'
                            : barColor,
                        backgroundSize: isComplete ? '200% 100%' : 'auto',
                        animation: isComplete ? 'dailyTasksGaugeShine 2.4s ease-in-out infinite' : 'none',
                        transition: 'width 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                />
            </div>

            <style>{`
                @keyframes dailyTasksGaugeShine {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
            `}</style>
        </div>
    );
}

function TaskRow({ task, label, value, complete, onIncrement, onSetCounter, onToggle }) {
    const isCounter = task.type === 'counter';
    const numericValue = isCounter ? /** @type {number} */ (value) : (value ? 1 : 0);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 2,
                background: 'var(--bg-void)',
                border: `1px solid ${complete ? 'var(--accent-teal)' : 'var(--border)'}`,
                transition: 'all 0.2s ease',
                opacity: complete ? 0.65 : 1,
            }}
        >
            <div style={{ color: complete ? 'var(--accent-teal)' : 'var(--text-secondary)', flexShrink: 0 }}>
                {complete ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </div>

            <span style={{
                color: 'var(--text-primary)',
                textDecoration: complete ? 'line-through' : 'none',
                flex: 1,
                lineHeight: 1.3,
            }}>
                {label}
            </span>

            {isCounter ? (
                <CounterControl
                    target={task.target}
                    value={numericValue}
                    label={label}
                    onIncrement={onIncrement}
                    onSetCounter={onSetCounter}
                />
            ) : (
                <ToggleSwitch checked={!!value} onToggle={onToggle} label={label} />
            )}
        </div>
    );
}

function CounterControl({ target, value, label, onIncrement, onSetCounter }) {
    const minusDisabled = value <= 0;
    const plusDisabled = value >= target;
    const inputRef = useRef(null);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            flexShrink: 0,
        }}>
            <button
                type="button"
                aria-label={`Decrement ${label}`}
                onClick={() => onIncrement(-1)}
                disabled={minusDisabled}
                style={counterButtonStyle(minusDisabled)}
            >
                <Minus size={14} />
            </button>
            <span
                onClick={() => inputRef.current?.focus()}
                style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    minWidth: '3.2rem',
                    textAlign: 'center',
                    letterSpacing: '0.04em',
                }}
            >
                <input
                    ref={inputRef}
                    type="number"
                    min={0}
                    max={target}
                    step={1}
                    inputMode="numeric"
                    value={value}
                    onChange={(e) => {
                        const n = Number.parseInt(e.target.value, 10);
                        onSetCounter(Number.isFinite(n) ? n : 0);
                    }}
                    aria-label={`${label} progress`}
                    style={{
                        width: '2rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        font: 'inherit',
                        textAlign: 'right',
                        padding: 0,
                        outline: 'none',
                    }}
                />
                <span style={{ color: 'var(--text-secondary)' }}> / {target}</span>
            </span>
            <button
                type="button"
                aria-label={`Increment ${label}`}
                onClick={() => onIncrement(1)}
                disabled={plusDisabled}
                style={counterButtonStyle(plusDisabled)}
            >
                <Plus size={14} />
            </button>
        </div>
    );
}

function counterButtonStyle(disabled) {
    return {
        width: 28,
        height: 28,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: '1px solid var(--border)',
        color: disabled ? 'var(--text-dim, var(--text-secondary))' : 'var(--text-primary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        borderRadius: 2,
        padding: 0,
        transition: 'all 0.15s ease',
    };
}

function ToggleSwitch({ checked, onToggle, label }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={onToggle}
            style={{
                width: 44,
                height: 24,
                borderRadius: 999,
                position: 'relative',
                background: checked ? 'var(--accent-teal)' : 'rgba(255,255,255,0.08)',
                border: `1px solid ${checked ? 'var(--accent-teal)' : 'var(--border)'}`,
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
                transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
        >
            <span
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: 1,
                    left: checked ? 21 : 1,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: checked ? '#0b1418' : 'var(--text-secondary)',
                    transition: 'left 0.2s ease, background 0.2s ease',
                }}
            />
        </button>
    );
}
