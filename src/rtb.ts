import { Common } from './common';

export class RTB {

    // REPORTS:

    public static async getAllZones(from: Date, to: Date) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getAllZonesByRemoteFeed(from: Date, to: Date, remoteFeedId: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getAllRemoteFeeds(from: Date, to: Date) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getAllRemoteFeedsByZone(from: Date, to: Date, zoneId: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }



    //AppBundles reports:
    public static async getAllAppBundles(from: Date, to: Date, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAllAppBundlesByZone(from: Date, to: Date, zoneId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAllAppBundlesByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAllAppBundlesByZoneRemoteFeed(from: Date, to: Date, zoneId: number, remoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }



    //SiteDomains reports:
    public static async getAllSiteDomains(from: Date, to: Date, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/site_domain`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAllSiteDomainsByZone(from: Date, to: Date, zoneId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/site_domain`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAllSiteDomainsByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/site_domain`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAllSiteDomainsByZoneRemoteFeed(from: Date, to: Date, zoneId: number, remoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/site_domain`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }


    //SspPublishers reports:
    public static async getAllSspPublishers(from: Date, to: Date, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/ssp_publisher_id`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAllSspPublishersByZone(from: Date, to: Date, zoneId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/ssp_publisher_id`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAllSspPublishersByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/ssp_publisher_id`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAllSspPublishersByZoneRemoteFeed(from: Date, to: Date, zoneId: number, remoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/ssp_publisher_id`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }








}