export declare const isBrowser: () => boolean;
export declare function serializeObject(obj: Record<string, any>): string;
export declare function getParamsFromString(input: string): Array<string>;
export declare function replaceParamsInString(input: string, params: Record<string, string>): string;
export declare function nop(): void;
