"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../dist");
test();
// RTB.getAllAppBundlesByZone(d, d, 84363, 1030);
// RTB.getAllAppBundles(d, d, 1030);
function test() {
    console.log('test running');
    let d = new Date();
    d.setDate(d.getDate() - 1);
    // let url = `${process.env.DOMAIN}/api/ZoneRemoteFeed/333333?token=96DBFcHq9BnOLDf30gip`;
    dist_1.RTB.updateSspPublishersByZoneRemoteFeed(232045, 84363, null, null);
    // Common.UpdateData(url,{});
    // let reportList = XML.getRemotePublisherFeedData(219388, 187893);
    // let reportList = RTB.getZoneRemoteFeedData(84363, 220869);
}
//# sourceMappingURL=test.js.map