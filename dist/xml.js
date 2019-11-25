"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
class Xml {
    // REPORTS:
    static async getAllRemoteFeedsByPubFeed(from, to, pubFeedId) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed=${pubFeedId}/remotefeed`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getAllRemoteFeeds(from, to) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getAllPubFeedsByRemoteFeed(from, to, RemoteFeedId) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/feed`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getAllPubFeeds(from, to) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    //SubIdS reports:
    static async getAllSubIds(from, to, limit) {
        let url = `${process.env.DOMAIN}/api/FeedReports/pubsubid`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSubIdsByRemoteFeed(from, to, RemoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/pubsubid`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSubIdsByPublisherFeed(from, to, pubFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed=${pubFeedId}/pubsubid`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSubIdsByRemotePublisherFeed(from, to, RemoteFeedId, pubFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/feed=${pubFeedId}/pubsubid`;
        let reportList = await common_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
}
exports.Xml = Xml;
//# sourceMappingURL=xml.js.map