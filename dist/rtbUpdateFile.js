"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const dist_1 = require("../dist");
const rtbImplementation_1 = require("./rtbImplementation");
class RtbUpdateFile {
    static async updateFile(remoteFeedId, zoneId, listName, appsId, jsonFileType, mode) {
        let token = await dist_1.Common.getToken();
        let zoneRemoteFeed = await rtbImplementation_1.RtbImplementation.getZoneRemoteFeedData(remoteFeedId, zoneId);
        if (zoneRemoteFeed) {
            let zoneRemoteJson = Object.values(zoneRemoteFeed)[0];
            let zoneRemoteFeedId = Number(Object.keys(zoneRemoteFeed)[0]);
            let appListIds = zoneRemoteJson[jsonFileType.jsonListName];
            let [listExist, listId] = await RtbUpdateFile.getAppListIdIfExist(token, appListIds, listName, jsonFileType.apiType);
            // exist already, update the list:
            if (listId) {
                //check if the the existing mode is no different from the new mode:
                if (zoneRemoteJson[jsonFileType.mode] !== mode) {
                    return [false, `The ${jsonFileType.mode} is already set as ${zoneRemoteJson[jsonFileType.mode]}`];
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
                if (!newList) { //if list exist but unassign
                    let oldList = await RtbUpdateFile.getAppListByNames(token, jsonFileType.apiType, listName);
                    await RtbUpdateFile.deleteReferrerList(token, jsonFileType.apiType, oldList);
                    newList = await RtbUpdateFile.createReferrerList(token, listName, newFileId, jsonFileType.jsonName, jsonFileType.apiType);
                }
                if (newList) {
                    let newListId = newList.created;
                    listExist.push(newListId);
                    let json = {};
                    json[jsonFileType.mode] = mode;
                    json[jsonFileType.jsonListName] = listExist;
                    return await RtbUpdateFile.updateZoneRemoteFeed(token, zoneRemoteFeedId, json);
                }
            }
        }
        return [false, `ERROR updateFile, remoteFeedId ${remoteFeedId}, zoneId ${zoneId}`];
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
            console.error('Failed getAppListNames ', result);
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
        console.error('Failed getIdFile', result);
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
            console.error('Failed getOldList', result);
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
            console.error('Failed uploadList', result);
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
                return [true, dist_1.Common.OK];
            }
        }
        console.error('Failed updateList', result);
        return [false, `ERROR updateList ${result}`];
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
            console.error('Failed createReferrerList', result);
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
                return [true, `OK`];
            }
        }
        console.error('Failed updateZoneRemoteFeed', result);
        return [false, `ERROR updateZoneRemoteFeed ${result}`];
    }
    // get specific list:
    static async getAppListByNames(token, apiType, appListName) {
        let result = await request({
            method: 'GET',
            url: `${process.env.DOMAIN}/api/${apiType}/?token=${token}&filters=search:${appListName}`
        });
        if (result) {
            let response = JSON.parse(result)['response'];
            for (let data in response) {
                if (response[data].name === appListName) {
                    return response[data];
                }
            }
        }
        else {
            console.error('Failed getAppListNames ', result);
            return null;
        }
    }
    static async deleteReferrerList(token, apiType, oldList) {
        var _a;
        if ((_a = oldList) === null || _a === void 0 ? void 0 : _a.id) {
            let result = await request({
                method: 'DELETE',
                url: `${process.env.DOMAIN}/api/${apiType}/${oldList.id}?token=${token}`,
                headers: {
                    'content-type': 'application/json',
                },
            });
            if (result) {
                return result['response'];
            }
            else {
                console.error('Failed createReferrerList', result);
            }
        }
    }
}
exports.RtbUpdateFile = RtbUpdateFile;
//# sourceMappingURL=rtbUpdateFile.js.map