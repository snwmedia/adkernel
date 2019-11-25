import { Common } from './common';


export class Xml {

    // REPORTS:

    public static async getAllRemoteFeedsByPubFeed(from: Date, to: Date, pubFeedId: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed=${pubFeedId}/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getAllRemoteFeeds(from: Date, to: Date) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getAllPubFeedsByRemoteFeed(from: Date, to: Date, RemoteFeedId: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/feed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getAllPubFeeds(from: Date, to: Date) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }


    //SubIdS reports:
    public static async getAllSubIds(from: Date, to: Date, limit?: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAllSubIdsByRemoteFeed(from: Date, to: Date, RemoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAllSubIdsByPublisherFeed(from: Date, to: Date, pubFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed=${pubFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAllSubIdsByRemotePublisherFeed(from: Date, to: Date, RemoteFeedId: number, pubFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/feed=${pubFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
}