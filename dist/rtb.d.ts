export declare class RTB {
    static getAllZones(from: Date, to: Date): Promise<any[]>;
    static getAllZonesByRemoteFeed(from: Date, to: Date, remoteFeedId: number): Promise<any[]>;
    static getAllRemoteFeeds(from: Date, to: Date): Promise<any[]>;
    static getAllRemoteFeedsByZone(from: Date, to: Date, zoneId: number): Promise<any[]>;
    static getAllAppBundles(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getAllAppBundlesByZone(from: Date, to: Date, zoneId: number, limit?: number): Promise<any[]>;
    static getAllAppBundlesByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getAllAppBundlesByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number): Promise<any[]>;
    static getAllSiteDomains(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getAllSiteDomainsByZone(from: Date, to: Date, zoneId: number, limit?: number): Promise<any[]>;
    static getAllSiteDomainsByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getAllSiteDomainsByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number): Promise<any[]>;
    static getAllSspPublishers(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getAllSspPublishersByZone(from: Date, to: Date, zoneId: number, limit?: number): Promise<any[]>;
    static getAllSspPublishersByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number): Promise<any[]>;
    static getAllSspPublishersByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number): Promise<any[]>;
}
