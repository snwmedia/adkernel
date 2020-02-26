import { Mode } from "../dist";
export declare class XmlImplementation {
    static urlReport: string;
    static urlAction: string;
    static getPublisherReport(from: Date, to: Date): Promise<any[]>;
    static getRemoteFeedsReportByPubFeed(from: Date, to: Date, pubFeedId: number): Promise<any[]>;
    static getRemoteFeedsReport(from: Date, to: Date): Promise<any[]>;
    static getPubFeedsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number): Promise<any[]>;
    static getPubFeedsReportByPublisher(from: Date, to: Date, publisherID: number): Promise<any[]>;
    static getPubFeedsReportByCampaign(from: Date, to: Date, campaignId: number): Promise<any[]>;
    static getPubFeedsReport(from: Date, to: Date): Promise<any[]>;
    static getSubIdsReport(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getSubIdsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getSubIdsReportByPublisherFeed(from: Date, to: Date, pubFeedId: number, limit?: number): Promise<any[]>;
    static getSubIdsReportByRemotePublisherFeed(from: Date, to: Date, remoteFeedId: number, pubFeedId: number, limit?: number): Promise<any[]>;
    static getRemotePublisherFeedData(remoteFeedId: number, pubFeedId: number): Promise<any[]>;
    static getRemoteFeedData(remoteFeedId: number): Promise<any[]>;
    static getCampaignData(campaignId: number): Promise<any>;
    static getOffersByCampaign(campaignId: number): Promise<any[]>;
    static getSubIdsByOfferData(offerId: number): Promise<any[]>;
    static updateSubIdsByRemotePublisherFeed(remoteFeedId: number, pubFeedId: number, subIdList: Set<string>, subIdListMode: Mode): Promise<[boolean, string]>;
    static disabledOrEnabledRemoteFeed(remoteFeedId: number, is_active: boolean): Promise<[boolean, string]>;
    static updateOfferBids(offerId: number, pubFeedId: number, subIdsNameAndBid: Map<string, number>): Promise<[boolean, string]>;
}
