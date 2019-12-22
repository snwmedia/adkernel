import * as request from 'request-promise-native';


export class RetryRequest {

    static async tokenRequest(type: string, url: string, msgError: string, tryAgain?: number): Promise<any> {
        if (!tryAgain) {
            tryAgain = 0;
        }
        try {
            let result: any = await request({
                method: type,
                url: url
            });
            if (result) {
                return result;
            } else {
                console.error(msgError);
                tryAgain++;
                return await RetryRequest.tokenRequest('GET', url, msgError, tryAgain);
            }
        } catch (e) {
            tryAgain++;
            console.error(`Try number ${tryAgain} - ${e}`);
            if (tryAgain < 3) {
                await RetryRequest.sleep(60000);
                return await RetryRequest.tokenRequest('GET', url, msgError, tryAgain);
            }
            return null;
        }
    }






    static sleep(ms: number) {
        console.log(`Sleeping for ${ms} milliseconds`);
        return new Promise(resolve => setTimeout(resolve, ms));
    }












    static async getRequest(type: string, url: string, msgError: string, tryAgain?: number): Promise<any> {
        if (!tryAgain) {
            tryAgain = 0;
        }
        try {
            let result: any = await request({
                method: type,
                url: url
            });
            return result;
        } catch (e) {
            tryAgain++;
            console.error(`Try number ${tryAgain} - ${e}`);
            if (tryAgain < 3) {
                await RetryRequest.sleep(60000);
                return await RetryRequest.getRequest('GET', url, msgError, tryAgain);
            }
        }
        return null;
    }
    static async updateRequest(type: string, url: string, json: any, msgError: string, tryAgain?: number): Promise<any> {
        if (!tryAgain) {
            tryAgain = 0;
        }
        try {
            let result: any = await request({
                method: type,
                url: url,
                headers: {
                    'Content-Types': 'application/json',
                },
                json: json,
            });
            return result;
        } catch (e) {
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