"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../dist");
test();
// RTB.getAllAppBundlesByZone(d, d, 84363, 1030);
// RTB.getAllAppBundles(d, d, 1030);
function test() {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    //  RTB.getZonesReport(d, d);
    // let url = `${process.env.DOMAIN}/api/ZoneRemoteFeed/333333?token=96DBFcHq9BnOLDf30gip`;
    // RTB.updateSspPublishersByZoneRemoteFeed(232045, 84363, null, null);
    // Common.UpdateData(url,{});
    // let reportList = XML.getRemotePublisherFeedData(219388, 187893);
    // let reportList = RTB.removeRemoteFeedsFromZone(77791,[246137]);
    // let reportList = RTB.getZoneRemoteFeedData( 220869,84363);
    // RTB.resetZoneRemoteFeed(225986, 65261, 70);
    // RTB.removeZonesFromRemoteFeed(232444,[])
    dist_1.RTB.removeRemoteFeedsFromZone(84363, []);
}
//# sourceMappingURL=test.js.map