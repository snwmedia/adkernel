export declare class Xml {
    static getAllRemoteFeedsByPubFeed(from: Date, to: Date, pubFeedId: number): Promise<any[]>;
    static getAllRemoteFeeds(from: Date, to: Date): Promise<any[]>;
    static getAllPubFeedsByRemoteFeed(from: Date, to: Date, RemoteFeedId: number): Promise<any[]>;
    static getAllPubFeeds(from: Date, to: Date): Promise<any[]>;
}
