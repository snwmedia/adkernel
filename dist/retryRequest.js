"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
class RetryRequest {
    static async tokenRequest(type, url, msgError, tryAgain) {
        if (!tryAgain) {
            tryAgain = 0;
        }
        try {
            let result = await request({
                method: type,
                url: url
            });
            if (result) {
                return result;
            }
            else {
                console.error(msgError);
                tryAgain++;
                return await RetryRequest.tokenRequest('GET', url, msgError, tryAgain);
            }
        }
        catch (e) {
            tryAgain++;
            console.error(`Try number ${tryAgain} - ${e}`);
            if (tryAgain < 3) {
                await RetryRequest.sleep(60000);
                return await RetryRequest.tokenRequest('GET', url, msgError, tryAgain);
            }
            return null;
        }
    }
    static sleep(ms) {
        console.log(`Sleeping for ${ms} milliseconds`);
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static async getRequest(type, url, msgError, tryAgain) {
        if (!tryAgain) {
            tryAgain = 0;
        }
        try {
            let result = await request({
                method: type,
                url: url
            });
            return result;
        }
        catch (e) {
            tryAgain++;
            console.error(`Try number ${tryAgain} - ${e}`);
            if (tryAgain < 3) {
                await RetryRequest.sleep(60000);
                return await RetryRequest.getRequest('GET', url, msgError, tryAgain);
            }
        }
        return null;
    }
    static async updateRequest(type, url, json, msgError, tryAgain) {
        if (!tryAgain) {
            tryAgain = 0;
        }
        try {
            let result = await request({
                method: type,
                url: url,
                headers: {
                    'Content-Types': 'application/json',
                },
                json: json,
            });
            return result;
        }
        catch (e) {
            tryAgain++;
            console.error(`Try number ${tryAgain} - ${e}`);
            if (tryAgain < 3) {
                await RetryRequest.sleep(60000);
                return await RetryRequest.updateRequest('GET', url, json, msgError, tryAgain);
            }
        }
        return null;
    }
}
exports.RetryRequest = RetryRequest;
//# sourceMappingURL=retryRequest.js.map