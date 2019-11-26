import { RTB, XML } from "../dist";

test();
// RTB.getAllAppBundlesByZone(d, d, 84363, 1030);
// RTB.getAllAppBundles(d, d, 1030);

function test() {
    console.log('test running');
    let d = new Date();
    d.setDate(d.getDate() - 1);
    let reportList = XML.getAllSubIdsByRemotePublisherFeed(219388, 187893);
    console.log('done');
}