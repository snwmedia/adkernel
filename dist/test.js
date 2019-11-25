"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_1 = require("./xml");
test();
// RTB.getAllAppBundlesByZone(d, d, 84363, 1030);
// RTB.getAllAppBundles(d, d, 1030);
function test() {
    console.log('test running');
    let d = new Date();
    d.setDate(d.getDate() - 1);
    let reportList = xml_1.Xml.getAllPubFeeds(d, d);
    console.log('done');
}
//# sourceMappingURL=test.js.map