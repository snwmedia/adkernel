export declare class RetryRequest {
    static tokenRequest(type: string, url: string, msgError: string, tryAgain?: number): Promise<any>;
    static snwRequest(options: any, msgError: string, tryAgain?: number): Promise<any>;
    static sleep(ms: number): Promise<unknown>;
}
