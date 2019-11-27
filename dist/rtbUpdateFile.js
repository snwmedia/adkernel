"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const dist_1 = require("../dist");
class RtbUpdateFile {
    static async updateFile(zoneRemoteFeedId, zoneRemoteObject, listName, appsId, jsonFileType) {
        let token = await dist_1.Common.getToken();
        let appListIds = zoneRemoteObject.app_lists;
        let [listExist, listId] = await RtbUpdateFile.getAppListIdIfExist(token, appListIds, listName, 'AppList');
        // exist already, update the list:
        if (listId) {
            let fileId = await RtbUpdateFile.getFileId(token, listId, 'AppList');
            let oldAppLists = await RtbUpdateFile.getOldList(token, fileId);
            let oldList = oldAppLists.split('\n');
            for (let old of oldList) {
                appsId.add(old);
            }
            let updatingAppsString = Array.from(appsId).join('\n');
            let newFile = await RtbUpdateFile.uploadList(token, updatingAppsString);
            let newFileId = newFile.created;
            return await RtbUpdateFile.updateList(token, listId, newFileId, 'app_bundles', 'AppList');
        }
        // not exist, create new list:
        let listString = Array.from(appsId).join('\n');
        let newFile = await RtbUpdateFile.uploadList(token, listString);
        if (newFile) {
            let newFileId = newFile.created;
            let newList = await RtbUpdateFile.createReferrerList(token, listName, newFileId, 'app_bundles', 'AppList');
            if (newList) {
                let newListId = newList.created;
                listExist.push(newListId);
                let json = {};
                json.applist_mode = 'BLACKLIST';
                json.app_lists = listExist;
                return await RtbUpdateFile.updateZoneRemoteFeed(token, zoneRemoteFeedId, json);
            }
        }
        return false;
    }
    static async getAppListIdIfExist(token, appListIds, listName, apiType) {
        let listExist = [];
        let listId = null;
        for (let id of appListIds) {
            let appListDetails = await RtbUpdateFile.getAppListNames(token, apiType, id);
            for (let detail in appListDetails) {
                listExist.push(id);
                if (listName === appListDetails[detail].name) {
                    listId = id;
                }
            }
        }
        return [listExist, listId];
    }
    static async getAppListNames(token, apiType, appListId) {
        let result = await request({
            method: 'GET',
            url: `${process.env.DOMAIN}/api/${apiType}/?token=${token}&filters=search:${appListId}`
        });
        if (result.statusCode === 200) {
            return JSON.parse(result)['response'];
        }
        else {
            console.error('Failed getAppListNames ', result.statusCode);
        }
    }
    static async getFileId(token, appListId, apiType) {
        let result = await request({
            method: 'GET',
            url: `${process.env.DOMAIN}/api/${apiType}/${appListId}?token=${token}`,
        });
        if (result.statusCode === 200) {
            let listDetails = JSON.parse(result)['response'];
            for (let list in listDetails) {
                let appBundlesName = listDetails[list][apiType];
                let fileId = appBundlesName.split('id ').pop();
                return fileId;
            }
        }
        console.error('Failed getIdFile', result.statusCode);
    }
    static async getOldList(token, fileId) {
        let result = await request({
            method: 'GET',
            url: `${process.env.DOMAIN}/api/files/${fileId}?token=${token}`
        });
        if (result.statusCode === 200) {
            return result;
        }
        else {
            console.error('Failed getOldList', result.statusCode);
        }
    }
    static async uploadList(token, list) {
        let listFile = new Buffer(list);
        let result = await request({
            method: 'POST',
            url: `${process.env.DOMAIN}/api/files/?token=${token}`,
            headers: {
                'content-type': 'multipart/form-data',
            },
            formData: {
                content: listFile,
            },
        });
        if (result.statusCode === 200) {
            return JSON.parse(result)['response'];
        }
        else {
            console.error('Failed uploadList', result.statusCode);
        }
    }
    static async updateList(token, listId, appListId, jsonName, apiType) {
        let json = {};
        json[jsonName] = appListId;
        let result = await request({
            method: 'PUT',
            url: `${process.env.DOMAIN}/api/${apiType}/${listId}?token=${token}`,
            headers: {
                'content-type': 'application/json',
            },
            json: json
        });
        if (result.statusCode === 200) {
            if (result.status) {
                return true;
            }
        }
        console.error('Failed updateList', result.body);
        return false;
    }
    static async createReferrerList(token, listName, fileId, jsonName, apiType) {
        let json = {};
        json[jsonName] = fileId;
        json.name = listName;
        let result = await request({
            method: 'POST',
            url: `${process.env.DOMAIN}/api/${apiType}/?token=${token}`,
            headers: {
                'content-type': 'application/json',
            },
            json: json,
        });
        if (result.statusCode === 200) {
            return result['response'];
        }
        else {
            console.error('Failed createReferrerList', result.statusCode);
        }
    }
    static async updateZoneRemoteFeed(token, ZoneRemoteFeedId, json) {
        let result = await request({
            method: 'PUT',
            url: `${process.env.DOMAIN}/api/ZoneRemoteFeed/${ZoneRemoteFeedId}?token=${token}`,
            headers: {
                'content-type': 'application/json',
            },
            json: json
        });
        if (result.statusCode === 200) {
            if (result.status) {
                return true;
            }
        }
        console.error('Failed updateZoneRemoteFeed', result.statusCode);
        return false;
    }
}
exports.RtbUpdateFile = RtbUpdateFile;
//# sourceMappingURL=rtbUpdateFile.js.map