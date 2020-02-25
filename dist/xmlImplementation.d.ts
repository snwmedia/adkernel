import { Mode } from "../dist";
export declare class XmlImplementation {
    static urlReport: string;
    static urlAction: string;
    static getPublisherReport(from: Date, to: Date): Promise<any[]>;
    static getRemoteFeedsReportByPubFeed(from: Date, to: Date, pubFeedId: number): Promise<any[]>;
    static getRemoteFeedsReport(from: Date, to: Date): Promise<any[]>;
    static getPubFeedsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number): Promise<any[]>;
    static getPubFeedsReport(from: Date, to: Date): Promise<any[]>;
    static getSubIdsReport(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getSubIdsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getSubIdsReportByPublisherFeed(from: Date, to: Date, pubFeedId: number, limit?: number): Promise<any[]>;
    static getSubIdsReportByRemotePublisherFeed(from: Date, to: Date, remoteFeedId: number, pubFeedId: number, limit?: number): Promise<any[]>;
    static getRemotePublisherFeedData(remoteFeedId: number, pubFeedId: number): Promise<any[]>;
    static getRemoteFeedData(remoteFeedId: number): Promise<any[]>;
    static updateSubIdsByRemotePublisherFeed(remoteFeedId: number, pubFeedId: number, subIdList: Set<string>, subIdListMode: Mode): Promise<[boolean, string]>;
    static disabledOrEnabledRemoteFeed(remoteFeedId: number, is_active: boolean): Promise<[boolean, string]>;
}
