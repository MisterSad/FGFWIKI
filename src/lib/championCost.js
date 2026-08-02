export const MAX_LEVEL = 200;

export const COST_TABLE = [
    { from: 1, to: 9, cost: 10 },
    { from: 10, to: 19, cost: 12 },
    { from: 20, to: 29, cost: 14 },
    { from: 30, to: 39, cost: 16 },
    { from: 40, to: 49, cost: 18 },
    { from: 50, to: 59, cost: 20 },
    { from: 60, to: 69, cost: 22 },
    { from: 70, to: 79, cost: 24 },
    { from: 80, to: 89, cost: 26 },
    { from: 90, to: 99, cost: 32 },
    { from: 100, to: 109, cost: 36 },
    { from: 110, to: 119, cost: 40 },
    { from: 120, to: 129, cost: 45 },
    { from: 130, to: 139, cost: 50 },
    { from: 140, to: 149, cost: 55 },
    { from: 150, to: 159, cost: 60 },
    { from: 160, to: 169, cost: 70 },
    { from: 170, to: 179, cost: 80 },
    { from: 180, to: 189, cost: 90 },
    { from: 190, to: 199, cost: 100 },
    { from: 200, to: 200, cost: 100 },
];

export const MILESTONES = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200];

export function getCostForLevel(lvl) {
    const range = COST_TABLE.find(r => lvl >= r.from && lvl <= r.to);
    return range ? range.cost : 0;
}

export function getTotalCost(fromLvl, toLvl) {
    let total = 0;
    for (let i = fromLvl; i < toLvl; i++) {
        total += getCostForLevel(i + 1);
    }
    return total;
}
