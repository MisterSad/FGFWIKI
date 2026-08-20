/**
 * @typedef {'counter' | 'toggle'} DailyTaskType
 *
 * @typedef {Object} DailyTask
 * @property {string} id            Stable identifier used in persistence keys.
 * @property {DailyTaskType} type   Counter (numeric, 0..target) or toggle (boolean, target=1).
 * @property {number} target        Target value to consider the task complete.
 * @property {string} labelKey      i18next key for the human-readable label.
 * @property {string} group         i18next key for the section heading.
 *
 * @typedef {Object} DailyTasksState
 * @property {string} progressDate              UTC date key, format YYYY-MM-DD.
 * @property {Record<string, number>} counters  Counter values keyed by task id.
 * @property {Record<string, boolean>} toggles  Toggle values keyed by task id.
 *
 * @typedef {Object} DailyProgress
 * @property {number} current   Sum of clamped progress across every task.
 * @property {number} total     Sum of every task's target.
 * @property {number} percent   Math.round(current/total*100).
 */

/** @type {readonly DailyTask[]} */
export const DAILY_TASKS = Object.freeze([
    { id: 'shrine_170', type: 'counter', target: 4, labelKey: 'daily_checklist.task.shrine_170', group: 'daily_checklist.group.combat' },
    { id: 'shrine_120', type: 'counter', target: 10, labelKey: 'daily_checklist.task.shrine_120', group: 'daily_checklist.group.combat' },
    { id: 'tribute_vessels', type: 'counter', target: 10, labelKey: 'daily_checklist.task.tribute_vessels', group: 'daily_checklist.group.combat' },
    { id: 'sacred_tribute_vessels', type: 'counter', target: 10, labelKey: 'daily_checklist.task.sacred_tribute_vessels', group: 'daily_checklist.group.combat' },
    { id: 'ark_of_deliverance', type: 'counter', target: 5, labelKey: 'daily_checklist.task.ark_of_deliverance', group: 'daily_checklist.group.combat' },
    { id: 'send_legendary_cargo', type: 'counter', target: 4, labelKey: 'daily_checklist.task.send_legendary_cargo', group: 'daily_checklist.group.economy' },
    { id: 'mine_legendary', type: 'counter', target: 5, labelKey: 'daily_checklist.task.mine_legendary', group: 'daily_checklist.group.economy' },
    { id: 'plunder_legendary_mines', type: 'counter', target: 4, labelKey: 'daily_checklist.task.plunder_legendary_mines', group: 'daily_checklist.group.economy' },
    { id: 'hack_legendary_cargo', type: 'counter', target: 4, labelKey: 'daily_checklist.task.hack_legendary_cargo', group: 'daily_checklist.group.economy' },
    { id: 'auto_join_fleets', type: 'toggle', target: 1, labelKey: 'daily_checklist.task.auto_join_fleets', group: 'daily_checklist.group.fleet' },
    { id: 'arena', type: 'counter', target: 3, labelKey: 'daily_checklist.task.arena', group: 'daily_checklist.group.arena' },
]);

export const TOTAL_TARGET = DAILY_TASKS.reduce((sum, t) => sum + t.target, 0);

/**
 * Returns the current UTC date as a YYYY-MM-DD string. Always UTC — never local.
 * @returns {string}
 */
export function getUtcDateKey() {
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = String(now.getUTCMonth() + 1).padStart(2, '0');
    const d = String(now.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

/**
 * Milliseconds remaining until the next 00:00 UTC.
 * @returns {number}
 */
export function msUntilNextUtcMidnight() {
    const now = new Date();
    const next = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1,
        0, 0, 0, 0
    );
    return Math.max(0, next - now.getTime());
}

/**
 * Builds a fresh state with all counters at 0 and toggles at false.
 * @param {string} [dateKey]
 * @returns {DailyTasksState}
 */
export function createInitialState(dateKey = getUtcDateKey()) {
    /** @type {Record<string, number>} */
    const counters = {};
    /** @type {Record<string, boolean>} */
    const toggles = {};
    for (const task of DAILY_TASKS) {
        if (task.type === 'counter') counters[task.id] = 0;
        else toggles[task.id] = false;
    }
    return { progressDate: dateKey, counters, toggles };
}

/**
 * Detects payloads written by the previous static checklist (booleans keyed by
 * `tribute_1`, `shrine_1`, etc.). Anything missing the `progressDate` field is
 * treated as legacy and gets evicted.
 * @param {unknown} value
 * @returns {boolean}
 */
export function isLegacyState(value) {
    if (!value || typeof value !== 'object') return false;
    return !('progressDate' in value);
}

/**
 * Normalizes a loaded payload into a valid DailyTasksState. Unknown keys are
 * dropped, missing keys are filled with defaults.
 * @param {unknown} raw
 * @param {string} [dateKey]
 * @returns {DailyTasksState}
 */
export function normalizeState(raw, dateKey = getUtcDateKey()) {
    const base = createInitialState(dateKey);
    if (!raw || typeof raw !== 'object') return base;
    const r = /** @type {Record<string, unknown>} */ (raw);
    const progressDate = typeof r.progressDate === 'string' ? r.progressDate : dateKey;
    const counters = { ...base.counters };
    const toggles = { ...base.toggles };
    if (r.counters && typeof r.counters === 'object') {
        for (const task of DAILY_TASKS) {
            if (task.type !== 'counter') continue;
            const v = /** @type {Record<string, unknown>} */ (r.counters)[task.id];
            if (typeof v === 'number' && Number.isFinite(v)) {
                counters[task.id] = clampCounter(task, v);
            }
        }
    }
    if (r.toggles && typeof r.toggles === 'object') {
        for (const task of DAILY_TASKS) {
            if (task.type !== 'toggle') continue;
            const v = /** @type {Record<string, unknown>} */ (r.toggles)[task.id];
            if (typeof v === 'boolean') toggles[task.id] = v;
        }
    }
    return { progressDate, counters, toggles };
}

/**
 * @param {DailyTask} task
 * @param {number} value
 * @returns {number}
 */
export function clampCounter(task, value) {
    if (!Number.isFinite(value)) return 0;
    const v = Math.floor(value);
    if (v < 0) return 0;
    if (v > task.target) return task.target;
    return v;
}

/**
 * Computes aggregate progress across all tasks. Each task contributes
 * min(current, target) to `current` and `target` to `total`.
 * @param {DailyTasksState} state
 * @returns {DailyProgress}
 */
export function computeProgress(state) {
    let current = 0;
    let total = 0;
    for (const task of DAILY_TASKS) {
        total += task.target;
        if (task.type === 'counter') {
            current += Math.min(state.counters[task.id] ?? 0, task.target);
        } else {
            current += state.toggles[task.id] ? task.target : 0;
        }
    }
    const percent = total === 0 ? 0 : Math.round((current / total) * 100);
    return { current, total, percent };
}

/**
 * @param {DailyTasksState} state
 * @param {DailyTask} task
 * @returns {boolean}
 */
export function isTaskComplete(state, task) {
    if (task.type === 'counter') return (state.counters[task.id] ?? 0) >= task.target;
    return !!state.toggles[task.id];
}
