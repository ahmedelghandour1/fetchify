export declare type FetchedData<DataType> = {
    data?: DataType;
    response?: Response;
    error?: any;
    meta: Record<string, any> | null;
};
export declare type Configs = Omit<RequestInit, 'body' | 'headers' | 'method'> & {
    baseURL?: string;
};
export declare type FetchResult = {
    data: any;
    response: Response;
    error?: undefined;
    meta: Record<string, any> | null;
} | {
    error: any;
    data?: undefined;
    response?: undefined;
    meta: Record<string, any> | null;
};
export declare type Method = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD';
export declare type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';
export declare type FetchifyRequestParameters = {
    configs: Configs;
    headers: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta: Record<string, any>;
    path: string;
    params: Record<string, unknown | any>;
    body: any;
    type: string;
};
export declare type FetchData<DataType> = Promise<FetchedData<DataType>>;
export interface Interceptors {
    request?: (request: FetchifyRequestParameters) => FetchifyRequestParameters;
    response?: (result: FetchResult, requestInit: RequestInit, fetchParams: FetchifyRequestParameters) => Promise<FetchResult>;
}
export declare const globalConfigs: {
    set: (configs: Configs) => void;
    getAll: () => Configs;
    update: (configs: Configs) => void;
    remove: (key: keyof Configs | (keyof Configs)[]) => void;
};
export declare const globalHeaders: {
    set: (headers: Partial<HeadersInit>) => void;
    getAll: () => Partial<HeadersInit>;
    update: (headers: Partial<HeadersInit>) => void;
    remove: (key: string | (string)[]) => void;
};
export declare function setInterceptors({ request, response }: Interceptors): void;
export declare function GET<Type = any>(route: string, { params, configs, headers, responseType, meta, timeout }?: {
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeout?: number;
}, abortCallback?: (controller: AbortController) => void): FetchData<Type>;
export declare function HEAD<Type = any>(route: string, { params, configs, headers, meta, timeout }?: {
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    meta?: Record<string, any>;
    timeout?: number;
}, abortCallback?: (controller: AbortController) => void): FetchData<Type>;
export declare function POST<Type = any>(route: string, { body, params, configs, headers, responseType, meta, timeout }?: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeout?: number;
}, abortCallback?: (controller: AbortController) => void): FetchData<Type>;
export declare function PUT<Type = any>(route: string, { body, params, configs, headers, responseType, meta, timeout }?: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeout?: number;
}, abortCallback?: (controller: AbortController) => void): FetchData<Type>;
export declare function DELETE<Type = any>(route: string, { body, params, configs, headers, responseType, meta, timeout }?: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeout?: number;
}, abortCallback?: (controller: AbortController) => void): FetchData<Type>;
export declare function PATCH<Type = any>(route: string, { body, params, configs, headers, responseType, meta, timeout }?: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeout?: number;
}, abortCallback?: (controller: AbortController) => void): FetchData<Type>;
declare const fetchify: {
    POST: typeof POST;
    GET: typeof GET;
    DELETE: typeof DELETE;
    PUT: typeof PUT;
    PATCH: typeof PATCH;
    HEAD: typeof HEAD;
};
export default fetchify;
export { isBrowser, nop, serializeObject, getParamsFromString, replaceParamsInString } from './helpers';
