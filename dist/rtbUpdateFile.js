"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const dist_1 = require("../dist");
class RtbUpdateFile {
    static async updateFile(zoneRemoteFeedId, zoneRemoteObject, listName, appsId, jsonFileType, mode) {
        let token = await dist_1.Common.getToken();
        let appListIds = zoneRemoteObject.app_lists;
        let [listExist, listId] = await RtbUpdateFile.getAppListIdIfExist(token, appListIds, listName, jsonFileType.apiType);
        // exist already, update the list:
        if (listId) {
            //check if the the existing mode is no different from the new mode:
            if (zoneRemoteObject[jsonFileType.mode] !== mode) {
                return `The ${jsonFileType.mode} is already set as ${zoneRemoteObject[jsonFileType.mode]}`;
            }
            let fileId = await RtbUpdateFile.getFileId(token, listId, jsonFileType.jsonName, jsonFileType.apiType);
            let oldAppLists = await RtbUpdateFile.getOldList(token, fileId);
            let oldList = oldAppLists.split('\n');
            for (let old of oldList) {
                appsId.add(old);
            }
            let updatingAppsString = dist_1.Common.cleanListForUpdate(appsId);
            let newFile = await RtbUpdateFile.uploadList(token, updatingAppsString);
            let newFileId = newFile.created;
            return await RtbUpdateFile.updateList(token, listId, newFileId, jsonFileType.jsonName, jsonFileType.apiType);
        }
        // not exist, create new list:
        let listString = dist_1.Common.cleanListForUpdate(appsId);
        let newFile = await RtbUpdateFile.uploadList(token, listString);
        if (newFile) {
            let newFileId = newFile.created;
            let newList = await RtbUpdateFile.createReferrerList(token, listName, newFileId, jsonFileType.jsonName, jsonFileType.apiType);
            if (newList) {
                let newListId = newList.created;
                listExist.push(newListId);
                let json = {};
                json[jsonFileType.mode] = mode;
                json[jsonFileType.jsonListName] = listExist;
                return await RtbUpdateFile.updateZoneRemoteFeed(token, zoneRemoteFeedId, json);
            }
        }
        return 'false';
    }
    static async getAppListIdIfExist(token, appListIds, listName, apiType) {
        let listExist = [];
        let listId = null;
        for (let id of appListIds) {
            let appListDetails = await RtbUpdateFile.getAppListNames(token, apiType, id);
            listExist.push(id);
            if (listName === appListDetails.name) {
                listId = id;
            }
        }
        return [listExist, listId];
    }
    static async getAppListNames(token, apiType, appListId) {
        let result = await request({
            method: 'GET',
            url: `${process.env.DOMAIN}/api/${apiType}/?token=${token}&filters=search:${appListId}`
        });
        if (result) {
            let response = JSON.parse(result)['response'];
            for (let data in response) {
                if (response[data].id === appListId) {
                    return response[data];
                }
            }
        }
        else {
            console.error('Failed getAppListNames ', result.statusCode);
        }
    }
    static async getFileId(token, appListId, jsonName, apiType) {
        let result = await request({
            method: 'GET',
            url: `${process.env.DOMAIN}/api/${apiType}/${appListId}?token=${token}`,
        });
        if (result) {
            let listDetails = JSON.parse(result)['response'];
            for (let list in listDetails) {
                let appBundlesName = listDetails[list][jsonName];
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
        if (result) {
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
        if (result) {
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
        if (result) {
            if (result.status) {
                return 'true';
            }
        }
        console.error('Failed updateList', result.body);
        return 'false';
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
        if (result) {
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
        if (result) {
            if (result.status) {
                return 'true';
            }
        }
        console.error('Failed updateZoneRemoteFeed', result.statusCode);
        return 'false';
    }
}
exports.RtbUpdateFile = RtbUpdateFile;
//# sourceMappingURL=rtbUpdateFile.js.map