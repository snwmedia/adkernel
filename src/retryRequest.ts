import * as request from 'request-promise-native';


export class RetryRequest {

    static async tokenRequest(type: string, url: string, msgError: string, tryAgain = 0): Promise<any> {

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

    static async snwRequest(options: any, msgError: string, tryAgain = 0): Promise<any> {

        try {
            let result: any = await request(options);
            return result;
        } catch (e) {
            tryAgain++;
            console.error(`Try number ${tryAgain} - ${e}`);
            if (tryAgain < 3) {
                await RetryRequest.sleep(60000);
                return await RetryRequest.snwRequest(options, msgError, tryAgain);
            }
        }
        return null;
    }




    static sleep(ms: number) {
        console.log(`Sleeping for ${ms} milliseconds`);
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}