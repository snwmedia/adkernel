"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../dist");
console.log('test running');
let d = new Date();
d.setDate(d.getDate() - 1);
await dist_1.RTB.getAllZones(d, d);
// RTB.getAllAppBundlesByZone(d, d, 84363, 1030);
// RTB.getAllAppBundles(d, d, 1030);
//# sourceMappingURL=test.js.map