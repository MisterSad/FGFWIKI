export const NEXUS_DATA = {
    kinetic: {
        label: "Kinetic",
        color: "#f59e0b",
        glow: "rgba(245,158,11,0.3)",
        stages: [
            {
                stage: 1, nodes: [
                    { id: "S1-N1", stat: "1% ATK", levelsPerNode: 3, compModsPerLevel: 15, totalCompMods: 45, echoes: 1 },
                    { id: "S1-N2", stat: "1% DEF", levelsPerNode: 3, compModsPerLevel: 15, totalCompMods: 45, echoes: 1 },
                    { id: "S1-N3", stat: "1% INT", levelsPerNode: 3, compModsPerLevel: 15, totalCompMods: 45, echoes: 2 },
                ], milestone: "Unlocks 2nd Echo Slot", totalCompMods: 135, totalEchoes: 4
            },
            {
                stage: 2, nodes: [
                    { id: "S2-N1", stat: "1% ATK", levelsPerNode: 4, compModsPerLevel: 20, totalCompMods: 80, echoes: 1 },
                    { id: "S2-N2", stat: "1% DEF", levelsPerNode: 4, compModsPerLevel: 20, totalCompMods: 80, echoes: 1 },
                    { id: "S2-N3", stat: "1% INT", levelsPerNode: 4, compModsPerLevel: 20, totalCompMods: 80, echoes: 1 },
                    { id: "S2-N4", stat: "1% HP", levelsPerNode: 4, compModsPerLevel: 20, totalCompMods: 80, echoes: 3 },
                ], milestone: "Reduce Counter Attack Dmg Taken 15%", totalCompMods: 320, totalEchoes: 6
            },
            {
                stage: 3, nodes: [
                    { id: "S3-N1", stat: "1% ATK", levelsPerNode: 5, compModsPerLevel: 30, totalCompMods: 150, echoes: 1 },
                    { id: "S3-N2", stat: "1% DEF", levelsPerNode: 5, compModsPerLevel: 30, totalCompMods: 150, echoes: 1 },
                    { id: "S3-N3", stat: "1% INT", levelsPerNode: 5, compModsPerLevel: 30, totalCompMods: 150, echoes: 1 },
                    { id: "S3-N4", stat: "1% HP", levelsPerNode: 5, compModsPerLevel: 30, totalCompMods: 150, echoes: 1 },
                    { id: "S3-N5", stat: "1% ATK", levelsPerNode: 5, compModsPerLevel: 30, totalCompMods: 150, echoes: 8 },
                ], milestone: "Unlocks 3rd Echo Slot", totalCompMods: 750, totalEchoes: 12
            },
            {
                stage: 4, nodes: [
                    { id: "S4-N1", stat: "1% ATK", levelsPerNode: 5, compModsPerLevel: 50, totalCompMods: 250, echoes: 2 },
                    { id: "S4-N2", stat: "1% DEF", levelsPerNode: 5, compModsPerLevel: 50, totalCompMods: 250, echoes: 2 },
                    { id: "S4-N3", stat: "1% INT", levelsPerNode: 5, compModsPerLevel: 50, totalCompMods: 250, echoes: 2 },
                    { id: "S4-N4", stat: "1% HP", levelsPerNode: 5, compModsPerLevel: 50, totalCompMods: 250, echoes: 2 },
                    { id: "S4-N5", stat: "1% ATK", levelsPerNode: 5, compModsPerLevel: 50, totalCompMods: 250, echoes: 2 },
                    { id: "S4-N6", stat: "1% DEF", levelsPerNode: 5, compModsPerLevel: 50, totalCompMods: 250, echoes: 15 },
                ], milestone: "Reduce Normal Attack Dmg Taken 15% · Unlock Beam", totalCompMods: 1500, totalEchoes: 25
            },
            {
                stage: 5, nodes: [
                    { id: "S5-N1", stat: "1.5% ATK", levelsPerNode: 7, compModsPerLevel: 70, totalCompMods: 490, echoes: 3 },
                    { id: "S5-N2", stat: "1.5% DEF", levelsPerNode: 7, compModsPerLevel: 70, totalCompMods: 490, echoes: 3 },
                    { id: "S5-N3", stat: "1.5% INT", levelsPerNode: 7, compModsPerLevel: 70, totalCompMods: 490, echoes: 3 },
                    { id: "S5-N4", stat: "1.5% HP", levelsPerNode: 7, compModsPerLevel: 70, totalCompMods: 490, echoes: 3 },
                    { id: "S5-N5", stat: "1.5% ATK", levelsPerNode: 7, compModsPerLevel: 70, totalCompMods: 490, echoes: 3 },
                    { id: "S5-N6", stat: "1.5% DEF", levelsPerNode: 7, compModsPerLevel: 70, totalCompMods: 490, echoes: 3 },
                    { id: "S5-N7", stat: "1.5% INT", levelsPerNode: 7, compModsPerLevel: 70, totalCompMods: 490, echoes: 30 },
                ], milestone: "Increase Normal Attack Dmg Given 15% · Unlock Ion", totalCompMods: 3430, totalEchoes: 48
            },
            {
                stage: 6, nodes: [
                    { id: "S6-N1", stat: "1.5% ATK", levelsPerNode: 8, compModsPerLevel: 90, totalCompMods: 720, echoes: 3 },
                    { id: "S6-N2", stat: "1.5% DEF", levelsPerNode: 8, compModsPerLevel: 90, totalCompMods: 720, echoes: 3 },
                    { id: "S6-N3", stat: "1.5% INT", levelsPerNode: 8, compModsPerLevel: 90, totalCompMods: 720, echoes: 3 },
                    { id: "S6-N4", stat: "1.5% HP", levelsPerNode: 8, compModsPerLevel: 90, totalCompMods: 720, echoes: 3 },
                    { id: "S6-N5", stat: "1.5% ATK", levelsPerNode: 8, compModsPerLevel: 90, totalCompMods: 720, echoes: 3 },
                    { id: "S6-N6", stat: "1.5% DEF", levelsPerNode: 8, compModsPerLevel: 90, totalCompMods: 720, echoes: 3 },
                    { id: "S6-N7", stat: "1.5% INT", levelsPerNode: 8, compModsPerLevel: 90, totalCompMods: 720, echoes: 3 },
                    { id: "S6-N8", stat: "1.5% HP", levelsPerNode: 8, compModsPerLevel: 90, totalCompMods: 720, echoes: 40 },
                ], milestone: "Unlocks 4th Echo Slot", totalCompMods: 5760, totalEchoes: 61
            },
            {
                stage: 7, nodes: [
                    { id: "S7-N1", stat: "1.5% ATK", levelsPerNode: 10, compModsPerLevel: 100, totalCompMods: 1000, echoes: 5 },
                    { id: "S7-N2", stat: "1.5% DEF", levelsPerNode: 10, compModsPerLevel: 100, totalCompMods: 1000, echoes: 5 },
                    { id: "S7-N3", stat: "1.5% INT", levelsPerNode: 10, compModsPerLevel: 100, totalCompMods: 1000, echoes: 5 },
                    { id: "S7-N4", stat: "1.5% HP", levelsPerNode: 10, compModsPerLevel: 100, totalCompMods: 1000, echoes: 5 },
                    { id: "S7-N5", stat: "1.5% ATK", levelsPerNode: 10, compModsPerLevel: 100, totalCompMods: 1000, echoes: 5 },
                    { id: "S7-N6", stat: "1.5% DEF", levelsPerNode: 10, compModsPerLevel: 100, totalCompMods: 1000, echoes: 5 },
                    { id: "S7-N7", stat: "1.5% INT", levelsPerNode: 10, compModsPerLevel: 100, totalCompMods: 1000, echoes: 5 },
                    { id: "S7-N8", stat: "1.5% HP", levelsPerNode: 10, compModsPerLevel: 100, totalCompMods: 1000, echoes: 5 },
                    { id: "S7-N9", stat: "1.5% ATK", levelsPerNode: 10, compModsPerLevel: 100, totalCompMods: 1000, echoes: 60 },
                ], milestone: "Increase Normal Attack Dmg Given 15%", totalCompMods: 9000, totalEchoes: 100
            },
            {
                stage: 8, nodes: [
                    { id: "S8-N1", stat: "2% ATK", levelsPerNode: 12, compModsPerLevel: 150, totalCompMods: 1800, echoes: 8 },
                    { id: "S8-N2", stat: "2% DEF", levelsPerNode: 12, compModsPerLevel: 150, totalCompMods: 1800, echoes: 8 },
                    { id: "S8-N3", stat: "2% INT", levelsPerNode: 12, compModsPerLevel: 150, totalCompMods: 1800, echoes: 8 },
                    { id: "S8-N4", stat: "2% HP", levelsPerNode: 12, compModsPerLevel: 150, totalCompMods: 1800, echoes: 8 },
                    { id: "S8-N5", stat: "2% ATK", levelsPerNode: 12, compModsPerLevel: 150, totalCompMods: 1800, echoes: 8 },
                    { id: "S8-N6", stat: "2% DEF", levelsPerNode: 12, compModsPerLevel: 150, totalCompMods: 1800, echoes: 8 },
                    { id: "S8-N7", stat: "2% INT", levelsPerNode: 12, compModsPerLevel: 150, totalCompMods: 1800, echoes: 8 },
                    { id: "S8-N8", stat: "2% HP", levelsPerNode: 12, compModsPerLevel: 150, totalCompMods: 1800, echoes: 8 },
                    { id: "S8-N9", stat: "2% ATK", levelsPerNode: 12, compModsPerLevel: 150, totalCompMods: 1800, echoes: 8 },
                    { id: "S8-N10", stat: "2% DEF", levelsPerNode: 12, compModsPerLevel: 150, totalCompMods: 1800, echoes: 80 },
                ], milestone: "Increase Counter Attack Dmg Given 15%", totalCompMods: 18000, totalEchoes: 152
            },
            {
                stage: 9, nodes: [
                    { id: "S9-N1", stat: "2% ATK", levelsPerNode: 15, compModsPerLevel: 200, totalCompMods: 3000, echoes: 12 },
                    { id: "S9-N2", stat: "2% DEF", levelsPerNode: 15, compModsPerLevel: 200, totalCompMods: 3000, echoes: 12 },
                    { id: "S9-N3", stat: "2% INT", levelsPerNode: 15, compModsPerLevel: 200, totalCompMods: 3000, echoes: 12 },
                    { id: "S9-N4", stat: "2% HP", levelsPerNode: 15, compModsPerLevel: 200, totalCompMods: 3000, echoes: 12 },
                    { id: "S9-N5", stat: "2% ATK", levelsPerNode: 15, compModsPerLevel: 200, totalCompMods: 3000, echoes: 12 },
                    { id: "S9-N6", stat: "2% DEF", levelsPerNode: 15, compModsPerLevel: 200, totalCompMods: 3000, echoes: 12 },
                    { id: "S9-N7", stat: "2% INT", levelsPerNode: 15, compModsPerLevel: 200, totalCompMods: 3000, echoes: 12 },
                    { id: "S9-N8", stat: "2% HP", levelsPerNode: 15, compModsPerLevel: 200, totalCompMods: 3000, echoes: 12 },
                    { id: "S9-N9", stat: "2% ATK", levelsPerNode: 15, compModsPerLevel: 200, totalCompMods: 3000, echoes: 12 },
                    { id: "S9-N10", stat: "2% DEF", levelsPerNode: 15, compModsPerLevel: 200, totalCompMods: 3000, echoes: 150 },
                ], milestone: "Increase Counter Attack Dmg Given 15%", totalCompMods: 30000, totalEchoes: 258
            },
            {
                stage: 10, nodes: [
                    { id: "S10-N1", stat: "2.5% ATK", levelsPerNode: 20, compModsPerLevel: 300, totalCompMods: 6000, echoes: 0 },
                    { id: "S10-N2", stat: "2.5% DEF", levelsPerNode: 20, compModsPerLevel: 300, totalCompMods: 6000, echoes: 0 },
                    { id: "S10-N3", stat: "2.5% INT", levelsPerNode: 20, compModsPerLevel: 300, totalCompMods: 6000, echoes: 0 },
                    { id: "S10-N4", stat: "2.5% HP", levelsPerNode: 20, compModsPerLevel: 300, totalCompMods: 6000, echoes: 0 },
                    { id: "S10-N5", stat: "2.5% ATK", levelsPerNode: 20, compModsPerLevel: 300, totalCompMods: 6000, echoes: 0 },
                    { id: "S10-N6", stat: "2.5% DEF", levelsPerNode: 20, compModsPerLevel: 300, totalCompMods: 6000, echoes: 0 },
                    { id: "S10-N7", stat: "2.5% INT", levelsPerNode: 20, compModsPerLevel: 300, totalCompMods: 6000, echoes: 0 },
                    { id: "S10-N8", stat: "2.5% HP", levelsPerNode: 20, compModsPerLevel: 300, totalCompMods: 6000, echoes: 0 },
                    { id: "S10-N9", stat: "2.5% ATK", levelsPerNode: 20, compModsPerLevel: 300, totalCompMods: 6000, echoes: 0 },
                    { id: "S10-N10", stat: "2.5% DEF", levelsPerNode: 20, compModsPerLevel: 300, totalCompMods: 6000, echoes: 0 },
                ], milestone: "Command Points +10", totalCompMods: 60000, totalEchoes: 0
            },
        ],
    },
    beam: {
        label: "Beam",
        color: "#3b82f6",
        glow: "rgba(59,130,246,0.3)",
        stages: [
            {
                stage: 1, nodes: [
                    { id: "S1-N1", stat: "1% ATK", levelsPerNode: 3, compModsPerLevel: 15, totalCompMods: 45, echoes: 1 },
                    { id: "S1-N2", stat: "1% DEF", levelsPerNode: 3, compModsPerLevel: 15, totalCompMods: 45, echoes: 1 },
                    { id: "S1-N3", stat: "1% INT", levelsPerNode: 3, compModsPerLevel: 15, totalCompMods: 45, echoes: 3 },
                ], milestone: "Unlocks 2nd Echo Slot", totalCompMods: 135, totalEchoes: 5
            },
            {
                stage: 2, nodes: [
                    { id: "S2-N1", stat: "1% ATK", levelsPerNode: 4, compModsPerLevel: 30, totalCompMods: 120, echoes: 2 },
                    { id: "S2-N2", stat: "1% DEF", levelsPerNode: 4, compModsPerLevel: 30, totalCompMods: 120, echoes: 2 },
                    { id: "S2-N3", stat: "1% INT", levelsPerNode: 4, compModsPerLevel: 30, totalCompMods: 120, echoes: 2 },
                    { id: "S2-N4", stat: "1% HP", levelsPerNode: 4, compModsPerLevel: 30, totalCompMods: 120, echoes: 6 },
                ], milestone: "Reduce Counter Attack Dmg Taken 15%", totalCompMods: 480, totalEchoes: 12
            },
            {
                stage: 3, nodes: [
                    { id: "S3-N1", stat: "1% ATK", levelsPerNode: 5, compModsPerLevel: 45, totalCompMods: 225, echoes: 3 },
                    { id: "S3-N2", stat: "1% DEF", levelsPerNode: 5, compModsPerLevel: 45, totalCompMods: 225, echoes: 3 },
                    { id: "S3-N3", stat: "1% INT", levelsPerNode: 5, compModsPerLevel: 45, totalCompMods: 225, echoes: 3 },
                    { id: "S3-N4", stat: "1% HP", levelsPerNode: 5, compModsPerLevel: 45, totalCompMods: 225, echoes: 3 },
                    { id: "S3-N5", stat: "1% ATK", levelsPerNode: 5, compModsPerLevel: 45, totalCompMods: 225, echoes: 10 },
                ], milestone: "Unlocks 3rd Echo Slot", totalCompMods: 1125, totalEchoes: 22
            },
            {
                stage: 4, nodes: [
                    { id: "S4-N1", stat: "1% ATK", levelsPerNode: 5, compModsPerLevel: 75, totalCompMods: 375, echoes: 3 },
                    { id: "S4-N2", stat: "1% DEF", levelsPerNode: 5, compModsPerLevel: 75, totalCompMods: 375, echoes: 3 },
                    { id: "S4-N3", stat: "1% INT", levelsPerNode: 5, compModsPerLevel: 75, totalCompMods: 375, echoes: 3 },
                    { id: "S4-N4", stat: "1% HP", levelsPerNode: 5, compModsPerLevel: 75, totalCompMods: 375, echoes: 3 },
                    { id: "S4-N5", stat: "1% ATK", levelsPerNode: 5, compModsPerLevel: 75, totalCompMods: 375, echoes: 3 },
                    { id: "S4-N6", stat: "1% DEF", levelsPerNode: 5, compModsPerLevel: 75, totalCompMods: 375, echoes: 30 },
                ], milestone: "Reduce Normal Attack Dmg Taken 15%", totalCompMods: 2250, totalEchoes: 45
            },
            {
                stage: 5, nodes: [
                    { id: "S5-N1", stat: "1.5% ATK", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 4 },
                    { id: "S5-N2", stat: "1.5% DEF", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 4 },
                    { id: "S5-N3", stat: "1.5% INT", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 4 },
                    { id: "S5-N4", stat: "1.5% HP", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 4 },
                    { id: "S5-N5", stat: "1.5% ATK", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 4 },
                    { id: "S5-N6", stat: "1.5% DEF", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 4 },
                    { id: "S5-N7", stat: "1.5% INT", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 40 },
                ], milestone: "Increase Normal Attack Dmg Given 15%", totalCompMods: 5145, totalEchoes: 64
            },
            {
                stage: 6, nodes: [
                    { id: "S6-N1", stat: "1.5% ATK", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N2", stat: "1.5% DEF", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N3", stat: "1.5% INT", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N4", stat: "1.5% HP", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N5", stat: "1.5% ATK", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N6", stat: "1.5% DEF", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N7", stat: "1.5% INT", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N8", stat: "1.5% HP", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 50 },
                ], milestone: "Unlocks 4th Echo Slot", totalCompMods: 8640, totalEchoes: 92
            },
            {
                stage: 7, nodes: [
                    { id: "S7-N1", stat: "1.5% ATK", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N2", stat: "1.5% DEF", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N3", stat: "1.5% INT", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N4", stat: "1.5% HP", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N5", stat: "1.5% ATK", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N6", stat: "1.5% DEF", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N7", stat: "1.5% INT", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N8", stat: "1.5% HP", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N9", stat: "1.5% ATK", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 100 },
                ], milestone: "Increase Normal Attack Dmg Given 15%", totalCompMods: 13500, totalEchoes: 164
            },
            {
                stage: 8, nodes: [
                    { id: "S8-N1", stat: "2% ATK", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N2", stat: "2% DEF", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N3", stat: "2% INT", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N4", stat: "2% HP", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N5", stat: "2% ATK", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N6", stat: "2% DEF", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N7", stat: "2% INT", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N8", stat: "2% HP", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N9", stat: "2% ATK", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N10", stat: "2% DEF", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 150 },
                ], milestone: "Increase Counter Attack Dmg Given 15%", totalCompMods: 21600, totalEchoes: 258
            },
            {
                stage: 9, nodes: [
                    { id: "S9-N1", stat: "2% ATK", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N2", stat: "2% DEF", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N3", stat: "2% INT", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N4", stat: "2% HP", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N5", stat: "2% ATK", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N6", stat: "2% DEF", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N7", stat: "2% INT", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N8", stat: "2% HP", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N9", stat: "2% ATK", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N10", stat: "2% DEF", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 250 },
                ], milestone: "Increase Counter Attack Dmg Given 15%", totalCompMods: 45000, totalEchoes: 448
            },
            {
                stage: 10, nodes: [
                    { id: "S10-N1", stat: "2.5% ATK", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N2", stat: "2.5% DEF", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N3", stat: "2.5% INT", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N4", stat: "2.5% HP", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N5", stat: "2.5% ATK", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N6", stat: "2.5% DEF", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N7", stat: "2.5% INT", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N8", stat: "2.5% HP", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N9", stat: "2.5% ATK", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N10", stat: "2.5% DEF", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 0 },
                ], milestone: "Command Points +10", totalCompMods: 90000, totalEchoes: 360
            },
        ],
    },
    ion: {
        label: "Ion",
        color: "#a855f7",
        glow: "rgba(168,85,247,0.3)",
        stages: [
            {
                stage: 1, nodes: [
                    { id: "S1-N1", stat: "1% ATK", levelsPerNode: 3, compModsPerLevel: 15, totalCompMods: 45, echoes: 1 },
                    { id: "S1-N2", stat: "1% DEF", levelsPerNode: 3, compModsPerLevel: 15, totalCompMods: 45, echoes: 1 },
                    { id: "S1-N3", stat: "1% INT", levelsPerNode: 3, compModsPerLevel: 15, totalCompMods: 45, echoes: 3 },
                ], milestone: "Unlocks 2nd Echo Slot", totalCompMods: 135, totalEchoes: 5
            },
            {
                stage: 2, nodes: [
                    { id: "S2-N1", stat: "1% ATK", levelsPerNode: 4, compModsPerLevel: 30, totalCompMods: 120, echoes: 2 },
                    { id: "S2-N2", stat: "1% DEF", levelsPerNode: 4, compModsPerLevel: 30, totalCompMods: 120, echoes: 2 },
                    { id: "S2-N3", stat: "1% INT", levelsPerNode: 4, compModsPerLevel: 30, totalCompMods: 120, echoes: 2 },
                    { id: "S2-N4", stat: "1% HP", levelsPerNode: 4, compModsPerLevel: 30, totalCompMods: 120, echoes: 6 },
                ], milestone: "Reduce Counter Attack Dmg Taken 15%", totalCompMods: 480, totalEchoes: 12
            },
            {
                stage: 3, nodes: [
                    { id: "S3-N1", stat: "1% ATK", levelsPerNode: 5, compModsPerLevel: 45, totalCompMods: 225, echoes: 2 },
                    { id: "S3-N2", stat: "1% DEF", levelsPerNode: 5, compModsPerLevel: 45, totalCompMods: 225, echoes: 2 },
                    { id: "S3-N3", stat: "1% INT", levelsPerNode: 5, compModsPerLevel: 45, totalCompMods: 225, echoes: 2 },
                    { id: "S3-N4", stat: "1% HP", levelsPerNode: 5, compModsPerLevel: 45, totalCompMods: 225, echoes: 2 },
                    { id: "S3-N5", stat: "1% ATK", levelsPerNode: 5, compModsPerLevel: 45, totalCompMods: 225, echoes: 15 },
                ], milestone: "Unlocks 3rd Echo Slot", totalCompMods: 1125, totalEchoes: 23
            },
            {
                stage: 4, nodes: [
                    { id: "S4-N1", stat: "1% ATK", levelsPerNode: 5, compModsPerLevel: 75, totalCompMods: 375, echoes: 3 },
                    { id: "S4-N2", stat: "1% DEF", levelsPerNode: 5, compModsPerLevel: 75, totalCompMods: 375, echoes: 3 },
                    { id: "S4-N3", stat: "1% INT", levelsPerNode: 5, compModsPerLevel: 75, totalCompMods: 375, echoes: 3 },
                    { id: "S4-N4", stat: "1% HP", levelsPerNode: 5, compModsPerLevel: 75, totalCompMods: 375, echoes: 3 },
                    { id: "S4-N5", stat: "1% ATK", levelsPerNode: 5, compModsPerLevel: 75, totalCompMods: 375, echoes: 3 },
                    { id: "S4-N6", stat: "1% DEF", levelsPerNode: 5, compModsPerLevel: 75, totalCompMods: 375, echoes: 20 },
                ], milestone: "Reduce Normal Attack Dmg Taken 15%", totalCompMods: 2250, totalEchoes: 35
            },
            {
                stage: 5, nodes: [
                    { id: "S5-N1", stat: "1.5% ATK", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 4 },
                    { id: "S5-N2", stat: "1.5% DEF", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 4 },
                    { id: "S5-N3", stat: "1.5% INT", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 4 },
                    { id: "S5-N4", stat: "1.5% HP", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 4 },
                    { id: "S5-N5", stat: "1.5% ATK", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 4 },
                    { id: "S5-N6", stat: "1.5% DEF", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 4 },
                    { id: "S5-N7", stat: "1.5% INT", levelsPerNode: 7, compModsPerLevel: 105, totalCompMods: 735, echoes: 40 },
                ], milestone: "Increase Normal Attack Dmg Given 15%", totalCompMods: 5145, totalEchoes: 64
            },
            {
                stage: 6, nodes: [
                    { id: "S6-N1", stat: "1.5% ATK", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N2", stat: "1.5% DEF", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N3", stat: "1.5% INT", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N4", stat: "1.5% HP", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N5", stat: "1.5% ATK", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N6", stat: "1.5% DEF", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N7", stat: "1.5% INT", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 6 },
                    { id: "S6-N8", stat: "1.5% HP", levelsPerNode: 8, compModsPerLevel: 135, totalCompMods: 1080, echoes: 50 },
                ], milestone: "Unlocks 4th Echo Slot", totalCompMods: 8640, totalEchoes: 92
            },
            {
                stage: 7, nodes: [
                    { id: "S7-N1", stat: "1.5% ATK", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N2", stat: "1.5% DEF", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N3", stat: "1.5% INT", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N4", stat: "1.5% HP", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N5", stat: "1.5% ATK", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N6", stat: "1.5% DEF", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N7", stat: "1.5% INT", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N8", stat: "1.5% HP", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 8 },
                    { id: "S7-N9", stat: "1.5% ATK", levelsPerNode: 10, compModsPerLevel: 150, totalCompMods: 1500, echoes: 100 },
                ], milestone: "Increase Normal Attack Dmg Given 15%", totalCompMods: 13500, totalEchoes: 164
            },
            {
                stage: 8, nodes: [
                    { id: "S8-N1", stat: "2% ATK", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N2", stat: "2% DEF", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N3", stat: "2% INT", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N4", stat: "2% HP", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N5", stat: "2% ATK", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N6", stat: "2% DEF", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N7", stat: "2% INT", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N8", stat: "2% HP", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N9", stat: "2% ATK", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 12 },
                    { id: "S8-N10", stat: "2% DEF", levelsPerNode: 12, compModsPerLevel: 180, totalCompMods: 2160, echoes: 150 },
                ], milestone: "Increase Counter Attack Dmg Given 15%", totalCompMods: 21600, totalEchoes: 258
            },
            {
                stage: 9, nodes: [
                    { id: "S9-N1", stat: "2% ATK", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N2", stat: "2% DEF", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N3", stat: "2% INT", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N4", stat: "2% HP", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N5", stat: "2% ATK", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N6", stat: "2% DEF", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N7", stat: "2% INT", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N8", stat: "2% HP", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N9", stat: "2% ATK", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 22 },
                    { id: "S9-N10", stat: "2% DEF", levelsPerNode: 15, compModsPerLevel: 300, totalCompMods: 4500, echoes: 250 },
                ], milestone: "Increase Counter Attack Dmg Given 15%", totalCompMods: 45000, totalEchoes: 448
            },
            {
                stage: 10, nodes: [
                    { id: "S10-N1", stat: "2.5% ATK", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N2", stat: "2.5% DEF", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N3", stat: "2.5% INT", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N4", stat: "2.5% HP", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N5", stat: "2.5% ATK", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N6", stat: "2.5% DEF", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N7", stat: "2.5% INT", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N8", stat: "2.5% HP", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N9", stat: "2.5% ATK", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 40 },
                    { id: "S10-N10", stat: "2.5% DEF", levelsPerNode: 20, compModsPerLevel: 450, totalCompMods: 9000, echoes: 0 },
                ], milestone: "Command Points +10", totalCompMods: 90000, totalEchoes: 360
            },
        ],
    },
};
