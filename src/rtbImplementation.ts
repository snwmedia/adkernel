import { RtbUpdateFile } from "./rtbUpdateFile";
import { Common, Mode } from "../dist";

export class RtbImplementation {

    static urlReport: string = `${process.env.DOMAIN}/api/ZoneReports`;
    static urlAction: string = `${process.env.DOMAIN}/api/ZoneRemoteFeed`;

    // REPORTS:
    public static async getPublisherReport(from: Date, to: Date) {
        let url = `${RtbImplementation.urlReport}/publisher`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getZonesReportByPublisher(from: Date, to: Date, publisherID: number) {
        let url = `${RtbImplementation.urlReport}/publisher=${publisherID}/zone`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getZonesReport(from: Date, to: Date) {
        let url = `${RtbImplementation.urlReport}/zone`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getZonesReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/zone`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getRemoteFeedsReport(from: Date, to: Date) {
        let url = `${RtbImplementation.urlReport}/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getRemoteFeedsReportByZone(from: Date, to: Date, zoneId: number) {
        let url = `${RtbImplementation.urlReport}/zone=${zoneId}/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }



    //AppBundles reports:
    public static async getAppBundlesReport(from: Date, to: Date, limit?: number) {
        let url = `${RtbImplementation.urlReport}/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAppBundlesReportByZone(from: Date, to: Date, zoneId: number, limit?: number) {
        let url = `${RtbImplementation.urlReport}/zone=${zoneId}/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAppBundlesReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAppBundlesReportByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/zone=${zoneId}/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAppBundlesReportByPublisher(from: Date, to: Date, publisherId: number, limit?: number) {
        let url = `${RtbImplementation.urlReport}/publisher=${publisherId}/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }


    //SiteDomains reports:
    public static async getSiteDomainsReport(from: Date, to: Date, limit?: number) {
        let url = `${RtbImplementation.urlReport}/site_domain`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSiteDomainsReportByZone(from: Date, to: Date, zoneId: number, limit?: number) {
        let url = `${RtbImplementation.urlReport}/zone=${zoneId}/site_domain`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSiteDomainsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/site_domain`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSiteDomainsReportByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/zone=${zoneId}/site_domain`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }


    //SspPublishers reports:
    public static async getSspPublishersReport(from: Date, to: Date, limit?: number) {
        let url = `${RtbImplementation.urlReport}/ssp_publisher_id`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSspPublishersReportByZone(from: Date, to: Date, zoneId: number, limit?: number) {
        let url = `${RtbImplementation.urlReport}/zone=${zoneId}/ssp_publisher_id`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSspPublishersReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/ssp_publisher_id`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSspPublishersReportByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number) {
        let url = `${RtbImplementation.urlReport}/remotefeed=${remoteFeedId}/zone=${zoneId}/ssp_publisher_id`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }


    // GET DATA:
    public static async getZoneRemoteFeedData(remoteFeedId: number, zoneId: number) {
        let token = await Common.getToken();
        let url = `${RtbImplementation.urlAction}/?token=${token}&filters=remotefeed:${remoteFeedId};zone:${zoneId}`;
        let remotePublisherFeed: any[] = await Common.getData(url);
        return remotePublisherFeed;
    }

    public static async getZoneData(zoneId: number) {
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/CpmRtbZone/?token=${token}&filters=search:${zoneId}`;
        let remotePublisherFeed: any[] = await Common.getData(url);
        for (let zone in remotePublisherFeed) {
            let zoneObject = remotePublisherFeed[zone];
            if (zoneObject.id === zoneId) {
                return remotePublisherFeed;
            }
        }
        return null;
    }


    public static async createZone(zone: any): Promise<[boolean, string]> {
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/CpmRtbZone/?token=${token}`;
        let status: string = await Common.createData(url, zone);
        if (status && status === Common.OK) {
            return [true, status];
        }
    }



    public static async getRemoteFeedData(remoteFeedId: number) {
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/AdSource/?token=${token}&filters=search:${remoteFeedId}`;
        let remotePublisherFeed: any[] = await Common.getData(url);
        for (let remoteFeed in remotePublisherFeed) {
            let remoteFeedObject = remotePublisherFeed[remoteFeed];
            if (remoteFeedObject.id === remoteFeedId) {
                return remotePublisherFeed;
            }
        }
        return null;
    }


    public static async getPublisherData(publisherId: number) {
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/Publisher/?token=${token}&filters=search:${publisherId}`;
        let publisherFeed: any[] = await Common.getData(url);
        for (let remoteFeed in publisherFeed) {
            let publisherObject = publisherFeed[remoteFeed];
            if (publisherObject.id === publisherId) {
                return publisherObject;
            }
        }
        return null;
    }

    // UPDATE DATA:
    public static async updateSspPublishersByZoneRemoteFeed(remoteFeedId: number, zoneId: number, publisherIdList: Set<string>, publisherIdListMode: Mode): Promise<[boolean, string]> {
        if (!publisherIdList || !publisherIdList.size) { return [false, `The list "publisherIdList" is empty!`]; }
        let token = await Common.getToken();

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
            let subIdString: string = Common.cleanListForUpdate(publisherIdList);
            let json: any = { remotefeed_id: remoteFeedId, zone_id: zoneId, publisher_id_list_mode: publisherIdListMode, publisher_id_list: subIdString };
            let status: string = await Common.updateData(url, json);
            if (status && status === Common.OK) {
                return [true, status];
            }
        }
        console.error('Failed updateSspPublishersByZoneRemoteFeed', `remoteFeedId ${remoteFeedId}`, `zoneId ${zoneId}`);
        return [false, `ERROR updateSspPublishersByZoneRemoteFeed, remoteFeedId ${remoteFeedId}, zoneId ${zoneId}`];

    }

    public static async updateSspSiteDomainsByZoneRemoteFeed(remoteFeedId: number, zoneId: number, listName: string, appsId: Set<string>, mode: Mode): Promise<[boolean, string]> {
        if (!appsId || !appsId.size) { return [false, `The list "appsId" is empty!`]; }
        let jsonFileType: any = { apiType: 'DomainList', jsonName: 'domains', mode: 'referrerlist_mode', jsonListName: 'referrer_list' };
        return await RtbUpdateFile.updateFile(remoteFeedId, zoneId, listName, appsId, jsonFileType, mode);
    }

    public static async updateSspApplicationsByZoneRemoteFeed(remoteFeedId: number, zoneId: number, listName: string, appsId: Set<string>, mode: Mode): Promise<[boolean, string]> {
        if (!appsId || !appsId.size) { return [false, `The list "appsId" is empty!`]; }
        let jsonFileType: any = { apiType: 'AppList', jsonName: 'app_bundles', mode: 'applist_mode', jsonListName: 'app_lists' };
        return await RtbUpdateFile.updateFile(remoteFeedId, zoneId, listName, appsId, jsonFileType, mode);
    }


    public static async resetZoneRemoteFeed(remoteFeedId: number, zoneId: number, affshare: Number): Promise<[boolean, string]> {
        let token = await Common.getToken();
        let zoneRemoteFeed = await RtbImplementation.getZoneRemoteFeedData(remoteFeedId, zoneId);

        if (zoneRemoteFeed) {
            let zoneRemoteFeedId = Number(Object.keys(zoneRemoteFeed)[0]);

            let json: any = {
                remotefeed_id: remoteFeedId,
                zone_id: zoneId,
                publisher_id_list_mode: null,
                applist_mode: null,
                referrerlist_mode: null,
                affshare: affshare
            };
            let url = `${RtbImplementation.urlAction}/${zoneRemoteFeedId}?token=${token}`;
            let status: string = await Common.updateData(url, json);
            if (status && status === Common.OK) {
                return [true, status];
            }
        }
        console.error('Failed resetZoneRemoteFeed', `remoteFeedId ${remoteFeedId}`, `zoneId ${zoneId}`)
        return [false, `ERROR resetZoneRemoteFeed, remoteFeedId ${remoteFeedId}, zoneId ${zoneId}`]
    }

    public static async updateAppList(listName: string, bundles: Set<string>): Promise<[boolean, string]> {
        let token = await Common.getToken();
        if (!bundles || !bundles.size) { return [false, `There is no bundles!`]; }
        let type = 'AppList';
        let appList = await RtbUpdateFile.getAppListByNames(token, type, listName);
        if (!appList) { return [false, `There is no appList "${listName}"!`]; }
        let listId = appList.id;
        let fileId = appList.app_bundles.split('id ').pop();
        let oldAppLists = await RtbUpdateFile.getOldList(token, fileId);
        let oldList: string[] = oldAppLists.split('\n');
        for (let old of oldList) {
            bundles.add(old);
        }
        let updatingAppsString: string = Common.cleanListForUpdate(bundles);
        let newFile = await RtbUpdateFile.uploadList(token, updatingAppsString);
        let newFileId = newFile.created;
        return await RtbUpdateFile.updateList(token, listId, newFileId, 'app_bundles', type);
    }







    public static async removeRemoteFeedsFromZone(zoneId: number, remotefeedsForRemove: number[]): Promise<[boolean, string]> {
        let zoneObject: any = await RtbImplementation.getZoneData(zoneId);
        if (zoneObject) {
            let zone: any = Object.values(zoneObject)[0]
            if (zone) {
                let oldRemoteFeeds: Set<number> = new Set(zone.ad_sources);
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


    public static async updateRemoteFeedListByZone(zoneId: number, remotefeeds: Number[]): Promise<[boolean, string]> {
        let token = await Common.getToken();
        let zoneObject: any = await RtbImplementation.getZoneData(zoneId);
        let zone: any = Object.values(zoneObject)[0];

        let json: any = {
            id: zoneId,
            name: zone.name,
            ad_sources: remotefeeds,
        };
        let url = `${process.env.DOMAIN}/api/CpmRtbZone/${zoneId}?token=${token}`;
        let status: string = await Common.updateData(url, json);
        if (status && status === Common.OK) {
            return [true, status];
        }

        console.error('Failed updateRemoteFeedListByZone', `zoneId ${zoneId}`)
        return [false, `ERROR updateRemoteFeedListByZone, zoneId ${zoneId}`]
    }







    public static async removeZonesFromRemoteFeed(remotefeedId: number, zonesForRemove: number[]): Promise<[boolean, string]> {
        let remoteFeedObject: any = await RtbImplementation.getRemoteFeedData(remotefeedId);
        if (remoteFeedObject) {
            let remoteFeed: any = Object.values(remoteFeedObject)[0]
            if (remoteFeed) {
                let oldZones: Set<number> = new Set(remoteFeed.zones);
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


    public static async updateZoneListByRemoteFeed(remotefeedId: number, zonesForRemove: number[]): Promise<[boolean, string]> {
        let token = await Common.getToken();
        let remoteFeedObject: any = await RtbImplementation.getRemoteFeedData(remotefeedId);
        let remoteFeed: any = Object.values(remoteFeedObject)[0];
        let json: any = {
            id: remotefeedId,
            name: remoteFeed.name,
            zones: zonesForRemove,
        };
        let url = `${process.env.DOMAIN}/api/AdSource/${remotefeedId}?token=${token}`;
        let status: string = await Common.updateData(url, json);
        if (status && status === Common.OK) {
            return [true, status];
        }

        console.error('Failed updateZoneListByRemoteFeed', `remotefeedId ${remotefeedId}`)
        return [false, `ERROR updateZoneListByRemoteFeed, remotefeedId ${remotefeedId}`]
    }
}