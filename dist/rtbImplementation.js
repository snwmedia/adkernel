"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rtbUpdateFile_1 = require("./rtbUpdateFile");
const dist_1 = require("../dist");
class RtbImplementation {
    // REPORTS:
    static async getPublisherReport(from, to) {
        let url = `${RtbImplementation.urlReport}/publisher`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getZonesReportByPublisher(from, to, publisherID) {
        let url = `${RtbImplementation.urlReport}/publisher=${publisherID}/zone`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
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
    static async getAppBundlesReportByPublisher(from, to, publisherId, limit) {
        let url = `${RtbImplementation.urlReport}/publisher=${publisherId}/app_bundle`;
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
    static async getZoneData(zoneId) {
        let token = await dist_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/CpmRtbZone/?token=${token}&filters=search:${zoneId}`;
        let remotePublisherFeed = await dist_1.Common.getData(url);
        for (let zone in remotePublisherFeed) {
            let zoneObject = remotePublisherFeed[zone];
            if (zoneObject.id === zoneId) {
                return remotePublisherFeed;
            }
        }
        return null;
    }
    static async createZone(zone) {
        let token = await dist_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/CpmRtbZone/?token=${token}`;
        let status = await dist_1.Common.createData(url, zone);
        if (status && status === dist_1.Common.OK) {
            return [true, status];
        }
    }
    static async getRemoteFeedData(remoteFeedId) {
        let token = await dist_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/AdSource/?token=${token}&filters=search:${remoteFeedId}`;
        let remotePublisherFeed = await dist_1.Common.getData(url);
        for (let remoteFeed in remotePublisherFeed) {
            let remoteFeedObject = remotePublisherFeed[remoteFeed];
            if (remoteFeedObject.id === remoteFeedId) {
                return remotePublisherFeed;
            }
        }
        return null;
    }
    static async getPublisherData(publisherId) {
        let token = await dist_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/Publisher/?token=${token}&filters=search:${publisherId}`;
        let publisherFeed = await dist_1.Common.getData(url);
        for (let remoteFeed in publisherFeed) {
            let publisherObject = publisherFeed[remoteFeed];
            if (publisherObject.id === publisherId) {
                return publisherObject;
            }
        }
        return null;
    }
    // UPDATE DATA:
    static async updateSspPublishersByZoneRemoteFeed(remoteFeedId, zoneId, publisherIdList, publisherIdListMode) {
        if (!publisherIdList || !publisherIdList.size) {
            return [false, `The list "publisherIdList" is empty!`];
        }
        let token = await dist_1.Common.getToken();
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
            let status = await dist_1.Common.updateData(url, json);
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
        let token = await dist_1.Common.getToken();
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
            let status = await dist_1.Common.updateData(url, json);
            if (status && status === dist_1.Common.OK) {
                return [true, status];
            }
        }
        console.error('Failed resetZoneRemoteFeed', `remoteFeedId ${remoteFeedId}`, `zoneId ${zoneId}`);
        return [false, `ERROR resetZoneRemoteFeed, remoteFeedId ${remoteFeedId}, zoneId ${zoneId}`];
    }
    static async updateAppList(listName, bundles) {
        let token = await dist_1.Common.getToken();
        if (!bundles || !bundles.size) {
            return [false, `There is no bundles!`];
        }
        let type = 'AppList';
        let appList = await rtbUpdateFile_1.RtbUpdateFile.getAppListByNames(token, type, listName);
        if (!appList) {
            return [false, `There is no appList "${listName}"!`];
        }
        let listId = appList.id;
        let fileId = appList.app_bundles.split('id ').pop();
        let oldAppLists = await rtbUpdateFile_1.RtbUpdateFile.getOldList(token, fileId);
        let oldList = oldAppLists.split('\n');
        for (let old of oldList) {
            bundles.add(old);
        }
        let updatingAppsString = dist_1.Common.cleanListForUpdate(bundles);
        let newFile = await rtbUpdateFile_1.RtbUpdateFile.uploadList(token, updatingAppsString);
        let newFileId = newFile.created;
        return await rtbUpdateFile_1.RtbUpdateFile.updateList(token, listId, newFileId, 'app_bundles', type);
    }
    static async removeRemoteFeedsFromZone(zoneId, remotefeedsForRemove) {
        let zoneObject = await RtbImplementation.getZoneData(zoneId);
        if (zoneObject) {
            let zone = Object.values(zoneObject)[0];
            if (zone) {
                let oldRemoteFeeds = new Set(zone.ad_sources);
                for (let remoteFeed of remotefeedsForRemove) {
                    if (oldRemoteFeeds.has(remoteFeed)) {
                        oldRemoteFeeds.delete(remoteFeed);
                    }
                }
                let newRemoteFeed = Array.from(oldRemoteFeeds);
                return await RtbImplementation.updateRemoteFeedListByZone(zoneId, newRemoteFeed);
            }
        }
        console.error('Failed removeRemoteFeedsFromZone', `zoneId ${zoneId}`);
        return [false, `ERROR removeRemoteFeedsFromZone, zoneId ${zoneId}`];
    }
    static async updateRemoteFeedListByZone(zoneId, remotefeeds) {
        let token = await dist_1.Common.getToken();
        let zoneObject = await RtbImplementation.getZoneData(zoneId);
        let zone = Object.values(zoneObject)[0];
        let json = {
            id: zoneId,
            name: zone.name,
            ad_sources: remotefeeds,
        };
        let url = `${process.env.DOMAIN}/api/CpmRtbZone/${zoneId}?token=${token}`;
        let status = await dist_1.Common.updateData(url, json);
        if (status && status === dist_1.Common.OK) {
            return [true, status];
        }
        console.error('Failed updateRemoteFeedListByZone', `zoneId ${zoneId}`);
        return [false, `ERROR updateRemoteFeedListByZone, zoneId ${zoneId}`];
    }
    static async removeZonesFromRemoteFeed(remotefeedId, zonesForRemove) {
        let remoteFeedObject = await RtbImplementation.getRemoteFeedData(remotefeedId);
        if (remoteFeedObject) {
            let remoteFeed = Object.values(remoteFeedObject)[0];
            if (remoteFeed) {
                let oldZones = new Set(remoteFeed.zones);
                for (let zone of zonesForRemove) {
                    if (oldZones.has(zone)) {
                        oldZones.delete(zone);
                    }
                }
                let newZone = Array.from(oldZones);
                return await RtbImplementation.updateZoneListByRemoteFeed(remotefeedId, newZone);
            }
        }
        console.error('Failed removeZonesFromRemoteFeed', `remotefeedId ${remotefeedId}`);
        return [false, `ERROR removeZonesFromRemoteFeed, remotefeedId ${remotefeedId}`];
    }
    static async updateZoneListByRemoteFeed(remotefeedId, zonesForRemove) {
        let token = await dist_1.Common.getToken();
        let remoteFeedObject = await RtbImplementation.getRemoteFeedData(remotefeedId);
        let remoteFeed = Object.values(remoteFeedObject)[0];
        let json = {
            id: remotefeedId,
            name: remoteFeed.name,
            zones: zonesForRemove,
        };
        let url = `${process.env.DOMAIN}/api/AdSource/${remotefeedId}?token=${token}`;
        let status = await dist_1.Common.updateData(url, json);
        if (status && status === dist_1.Common.OK) {
            return [true, status];
        }
        console.error('Failed updateZoneListByRemoteFeed', `remotefeedId ${remotefeedId}`);
        return [false, `ERROR updateZoneListByRemoteFeed, remotefeedId ${remotefeedId}`];
    }
}
exports.RtbImplementation = RtbImplementation;
RtbImplementation.urlReport = `${process.env.DOMAIN}/api/ZoneReports`;
RtbImplementation.urlAction = `${process.env.DOMAIN}/api/ZoneRemoteFeed`;
//# sourceMappingURL=rtbImplementation.js.map