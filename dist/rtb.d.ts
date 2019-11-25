export declare class RTB {
    static getAllAppBundlesByZone(from: Date, to: Date, zoneId: number, limit?: number): Promise<any[]>;
    static getAllAppBundles(from: Date, to: Date, limit?: number): Promise<any[]>;
    static getAllZones(from: Date, to: Date): Promise<any[]>;
    static getReportList(url: string, token: string, timeRange: string): Promise<any[]>;
    static getReportListByRecursion(url: string, token: string, timeRange: string, startFrom: number, reportList: any[], limit?: number): Promise<any[]>;
}
