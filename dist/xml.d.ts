export declare class Xml {
    static getAllRemoteFeedsByPubFeed(from: Date, to: Date, pubFeedId: number): Promise<any[]>;
    static getAllRemoteFeeds(from: Date, to: Date): Promise<any[]>;
    static getAllPubFeedsByRemoteFeed(from: Date, to: Date, RemoteFeedId: number): Promise<any[]>;
    static getAllPubFeeds(from: Date, to: Date): Promise<any[]>;
    static getAllSubIds(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getAllSubIdsByRemoteFeed(from: Date, to: Date, RemoteFeedId: number, limit?: number): Promise<any[]>;
    static getAllSubIdsByPublisherFeed(from: Date, to: Date, pubFeedId: number, limit?: number): Promise<any[]>;
    static getAllSubIdsByRemotePublisherFeed(from: Date, to: Date, RemoteFeedId: number, pubFeedId: number, limit?: number): Promise<any[]>;
}
