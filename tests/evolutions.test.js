import { describe, it, expect } from 'vitest';
import { 
    calculateCommunityScore, 
    getDynamicDemandTier,
    getDemandTier
} from '../src/lib/evolutions.js';

describe('Game Evolutions & Dynamic Scoring System', () => {
    it('should calculate weighted engagement score correctly from votes and discussion', () => {
        expect(calculateCommunityScore(0, 0)).toBe(0);
        expect(calculateCommunityScore(10, 4)).toBe(12); // 10 + 4*0.5 = 12
        expect(calculateCommunityScore(20, 10)).toBe(25); // 20 + 10*0.5 = 25
    });

    it('should adaptively classify proposals based on the relative distribution of community feedback', () => {
        // Sample pool of 5 community proposals with varying engagement
        const mockPool = [
            { id: '1', votesCount: 50, commentCount: 20 }, // Top requested
            { id: '2', votesCount: 25, commentCount: 10 }, // High
            { id: '3', votesCount: 12, commentCount: 4 },  // Moderate
            { id: '4', votesCount: 4, commentCount: 2 },   // Low
            { id: '5', votesCount: 0, commentCount: 0 },   // Low
        ];

        const tier1 = getDynamicDemandTier(mockPool[0], mockPool);
        const tier2 = getDynamicDemandTier(mockPool[1], mockPool);
        const tier3 = getDynamicDemandTier(mockPool[2], mockPool);
        const tier4 = getDynamicDemandTier(mockPool[3], mockPool);
        const tier5 = getDynamicDemandTier(mockPool[4], mockPool);

        expect(tier1.id).toBe('critical');
        expect(tier2.id).toBe('high');
        expect(tier3.id).toBe('moderate');
        expect(tier4.id).toBe('low');
        expect(tier5.id).toBe('low');
    });

    it('should scale seamlessly for early-stage or brand new proposals', () => {
        // Small early pool of 2 proposals
        const earlyPool = [
            { id: '1', votesCount: 5, commentCount: 2 }, // score 6
            { id: '2', votesCount: 1, commentCount: 0 }, // score 1
        ];

        const tierTop = getDynamicDemandTier(earlyPool[0], earlyPool);
        const tierLow = getDynamicDemandTier(earlyPool[1], earlyPool);

        expect(tierTop.id).toBe('critical');
        expect(tierLow.id).toBe('low');
    });

    it('should maintain backward compatibility with getDemandTier', () => {
        expect(getDemandTier(30).id).toBe('critical');
        expect(getDemandTier(15).id).toBe('high');
        expect(getDemandTier(5).id).toBe('moderate');
        expect(getDemandTier(1).id).toBe('low');
    });
});
