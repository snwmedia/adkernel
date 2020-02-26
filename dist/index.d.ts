export declare class Common {
    static OK: string;
    static token: Token;
    static _10_Minutes: number;
    static getToken(): Promise<string>;
    static getCustomDate(from: Date, to: Date): string;
    static PrepareAPICallForReports(from: Date, to: Date, url: string, limit?: number): Promise<any[]>;
    static cleanListForUpdate(list: Set<string>): string;
    static getReportListByRecursion(url: string, token: string, timeRange: string, startFrom: number, reportList: any[], limit?: number): Promise<any[]>;
    static getData(url: string): Promise<any>;
    static updateData(url: string, json: any): Promise<any>;
    static createData(url: string, json: any): Promise<any>;
}
export declare class RTB {
    static getRemoteFeedsReport(from: Date, to: Date): Promise<any[]>;
    static getRemoteFeedsReportByZone(from: Date, to: Date, zoneId: number): Promise<any[]>;
    static getZonesReport(from: Date, to: Date): Promise<any[]>;
    static getZonesReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number): Promise<any[]>;
    static getZonesReportByPublisher(from: Date, to: Date, publisherID: number): Promise<any[]>;
    static getPublisherReport(from: Date, to: Date): Promise<any[]>;
    static getAppBundlesReport(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getAppBundlesReportByZone(from: Date, to: Date, zoneId: number, limit?: number): Promise<any[]>;
    static getAppBundlesReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getAppBundlesReportByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number): Promise<any[]>;
    static getAppBundlesReportByPublisher(from: Date, to: Date, publisherId: number, limit?: number): Promise<any[]>;
    static getSiteDomainsReport(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getSiteDomainsReportByZone(from: Date, to: Date, zoneId: number, limit?: number): Promise<any[]>;
    static getSiteDomainsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getSiteDomainsReportByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number): Promise<any[]>;
    static getSspPublishersReport(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getSspPublishersReportByZone(from: Date, to: Date, zoneId: number, limit?: number): Promise<any[]>;
    static getSspPublishersReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getSspPublishersReportByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number): Promise<any[]>;
    static getZoneRemoteFeedData(remoteFeedId: number, zoneId: number): Promise<any[]>;
    static getZoneData(zoneId: number): Promise<any[]>;
    static getZoneDataByName(zoneName: string): Promise<any[]>;
    static getRemoteFeedData(remoteFeedId: number): Promise<any[]>;
    static getPublisherData(publisherId: number): Promise<any>;
    static updateSspPublishersByZoneRemoteFeed(remoteFeedId: number, zoneId: number, publisherIdList: Set<string>, publisherIdListMode: Mode): Promise<[boolean, string]>;
    static updateSspSiteDomainsByZoneRemoteFeed(remoteFeedId: number, zoneId: number, listName: string, appsId: Set<string>, mode: Mode): Promise<[boolean, string]>;
    static updateSspApplicationsByZoneRemoteFeed(remoteFeedId: number, zoneId: number, listName: string, appsId: Set<string>, mode: Mode): Promise<[boolean, string]>;
    static resetZoneRemoteFeed(remoteFeedId: number, zoneId: number, affshare: Number): Promise<[boolean, string]>;
    static updateAppList(listName: string, bundles: Set<string>): Promise<[boolean, string]>;
    static updateRemoteFeedListByZone(zoneId: number, remotefeedsForRemove: number[]): Promise<[boolean, string]>;
    static removeRemoteFeedsFromZone(zoneId: number, remotefeedsForRemove: number[]): Promise<[boolean, string]>;
    static updateZoneListByRemoteFeed(remotefeedId: number, zonesForRemove: number[]): Promise<[boolean, string]>;
    static removeZonesFromRemoteFeed(remotefeedId: number, zonesForRemove: number[]): Promise<[boolean, string]>;
    static createZone(zoneData: any): Promise<[boolean, string]>;
}
export declare class XML {
    static getRemoteFeedsReport(from: Date, to: Date): Promise<any[]>;
    static getRemoteFeedsReportByPubFeed(from: Date, to: Date, pubFeedId: number): Promise<any[]>;
    static getPubFeedsReport(from: Date, to: Date): Promise<any[]>;
    static getPubFeedsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number): Promise<any[]>;
    static getPubFeedsReportByPublisher(from: Date, to: Date, publisherID: number): Promise<any[]>;
    static getPubFeedsReportByCampaign(from: Date, to: Date, campaignId: number): Promise<any[]>;
    static getPublisherReport(from: Date, to: Date): Promise<any[]>;
    static getOffersByCampaign(campaign_id: number): Promise<any[]>;
    static getSubIdsByOfferData(offerId: number): Promise<any[]>;
    static getSubIdsReport(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getSubIdsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getSubIdsReportByPublisherFeed(from: Date, to: Date, pubFeedId: number, limit?: number): Promise<any[]>;
    static getSubIdsReportByRemotePublisherFeed(from: Date, to: Date, remoteFeedId: number, pubFeedId: number, limit?: number): Promise<any[]>;
    static getSubIdsReportByCampaignPublisherFeed(from: Date, to: Date, campaignId: number, pubFeedId: number, limit?: number): Promise<any[]>;
    static getRemotePublisherFeedData(remoteFeedId: number, pubFeedId: number): Promise<any[]>;
    static getRemoteFeedData(remoteFeedId: number): Promise<any[]>;
    static getCampaignData(campaignId: number): Promise<any[]>;
    static updateSubIdsByRemotePublisherFeed(remoteFeedId: number, pubFeedId: number, subIdList: Set<string>, subIdListMode: Mode): Promise<[boolean, string]>;
    static disabledOrEnabledRemoteFeed(remoteFeedId: number, is_active: boolean): Promise<[boolean, string]>;
    static updateOfferBids(offerId: number, pubFeedId: number, subIdsNameAndBid: Map<string, number>): Promise<[boolean, string]>;


}
export declare class Token {
    token: string;
    date: Date;
    constructor(token: string);
}
export declare enum Mode {
    BLACKLIST = "BLACKLIST",
    WHITELIST = "WHITELIST"
}
