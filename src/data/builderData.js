export const BUILDING_CATEGORIES = [
  { label: "Shipyards", buildings: ["Kinetic Shipyard", "Beam Shipyard", "Ion Shipyard"] },
  { label: "Resources", buildings: ["Water Circulation System", "Smelting Room", "Food Processing Room"] },
  { label: "Crew", buildings: ["Crew Cabin 1 & 2", "Recruitment Hall", "Repair Cabin", "Gray's Quarters"] },
  { label: "Combat", buildings: ["Main Cannon", "Self-Defense Artillery", "Hangar"] },
  { label: "Infrastructure", buildings: ["Energy Core", "Engine", "Research Center", "Cargo Hold"] },
  { label: "Commerce", buildings: ["Guild Liason Office", "Trader's Network"] },
];

export const BUILD_SPEED_MODIFIERS = [
  { id: "homePort", label: "Home Port", type: "level", max: 9, values: [0, 0.89, 1.78, 2.67, 3.56, 4.44, 5.33, 6.22, 7.11, 8.00] },
  { id: "modI", label: "Modular Structure I", type: "level", max: 3, values: [0, 0.5, 1, 1.5] },
  { id: "modII", label: "Modular Structure II", type: "level", max: 3, values: [0, 1, 2, 3] },
  { id: "modIII", label: "Modular Structure III", type: "level", max: 4, values: [0, 1.5, 3, 4.5, 6] },
  { id: "modIV", label: "Modular Structure IV", type: "level", max: 5, values: [0, 1.9, 3.8, 5.7, 7.6, 9.5] },
  { id: "gh1", label: "(Guild) Hectic Constr. I", type: "level", max: 5, values: [0, 1, 2, 3, 4, 5] },
  { id: "gh2", label: "(Guild) Hectic Constr. II", type: "level", max: 5, values: [0, 1, 2, 3, 4, 5] },
  { id: "prince", label: "Prince Privilege", type: "toggle", opts: [{ l: "None", v: 0 }, { l: "Constr. Counselor", v: 20 }] },
  { id: "avatar", label: "Avatar Frame", type: "toggle", opts: [{ l: "Default", v: 0 }, { l: "Active (+5%)", v: 5 }] },
  { id: "xarnas", label: "Xarnas Server Buff", type: "toggle", opts: [{ l: "Off", v: 0 }, { l: "On (+10%)", v: 10 }] },
  { id: "other", label: "Other", type: "custom", def: 0 },
];

const SHIPYARD_TIMES = { 1: 3, 2: 5, 3: 20, 4: 60, 5: 170, 6: 650, 7: 1950, 8: 3500, 9: 5250, 10: 7240, 11: 9107, 12: 11491, 13: 14479, 14: 18817, 15: 25770, 16: 35307, 17: 48510, 18: 66490, 19: 93780, 20: 118200, 21: 148990, 22: 187810, 23: 236730, 24: 307860, 25: 354200, 26: 407500, 27: 468830, 28: 539390, 29: 642140 };
const RESOURCE_TIMES = { 1: 2, 7: 452, 8: 813, 9: 1220, 10: 1680, 11: 2113, 12: 2666, 13: 3359, 14: 4365, 15: 5978, 16: 8200, 17: 11230, 18: 15390, 19: 21710, 20: 27370, 21: 34490, 22: 43480, 23: 54800, 24: 71270, 25: 81990, 26: 94330, 27: 108530, 28: 124860, 29: 148650 };
const FOOD_TIMES = { ...RESOURCE_TIMES, 1: 4 };
const CCREW_TIMES = { ...RESOURCE_TIMES, 1: 2 };
const HANGAR_TIMES = { 7: 3389, 8: 6100, 9: 9150, 10: 12600, 11: 15850, 12: 20000, 13: 25200, 14: 32750, 15: 44851, 16: 61450, 17: 84220, 18: 115420, 19: 162754, 20: 205210, 21: 258670, 22: 326050, 23: 410980, 24: 534480, 25: 614920, 26: 707470, 27: 813940, 28: 936440, 29: 1114830 };
const RECRUIT_TIMES = { 7: 678, 8: 1220, 9: 1830, 10: 2520, 11: 3170, 12: 4000, 13: 5040, 14: 6550, 15: 8970, 16: 12290, 17: 16850, 18: 23090, 19: 32560, 20: 41050, 21: 51740, 22: 65210, 23: 82200, 24: 106900, 25: 122990, 26: 141500, 27: 162790, 28: 187290, 29: 222970 };
const CARGO_TIMES = { ...RECRUIT_TIMES, 27: 162780 };
const COMMERCE_TIMES = { 1: 3, 2: 5, 3: 20, 4: 60, 5: 170, 6: 680, 7: 2030, 8: 3650, 9: 5470, 10: 7540, 11: 9485, 12: 11968, 13: 15080, 14: 19598, 15: 26839, 16: 36772, 17: 50530, 18: 69260, 19: 97680, 20: 123130, 21: 155193, 22: 195630, 23: 246590, 24: 320690, 25: 368960, 26: 424480, 27: 488370, 28: 561870, 29: 668900 };

