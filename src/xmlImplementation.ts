import { Common } from "../dist";

export class XmlImplementation {

    static urlReport: string = `${process.env.DOMAIN}/api/FeedReports`;
    static urlAction: string = `${process.env.DOMAIN}/api/RemotePublisherFeed`;


    // REPORTS:

    public static async getRemoteFeedsReportByPubFeed(from: Date, to: Date, pubFeedId: number) {
        let url = `${XmlImplementation.urlReport}/feed=${pubFeedId}/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getRemoteFeedsReport(from: Date, to: Date) {
        let url = `${XmlImplementation.urlReport}/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getPubFeedsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number) {
        let url = `${XmlImplementation.urlReport}/remotefeed=${remoteFeedId}/feed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getPubFeedsReport(from: Date, to: Date) {
        let url = `${XmlImplementation.urlReport}/feed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }


    //SubIdS reports:
    public static async getSubIdsReport(from: Date, to: Date, limit?: number) {
        let url = `${XmlImplementation.urlReport}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSubIdsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) {
        let url = `${XmlImplementation.urlReport}/remotefeed=${remoteFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSubIdsReportByPublisherFeed(from: Date, to: Date, pubFeedId: number, limit?: number) {
        let url = `${XmlImplementation.urlReport}/feed=${pubFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSubIdsReportByRemotePublisherFeed(from: Date, to: Date, remoteFeedId: number, pubFeedId: number, limit?: number) {
        let url = `${XmlImplementation.urlReport}/remotefeed=${remoteFeedId}/feed=${pubFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }



    // GET DATA:
    public static async getRemotePublisherFeedData(remoteFeedId: number, pubFeedId: number) {
        let token = await Common.getToken();
        let url = `${XmlImplementation.urlAction}/?token=${token}&filters=remotefeed:${remoteFeedId};publisherfeed:${pubFeedId}`;
        let remotePublisherFeed: any[] = await Common.getData(url);
        return remotePublisherFeed;
    }


    // UPDATE DATA:
    public static async updateSubIdsByRemotePublisherFeed(remotePublisherId: number, RemoteFeedId: number, pubFeedId: number, subIdListMode: string, subIdList: Set<string>) {
        let token = await Common.getToken();
        let url = `${XmlImplementation.urlAction}/${remotePublisherId}?token=${token}`;
        let subIdString: string = Common.sortListForUpdate(subIdList);


        let json: any = {};
        json.remotefeed_id = RemoteFeedId;
        json.feed_id = pubFeedId;
        json.subidlist_mode = subIdListMode;
        json.subidlist = subIdString;

        let status: any[] = await Common.UpdateData(url, json);
        return status;
    }
}