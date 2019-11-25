"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
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
}
Common.yesterday = 'yesterday';
class RTB {
    // REPORTS:
    static async getAllZones(from, to) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getAllZonesByRemoteFeed(from, to, remoteFeedId) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getAllRemoteFeeds(from, to) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getAllRemoteFeedsByZone(from, to, zoneId) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/remotefeed`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    //AppBundles reports:
    static async getAllAppBundles(from, to, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/app_bundle`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllAppBundlesByZone(from, to, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/app_bundle`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllAppBundlesByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/app_bundle`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllAppBundlesByZoneRemoteFeed(from, to, zoneId, remoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/app_bundle`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    //SiteDomains reports:
    static async getAllSiteDomains(from, to, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/site_domain`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSiteDomainsByZone(from, to, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/site_domain`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSiteDomainsByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/site_domain`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSiteDomainsByZoneRemoteFeed(from, to, zoneId, remoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/site_domain`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    //SspPublishers reports:
    static async getAllSspPublishers(from, to, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/ssp_publisher_id`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSspPublishersByZone(from, to, zoneId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/ssp_publisher_id`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSspPublishersByRemoteFeed(from, to, remoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/ssp_publisher_id`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSspPublishersByZoneRemoteFeed(from, to, zoneId, remoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/ssp_publisher_id`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
}
exports.RTB = RTB;
class Xml {
    // REPORTS:
    static async getAllRemoteFeedsByPubFeed(from, to, pubFeedId) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed=${pubFeedId}/remotefeed`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getAllRemoteFeeds(from, to) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getAllPubFeedsByRemoteFeed(from, to, RemoteFeedId) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/feed`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    static async getAllPubFeeds(from, to) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }
    //SubIdS reports:
    static async getAllSubIds(from, to, limit) {
        let url = `${process.env.DOMAIN}/api/FeedReports/pubsubid`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSubIdsByRemoteFeed(from, to, RemoteFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/pubsubid`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSubIdsByPublisherFeed(from, to, pubFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed=${pubFeedId}/pubsubid`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
    static async getAllSubIdsByRemotePublisherFeed(from, to, RemoteFeedId, pubFeedId, limit) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/feed=${pubFeedId}/pubsubid`;
        let reportList = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
}
exports.Xml = Xml;
//# sourceMappingURL=index.js.map