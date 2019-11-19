"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Common {
    static async getToken() {
        if (Common.token)
            return Common.token;
        if (process.env.DOMAIN && process.env.USER && process.env.PASS) {
            console.log(`authenticating ${process.env.DOMAIN} User:${process.env.USER}`);
        }
        else {
            throw (`Set environment variable. \nOn VS code launch.json: \n
            "env": {"DOMAIN": "https://login.adservme.com/admin", "USER":"oded", "PASS":"123"}`);
        }
        let result = await request({
            method: 'GET',
            url: `${Adkernel.adServmeAPI}/auth?login=${Adkernel.userName}&password=${Adkernel.password}`
        });
        if (result.statusCode === 200) {
            Common.token = result.body;
            return Common.token;
        }
        else {
            throw ('AdKernel authentication error');
        }
    }
}
class RTB {
    static async getAllApps() {
        let token = await Common.getToken();
        return [];
    }
}
exports.RTB = RTB;
//# sourceMappingURL=index.js.map