import { RtbUpdateFile } from "./rtbUpdateFile";
import { Common } from "../dist";

export class RtbImplementation {

    static urlReport: string = `${process.env.DOMAIN}/api/ZoneReports`;
    static urlAction: string = `${process.env.DOMAIN}/api/ZoneRemoteFeed`;

    // REPORTS:
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

    // UPDATE DATA:
    public static async updateSspPublishersByZoneRemoteFeed(zoneRemoteFeedId: number, remoteFeedId: number, zoneId: number, publisherIdListMode: string, publisherIdList: Set<string>) {
        let token = await Common.getToken();
        let url = `${RtbImplementation.urlAction}/${zoneRemoteFeedId}?token=${token}`;
        let subIdString: string = Common.cleanListForUpdate(publisherIdList);
        let json: any = { remotefeed_id: remoteFeedId, zone_id: zoneId, publisher_id_list_mode: publisherIdListMode, publisher_id_list: subIdString };
        let status: any[] = await Common.UpdateData(url, json);
        return status;
    }

    public static async updateSspSiteDomainsByZoneRemoteFeed(zoneRemoteFeedId: number, zoneRemoteObject: any, listName: string, appsId: Set<string>): Promise<boolean> {
        let jsonFileType: any = { apiType: 'DomainList', jsonName: 'domains', mode: 'referrerlist_mode', jsonListName: 'referrer_list' };
        return await RtbUpdateFile.updateFile(zoneRemoteFeedId, zoneRemoteObject, listName, appsId, jsonFileType);
    }

    public static async updateSspApplicationsByZoneRemoteFeed(zoneRemoteFeedId: number, zoneRemoteObject: any, listName: string, appsId: Set<string>): Promise<boolean> {
        let jsonFileType: any = { apiType: 'AppList', jsonName: 'app_bundles', mode: 'applist_mode', jsonListName: 'app_lists' };
        return await RtbUpdateFile.updateFile(zoneRemoteFeedId, zoneRemoteObject, listName, appsId, jsonFileType);
    }



}