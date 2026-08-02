import { describe, it, expect } from 'vitest';
import {
    MAX_LEVEL, MILESTONES, COST_TABLE,
    getCostForLevel, getTotalCost,
} from '../src/lib/championCost.js';

describe('getCostForLevel', () => {
    it('returns the correct cost at range boundaries', () => {
        expect(getCostForLevel(1)).toBe(10);
        expect(getCostForLevel(9)).toBe(10);
        expect(getCostForLevel(10)).toBe(12);
        expect(getCostForLevel(19)).toBe(12);
        expect(getCostForLevel(20)).toBe(14);
        expect(getCostForLevel(190)).toBe(100);
        expect(getCostForLevel(200)).toBe(100);
    });

    it('returns 0 for levels outside the table', () => {
        expect(getCostForLevel(0)).toBe(0);
        expect(getCostForLevel(201)).toBe(0);
    });
});

describe('getTotalCost', () => {
    it('sums costs over the whole range 1 -> 200', () => {
        expect(getTotalCost(1, 200)).toBe(8280);
    });

    it('matches known partial sums', () => {
        expect(getTotalCost(1, 100)).toBe(1956);
        expect(getTotalCost(1, 190)).toBe(7280);
        expect(getTotalCost(150, 180)).toBe(2130);
        expect(getTotalCost(100, 101)).toBe(36);
    });

    it('returns 0 for empty or reversed ranges', () => {
        expect(getTotalCost(20, 20)).toBe(0);
        expect(getTotalCost(200, 1)).toBe(0);
    });

    it('ignores levels beyond 200', () => {
        expect(getTotalCost(199, 201)).toBe(100);
    });
});

describe('constants', () => {
    it('exposes the expected constants', () => {
        expect(MAX_LEVEL).toBe(200);
        expect(MILESTONES).toHaveLength(10);
        expect(MILESTONES[0]).toBe(20);
        expect(COST_TABLE).toHaveLength(21);
        expect(COST_TABLE[0].cost).toBe(10);
    });
});
