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
    static async getAllBundles(token, timeRange, startFrom, bundlesReport, limit) {
        let endTo = startFrom + 1000;
        if (limit && limit < endTo) {
            endTo = limit;
        }
        let result = await request({
            method: 'GET',
            url: `${process.env.DOMAIN}/api/ZoneReports/app_bundle?token=${token}&filters=date:${timeRange}&range=${startFrom}-${endTo}`,
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
                    return await Common.getAllBundles(token, timeRange, endTo, bundlesReport, limit);
                }
            }
        }
        return bundlesReport;
    }
}
class RTB {
    static async getAllAppBundles(timeRange, limit) {
        let token = await Common.getToken();
        let bundlesReport = await Common.getAllBundles(token, timeRange, 0, [], limit);
        return bundlesReport;
    }
}
exports.RTB = RTB;
//# sourceMappingURL=index.js.map