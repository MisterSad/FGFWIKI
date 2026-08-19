import { describe, it, expect } from 'vitest';
import { getDemandTier } from '../src/components/GameEvolutions.jsx';

describe('Game Evolutions & Demand Timeline Logic', () => {
    it('should categorize votes into the correct demand tiers along the timeline', () => {
        // Low Tier (1-4 votes)
        expect(getDemandTier(0).id).toBe('low');
        expect(getDemandTier(1).id).toBe('low');
        expect(getDemandTier(4).id).toBe('low');

        // Moderate Tier (5-14 votes)
        expect(getDemandTier(5).id).toBe('moderate');
        expect(getDemandTier(10).id).toBe('moderate');
        expect(getDemandTier(14).id).toBe('moderate');

        // High Tier (15-29 votes)
        expect(getDemandTier(15).id).toBe('high');
        expect(getDemandTier(25).id).toBe('high');
        expect(getDemandTier(29).id).toBe('high');

        // Critical / Top Priority Tier (30+ votes)
        expect(getDemandTier(30).id).toBe('critical');
        expect(getDemandTier(50).id).toBe('critical');
        expect(getDemandTier(100).id).toBe('critical');
    });

    it('should provide distinctive colors and icons for each tier', () => {
        const low = getDemandTier(2);
        const moderate = getDemandTier(8);
        const high = getDemandTier(20);
        const critical = getDemandTier(45);

        expect(low.color).toBe('#64748b');
        expect(moderate.color).toBe('#06b6d4');
        expect(high.color).toBe('#eab308');
        expect(critical.color).toBe('#ef4444');
    });
});
