import { Mode } from '../dist';
export declare class RtbUpdateFile {
    static updateFile(remoteFeedId: number, zoneId: number, listName: string, appsId: Set<string>, jsonFileType: any, mode: Mode): Promise<[boolean, string]>;
    static getAppListIdIfExist(token: string, appListIds: number[], listName: string, apiType: string): Promise<[Number[], number]>;
    static getAppListNames(token: string, apiType: string, appListId: number): Promise<any>;
    static getFileId(token: string, appListId: number, jsonName: string, apiType: string): Promise<any>;
    static getOldList(token: string, fileId: string): Promise<any>;
    static uploadList(token: string, list: string): Promise<any>;
    static updateList(token: string, listId: number, appListId: string, jsonName: string, apiType: string): Promise<[boolean, string]>;
    static createReferrerList(token: string, listName: string, fileId: string, jsonName: string, apiType: string): Promise<any>;
    static updateZoneRemoteFeed(token: string, ZoneRemoteFeedId: number, json: any): Promise<[boolean, string]>;
    static getAppListByNames(token: string, apiType: string, appListName: string): Promise<any>;
}
