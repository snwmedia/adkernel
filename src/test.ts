import { RTB, Common, XML, Mode } from "../dist";
import { RtbImplementation } from "./rtbImplementation";

test();
// RTB.getAllAppBundlesByZone(d, d, 84363, 1030);
// RTB.getAllAppBundles(d, d, 1030);
// let sspsId: Set<string> = new Set();
// sspsId.add('com.zplay.idlelandmarks');
// sspsId.add('pl.org.chmiel.harmonogram4');
// RtbImplementation.updateSspApplicationsByZoneRemoteFeed(254877, 61021, 'zoneRemoteFeedId 31038411 Ssp Applications BL', sspsId, Mode.BLACKLIST);

function test() {
    let to = new Date();
    to.setDate(to.getDate() - 2);
    let from = new Date();
    from.setDate(from.getDate() - 15);
    // XML.getPubFeedData(170776);


    // XML.getPubFeedsReportByPublisher(from, to,35152)
    // XML.getRemoteFeedData(217419);
    // XML.disabledOrEnabledRemoteFeed(217419, true);
    // RTB.getAppBundlesReportByPublisher(from, to, 40542)

    // RTB.getZoneDataByName( "GothamAds (RTB)_app_WL_2020-01-20_test")
    // let bundlesSet: Set<string> = new Set(['com.apalon.myclockfree', "com.qcdroid.android.qcdroid", "com.pe.fakegps"]);
    // RTB.updateAppList('avt_auto', bundlesSet);
    // let url = `${process.env.DOMAIN}/api/ZoneRemoteFeed/333333?token=96DBFcHq9BnOLDf30gip`;
    // RTB.updateSspPublishersByZoneRemoteFeed(232045, 84363, null, null);
    // Common.UpdateData(url,{});
    // let reportList = XML.getRemotePublisherFeedData(219388, 187893);
    // let reportList = RTB.removeRemoteFeedsFromZone(77791,[246137]);


    // let reportList = RTB.getZoneRemoteFeedData( 220869,84363);
    // RTB.resetZoneRemoteFeed(225986, 65261, 70);
    // RTB.removeZonesFromRemoteFeed(232444,[])
    // RTB.removeRemoteFeedsFromZone(84363,[])

}