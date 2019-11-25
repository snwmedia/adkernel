"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
class RTB {
    static async getAllAppBundlesByZone(from, to, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/app_bundle`;
        let reportList = await common_1.Common.PrepareTheAPICall(from, to, url, limit);
        return reportList;
    }
    static async getAllAppBundles(from, to, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/app_bundle`;
        let reportList = await common_1.Common.PrepareTheAPICall(from, to, url, limit);
        return reportList;
    }
    static async getAllZones(from, to) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone`;
        let reportList = await common_1.Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }
    static async getAllZonesByRemoteFeed(from, to, remoteFeedId) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone`;
        let reportList = await common_1.Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }
    static async getAllRemoteFeeds(from, to) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed`;
        let reportList = await common_1.Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }
    static async getAllRemoteFeedsByZone(from, to, zoneId) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/remotefeed`;
        let reportList = await common_1.Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }
}
exports.RTB = RTB;
//# sourceMappingURL=rtb.js.map