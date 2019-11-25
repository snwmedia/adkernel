"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const common_1 = require("./common");
class RTB {
    static async getAllAppBundlesByZone(from, to, zoneId, limit) {
        let timeRange = common_1.Common.getCustomDate(from, to);
        let token = await common_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/app_bundle`;
        let bundlesReport = await RTB.getReportListByRecursion(url, token, timeRange, 0, [], limit);
        return bundlesReport;
    }
    static async getAllAppBundles(from, to, limit) {
        let timeRange = common_1.Common.getCustomDate(from, to);
        let token = await common_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/ZoneReports/app_bundle`;
        let bundlesReport = await RTB.getReportListByRecursion(url, token, timeRange, 0, [], limit);
        return bundlesReport;
    }
    static async getAllZones(from, to) {
        let timeRange = common_1.Common.getCustomDate(from, to);
        let token = await common_1.Common.getToken();
        let url = `${process.env.DOMAIN}/api/ZoneReports/zone`;
        let zonesReport = await RTB.getReportList(url, token, timeRange);
        return zonesReport;
    }
    static async getReportList(url, token, timeRange) {
        let reportList = [];
        let result = await request({
            method: 'GET',
            url: `${url}?token=${token}&filters=date:${timeRange}`,
        });
        if (JSON.parse(result)['response'] && JSON.parse(result)['response'].list) {
            let allData = JSON.parse(result)['response'].list;
            for (let item in allData) {
                reportList.push(allData[item]);
            }
        }
        return reportList;
    }
    //recursion
    static async getReportListByRecursion(url, token, timeRange, startFrom, reportList, limit) {
        let endTo = startFrom + 1000;
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
                    return await RTB.getReportListByRecursion(url, token, timeRange, endTo, reportList, limit);
                }
            }
        }
        return reportList;
    }
}
exports.RTB = RTB;
//# sourceMappingURL=rtb.js.map