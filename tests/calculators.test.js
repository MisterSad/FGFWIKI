import { describe, it, expect } from 'vitest';
import { 
    BUILDING_CATEGORIES, 
    BUILDING_LABEL_KEYS, 
    BUILD_SPEED_MODIFIERS, 
    BUILD_TIME_DATA 
} from '../src/data/builderData.js';

describe('Game Calculators & Builder Mechanics', () => {
    it('should have all building IDs mapped to translation keys', () => {
        const allCategoryBuildings = BUILDING_CATEGORIES.flatMap(c => c.buildings);
        expect(allCategoryBuildings.length).toBeGreaterThan(0);

        allCategoryBuildings.forEach(buildingId => {
            expect(BUILDING_LABEL_KEYS[buildingId]).toBeDefined();
            expect(typeof BUILDING_LABEL_KEYS[buildingId]).toBe('string');
            expect(BUILDING_LABEL_KEYS[buildingId].startsWith('buildings.')).toBe(true);
        });
    });

    it('should calculate building time reduction accurately with modifiers', () => {
        // Base time calculation test
        const energyCoreTimes = BUILD_TIME_DATA["Energy Core"];
        expect(energyCoreTimes).toBeDefined();
        
        const baseLevel10Time = energyCoreTimes[10];
        expect(baseLevel10Time).toBeGreaterThan(0);

        // Speed bonus formula: reducedTime = baseTime / (1 + bonusPct / 100)
        const calculateReducedTime = (baseTime, bonusPct) => {
            return baseTime / (1 + bonusPct / 100);
        };

        const reducedTime100Bonus = calculateReducedTime(baseLevel10Time, 100);
        expect(reducedTime100Bonus).toBeCloseTo(baseLevel10Time / 2, 2);

        const reducedTime50Bonus = calculateReducedTime(baseLevel10Time, 50);
        expect(reducedTime50Bonus).toBeCloseTo(baseLevel10Time / 1.5, 2);
    });

    it('should have properly calibrated build speed modifiers', () => {
        expect(BUILD_SPEED_MODIFIERS.length).toBeGreaterThan(0);
        
        const princeMod = BUILD_SPEED_MODIFIERS.find(m => m.id === 'prince');
        expect(princeMod).toBeDefined();
        expect(princeMod.opts[1].v).toBe(20);

        const xarnasMod = BUILD_SPEED_MODIFIERS.find(m => m.id === 'xarnas');
        expect(xarnasMod).toBeDefined();
        expect(xarnasMod.opts[1].v).toBe(10);
    });
});
