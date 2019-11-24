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
    static getUrlAllBundlesByZone(zoneId) {
        return `${process.env.DOMAIN}/api/ZoneReports/zone=${zoneId}/app_bundle`;
    }
    static getUrlAllBundles() {
        return `${process.env.DOMAIN}/api/ZoneReports/app_bundle`;
    }
    static getCustomDate(from, to) {
        let dateUrl = from.toISOString().slice(0, 10) + '_' + to.toISOString().slice(0, 10);
        return dateUrl;
    }
    static async getBundles(token, timeRange, startFrom, bundlesReport, url, limit) {
        let endTo = startFrom + 1000;
        if (limit && limit < endTo) {
            endTo = limit;
        }
        let result = await request({
            method: 'GET',
            url: `${url}?token=${token}&filters=date:${timeRange}&range=${startFrom}-${endTo}`,
        });
        if (JSON.parse(result)['response'] && JSON.parse(result)['response'].list) {
            let list = JSON.parse(result)['response'].list;
            if (Object.keys(list).length) {
                for (let bundle in list) {
                    if (!limit || (limit && bundlesReport.length < limit)) {
                        let bundleObject = list[bundle];
                        bundlesReport.push(bundleObject);
                    }
                }
                if (!limit || limit !== endTo) {
                    return await Common.getBundles(token, timeRange, endTo, bundlesReport, url, limit);
                }
            }
        }
        return bundlesReport;
    }
    static async getAllZone(token, timeRange) {
        let zoneReport = [];
        let result = await request({
            method: 'GET',
            url: `${process.env.DOMAIN}/api/ZoneReports/zone?token=${token}&filters=date:${timeRange}`,
        });
        if (JSON.parse(result)['response'] && JSON.parse(result)['response'].list) {
            let list = JSON.parse(result)['response'].list;
            for (let zone in list) {
                zoneReport.push(list[zone]);
            }
        }
        return zoneReport;
    }
}
Common.yesterday = 'yesterday';
class RTB {
    static async getAllAppBundlesByZone(from, to, zoneId, limit) {
        let timeRange = Common.getCustomDate(from, to);
        let token = await Common.getToken();
        let url = Common.getUrlAllBundlesByZone(zoneId);
        let bundlesReport = await Common.getBundles(token, timeRange, 0, [], url, limit);
        return bundlesReport;
    }
    static async getAllAppBundles(from, to, limit) {
        let timeRange = Common.getCustomDate(from, to);
        let token = await Common.getToken();
        let url = Common.getUrlAllBundles();
        let bundlesReport = await Common.getBundles(token, timeRange, 0, [], url, limit);
        return bundlesReport;
    }
    static async getAllZones(from, to) {
        let timeRange = Common.getCustomDate(from, to);
        let token = await Common.getToken();
        let zonesReport = await Common.getAllZone(token, timeRange);
        return zonesReport;
    }
}
exports.RTB = RTB;
//# sourceMappingURL=index.js.map