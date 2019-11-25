import { RTB } from "./rtb";
import { Xml } from "./xml";

test();
// RTB.getAllAppBundlesByZone(d, d, 84363, 1030);
// RTB.getAllAppBundles(d, d, 1030);

function test() {
    console.log('test running');
    let d = new Date();
    d.setDate(d.getDate() - 1);
    let reportList = Xml.getAllSubIdsByRemoteFeed(d, d, 219388,10);
    console.log('done');
}