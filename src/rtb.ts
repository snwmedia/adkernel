import { Common } from './common';

export class RTB {




    public static async getAllAppBundlesByZone(from: Date, to: Date, zoneId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/app_bundle`;
        let reportList: any[] = await Common.PrepareTheAPICall(from, to, url, limit);
        return reportList;
    }

    public static async getAllAppBundles(from: Date, to: Date, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/app_bundle`;
        let reportList: any[] = await Common.PrepareTheAPICall(from, to, url, limit);
        return reportList;
    }

    public static async getAllZones(from: Date, to: Date) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone`;
        let reportList: any[] = await Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }

    public static async getAllZonesByRemoteFeed(from: Date, to: Date, remoteFeedId: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone`;
        let reportList: any[] = await Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }

    public static async getAllRemoteFeeds(from: Date, to: Date) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed`;
        let reportList: any[] = await Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }

    public static async getAllRemoteFeedsByZone(from: Date, to: Date, zoneId: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/remotefeed`;
        let reportList: any[] = await Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }











}