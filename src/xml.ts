import { Common } from './common';


export class Xml {

    public static async getAllRemoteFeedsByPubFeed(from: Date, to: Date, pubFeedId: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed=${pubFeedId}/remotefeed`;
        let reportList: any[] = await Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }

    public static async getAllRemoteFeeds(from: Date, to: Date) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed`;
        let reportList: any[] = await Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }

    public static async getAllPubFeedsByRemoteFeed(from: Date, to: Date, RemoteFeedId: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/feed`;
        let reportList: any[] = await Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }

    public static async getAllPubFeeds(from: Date, to: Date) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed`;
        let reportList: any[] = await Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }
}