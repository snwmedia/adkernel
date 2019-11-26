"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../dist");
class RtbImplementation {
    // REPORTS:
    static async getZonesReport(from, to) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getZonesReportByRemoteFeed(from, to, remoteFeedId) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getRemoteFeedsReport(from, to) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getRemoteFeedsReportByZone(from, to, zoneId) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/remotefeed`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    //AppBundles reports:
    static async getAppBundlesReport(from, to, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/app_bundle`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAppBundlesReportByZone(from, to, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/app_bundle`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAppBundlesReportByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/app_bundle`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAppBundlesReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/app_bundle`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    //SiteDomains reports:
    static async getSiteDomainsReport(from, to, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/site_domain`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSiteDomainsReportByZone(from, to, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/site_domain`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSiteDomainsReportByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/site_domain`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSiteDomainsReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/site_domain`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    //SspPublishers reports:
    static async getSspPublishersReport(from, to, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/ssp_publisher_id`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSspPublishersReportByZone(from, to, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/ssp_publisher_id`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSspPublishersReportByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/ssp_publisher_id`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSspPublishersReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/ssp_publisher_id`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    // GET DATA:
    static async getZoneRemoteFeedData(remoteFeedId, zoneId) {
        let token = await dist_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/ZoneRemoteFeed/?token=${token}&filters=remotefeed:${remoteFeedId};zone:${zoneId}`;
        let remotePublisherFeed = await dist_1.Common.getData(url);
        return remotePublisherFeed;
    }
    // UPDATE DATA:
    static async updateSspPublishersByZoneRemoteFeed(zoneRemoteFeedId, remoteFeedId, zoneId, publisherIdListMode, publisherIdList) {
        let token = await dist_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/ZoneRemoteFeed/${zoneRemoteFeedId}?token=${token}`;
        let subIdString = dist_1.Common.sortListForUpdate(publisherIdList);
        let json = {};
        json.remotefeed_id = remoteFeedId;
        json.zone_id = zoneId;
        json.publisher_id_list_mode = publisherIdListMode;
        json.publisher_id_list = subIdString;
        let status = await dist_1.Common.UpdateData(url, json);
        return status;
    }
}
exports.RtbImplementation = RtbImplementation;
//# sourceMappingURL=rtbImplementation.js.map