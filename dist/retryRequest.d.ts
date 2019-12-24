export declare class RetryRequest {
    static _1_Minute: number;
    static tokenRequest(type: string, url: string, msgError: string, tryAgain?: number): Promise<any>;
    static snwRequest(options: any, msgError: string, tryAgain?: number): Promise<any>;
    static sleep(ms: number): Promise<unknown>;
}
