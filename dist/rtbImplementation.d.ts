import { Mode } from "../dist";
export declare class RtbImplementation {
    static urlReport: string;
    static urlAction: string;
    static getZonesReport(from: Date, to: Date): Promise<any[]>;
    static getZonesReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number): Promise<any[]>;
    static getRemoteFeedsReport(from: Date, to: Date): Promise<any[]>;
    static getRemoteFeedsReportByZone(from: Date, to: Date, zoneId: number): Promise<any[]>;
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
    static getZoneData(zoneId: number): Promise<any[]>;
    static updateSspPublishersByZoneRemoteFeed(remoteFeedId: number, zoneId: number, publisherIdList: Set<string>, publisherIdListMode: Mode): Promise<[boolean, string]>;
    static updateSspSiteDomainsByZoneRemoteFeed(remoteFeedId: number, zoneId: number, listName: string, appsId: Set<string>, mode: Mode): Promise<[boolean, string]>;
    static updateSspApplicationsByZoneRemoteFeed(remoteFeedId: number, zoneId: number, listName: string, appsId: Set<string>, mode: Mode): Promise<[boolean, string]>;
    static resetZoneRemoteFeed(remoteFeedId: number, zoneId: number, affshare: Number): Promise<[boolean, string]>;
    static removeRemoteFeedsFromZone(zoneId: number, remotefeedsForRemove: number[]): Promise<[boolean, string]>;
    static updateRemoteFeedListByZone(zoneId: number, remotefeeds: Number[]): Promise<[boolean, string]>;
}
