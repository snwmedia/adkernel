"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xmlImplementation_1 = require("./xmlImplementation");
const rtbImplementation_1 = require("./rtbImplementation");
const retryRequest_1 = require("./retryRequest");
class Common {
    static async getToken() {
        if (!process.env.DOMAIN || !process.env.USER || !process.env.PASS) {
            throw (`Set environment variables:\n
            "env": {"DOMAIN": "https://login.adservme.com/admin", "USER":"oded", "PASS":"123"}`);
        }
        if (Common.token) {
            let lastRenewalToken = Common.token.date.getTime();
            let thisTime = new Date().getTime();
            let difference = thisTime - lastRenewalToken;
            if (difference < Common._10_Minutes) {
                return Common.token.token;
            }
        }
        let msgError = 'AdKernel authentication error';
        let url = `${process.env.DOMAIN}/auth?login=${process.env.USER}&password=${process.env.PASS}`;
        return await retryRequest_1.RetryRequest.tokenRequest('GET', url, msgError);
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
        let endTo = startFrom + 1000;
        if (limit && limit < endTo) {
            endTo = limit;
        }
        let finalUrl = `${url}?token=${token}&filters=date:${timeRange}&range=${startFrom}-${endTo}`;
        let options = {};
        options.method = 'GET';
        options.url = finalUrl;
        let msgError = `Failed getReportListByRecursion - ${finalUrl}`;
        let result = await retryRequest_1.RetryRequest.snwRequest(options, msgError);
        if (result && JSON.parse(result)['response'] && JSON.parse(result)['response'].list) {
            let allData = JSON.parse(result)['response'].list;
            if (Object.keys(allData).length) {
                for (let item in allData) {
                    if (!limit || (limit && reportList.length < limit)) {
                        let object = allData[item];
                        reportList.push(object);
                    }
                }
                if ((limit && limit !== endTo) || (!limit && reportList.length === endTo)) {
                    return await Common.getReportListByRecursion(url, token, timeRange, endTo, reportList, limit);
                }
            }
        }
        return reportList;
    }
    static async getData(url) {
        let options = {};
        options.method = 'GET';
        options.url = url;
        let msgError = `Failed getData - ${url}`;
        let result = await retryRequest_1.RetryRequest.snwRequest(options, msgError);
        return JSON.parse(result)['response'];
    }
    static async updateData(url, json) {
        let options = {};
        options.method = 'PUT';
        options.url = url;
        options.headers = { 'Content-Types': 'application/json' };
        options.json = json;
        let msgError = `Failed updateData - ${url}`;
        let result = await retryRequest_1.RetryRequest.snwRequest(options, msgError);
        return result.status;
    }
    static async createData(url, json) {
        let options = {};
        options.method = 'POST';
        options.url = url;
        options.headers = { 'Content-Types': 'application/json' };
        options.json = json;
        let msgError = `Failed createData - ${url}`;
        let result = await retryRequest_1.RetryRequest.snwRequest(options, msgError);
        return result.status;
    }
}
exports.Common = Common;
Common.OK = 'OK';
Common._10_Minutes = 600000;
class RTB {
    // REPORTS:
    //RemoteFeeds reports
    static async getRemoteFeedsReport(from, to) { return await rtbImplementation_1.RtbImplementation.getRemoteFeedsReport(from, to); }
    static async getRemoteFeedsReportByZone(from, to, zoneId) { return await rtbImplementation_1.RtbImplementation.getRemoteFeedsReportByZone(from, to, zoneId); }
    //Zone reports
    static async getZonesReport(from, to) { return await rtbImplementation_1.RtbImplementation.getZonesReport(from, to); }
    static async getZonesReportByRemoteFeed(from, to, remoteFeedId) { return await rtbImplementation_1.RtbImplementation.getZonesReportByRemoteFeed(from, to, remoteFeedId); }
    static async getZonesReportByPublisher(from, to, publisherID) { return await rtbImplementation_1.RtbImplementation.getZonesReportByPublisher(from, to, publisherID); }
    //Publusher reports
    static async getPublisherReport(from, to) { return await rtbImplementation_1.RtbImplementation.getPublisherReport(from, to); }
    //AppBundles reports:
    static async getAppBundlesReport(from, to, limit) { return await rtbImplementation_1.RtbImplementation.getAppBundlesReport(from, to, limit); }
    static async getAppBundlesReportByZone(from, to, zoneId, limit) { return await rtbImplementation_1.RtbImplementation.getAppBundlesReportByZone(from, to, zoneId, limit); }
    static async getAppBundlesReportByRemoteFeed(from, to, remoteFeedId, limit) { return await rtbImplementation_1.RtbImplementation.getAppBundlesReportByRemoteFeed(from, to, remoteFeedId, limit); }
    static async getAppBundlesReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) { return await rtbImplementation_1.RtbImplementation.getAppBundlesReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit); }
    static async getAppBundlesReportByPublisher(from, to, publisherId, limit) { return await rtbImplementation_1.RtbImplementation.getAppBundlesReportByPublisher(from, to, publisherId, limit); }
    //SiteDomains reports:
    static async getSiteDomainsReport(from, to, limit) { return await rtbImplementation_1.RtbImplementation.getSiteDomainsReport(from, to, limit); }
    static async getSiteDomainsReportByZone(from, to, zoneId, limit) { return await rtbImplementation_1.RtbImplementation.getSiteDomainsReportByZone(from, to, zoneId, limit); }
    static async getSiteDomainsReportByRemoteFeed(from, to, remoteFeedId, limit) { return await rtbImplementation_1.RtbImplementation.getSiteDomainsReportByRemoteFeed(from, to, remoteFeedId, limit); }
    static async getSiteDomainsReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) { return await rtbImplementation_1.RtbImplementation.getSiteDomainsReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit); }
    //SspPublishers reports:
    static async getSspPublishersReport(from, to, limit) { return await rtbImplementation_1.RtbImplementation.getSspPublishersReport(from, to, limit); }
    static async getSspPublishersReportByZone(from, to, zoneId, limit) { return await rtbImplementation_1.RtbImplementation.getSspPublishersReportByZone(from, to, zoneId, limit); }
    static async getSspPublishersReportByRemoteFeed(from, to, remoteFeedId, limit) { return await rtbImplementation_1.RtbImplementation.getSspPublishersReportByRemoteFeed(from, to, remoteFeedId, limit); }
    static async getSspPublishersReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit) { return await rtbImplementation_1.RtbImplementation.getSspPublishersReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit); }
    // GET DATA:
    static async getZoneRemoteFeedData(remoteFeedId, zoneId) { return await rtbImplementation_1.RtbImplementation.getZoneRemoteFeedData(remoteFeedId, zoneId); }
    static async getZoneData(zoneId) { return await rtbImplementation_1.RtbImplementation.getZoneData(zoneId); }
    static async getZoneDataByName(zoneName) { return await rtbImplementation_1.RtbImplementation.getZoneDataByName(zoneName); }
    static async getRemoteFeedData(remoteFeedId) { return await rtbImplementation_1.RtbImplementation.getRemoteFeedData(remoteFeedId); }
    static async getPublisherData(publisherId) { return await rtbImplementation_1.RtbImplementation.getPublisherData(publisherId); }
    // UPDATE DATA:
    static async updateSspPublishersByZoneRemoteFeed(remoteFeedId, zoneId, publisherIdList, publisherIdListMode) { return await rtbImplementation_1.RtbImplementation.updateSspPublishersByZoneRemoteFeed(remoteFeedId, zoneId, publisherIdList, publisherIdListMode); }
    static async updateSspSiteDomainsByZoneRemoteFeed(remoteFeedId, zoneId, listName, appsId, mode) { return await rtbImplementation_1.RtbImplementation.updateSspSiteDomainsByZoneRemoteFeed(remoteFeedId, zoneId, listName, appsId, mode); }
    static async updateSspApplicationsByZoneRemoteFeed(remoteFeedId, zoneId, listName, appsId, mode) { return await rtbImplementation_1.RtbImplementation.updateSspApplicationsByZoneRemoteFeed(remoteFeedId, zoneId, listName, appsId, mode); }
    static async resetZoneRemoteFeed(remoteFeedId, zoneId, affshare) { return await rtbImplementation_1.RtbImplementation.resetZoneRemoteFeed(remoteFeedId, zoneId, affshare); }
    static async updateAppList(listName, bundles) { return await rtbImplementation_1.RtbImplementation.updateAppList(listName, bundles); }
    static async updateRemoteFeedListByZone(zoneId, remotefeedsForRemove) { return await rtbImplementation_1.RtbImplementation.updateRemoteFeedListByZone(zoneId, remotefeedsForRemove); }
    static async removeRemoteFeedsFromZone(zoneId, remotefeedsForRemove) { return await rtbImplementation_1.RtbImplementation.removeRemoteFeedsFromZone(zoneId, remotefeedsForRemove); }
    static async updateZoneListByRemoteFeed(remotefeedId, zonesForRemove) { return await rtbImplementation_1.RtbImplementation.updateZoneListByRemoteFeed(remotefeedId, zonesForRemove); }
    static async removeZonesFromRemoteFeed(remotefeedId, zonesForRemove) { return await rtbImplementation_1.RtbImplementation.removeZonesFromRemoteFeed(remotefeedId, zonesForRemove); }
    static async createZone(zoneData) { return await rtbImplementation_1.RtbImplementation.createZone(zoneData); }
}
exports.RTB = RTB;
class XML {
    // REPORTS:
    //RemoteFeeds reports
    static async getRemoteFeedsReport(from, to) { return await xmlImplementation_1.XmlImplementation.getRemoteFeedsReport(from, to); }
    static async getRemoteFeedsReportByPubFeed(from, to, pubFeedId) { return await xmlImplementation_1.XmlImplementation.getRemoteFeedsReportByPubFeed(from, to, pubFeedId); }
    //PubFeeds report
    static async getPubFeedsReport(from, to) { return await xmlImplementation_1.XmlImplementation.getPubFeedsReport(from, to); }
    static async getPubFeedsReportByRemoteFeed(from, to, remoteFeedId) { return await xmlImplementation_1.XmlImplementation.getPubFeedsReportByRemoteFeed(from, to, remoteFeedId); }
    static async getPubFeedsReportByPublisher(from, to, publisherID) { return await xmlImplementation_1.XmlImplementation.getPubFeedsReportByPublisher(from, to, publisherID); }
    //Publusher reports
    static async getPublisherReport(from, to) { return await xmlImplementation_1.XmlImplementation.getPublisherReport(from, to); }
    //SubIdS reports:
    static async getSubIdsReport(from, to, limit) { return await xmlImplementation_1.XmlImplementation.getSubIdsReport(from, to, limit); }
    static async getSubIdsReportByRemoteFeed(from, to, remoteFeedId, limit) { return await xmlImplementation_1.XmlImplementation.getSubIdsReportByRemoteFeed(from, to, remoteFeedId, limit); }
    static async getSubIdsReportByPublisherFeed(from, to, pubFeedId, limit) { return await xmlImplementation_1.XmlImplementation.getSubIdsReportByPublisherFeed(from, to, pubFeedId, limit); }
    static async getSubIdsReportByRemotePublisherFeed(from, to, remoteFeedId, pubFeedId, limit) { return await xmlImplementation_1.XmlImplementation.getSubIdsReportByRemotePublisherFeed(from, to, remoteFeedId, pubFeedId, limit); }
    // GET DATA:
    static async getRemotePublisherFeedData(remoteFeedId, pubFeedId) { return await xmlImplementation_1.XmlImplementation.getRemotePublisherFeedData(remoteFeedId, pubFeedId); }
    static async getRemoteFeedData(remoteFeedId) { return await xmlImplementation_1.XmlImplementation.getRemoteFeedData(remoteFeedId); }
    // UPDATE DATA:
    static async updateSubIdsByRemotePublisherFeed(remoteFeedId, pubFeedId, subIdList, subIdListMode) { return await xmlImplementation_1.XmlImplementation.updateSubIdsByRemotePublisherFeed(remoteFeedId, pubFeedId, subIdList, subIdListMode); }
    static async disabledOrEnabledRemoteFeed(remoteFeedId, is_active) { return await xmlImplementation_1.XmlImplementation.disabledOrEnabledRemoteFeed(remoteFeedId, is_active); }
}
exports.XML = XML;
class Token {
    constructor(token) {
        this.token = token;
        this.date = new Date();
    }
}
exports.Token = Token;
var Mode;
(function (Mode) {
    Mode["BLACKLIST"] = "BLACKLIST";
    Mode["WHITELIST"] = "WHITELIST";
})(Mode = exports.Mode || (exports.Mode = {}));
//# sourceMappingURL=index.js.map