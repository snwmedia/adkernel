import * as request from 'request-promise-native';

class Common {
    static token: string;
    static yesterday: string = 'yesterday';

    static async getToken() {
        if (Common.token) return Common.token;

        if (process.env.DOMAIN && process.env.USER && process.env.PASS) {
            console.log(`authenticating ${process.env.DOMAIN} User:${process.env.USER}`);
        } else {
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
}


export class RTB {

    // REPORTS:

    public static async getZonesReport(from: Date, to: Date) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getZonesReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getRemoteFeedsReport(from: Date, to: Date) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getRemoteFeedsReportByZone(from: Date, to: Date, zoneId: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }



    //AppBundles reports:
    public static async getAppBundlesReport(from: Date, to: Date, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAppBundlesReportByZone(from: Date, to: Date, zoneId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAppBundlesReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getAppBundlesReportByZoneRemoteFeed(from: Date, to: Date, zoneId: number, remoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/app_bundle`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }



    //SiteDomains reports:
    public static async getSiteDomainsReport(from: Date, to: Date, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/site_domain`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSiteDomainsReportByZone(from: Date, to: Date, zoneId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/site_domain`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSiteDomainsReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/site_domain`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSiteDomainsReportByZoneRemoteFeed(from: Date, to: Date, zoneId: number, remoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/site_domain`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }


    //SspPublishers reports:
    public static async getSspPublishersReport(from: Date, to: Date, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/ssp_publisher_id`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSspPublishersReportByZone(from: Date, to: Date, zoneId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/ssp_publisher_id`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSspPublishersReportByRemoteFeed(from: Date, to: Date, remoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/ssp_publisher_id`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSspPublishersReportByZoneRemoteFeed(from: Date, to: Date, zoneId: number, remoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/ZoneReports/remotefeed=${remoteFeedId}/zone=${zoneId}/ssp_publisher_id`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }
}

export class XML {

    // REPORTS:

    public static async getRemoteFeedsReportByPubFeed(from: Date, to: Date, pubFeedId: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed=${pubFeedId}/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getRemoteFeedsReport(from: Date, to: Date) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getPubFeedsReportByRemoteFeed(from: Date, to: Date, RemoteFeedId: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/feed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }

    public static async getPubFeedsReport(from: Date, to: Date) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url);
        return reportList;
    }


    //SubIdS reports:
    public static async getSubIdsReport(from: Date, to: Date, limit?: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSubIdsReportByRemoteFeed(from: Date, to: Date, RemoteFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSubIdsReportByPublisherFeed(from: Date, to: Date, pubFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/feed=${pubFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }

    public static async getSubIdsReportByRemotePublisherFeed(from: Date, to: Date, RemoteFeedId: number, pubFeedId: number, limit?: number) {
        let url = `${process.env.DOMAIN}/api/FeedReports/remotefeed=${RemoteFeedId}/feed=${pubFeedId}/pubsubid`;
        let reportList: any[] = await Common.PrepareAPICallForReports(from, to, url, limit);
        return reportList;
    }



    // GET DATA:
    public static async getAllSubIdsByRemotePublisherFeed(RemoteFeedId: number, pubFeedId: number) {
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/RemotePublisherFeed/?token=${token}&filters=remotefeed:${RemoteFeedId};publisherfeed:${pubFeedId}`;
        let remotePublisherFeed: any[] = await Common.getData(url);
        return remotePublisherFeed;
    }
}