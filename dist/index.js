"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const xmlImplementation_1 = require("./xmlImplementation");
const rtbImplementation_1 = require("./rtbImplementation");
class Common {
    static async getToken() {
        if (Common.token)
            return Common.token;
        if (process.env.DOMAIN && process.env.USER && process.env.PASS) {
            console.log(`authenticating ${process.env.DOMAIN} User:${process.env.USER}`);
        }
        else {
            throw (`Set environment variables:\n
            "env": {"DOMAIN": "https://login.adservme.com/admin", "USER":"oded", "PASS":"123"}`);
        }
        let result = await request({
            method: 'GET',
            url: `${process.env.DOMAIN}/auth?login=${process.env.USER}&password=${process.env.PASS}`
        });
        if (result) {
            Common.token = result;
            return Common.token;
        }
        else {
            throw ('AdKernel authentication error');
        }
    }
    static getCustomDate(from, to) {
        let dateUrl = from.toISOString().slice(0, 10) + '_' + to.toISOString().slice(0, 10);
        return dateUrl;
    }
    static async PrepareAPICallForReports(from, to, url, limit) {
        let timeRange = Common.getCustomDate(from, to);
        let token = await Common.getToken();
        let bundlesReport = await Common.getReportListByRecursion(url, token, timeRange, 0, [], limit);
        return bundlesReport;
    }
    static cleanListForUpdate(list) {
        let blank = null;
        if (list.has('<blank>') || list.has('null') || list.has('')) {
            list.delete('<blank>');
            list.delete('null');
            list.delete('');
            blank = '<blank>';
        }
        let sortList = Array.from(list);
        if (blank) {
            sortList.unshift(blank);
        }
        let subIdString = sortList.join('\n');
        return subIdString;
    }
    //recursion
    static async getReportListByRecursion(url, token, timeRange, startFrom, reportList, limit) {
        let endTo = startFrom + 500;
        if (limit && limit < endTo) {
            endTo = limit;
        }
        let result = await request({
            method: 'GET',
            url: `${url}?token=${token}&filters=date:${timeRange}&range=${startFrom}-${endTo}`,
        });
        if (JSON.parse(result)['response'] && JSON.parse(result)['response'].list) {
            let allData = JSON.parse(result)['response'].list;
            if (Object.keys(allData).length) {
                for (let item in allData) {
                    if (!limit || (limit && reportList.length < limit)) {
                        let object = allData[item];
                        reportList.push(object);
                    }
                }
                if (!limit || limit !== endTo) {
                    return await Common.getReportListByRecursion(url, token, timeRange, endTo, reportList, limit);
                }
            }
        }
        return reportList;
    }
    static async getData(url) {
        let result = await request({
            method: 'GET',
            url: url,
        });
        return JSON.parse(result)['response'];
    }
    static async UpdateData(url, json) {
        let result = await request({
            method: 'PUT',
            url: url,
            headers: {
                'Content-Types': 'application/json',
            },
            json: json,
        });
        return result.body.status;
    }
}
Common.yesterday = 'yesterday';
exports.Common = Common;
class RTB {
    // REPORTS:
    //RemoteFeeds reports
    static async getRemoteFeedsReport(from, to) { return rtbImplementation_1.RtbImplementation.getRemoteFeedsReport(from, to); }
    static async getRemoteFeedsReportByZone(from, to, zoneId) { return rtbImplementation_1.RtbImplementation.getRemoteFeedsReportByZone(from, to, zoneId); }
    //Zone reports
    static async getZonesReport(from, to) { return rtbImplementation_1.RtbImplementation.getZonesReport(from, to); }
    static async getZonesReportByRemoteFeed(from, to, remoteFeedId) { return rtbImplementation_1.RtbImplementation.getZonesReportByRemoteFeed(from, to, remoteFeedId); }
    //AppBundles reports:
    static async getAppBundlesReport(from, to, limit) { return rtbImplementation_1.RtbImplementation.getAppBundlesReport(from, to, limit); }
    static async getAppBundlesReportByZone(from, to, zoneId, limit) { return rtbImplementation_1.RtbImplementation.getAppBundlesReportByZone(from, to, zoneId, limit); }
    static async getAppBundlesReportByRemoteFeed(from, to, remoteFeedId, limit) { return rtbImplementation_1.RtbImplementation.getAppBundlesReportByRemoteFeed(from, to, remoteFeedId, limit); }
    static async getAppBundlesReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) { return rtbImplementation_1.RtbImplementation.getAppBundlesReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit); }
    //SiteDomains reports:
    static async getSiteDomainsReport(from, to, limit) { return rtbImplementation_1.RtbImplementation.getSiteDomainsReport(from, to, limit); }
    static async getSiteDomainsReportByZone(from, to, zoneId, limit) { return rtbImplementation_1.RtbImplementation.getSiteDomainsReportByZone(from, to, zoneId, limit); }
    static async getSiteDomainsReportByRemoteFeed(from, to, remoteFeedId, limit) { return rtbImplementation_1.RtbImplementation.getSiteDomainsReportByRemoteFeed(from, to, remoteFeedId, limit); }
    static async getSiteDomainsReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) { return rtbImplementation_1.RtbImplementation.getSiteDomainsReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit); }
    //SspPublishers reports:
    static async getSspPublishersReport(from, to, limit) { return rtbImplementation_1.RtbImplementation.getSspPublishersReport(from, to, limit); }
    static async getSspPublishersReportByZone(from, to, zoneId, limit) { return rtbImplementation_1.RtbImplementation.getSspPublishersReportByZone(from, to, zoneId, limit); }
    static async getSspPublishersReportByRemoteFeed(from, to, remoteFeedId, limit) { return rtbImplementation_1.RtbImplementation.getSspPublishersReportByRemoteFeed(from, to, remoteFeedId, limit); }
    static async getSspPublishersReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) { return rtbImplementation_1.RtbImplementation.getSspPublishersReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit); }
    // GET DATA:
    static async getZoneRemoteFeedData(remoteFeedId, zoneId) { return rtbImplementation_1.RtbImplementation.getZoneRemoteFeedData(remoteFeedId, zoneId); }
    // UPDATE DATA:
    static async updateSspPublishersByZoneRemoteFeed(zoneRemoteFeedId, remoteFeedId, zoneId, publisherIdListMode, publisherIdList) { return rtbImplementation_1.RtbImplementation.updateSspPublishersByZoneRemoteFeed(zoneRemoteFeedId, remoteFeedId, zoneId, publisherIdListMode, publisherIdList); }
}
exports.RTB = RTB;
class XML {
    // REPORTS:
    //RemoteFeeds reports
    static async getRemoteFeedsReport(from, to) { return xmlImplementation_1.XmlImplementation.getRemoteFeedsReport(from, to); }
    static async getRemoteFeedsReportByPubFeed(from, to, pubFeedId) { return xmlImplementation_1.XmlImplementation.getRemoteFeedsReportByPubFeed(from, to, pubFeedId); }
    //PubFeeds report
    static async getPubFeedsReport(from, to) { return xmlImplementation_1.XmlImplementation.getPubFeedsReport(from, to); }
    static async getPubFeedsReportByRemoteFeed(from, to, remoteFeedId) { return xmlImplementation_1.XmlImplementation.getPubFeedsReportByRemoteFeed(from, to, remoteFeedId); }
    //SubIdS reports:
    static async getSubIdsReport(from, to, limit) { return xmlImplementation_1.XmlImplementation.getSubIdsReport(from, to, limit); }
    static async getSubIdsReportByRemoteFeed(from, to, remoteFeedId, limit) { return xmlImplementation_1.XmlImplementation.getSubIdsReportByRemoteFeed(from, to, remoteFeedId, limit); }
    static async getSubIdsReportByPublisherFeed(from, to, pubFeedId, limit) { return xmlImplementation_1.XmlImplementation.getSubIdsReportByPublisherFeed(from, to, pubFeedId, limit); }
    static async getSubIdsReportByRemotePublisherFeed(from, to, remoteFeedId, pubFeedId, limit) { return xmlImplementation_1.XmlImplementation.getSubIdsReportByRemotePublisherFeed(from, to, remoteFeedId, pubFeedId, limit); }
    // GET DATA:
    static async getRemotePublisherFeedData(remoteFeedId, pubFeedId) { return xmlImplementation_1.XmlImplementation.getRemotePublisherFeedData(remoteFeedId, pubFeedId); }
    // UPDATE DATA:
    static async updateSubIdsByRemotePublisherFeed(remotePublisherId, RemoteFeedId, pubFeedId, subIdListMode, subIdList) { return xmlImplementation_1.XmlImplementation.updateSubIdsByRemotePublisherFeed(remotePublisherId, RemoteFeedId, pubFeedId, subIdListMode, subIdList); }
}
exports.XML = XML;
//# sourceMappingURL=index.js.map