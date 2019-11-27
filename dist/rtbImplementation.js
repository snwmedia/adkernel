"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../dist");
class RtbImplementation {
    // REPORTS:
    static async getZonesReport(from, to) {
        let url = `${RtbImplementation.urlReport}/zone`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getZonesReportByRemoteFeed(from, to, remoteFeedId) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/zone`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getRemoteFeedsReport(from, to) {
        let url = `${RtbImplementation.urlReport}/remotefeed`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getRemoteFeedsReportByZone(from, to, zoneId) {
        let url = `${RtbImplementation.urlReport}/zone=${zoneId}/remotefeed`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    //AppBundles reports:
    static async getAppBundlesReport(from, to, limit) {
        let url = `${RtbImplementation.urlReport}/app_bundle`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAppBundlesReportByZone(from, to, zoneId, limit) {
        let url = `${RtbImplementation.urlReport}/zone=${zoneId}/app_bundle`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAppBundlesReportByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/app_bundle`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAppBundlesReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/zone=${zoneId}/app_bundle`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    //SiteDomains reports:
    static async getSiteDomainsReport(from, to, limit) {
        let url = `${RtbImplementation.urlReport}/site_domain`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSiteDomainsReportByZone(from, to, zoneId, limit) {
        let url = `${RtbImplementation.urlReport}/zone=${zoneId}/site_domain`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSiteDomainsReportByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/site_domain`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSiteDomainsReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/zone=${zoneId}/site_domain`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    //SspPublishers reports:
    static async getSspPublishersReport(from, to, limit) {
        let url = `${RtbImplementation.urlReport}/ssp_publisher_id`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSspPublishersReportByZone(from, to, zoneId, limit) {
        let url = `${RtbImplementation.urlReport}/zone=${zoneId}/ssp_publisher_id`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSspPublishersReportByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/ssp_publisher_id`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSspPublishersReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/zone=${zoneId}/ssp_publisher_id`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    // GET DATA:
    static async getZoneRemoteFeedData(remoteFeedId, zoneId) {
        let token = await dist_1.Common.getToken();
        let url = `${RtbImplementation.urlAction}/?token=${token}&filters=remotefeed:${remoteFeedId};zone:${zoneId}`;
        let remotePublisherFeed = await dist_1.Common.getData(url);
        return remotePublisherFeed;
    }
    // UPDATE DATA:
    static async updateSspPublishersByZoneRemoteFeed(zoneRemoteFeedId, remoteFeedId, zoneId, publisherIdListMode, publisherIdList) {
        let token = await dist_1.Common.getToken();
        let url = `${RtbImplementation.urlAction}/${zoneRemoteFeedId}?token=${token}`;
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
RtbImplementation.urlReport = `${process.env.DOMAIN}/api/ZoneReports`;
RtbImplementation.urlAction = `${process.env.DOMAIN}/api/ZoneRemoteFeed`;
exports.RtbImplementation = RtbImplementation;
//# sourceMappingURL=rtbImplementation.js.map