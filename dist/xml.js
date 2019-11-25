"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
class Xml {
    static async getAllRemoteFeedsByPubFeed(from, to, pubFeedId) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed=${pubFeedId}/remotefeed`;
        let reportList = await common_1.Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }
    static async getAllRemoteFeeds(from, to) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed`;
        let reportList = await common_1.Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }
    static async getAllPubFeedsByRemoteFeed(from, to, RemoteFeedId) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/feed`;
        let reportList = await common_1.Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }
    static async getAllPubFeeds(from, to) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed`;
        let reportList = await common_1.Common.PrepareTheAPICall(from, to, url);
        return reportList;
    }
}
exports.Xml = Xml;
//# sourceMappingURL=xml.js.map