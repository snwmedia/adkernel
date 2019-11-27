import { RTB, Mode } from "../dist";

test();
// RTB.getAllAppBundlesByZone(d, d, 84363, 1030);
// RTB.getAllAppBundles(d, d, 1030);

function test() {
    console.log('test running');
    let d = new Date();
    d.setDate(d.getDate() - 1);
    // let reportList = XML.getRemotePublisherFeedData(219388, 187893);
    // let reportList = RTB.getZoneRemoteFeedData(84363, 220869);
    // XML.getRemoteFeedsReport(d, d);
    // let zoneRemoteFeed =  RTB.getZoneRemoteFeedData(236251, 75439);
    // console.log(zoneRemoteFeed)
    let zoneRemoteFeed: any = {};
    zoneRemoteFeed.affshare = 80
    zoneRemoteFeed.app_lists = [6591,7227]
    zoneRemoteFeed.applist_mode = "BLACKLIST"
    zoneRemoteFeed.id = 26003325
    zoneRemoteFeed.impressions_daily = null
    zoneRemoteFeed.impressions_daily_ro = null
    zoneRemoteFeed.publisher_id_list = "2236240500"
    zoneRemoteFeed.publisher_id_list_mode = "BLACKLIST"
    zoneRemoteFeed.referrer_list = []
    zoneRemoteFeed.referrerlist_mode = null
    zoneRemoteFeed.remotefeed_enabled = true
    zoneRemoteFeed.remotefeed_id = 236251
    zoneRemoteFeed.requests_daily = null
    zoneRemoteFeed.zone_enabled = true
    zoneRemoteFeed.zone_id = 75439
    let list: Set<string> = new Set();
    list.add('com.maxlab.fallingmoneywallpaperlte');
    list.add('com.washingtonpost.android');



    RTB.updateSspApplicationsByZoneRemoteFeed(26003325, zoneRemoteFeed, 'shlomyTest', list, Mode.WHITELIST);
    console.log('done');
}