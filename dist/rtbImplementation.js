"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rtbUpdateFile_1 = require("./rtbUpdateFile");
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
        let token = await dist_1.Common.getToken(0);
        let url = `${RtbImplementation.urlAction}/?token=${token}&filters=remotefeed:${remoteFeedId};zone:${zoneId}`;
        let remotePublisherFeed = await dist_1.Common.getData(url, 0);
        return remotePublisherFeed;
    }
    // UPDATE DATA:
    static async updateSspPublishersByZoneRemoteFeed(remoteFeedId, zoneId, publisherIdList, publisherIdListMode) {
        if (!publisherIdList || !publisherIdList.size) {
            return [false, `The list "publisherIdList" is empty!`];
        }
        let token = await dist_1.Common.getToken(0);
        //check if the the existing mode is no different from the new mode:
        let zoneRemoteFeed = await RtbImplementation.getZoneRemoteFeedData(remoteFeedId, zoneId);
        if (zoneRemoteFeed) {
            let zoneRemoteFeedId = Number(Object.keys(zoneRemoteFeed)[0]);
            for (let data in zoneRemoteFeed) {
                let modeExist = zoneRemoteFeed[data].publisher_id_list_mode;
                if (modeExist && modeExist !== publisherIdListMode) {
                    return [false, `The publisher_id_list_mode is already set as ${modeExist}`];
                }
            }
            let url = `${RtbImplementation.urlAction}/${zoneRemoteFeedId}?token=${token}`;
            let subIdString = dist_1.Common.cleanListForUpdate(publisherIdList);
            let json = { remotefeed_id: remoteFeedId, zone_id: zoneId, publisher_id_list_mode: publisherIdListMode, publisher_id_list: subIdString };
            let status = await dist_1.Common.updateData(url, json, 0);
            if (status && status === dist_1.Common.OK) {
                return [true, status];
            }
        }
        console.error('Failed updateSspPublishersByZoneRemoteFeed', `remoteFeedId ${remoteFeedId}`, `zoneId ${zoneId}`);
        return [false, `ERROR updateSspPublishersByZoneRemoteFeed, remoteFeedId ${remoteFeedId}, zoneId ${zoneId}`];
    }
    static async updateSspSiteDomainsByZoneRemoteFeed(remoteFeedId, zoneId, listName, appsId, mode) {
        if (!appsId || !appsId.size) {
            return [false, `The list "appsId" is empty!`];
        }
        let jsonFileType = { apiType: 'DomainList', jsonName: 'domains', mode: 'referrerlist_mode', jsonListName: 'referrer_list' };
        return await rtbUpdateFile_1.RtbUpdateFile.updateFile(remoteFeedId, zoneId, listName, appsId, jsonFileType, mode);
    }
    static async updateSspApplicationsByZoneRemoteFeed(remoteFeedId, zoneId, listName, appsId, mode) {
        if (!appsId || !appsId.size) {
            return [false, `The list "appsId" is empty!`];
        }
        let jsonFileType = { apiType: 'AppList', jsonName: 'app_bundles', mode: 'applist_mode', jsonListName: 'app_lists' };
        return await rtbUpdateFile_1.RtbUpdateFile.updateFile(remoteFeedId, zoneId, listName, appsId, jsonFileType, mode);
    }
    static async resetZoneRemoteFeed(remoteFeedId, zoneId, affshare) {
        let token = await dist_1.Common.getToken(0);
        let zoneRemoteFeed = await RtbImplementation.getZoneRemoteFeedData(remoteFeedId, zoneId);
        if (zoneRemoteFeed) {
            let zoneRemoteFeedId = Number(Object.keys(zoneRemoteFeed)[0]);
            let json = {
                remotefeed_id: remoteFeedId,
                zone_id: zoneId,
                publisher_id_list_mode: null,
                applist_mode: null,
                referrerlist_mode: null,
                affshare: affshare
            };
            let url = `${RtbImplementation.urlAction}/${zoneRemoteFeedId}?token=${token}`;
            let status = await dist_1.Common.updateData(url, json, 0);
            if (status && status === dist_1.Common.OK) {
                return [true, status];
            }
        }
        console.error('Failed resetZoneRemoteFeed', `remoteFeedId ${remoteFeedId}`, `zoneId ${zoneId}`);
        return [false, `ERROR resetZoneRemoteFeed, remoteFeedId ${remoteFeedId}, zoneId ${zoneId}`];
    }
}
exports.RtbImplementation = RtbImplementation;
RtbImplementation.urlReport = `${process.env.DOMAIN}/api/ZoneReports`;
RtbImplementation.urlAction = `${process.env.DOMAIN}/api/ZoneRemoteFeed`;
//# sourceMappingURL=rtbImplementation.js.map