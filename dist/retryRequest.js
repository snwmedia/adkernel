"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const dist_1 = require("../dist");
class RetryRequest {
    static async tokenRequest(type, url, msgError, tryAgain = 0) {
        try {
            let result = await request({
                method: type,
                url: url
            });
            if (result) {
                dist_1.Common.token = new dist_1.Token(result);
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
                await RetryRequest.sleep(RetryRequest._1_Minute);
                return await RetryRequest.tokenRequest('GET', url, msgError, tryAgain);
            }
            return null;
        }
    }
    static async snwRequest(options, msgError, tryAgain = 0) {
        try {
            let result = await request(options);
            return result;
        }
        catch (e) {
            tryAgain++;
            console.error(`Try number ${tryAgain} - ${e}`);
            if (tryAgain < 3) {
                await RetryRequest.sleep(RetryRequest._1_Minute);
                return await RetryRequest.snwRequest(options, msgError, tryAgain);
            }
        }
        return null;
    }
    static sleep(ms) {
        console.log(`Sleeping for ${ms} milliseconds`);
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.RetryRequest = RetryRequest;
RetryRequest._1_Minute = 60000;
//# sourceMappingURL=retryRequest.js.map