"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../dist");
class XmlImplementation {
    // REPORTS:
    static async getRemoteFeedsReportByPubFeed(from, to, pubFeedId) {
        let url = `${XmlImplementation.urlReport}/feed=${pubFeedId}/remotefeed`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getRemoteFeedsReport(from, to) {
        let url = `${XmlImplementation.urlReport}/remotefeed`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getPubFeedsReportByRemoteFeed(from, to, remoteFeedId) {
        let url = `${XmlImplementation.urlReport}/remotefeed=${remoteFeedId}/feed`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getPubFeedsReport(from, to) {
        let url = `${XmlImplementation.urlReport}/feed`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    //SubIdS reports:
    static async getSubIdsReport(from, to, limit) {
        let url = `${XmlImplementation.urlReport}/pubsubid`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSubIdsReportByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${XmlImplementation.urlReport}/remotefeed=${remoteFeedId}/pubsubid`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSubIdsReportByPublisherFeed(from, to, pubFeedId, limit) {
        let url = `${XmlImplementation.urlReport}/feed=${pubFeedId}/pubsubid`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getSubIdsReportByRemotePublisherFeed(from, to, remoteFeedId, pubFeedId, limit) {
        let url = `${XmlImplementation.urlReport}/remotefeed=${remoteFeedId}/feed=${pubFeedId}/pubsubid`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    // GET DATA:
    static async getRemotePublisherFeedData(remoteFeedId, pubFeedId) {
        let token = await dist_1.Common.getToken();
        let url = `${XmlImplementation.urlAction}/?token=${token}&filters=remotefeed:${remoteFeedId};publisherfeed:${pubFeedId}`;
        let remotePublisherFeed = await dist_1.Common.getData(url);
        return remotePublisherFeed;
    }
    // UPDATE DATA:
    static async updateSubIdsByRemotePublisherFeed(remoteFeedId, pubFeedId, subIdList, subIdListMode) {
        if (!subIdList || !subIdList.size) {
            return [false, `The list "subIdList" is empty!`];
        }
        let token = await dist_1.Common.getToken();
        //check if the the existing mode is no different from the new mode:
        let remotePublisherFeed = await XmlImplementation.getRemotePublisherFeedData(remoteFeedId, pubFeedId);
        let remotePublisherId = Object.keys(remotePublisherFeed)[0];
        for (let data in remotePublisherFeed) {
            let modeExist = remotePublisherFeed[data].subidlist_mode;
            if (modeExist && modeExist !== subIdListMode) {
                return [false, `The subidlist_mode is already set as ${modeExist}`];
            }
        }
        let url = `${XmlImplementation.urlAction}/${remotePublisherId}?token=${token}`;
        let subIdString = dist_1.Common.cleanListForUpdate(subIdList);
        let json = { remotefeed_id: remoteFeedId, feed_id: pubFeedId, subidlist_mode: subIdListMode, subidlist: subIdString };
        let status = await dist_1.Common.UpdateData(url, json);
        if (status === dist_1.Common.OK) {
            return [true, status];
        }
        console.error('Failed updateSubIdsByRemotePublisherFeed', status);
        return [false, `ERROR updateSubIdsByRemotePublisherFeed ${status}`];
    }
}
exports.XmlImplementation = XmlImplementation;
XmlImplementation.urlReport = `${process.env.DOMAIN}/api/FeedReports`;
XmlImplementation.urlAction = `${process.env.DOMAIN}/api/RemotePublisherFeed`;
//# sourceMappingURL=xmlImplementation.js.map