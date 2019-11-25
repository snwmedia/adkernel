export declare class RTB {
    static getAllAppBundlesByZone(from: Date, to: Date, zoneId: number, limit?: number): Promise<any[]>;
    static getAllAppBundles(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getAllZones(from: Date, to: Date): Promise<any[]>;
    static getAllZonesByRemoteFeed(from: Date, to: Date, remoteFeedId: number): Promise<any[]>;
    static getAllRemoteFeeds(from: Date, to: Date): Promise<any[]>;
    static getAllRemoteFeedsByZone(from: Date, to: Date, zoneId: number): Promise<any[]>;
}
