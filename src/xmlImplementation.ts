import { Common, Mode } from "../dist";

export class XmlImplementation {

    static urlReport: string = `${process.env.DOMAIN}/api/FeedReports`;
    static urlAction: string = `${process.env.DOMAIN}/api/RemotePublisherFeed`;


    // REPORTS:
    public static async getPublisherReport(from: Date, to: Date) {
        let url = `${XmlImplementation.urlReport}/publisher`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getRemoteFeedsReportByPubFeed(from: Date, to: Date, pubFeedId: number) {
        let url = `${XmlImplementation.urlReport}/feed=${pubFeedId}/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getRemoteFeedsReport(from: Date, to: Date) {
        let url = `${XmlImplementation.urlReport}/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getPubFeedsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number) {
        let url = `${XmlImplementation.urlReport}/remotefeed=${remoteFeedId}/feed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getPubFeedsReportByPublisher(from: Date, to: Date, publisherID: number) {
        let url = `${XmlImplementation.urlReport}/publisher=${publisherID}/feed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getPubFeedsReportByCampaign(from: Date, to: Date, campaignId: number) {
        let url = `${process.env.DOMAIN}/api/AdvertiserReports/campaign=${campaignId}/feed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getPubFeedsReport(from: Date, to: Date) {
        let url = `${XmlImplementation.urlReport}/feed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }


    //SubIdS reports:
    public static async getSubIdsReport(from: Date, to: Date, limit?: number) {
        let url = `${XmlImplementation.urlReport}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSubIdsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) {
        let url = `${XmlImplementation.urlReport}/remotefeed=${remoteFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSubIdsReportByPublisherFeed(from: Date, to: Date, pubFeedId: number, limit?: number) {
        let url = `${XmlImplementation.urlReport}/feed=${pubFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSubIdsReportByRemotePublisherFeed(from: Date, to: Date, remoteFeedId: number, pubFeedId: number, limit?: number) {
        let url = `${XmlImplementation.urlReport}/remotefeed=${remoteFeedId}/feed=${pubFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSubIdsReportByCampaignPublisherFeed(from: Date, to: Date, campaignId: number, pubFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/AdvertiserReports/campaign=${campaignId}/feed=${pubFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }



    // GET DATA:
    public static async getRemotePublisherFeedData(remoteFeedId: number, pubFeedId: number) {
        let token = await Common.getToken();
        let url = `${XmlImplementation.urlAction}/?token=${token}&filters=remotefeed:${remoteFeedId};publisherfeed:${pubFeedId}`;
        let remotePublisherFeed: any[] = await Common.getData(url);
        return remotePublisherFeed;
    }


    public static async getRemoteFeedData(remoteFeedId: number) {
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/RemoteFeed/?token=${token}&filters=search:${remoteFeedId}`;
        let remotePublisherFeed: any[] = await Common.getData(url);
        for (let remoteFeed in remotePublisherFeed) {
            let remoteFeedObject = remotePublisherFeed[remoteFeed];
            if (remoteFeedObject.id === remoteFeedId) {
                return remotePublisherFeed;
            }
        }
        return null;
    }

    public static async getPubFeedData(pubfeedId: number) {
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/PublisherFeed/?token=${token}&filters=search:${pubfeedId}`;
        let publisherFeed: any[] = await Common.getData(url);
        for (let feed in publisherFeed) {
            let pubFeedObject = publisherFeed[feed];
            if (pubFeedObject.id === pubfeedId) {
                return pubFeedObject;
            }
        }
        return null;
    }

    public static async getCampaignData(campaignId: number) {
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/Campaign/?token=${token}&filters=search:${campaignId}`;
        let campaignData: any = await Common.getData(url);
        for (let campaign in campaignData) {
            let campaignObject = campaignData[campaign];
            if (campaignObject.id === campaignId) {
                return campaignObject;
            }
        }
        return null;
    }


    public static async getOffersByCampaign(campaignId: number) {
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/OfferNew/?token=${token}&filters=campaign:${campaignId};is_active:true`;
        let offerData: any = await Common.getData(url);
        let offers: any[] = [];
        for (let offer in offerData) {
            offers.push(offerData[offer])
        }
        return offers;
    }


    public static async getSubIdsByOfferData(offerId: number) {
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/OfferNew/PublisherSubIds/${offerId}?token=${token}`;
        let offerData: any = await Common.getData(url);
        let allSubIds: any[] = [];
        for (let offer in offerData) {
            let subIds = offerData[offer];
            for (let subId in subIds) {
                allSubIds.push(subIds[subId])
            }
        }
        return allSubIds;
    }






    // UPDATE DATA:
    public static async updateSubIdsByRemotePublisherFeed(remoteFeedId: number, pubFeedId: number, subIdList: Set<string>, subIdListMode: Mode): Promise<[boolean, string]> {
        if (!subIdList || !subIdList.size) { return [false, `The list "subIdList" is empty!`]; }
        let token = await Common.getToken();

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
            let subIdString: string = Common.cleanListForUpdate(subIdList);
            let json: any = { remotefeed_id: remoteFeedId, feed_id: pubFeedId, subidlist_mode: subIdListMode, subidlist: subIdString };
            let status: string = await Common.updateData(url, json);
            if (status && status === Common.OK) {
                return [true, status];
            }
        }
        console.error('Failed updateSubIdsByRemotePublisherFeed', `remoteFeedId ${remoteFeedId}`, `pubFeedId ${pubFeedId}`)
        return [false, `ERROR updateSubIdsByRemotePublisherFeed, remoteFeedId ${remoteFeedId}, pubFeedId ${pubFeedId}`]

    }

    public static async disabledOrEnabledRemoteFeed(remoteFeedId: number, is_active: boolean): Promise<[boolean, string]> {
        let token = await Common.getToken();

        let remoteFeed = await XmlImplementation.getRemoteFeedData(remoteFeedId);
        if (remoteFeed) {
            let remoteFeedData: any = Object.values(remoteFeed)[0];

            let json: any = {
                id: remoteFeedId,
                name: remoteFeedData.name,
                is_active: is_active,
                ad_provider_id: remoteFeedData.ad_provider_id
            };
            let url = `${process.env.DOMAIN}/api/RemoteFeed/${remoteFeedId}?token=${token}`;
            let status: string = await Common.updateData(url, json);
            if (status && status === Common.OK) {
                return [true, status];
            }
        }
        console.error('Failed disabledOrEnabledRemoteFeed', `remoteFeedId ${remoteFeedId}`)
        return [false, `ERROR disabledOrEnabledRemoteFeed, remoteFeedId ${remoteFeedId}`]
    }


    public static async updateOfferBids(offerId: number, pubFeedId: number, subIdsNameAndBid: Map<string, number>): Promise<[boolean, string]> {
        let create: any[] = [];
        for (let [subid, bid] of subIdsNameAndBid) {
            if (subid !== '<blank>') {
                let subIdToUpdate: any = { "pub_feed_id": pubFeedId, "subid": subid, "enabled": true, bid_adjustment: bid }
                create.push(subIdToUpdate);
            }
        }

        let json: any = {};
        json.mode = "UPDATE";
        json.create = create;

        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/OfferNew/PublisherSubIds/${offerId}?token=${token}`;
        let status: string = await Common.updateData(url, json);
        if (status && status === Common.OK) {
            return [true, status];
        }
        console.error('Failed updateOfferBids', `offerId ${offerId}`, `pubFeedId ${pubFeedId}`)
        return [false, `ERROR updateOfferBids, offerId ${offerId}, pubFeedId ${pubFeedId}`]

    }
}