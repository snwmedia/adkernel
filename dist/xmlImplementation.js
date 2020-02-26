"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../dist");
class XmlImplementation {
    // REPORTS:
    static async getPublisherReport(from, to) {
        let url = `${XmlImplementation.urlReport}/publisher`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
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
    static async getPubFeedsReportByPublisher(from, to, publisherID) {
        let url = `${XmlImplementation.urlReport}/publisher=${publisherID}/feed`;
        let reportList = await dist_1.Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getPubFeedsReportByCampaign(from, to, campaignId) {
        let url = `${process.env.DOMAIN}/api/AdvertiserReports/campaign=${campaignId}/feed`;
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
    static async getRemoteFeedData(remoteFeedId) {
        let token = await dist_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/RemoteFeed/?token=${token}&filters=search:${remoteFeedId}`;
        let remotePublisherFeed = await dist_1.Common.getData(url);
        for (let remoteFeed in remotePublisherFeed) {
            let remoteFeedObject = remotePublisherFeed[remoteFeed];
            if (remoteFeedObject.id === remoteFeedId) {
                return remotePublisherFeed;
            }
        }
        return null;
    }
    static async getCampaignDAta(campaignId) {
        let token = await dist_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/Campaign/?token=${token}&filters=search:${campaignId}`;
        let campaignData = await dist_1.Common.getData(url);
        for (let campaign in campaignData) {
            let campaignObject = campaignData[campaign];
            if (campaignObject.id === campaignId) {
                return campaignObject;
            }
        }
        return null;
    }
    static async getOffersByCampaign(campaignId) {
        let token = await dist_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/OfferNew/?token=${token}&filters=campaign:${campaignId};is_active:true`;
        let offerData = await dist_1.Common.getData(url);
        let offers = [];
        for (let offer in offerData) {
            offers.push(offerData[offer]);
        }
        return offers;
    }
    static async getSubIdsByOfferData(offerId) {
        let token = await dist_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/OfferNew/PublisherSubIds/${offerId}?token=${token}`;
        let offerData = await dist_1.Common.getData(url);
        let allSubIds = [];
        for (let offer in offerData) {
            let subIds = offerData[offer];
            for (let subId in subIds) {
                allSubIds.push(subIds[subId]);
            }
        }
        return allSubIds;
    }
    // UPDATE DATA:
    static async updateSubIdsByRemotePublisherFeed(remoteFeedId, pubFeedId, subIdList, subIdListMode) {
        if (!subIdList || !subIdList.size) {
            return [false, `The list "subIdList" is empty!`];
        }
        let token = await dist_1.Common.getToken();
        //check if the the existing mode is no different from the new mode:
        let remotePublisherFeed = await XmlImplementation.getRemotePublisherFeedData(remoteFeedId, pubFeedId);
        if (remotePublisherFeed) {
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
            let status = await dist_1.Common.updateData(url, json);
            if (status && status === dist_1.Common.OK) {
                return [true, status];
            }
        }
        console.error('Failed updateSubIdsByRemotePublisherFeed', `remoteFeedId ${remoteFeedId}`, `pubFeedId ${pubFeedId}`);
        return [false, `ERROR updateSubIdsByRemotePublisherFeed, remoteFeedId ${remoteFeedId}, pubFeedId ${pubFeedId}`];
    }
    static async disabledOrEnabledRemoteFeed(remoteFeedId, is_active) {
        let token = await dist_1.Common.getToken();
        let remoteFeed = await XmlImplementation.getRemoteFeedData(remoteFeedId);
        if (remoteFeed) {
            let remoteFeedData = Object.values(remoteFeed)[0];
            let json = {
                id: remoteFeedId,
                name: remoteFeedData.name,
                is_active: is_active,
                ad_provider_id: remoteFeedData.ad_provider_id
            };
            let url = `${process.env.DOMAIN}/api/RemoteFeed/${remoteFeedId}?token=${token}`;
            let status = await dist_1.Common.updateData(url, json);
            if (status && status === dist_1.Common.OK) {
                return [true, status];
            }
        }
        console.error('Failed disabledOrEnabledRemoteFeed', `remoteFeedId ${remoteFeedId}`);
        return [false, `ERROR disabledOrEnabledRemoteFeed, remoteFeedId ${remoteFeedId}`];
    }
    static async updateOfferBids(offerId, pubFeedId, subIdsNameAndBid) {
        let create = [];
        for (let [subid, bid] of subIdsNameAndBid) {
            if (subid !== '<blank>') {
                let subIdToUpdate = { "pub_feed_id": pubFeedId, "subid": subid, "enabled": true, bid_adjustment: bid };
                create.push(subIdToUpdate);
            }
        }
        let json = {};
        json.mode = "UPDATE";
        json.create = create;
        let token = await dist_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/OfferNew/PublisherSubIds/${offerId}?token=${token}`;
        let status = await dist_1.Common.updateData(url, json);
        if (status && status === dist_1.Common.OK) {
            return [true, status];
        }
        console.error('Failed updateOfferBids', `offerId ${offerId}`, `pubFeedId ${pubFeedId}`);
        return [false, `ERROR updateOfferBids, offerId ${offerId}, pubFeedId ${pubFeedId}`];
    }
}
exports.XmlImplementation = XmlImplementation;
XmlImplementation.urlReport = `${process.env.DOMAIN}/api/FeedReports`;
XmlImplementation.urlAction = `${process.env.DOMAIN}/api/RemotePublisherFeed`;
//# sourceMappingURL=xmlImplementation.js.map