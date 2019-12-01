export declare class Common {
    static token: string;
    static yesterday: string;
    static getToken(): Promise<string>;
    static getCustomDate(from: Date, to: Date): string;
    static PrepareAPICallForReports(from: Date, to: Date, url: string, limit?: number): Promise<any[]>;
    static cleanListForUpdate(list: Set<string>): string;
    static getReportListByRecursion(url: string, token: string, timeRange: string, startFrom: number, reportList: any[], limit?: number): Promise<any[]>;
    static getData(url: string): Promise<any>;
    static UpdateData(url: string, json: any): Promise<any>;
}
export declare class RTB {
    static getRemoteFeedsReport(from: Date, to: Date): Promise<any[]>;
    static getRemoteFeedsReportByZone(from: Date, to: Date, zoneId: number): Promise<any[]>;
    static getZonesReport(from: Date, to: Date): Promise<any[]>;
    static getZonesReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number): Promise<any[]>;
    static getAppBundlesReport(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getAppBundlesReportByZone(from: Date, to: Date, zoneId: number, limit?: number): Promise<any[]>;
    static getAppBundlesReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getAppBundlesReportByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number): Promise<any[]>;
    static getSiteDomainsReport(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getSiteDomainsReportByZone(from: Date, to: Date, zoneId: number, limit?: number): Promise<any[]>;
    static getSiteDomainsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getSiteDomainsReportByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number): Promise<any[]>;
    static getSspPublishersReport(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getSspPublishersReportByZone(from: Date, to: Date, zoneId: number, limit?: number): Promise<any[]>;
    static getSspPublishersReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getSspPublishersReportByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number): Promise<any[]>;
    static getZoneRemoteFeedData(remoteFeedId: number, zoneId: number): Promise<any[]>;
    static updateSspPublishersByZoneRemoteFeed(remoteFeedId: number, zoneId: number, publisherIdList: Set<string>, publisherIdListMode: Mode): Promise<[boolean, string]>;
    static updateSspSiteDomainsByZoneRemoteFeed(zoneRemoteFeedId: number, zoneRemoteObject: any, listName: string, appsId: Set<string>, mode: Mode): Promise<[boolean, string]>;
    static updateSspApplicationsByZoneRemoteFeed(zoneRemoteFeedId: number, zoneRemoteObject: any, listName: string, appsId: Set<string>, mode: Mode): Promise<[boolean, string]>;
}
export declare class XML {
    static getRemoteFeedsReport(from: Date, to: Date): Promise<any[]>;
    static getRemoteFeedsReportByPubFeed(from: Date, to: Date, pubFeedId: number): Promise<any[]>;
    static getPubFeedsReport(from: Date, to: Date): Promise<any[]>;
    static getPubFeedsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number): Promise<any[]>;
    static getSubIdsReport(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getSubIdsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getSubIdsReportByPublisherFeed(from: Date, to: Date, pubFeedId: number, limit?: number): Promise<any[]>;
    static getSubIdsReportByRemotePublisherFeed(from: Date, to: Date, remoteFeedId: number, pubFeedId: number, limit?: number): Promise<any[]>;
    static getRemotePublisherFeedData(remoteFeedId: number, pubFeedId: number): Promise<any[]>;
    static updateSubIdsByRemotePublisherFeed(remotePublisherId: number, RemoteFeedId: number, pubFeedId: number, subIdList: Set<string>, subIdListMode: Mode): Promise<[boolean, string]>;
}
export declare enum Mode {
    BLACKLIST = "BLACKLIST",
    WHITELIST = "WHITELIST"
}
