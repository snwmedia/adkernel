export declare class Common {
    static token: string;
    static yesterday: string;
    static getToken(): Promise<string>;
    static getCustomDate(from: Date, to: Date): string;
    static PrepareTheAPICall(from: Date, to: Date, url: string, limit?: number): Promise<any[]>;
    static getReportListByRecursion(url: string, token: string, timeRange: string, startFrom: number, reportList: any[], limit?: number): Promise<any[]>;
}
