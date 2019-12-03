import * as request from 'request-promise-native';
import { XmlImplementation } from './xmlImplementation';
import { RtbImplementation } from './rtbImplementation';

export class Common {
    static token: string;
    static OK: string = 'OK';

    static async getToken() {
        if (Common.token) return Common.token;

        if (!process.env.DOMAIN || !process.env.USER || !process.env.PASS) {
            throw (`Set environment variables:\n
            "env": {"DOMAIN": "https://login.adservme.com/admin", "USER":"oded", "PASS":"123"}`)
        }

        let result: any = await request({
            method: 'GET',
            url: `${process.env.DOMAIN}/auth?login=${process.env.USER}&password=${process.env.PASS}`
        });
        if (result) {
            Common.token = result;
            return Common.token;
        } else {
            throw ('AdKernel authentication error');
        }
    }



    static getCustomDate(from: Date, to: Date) {
        let dateUrl: string = from.toISOString().slice(0, 10) + '_' + to.toISOString().slice(0, 10);
        return dateUrl;
    }


    static async PrepareAPICallForReports(from: Date, to: Date, url: string, limit?: number) {
        let timeRange: string = Common.getCustomDate(from, to);
        let token = await Common.getToken();
        let bundlesReport: any[] = await Common.getReportListByRecursion(url, token, timeRange, 0, [], limit);
        return bundlesReport;
    }

    static cleanListForUpdate(list: Set<string>) {
        let blank = null;
        if (list.has('<blank>') || list.has('null') || list.has('')) {
            list.delete('<blank>');
            list.delete('null');
            list.delete('');
            blank = '<blank>';
        }
        let sortList: string[] = Array.from(list);
        if (blank) {
            sortList.unshift(blank)
        }
        let subIdString: string = sortList.join('\n');
        return subIdString;
    }

    //recursion
    static async getReportListByRecursion(url: string, token: string, timeRange: string, startFrom: number, reportList: any[], limit?: number): Promise<any[]> {
        let endTo = startFrom + 500;
        if (limit && limit < endTo) {
            endTo = limit;
        }

        let result: any = await request({
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

    static async getData(url: string) {
        let result: any = await request({
            method: 'GET',
            url: url,
        });
        return JSON.parse(result)['response'];
    }


    static async UpdateData(url: string, json: any) {
        let result: any = await request({
            method: 'PUT',
            url: url,
            headers: {
                'Content-Types': 'application/json',
            },
            json: json,
        });
        return result.status;
    }
}


export class RTB {

    // REPORTS:

    //RemoteFeeds reports
    public static async getRemoteFeedsReport(from: Date, to: Date) { return await RtbImplementation.getRemoteFeedsReport(from, to); }
    public static async getRemoteFeedsReportByZone(from: Date, to: Date, zoneId: number) { return await RtbImplementation.getRemoteFeedsReportByZone(from, to, zoneId); }

    //Zone reports
    public static async getZonesReport(from: Date, to: Date) { return await RtbImplementation.getZonesReport(from, to); }
    public static async getZonesReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number) { return await RtbImplementation.getZonesReportByRemoteFeed(from, to, remoteFeedId); }

    //AppBundles reports:
    public static async getAppBundlesReport(from: Date, to: Date, limit?: number) { return await RtbImplementation.getAppBundlesReport(from, to, limit); }
    public static async getAppBundlesReportByZone(from: Date, to: Date, zoneId: number, limit?: number) { return await RtbImplementation.getAppBundlesReportByZone(from, to, zoneId, limit); }
    public static async getAppBundlesReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) { return await RtbImplementation.getAppBundlesReportByRemoteFeed(from, to, remoteFeedId, limit); }
    public static async getAppBundlesReportByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number) { return await RtbImplementation.getAppBundlesReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit); }

    //SiteDomains reports:
    public static async getSiteDomainsReport(from: Date, to: Date, limit?: number) { return await RtbImplementation.getSiteDomainsReport(from, to, limit); }
    public static async getSiteDomainsReportByZone(from: Date, to: Date, zoneId: number, limit?: number) { return await RtbImplementation.getSiteDomainsReportByZone(from, to, zoneId, limit); }
    public static async getSiteDomainsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) { return await RtbImplementation.getSiteDomainsReportByRemoteFeed(from, to, remoteFeedId, limit); }
    public static async getSiteDomainsReportByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number) { return await RtbImplementation.getSiteDomainsReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit); }


    //SspPublishers reports:
    public static async getSspPublishersReport(from: Date, to: Date, limit?: number) { return await RtbImplementation.getSspPublishersReport(from, to, limit); }
    public static async getSspPublishersReportByZone(from: Date, to: Date, zoneId: number, limit?: number) { return await RtbImplementation.getSspPublishersReportByZone(from, to, zoneId, limit); }
    public static async getSspPublishersReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) { return await RtbImplementation.getSspPublishersReportByRemoteFeed(from, to, remoteFeedId, limit); }
    public static async getSspPublishersReportByZoneRemoteFeed(from: Date, to: Date, remoteFeedId: number, zoneId: number, limit?: number) { return await RtbImplementation.getSspPublishersReportByZoneRemoteFeed(from, to, remoteFeedId, zoneId, limit); }

    // GET DATA:
    public static async getZoneRemoteFeedData(remoteFeedId: number, zoneId: number) { return await RtbImplementation.getZoneRemoteFeedData(remoteFeedId, zoneId); }

    // UPDATE DATA:
    public static async updateSspPublishersByZoneRemoteFeed(remoteFeedId: number, zoneId: number, publisherIdList: Set<string>, publisherIdListMode: Mode): Promise<[boolean, string]> { return await RtbImplementation.updateSspPublishersByZoneRemoteFeed(remoteFeedId, zoneId, publisherIdList, publisherIdListMode); }
    public static async updateSspSiteDomainsByZoneRemoteFeed(remoteFeedId: number, zoneId: number, listName: string, appsId: Set<string>, mode: Mode): Promise<[boolean, string]> { return await RtbImplementation.updateSspSiteDomainsByZoneRemoteFeed(remoteFeedId, zoneId, listName, appsId, mode); }
    public static async updateSspApplicationsByZoneRemoteFeed(remoteFeedId: number, zoneId: number, listName: string, appsId: Set<string>, mode: Mode): Promise<[boolean, string]> { return await RtbImplementation.updateSspApplicationsByZoneRemoteFeed(remoteFeedId, zoneId, listName, appsId, mode); }
    public static async resetZoneRemoteFeed(remoteFeedId: number, zoneId: number, affshare: Number): Promise<[boolean, string]> { return await RtbImplementation.resetZoneRemoteFeed(remoteFeedId, zoneId, affshare); }
}

