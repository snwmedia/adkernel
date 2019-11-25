export declare class Common {
    static token: string;
    static yesterday: string;
    static getToken(): Promise<string>;
    static getCustomDate(from: Date, to: Date): string;
}
