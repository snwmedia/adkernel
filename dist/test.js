"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rtb_1 = require("./rtb");
test();
// RTB.getAllAppBundlesByZone(d, d, 84363, 1030);
// RTB.getAllAppBundles(d, d, 1030);
function test() {
    console.log('test running');
    let d = new Date();
    d.setDate(d.getDate() - 1);
    rtb_1.RTB.getAllZones(d, d);
}
//# sourceMappingURL=test.js.map