export class XML {

    // REPORTS:

    //RemoteFeeds reports
    public static async getRemoteFeedsReport(from: Date, to: Date) { return await XmlImplementation.getRemoteFeedsReport(from, to); }
    public static async getRemoteFeedsReportByPubFeed(from: Date, to: Date, pubFeedId: number) { return await XmlImplementation.getRemoteFeedsReportByPubFeed(from, to, pubFeedId); }

    //PubFeeds report
    public static async getPubFeedsReport(from: Date, to: Date) { return await XmlImplementation.getPubFeedsReport(from, to); }
    public static async getPubFeedsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number) { return await XmlImplementation.getPubFeedsReportByRemoteFeed(from, to, remoteFeedId); }

    //SubIdS reports:
    public static async getSubIdsReport(from: Date, to: Date, limit?: number) { return await XmlImplementation.getSubIdsReport(from, to, limit); }
    public static async getSubIdsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) { return await XmlImplementation.getSubIdsReportByRemoteFeed(from, to, remoteFeedId, limit); }
    public static async getSubIdsReportByPublisherFeed(from: Date, to: Date, pubFeedId: number, limit?: number) { return await XmlImplementation.getSubIdsReportByPublisherFeed(from, to, pubFeedId, limit); }
    public static async getSubIdsReportByRemotePublisherFeed(from: Date, to: Date, remoteFeedId: number, pubFeedId: number, limit?: number) { return await XmlImplementation.getSubIdsReportByRemotePublisherFeed(from, to, remoteFeedId, pubFeedId, limit); }

    // GET DATA:
    public static async getRemotePublisherFeedData(remoteFeedId: number, pubFeedId: number) { return await XmlImplementation.getRemotePublisherFeedData(remoteFeedId, pubFeedId); }

    // UPDATE DATA:
    public static async updateSubIdsByRemotePublisherFeed(remoteFeedId: number, pubFeedId: number, subIdList: Set<string>, subIdListMode: Mode): Promise<[boolean, string]> { return await XmlImplementation.updateSubIdsByRemotePublisherFeed(remoteFeedId, pubFeedId, subIdList, subIdListMode); }
}


export enum Mode {
    BLACKLIST = 'BLACKLIST',
    WHITELIST = 'WHITELIST'
}