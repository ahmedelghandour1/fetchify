/* eslint-disable */
import { isBrowser, nop, serializeObject } from './helpers';

/* ================= START TYPES ================= */
declare const global: Record<string, unknown>;
export type FetchedData<DataType> = {
  data?: DataType;
  response?: Response;
  error?: any;
  abort?: () => void;
};
export type Configs = Omit<RequestInit, 'body' | 'headers' | 'method'> & {
  baseURL?: string,
}
export type FetchResult = {
  data: any;
  response: Response;
  error?: undefined;
} | {
  error: any;
  data?: undefined;
  response?: undefined;
};
export type Method = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD';
export type ResponseType = 'json' | 'text' // TODO: need to add the dynamic type
export type FetchData<DataType> = Promise<FetchedData<DataType>>;
export interface Interceptors {
  request?: (request: RequestInit) => void,
  response?: (result: FetchResult, requestInit: RequestInit) => Promise<FetchResult>
}
/* ================= END TYPES ================= */

const responseTypes: Array<ResponseType> = ['json', 'text'];

export const globalConfigs = (function globalConfigs() {
  let _configs: Configs = {};
  const getAll = function getAll(): Configs {
    return _configs;
  };

  const set = function set(configs: Configs): void {
    _configs = configs;
  };

  const update = function update(configs: Configs): void {
    _configs = { ..._configs, ...configs };
  };

  const remove = function remove(key: keyof Configs | (keyof Configs)[]) {
    if (typeof key === 'string') {
      delete _configs[key];
    }
  };

  return {
    set,
    getAll,
    update,
    remove,
  };
}());

export const globalHeaders = (function globalHeaders() {
  let _headers: HeadersInit = {};

  const getAll = function getAll(): HeadersInit {
    return _headers;
  };

  const set = function set(headers: HeadersInit): void {
    _headers = headers as HeadersInit;
  };

  const update = function update(headers: HeadersInit): void {
    _headers = { ..._headers, ...headers } as HeadersInit;
  };

  const remove = function remove(key: string | (string)[]) {
    if (typeof key === 'string') {
      delete _headers[key as keyof HeadersInit];
    }
    console.log(_headers);
  };

  return {
    set,
    getAll,
    update,
    remove,
  };
}());

const interceptors: Interceptors = {
  request: undefined,
  response: undefined,
};

export function setInterceptors({ request, response }: Interceptors): void {
  if (request)
    interceptors.request = request;
  if (response)
    interceptors.response = response;
}

function setURL(baseURL: string | undefined,
  path: string,
  params: Record<string, unknown> = {}): string {
  const url = path.startsWith('http') ? path
    : `${baseURL}/${path}${serializeObject(params)}`;

  return url;
}

async function init(type: string,
  path: string,
  {
    params = {}, configs = {}, body, headers = {}, responseType = 'json',
  }: {
    params?: Record<string, unknown | any>;
    configs?: Configs;
    body?: any;
    headers?: HeadersInit;
    responseType?: ResponseType;
  }): Promise<FetchResult> {
  let requestInit: RequestInit = {};
  let result: any;
  let url: string;
  let response: Response;
  const globalConfig = globalConfigs.getAll();
  const { baseURL, ...restGlobalConfig } = globalConfig;
  requestInit.method = type;
  if (body && type && type !== 'GET') {
    requestInit.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  headers = { ...globalHeaders.getAll(), ...headers };
  requestInit = {
    ...requestInit,
    ...restGlobalConfig,
    ...configs,
    headers,
  };

  if (interceptors.request) {
    interceptors.request(requestInit);
  }
  url = setURL(configs.baseURL || baseURL, path, params);
  try {
    response = await fetch(url, requestInit);
    responseType = responseTypes.includes(responseType) ? responseType : 'json';
    let responseBody = {};
    // TODO check if _bodyBlob is valid to use
    // if ((response as any)._bodyBlob.size) {
      responseBody = await response[responseType]();
    // }
    if (!response.ok) {
      result = {
        response,
        error: {
          ...responseBody,
        },
      };

      throw result;
    }

    result = { data: responseBody, response };
    if (interceptors.response) {
      return interceptors.response(result, requestInit);
    }

    return result;
  } catch (error: any) {
    const isTypeError = error instanceof Error && !('response' in error);
    const errResponse: FetchResult = isTypeError ? { error } : error;
    if (interceptors.response) {
      return interceptors.response(errResponse, requestInit);

    }

    return errResponse;
  }
}

function setFetchAbort(options: RequestInit = {}) {
  if (isBrowser()) {
    const controller = new AbortController();
    const { signal } = controller;
    options.signal = signal;
    return controller;
  }
  return {
    abort: nop,
  };
}

export async function GET<Type = any>(
  route: string,
  {
    params,
    configs,
    headers,
    responseType
  }: {
    params?: Record<string, unknown | any>,
    configs?: Configs,
    headers?: HeadersInit,
    responseType?: ResponseType
  } = {},
): FetchData<Type> {
  const controller = setFetchAbort(configs || {});
  const { data, response, error } = await init('GET', route, { params, configs, headers, responseType });

  return {
    data,
    response,
    error,
    abort: () => controller.abort(),
  };
};

export async function HEAD<Type = any>(
  route: string,
  {
    params,
    configs,
    headers,
  }: {
    params?: Record<string, unknown | any>,
    configs?: Configs,
    headers?: HeadersInit,
  } = {},
): FetchData<Type> {
  const controller = setFetchAbort(configs || {});
  const { data, response, error } = await init('HEAD', route, { params, configs, headers });
  return {
    data,
    response,
    error,
    abort: () => controller.abort(),
  };
};

export async function POST<Type = any>(
  route: string,
  {
    body = {},
    params,
    configs,
    headers = {},
    responseType

  }: {
    body?: any,
    params?: Record<string, unknown | any>,
    configs?: Configs,
    headers?: HeadersInit,
    responseType?: ResponseType
  } = {},
): FetchData<Type> {
  const controller = setFetchAbort(configs || {});
  const { data, response, error } = await init('POST', route,
    {
      params, configs, body, headers, responseType
    });
  return {
    data,
    response,
    error,
    abort: () => controller.abort(),
  };
};

export async function PUT<Type = any>(route: string,
  {
    body = {}, params, configs, headers = {}, responseType

  }: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: HeadersInit;
    responseType?: ResponseType;
  } = {}): FetchData<Type> {
  const controller = setFetchAbort(configs || {});
  const { data, response, error } = await init('PUT', route, {
    params, configs, body, headers, responseType
  });
  return {
    data,
    response,
    error,
    abort: () => controller.abort(),
  };
}

export async function DELETE<Type = any>(route: string,
  {
    body = {}, params, configs, headers = {}, responseType
  }: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: HeadersInit;
    responseType?: ResponseType;
  } = {}): FetchData<Type> {
  const controller = setFetchAbort(configs || {});
  const { data, response, error } = await init('DELETE', route, {
    params, configs, body, headers, responseType
  });
  return {
    data,
    response,
    error,
    abort: () => controller.abort(),
  };
}

export async function PATCH<Type = any>(route: string,
  {
    body = {}, params, configs, headers = {}, responseType

  }: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: HeadersInit;
    responseType?: ResponseType;
  } = {}): FetchData<Type> {
  const controller = setFetchAbort(configs || {});
  const { data, response, error } = await init('PATCH', route, {
    params, configs, body, headers, responseType
  });
  return {
    data,
    response,
    error,
    abort: () => controller.abort(),
  };
}


const fetchify = {
  POST,
  GET,
  DELETE,
  PUT,
  PATCH,
  HEAD,
};
export default fetchify;
