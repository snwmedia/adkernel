"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
class RTB {
    // REPORTS:
    static async getAllZones(from, to) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getAllZonesByRemoteFeed(from, to, remoteFeedId) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getAllRemoteFeeds(from, to) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getAllRemoteFeedsByZone(from, to, zoneId) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/remotefeed`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    //AppBundles reports:
    static async getAllAppBundles(from, to, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/app_bundle`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllAppBundlesByZone(from, to, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/app_bundle`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllAppBundlesByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/app_bundle`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllAppBundlesByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/app_bundle`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    //SiteDomains reports:
    static async getAllSiteDomains(from, to, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/site_domain`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSiteDomainsByZone(from, to, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/site_domain`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSiteDomainsByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/site_domain`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSiteDomainsByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/site_domain`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    //SspPublishers reports:
    static async getAllSspPublishers(from, to, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/ssp_publisher_id`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSspPublishersByZone(from, to, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/ssp_publisher_id`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSspPublishersByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/ssp_publisher_id`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSspPublishersByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/ssp_publisher_id`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
}
exports.RTB = RTB;
//# sourceMappingURL=rtb.js.map