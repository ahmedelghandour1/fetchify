/* eslint-disable */
import {
  isBrowser,
  nop,
  serializeObject
} from './helpers';


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
export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData' // TODO: need to add the dynamic type
export type FetchData<DataType> = Promise<FetchedData<DataType>>;
export interface Interceptors {
  request?: (request: RequestInit) => void,
  response?: (result: FetchResult, requestInit: RequestInit) => Promise<FetchResult>
}
/* ================= END TYPES ================= */

const responseTypes: Array<ResponseType> = ['json', 'text', 'blob', 'arrayBuffer', 'formData'];

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
  let _headers: Partial<HeadersInit> = {};

  const getAll = function getAll(): Partial<HeadersInit> {
    return _headers;
  };

  const set = function set(headers: Partial<HeadersInit>): void {
    _headers = headers as Partial<HeadersInit>;
  };

  const update = function update(headers: Partial<HeadersInit>): void {
    _headers = { ..._headers, ...headers } as Partial<HeadersInit>;
  };

  const remove = function remove(key: string | (string)[]) {
    if (typeof key === 'string') {
      delete _headers[key as keyof Partial<HeadersInit>];
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
    params = {}, configs = {}, body, headers = {}, responseType = 'json', meta = {}
  }: {
    params?: Record<string, unknown | any>;
    configs?: Configs;
    body?: any;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta: Record<string, any>;
  }): Promise<FetchResult> {
  let requestInit: RequestInit = {};
  let result: any;
  let url: string;
  let response: Response;
  const globalConfig = globalConfigs.getAll();
  const { baseURL, ...restGlobalConfig } = globalConfig;
  requestInit.method = type;
  if (body && type && type !== 'GET') {
    if (body instanceof FormData || typeof body === 'string') {
      requestInit.body = body;
    } else {
      requestInit.body = JSON.stringify(body);
    }
  }
  const _headers = { ...globalHeaders.getAll(), ...headers } as HeadersInit;

  Object.keys(_headers).forEach((k) => {
    if (_headers[k] === undefined && typeof _headers[k] === 'undefined') delete _headers[k];
  })
  requestInit = {
    ...requestInit,
    ...restGlobalConfig,
    ...configs,
    headers: _headers,
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
        meta,
        response,
        error: {
          ...responseBody,
        },
      };

      throw result;
    }

    result = { data: responseBody, response, meta };
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
  if (!AbortController) {

    console.warn('AbortController is not supported!');

    return {
      abort: nop,
    }
  }

  const controller = new AbortController();
  const { signal } = controller;
  options.signal = signal;

  return controller;
}


function HandleTimeOut(timeOut: number, controller: AbortController | { abort(): void }) {
  if (!timeOut) return;

  const timerId = setTimeout(() => {
    controller.abort();
  }, timeOut);

  clearTimeout(timerId);
}


export async function GET<Type = any>(
  route: string,
  {
    params,
    configs,
    headers,
    responseType,
    meta = {},
    timeOut
  }: {
    params?: Record<string, unknown | any>,
    configs?: Configs,
    headers?: Partial<HeadersInit>,
    responseType?: ResponseType,
    meta?: Record<string, any>,
    timeOut?: number;
  } = {},
): FetchData<Type> {
  const controller = setFetchAbort(configs || {});
  const { data, response, error } = await init('GET', route, { params, configs, headers, responseType, meta });

  HandleTimeOut(timeOut, controller);

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
    meta = {},
    timeOut
  }: {
    params?: Record<string, unknown | any>,
    configs?: Configs,
    headers?: Partial<HeadersInit>,
    meta?: Record<string, any>;
    timeOut?: number;
  } = {},
): FetchData<Type> {
  const controller = setFetchAbort(configs || {});
  const { data, response, error } = await init('HEAD', route, { params, configs, headers, meta });

  HandleTimeOut(timeOut, controller);

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
    responseType,
    meta = {},
    timeOut

  }: {
    body?: any,
    params?: Record<string, unknown | any>,
    configs?: Configs,
    headers?: Partial<HeadersInit>,
    responseType?: ResponseType,
    meta?: Record<string, any>;
    timeOut?: number;
  } = {},
): FetchData<Type> {
  const controller = setFetchAbort(configs || {});
  const { data, response, error } = await init('POST', route,
    {
      params, configs, body, headers, responseType, meta
    });

  HandleTimeOut(timeOut, controller);

  return {
    data,
    response,
    error,
    abort: () => controller.abort(),
  };
};

export async function PUT<Type = any>(route: string,
  {
    body = {}, params, configs, headers = {}, responseType, meta = {}, timeOut

  }: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeOut?: number;
  } = {}): FetchData<Type> {
  const controller = setFetchAbort(configs || {});
  const { data, response, error } = await init('PUT', route, {
    params, configs, body, headers, responseType, meta
  });

  HandleTimeOut(timeOut, controller);

  return {
    data,
    response,
    error,
    abort: () => controller.abort(),
  };
}

export async function DELETE<Type = any>(route: string,
  {
    body = {}, params, configs, headers = {}, responseType, meta = {},
    timeOut
  }: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeOut?: number;
  } = {}): FetchData<Type> {
  const controller = setFetchAbort(configs || {});
  const { data, response, error } = await init('DELETE', route, {
    params, configs, body, headers, responseType, meta
  });

  HandleTimeOut(timeOut, controller);

  return {
    data,
    response,
    error,
    abort: () => controller.abort(),
  };
}

export async function PATCH<Type = any>(route: string,
  {
    body = {}, params, configs, headers = {}, responseType, meta = {}, timeOut

  }: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeOut?: number;
  } = {}): FetchData<Type> {
  const controller = setFetchAbort(configs || {});
  const { data, response, error } = await init('PATCH', route, {
    params, configs, body, headers, responseType, meta
  });

  HandleTimeOut(timeOut, controller);

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

export {
  isBrowser,
  nop,
  serializeObject,
  getParamsFromString,
  replaceParamsInString
} from './helpers'
