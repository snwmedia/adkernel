import * as request from 'request-promise-native';
import { Common } from './common';

export class RTB {




    public static async getAllAppBundlesByZone(from: Date, to: Date, zoneId: number, limit?: number) {
        let timeRange: string = Common.getCustomDate(from, to);
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/app_bundle`;
        let bundlesReport: any[] = await RTB.getReportListByRecursion(url, token, timeRange, 0, [], limit);
        return bundlesReport;
    }

    public static async getAllAppBundles(from: Date, to: Date, limit?: number) {
        let timeRange: string = Common.getCustomDate(from, to);
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/ZoneReports/app_bundle`;
        let bundlesReport: any[] = await RTB.getReportListByRecursion(url, token, timeRange, 0, [], limit);
        return bundlesReport;
    }

    public static async getAllZones(from: Date, to: Date) {
        let timeRange: string = Common.getCustomDate(from, to);
        let token = await Common.getToken();
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone`;
        let zonesReport: any[] = await RTB.getReportList(url, token, timeRange);
        return zonesReport;
    }











    static async getReportList(url: string, token: string, timeRange: string): Promise<any[]> {
        let reportList: any[] = [];
        let result: any = await request({
            method: 'GET',
            url: `${url}?token=${token}&filters=date:${timeRange}`,
        });
        if (JSON.parse(result)['response'] && JSON.parse(result)['response'].list) {
            let allData = JSON.parse(result)['response'].list;
            for (let item in allData) {
                reportList.push(allData[item])
            }
        }
        return reportList;
    }





    //recursion
    static async getReportListByRecursion(url: string, token: string, timeRange: string, startFrom: number, reportList: any[], limit?: number): Promise<any[]> {
        let endTo = startFrom + 1000;
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
                    return await RTB.getReportListByRecursion(url, token, timeRange, endTo, reportList, limit);
                }
            }
        }
        return reportList;
    }




}