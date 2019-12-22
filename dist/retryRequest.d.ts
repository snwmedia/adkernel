export declare class RetryRequest {
    static tokenRequest(type: string, url: string, msgError: string, tryAgain?: number): Promise<any>;
    static sleep(ms: number): Promise<unknown>;
    static getRequest(type: string, url: string, msgError: string, tryAgain?: number): Promise<any>;
    static updateRequest(type: string, url: string, json: any, msgError: string, tryAgain?: number): Promise<any>;
}