export const BUILD_TIME_DATA = {
  "Kinetic Shipyard": SHIPYARD_TIMES,
  "Beam Shipyard": SHIPYARD_TIMES,
  "Ion Shipyard": SHIPYARD_TIMES,
  "Water Circulation System": RESOURCE_TIMES,
  "Smelting Room": RESOURCE_TIMES,
  "Food Processing Room": FOOD_TIMES,
  "Crew Cabin 1 & 2": CCREW_TIMES,
  "Hangar": HANGAR_TIMES,
  "Research Center": HANGAR_TIMES,
  "Recruitment Hall": RECRUIT_TIMES,
  "Cargo Hold": CARGO_TIMES,
  "Guild Liason Office": COMMERCE_TIMES,
  "Trader's Network": COMMERCE_TIMES,
  "Engine": { 1: 3, 2: 5, 3: 10, 4: 40, 5: 120, 6: 480, 7: 1441, 8: 2593, 9: 3890, 10: 5357, 11: 6739, 12: 8503, 13: 10714, 14: 13924, 15: 19069, 16: 26126, 17: 35940, 18: 49250, 19: 69470, 20: 156000, 21: 110370, 22: 139120, 23: 175360, 24: 228050, 25: 262370, 26: 301860, 27: 347280, 28: 399550, 29: 475664 },
  "Energy Core": { 1: 3, 2: 5, 3: 95, 4: 300, 5: 900, 6: 3600, 7: 10790, 8: 19420, 9: 29130, 10: 40200, 11: 50670, 12: 63935, 13: 80558, 14: 104693, 15: 143377, 16: 196441, 17: 269222, 18: 369340, 19: 520806, 20: 656670, 21: 827730, 22: 1043350, 23: 1315140, 24: 1710340, 25: 1967740, 26: 2263890, 27: 2604600, 28: 2996590, 29: 3567440 },
  "Main Cannon": { 1: 3, 2: 5, 3: 30, 4: 100, 5: 300, 6: 1200, 7: 3600, 8: 6480, 9: 9710, 10: 13371, 11: 16819, 12: 21222, 13: 26740, 14: 34751, 15: 47591, 16: 65204, 17: 89362, 18: 123120, 19: 224400, 20: 218890, 21: 275910, 22: 477000, 23: 438390, 24: 570120, 25: 655920, 26: 754630, 27: 868200, 28: 998870, 29: 1189150 },
  "Self-Defense Artillery": { 1: 2, 7: 811, 8: 1460, 9: 2190, 10: 3016, 11: 3794, 12: 4787, 13: 6032, 14: 7839, 15: 10736, 16: 14750, 17: 20220, 18: 27707, 19: 39080, 20: 49250, 21: 62080, 22: 78260, 23: 98640, 24: 128280, 25: 147590, 26: 169800, 27: 195350, 28: 224750, 29: 267560 },
  "Repair Cabin": { 2: 5, 3: 10, 7: 1296, 8: 2333, 9: 3500, 10: 4820, 11: 6063, 12: 7650, 13: 9639, 14: 12527, 15: 17156, 16: 23600, 17: 32340, 18: 44330, 19: 62520, 20: 78800, 21: 99330, 22: 125210, 23: 157820, 24: 205240, 25: 236130, 26: 271670, 27: 312560, 28: 359600, 29: 428104 },
  "Gray's Quarters": { 1: 2, 7: 811, 8: 1460, 9: 2190, 10: 3016, 11: 3794, 12: 4787, 13: 6032, 14: 7839, 15: 10736, 16: 14750, 17: 20220, 18: 27707, 19: 39080, 20: 49250, 21: 62080, 22: 78260, 23: 98640, 24: 128280, 25: 147590, 26: 169800, 27: 195350, 28: 224750, 29: 267560 },
};

const SH_EST = { 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1 };
const RES_EST = { 7: 1, 8: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1 };
const HANG_EST = { 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 19: 1 };
const REC_EST = { 7: 1, 8: 1 };
const COMM_EST = { 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 21: 1 };

export const ESTIMATED_FLAGS = {
  "Kinetic Shipyard": SH_EST,
  "Beam Shipyard": SH_EST,
  "Ion Shipyard": SH_EST,
  "Water Circulation System": RES_EST,
  "Smelting Room": RES_EST,
  "Food Processing Room": RES_EST,
  "Crew Cabin 1 & 2": { 1: 1, ...RES_EST },
  "Hangar": HANG_EST,
  "Research Center": HANG_EST,
  "Recruitment Hall": REC_EST,
  "Cargo Hold": REC_EST,
  "Guild Liason Office": COMM_EST,
  "Trader's Network": COMM_EST,
  "Engine": { 7: 1, 8: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 29: 1 },
  "Energy Core": { 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 19: 1 },
  "Main Cannon": { 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1 },
  "Self-Defense Artillery": { 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 18: 1 },
  "Repair Cabin": { 7: 1, 8: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 29: 1 },
  "Gray's Quarters": { 1: 1, 7: 1, 8: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1 },
};
