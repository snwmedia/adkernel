import * as request from "request";

class Common {
    static token: string;
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
            url: `${Adkernel.adServmeAPI}/auth?login=${Adkernel.userName}&password=${Adkernel.password}`
        });
        if (result.statusCode === 200) {
            Common.token = result.body;
            return Common.token;
        } else {
            throw ('AdKernel authentication error');
        }
    }
}

export class RTB {
    public static async getAllApps() {
        let token = await Common.getToken();
        return [];
    }
}