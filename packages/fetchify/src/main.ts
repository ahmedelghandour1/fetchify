/* eslint-disable */
import {
  serializeObject
} from './helpers';

declare const FileOutput: string;

/* ================= START TYPES ================= */
declare const global: Record<string, unknown>;
export type FetchedData<DataType> = {
  data?: DataType;
  response?: Response;
  error?: any;
  meta: Record<string, any> | null;
};
export type Configs = Omit<RequestInit, 'body' | 'headers' | 'method'> & {
  baseURL?: string,
}
export type FetchResult = {
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
export type Method = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD';
export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData' // TODO: need to add the dynamic type

export type FetchifyRequestParameters = {
  configs: Configs;
  headers: Partial<HeadersInit>;
  responseType?: ResponseType;
  meta: Record<string, any>;
  path: string;
  params: Record<string, unknown | any>;
  body: any;
  type: string;
};
export type FetchData<DataType> = Promise<FetchedData<DataType>>;
export interface Interceptors {
  request?: (request: FetchifyRequestParameters) => FetchifyRequestParameters,
  response?: (result: FetchResult, requestInit: RequestInit, fetchParams: FetchifyRequestParameters) => Promise<FetchResult>
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
    : `${baseURL}${path.startsWith("/") ? "" : "/"}${path}${serializeObject(params)}`;

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
  let fetchParams: FetchifyRequestParameters = {
    headers: { ...globalHeaders.getAll(), ...headers } as HeadersInit,
    configs: { ...globalConfigs.getAll(), ...configs },
    params,
    body,
    path,
    responseType,
    meta,
    type
  };

  if (interceptors.request) {
    fetchParams = {...fetchParams, ...interceptors.request(fetchParams)};
  }
  requestInit.method = fetchParams.type;
  if (fetchParams.body && fetchParams.type && fetchParams.type !== 'GET') {
    if (fetchParams.body instanceof FormData || typeof fetchParams.body === 'string') {
      requestInit.body = fetchParams.body;
    } else {
      requestInit.body = fetchParams.body && JSON.stringify(fetchParams.body);
    }
  }

  Object.keys(fetchParams.headers).forEach((k) => {
    if (fetchParams.headers[k] === undefined && typeof fetchParams.headers[k] === 'undefined') delete fetchParams.headers[k];
  })


  url = setURL(fetchParams.configs.baseURL, fetchParams.path, fetchParams.params);


  requestInit = {
    ...requestInit,
    ...fetchParams.configs,
    headers: fetchParams.headers as HeadersInit,
  };

  try {
    
    response = await fetch(url, requestInit);
    
    const NO_DATA = fetchParams.type === "HEAD" || response.status === 204;

    

    let responseBody = {};
    if (!NO_DATA) {
      responseBody = await response[responseTypes.includes(fetchParams.responseType) ? fetchParams.responseType : 'json']();
      
    }
    if (!response.ok) {
      result = {
        meta: fetchParams.meta,
        response,
        error: {
          ...responseBody,
        },
      };
      
      throw result;
    }

    

    result = { data: responseBody, response, meta: fetchParams.meta };
    if (interceptors.response) {
      return interceptors.response(result, requestInit, fetchParams);
    }
    

    return result;
  } catch (error: any) {
    
    const isTypeError = error instanceof Error && !('response' in error);
    const errResponse: FetchResult = isTypeError ?
      {
        error: {
          name: error.name,
          message: error.message
        },
        meta: fetchParams.meta,
      }
      : error;
    if (interceptors.response) {
      return interceptors.response(errResponse, requestInit, fetchParams);

    }

    return errResponse;
  }
}

function setFetchAbort() {
  const controller = new AbortController();
  return controller;
}


function HandleTimeOut(timeout: number, controller: AbortController) {
  if (typeof timeout !== 'number') return;

  const timerId = setTimeout(() => {
    controller.abort();
  }, timeout);

  return timerId;
}


export async function GET<Type = any>(
  route: string,
  {
    params,
    configs = {},
    headers,
    responseType,
    meta = {},
    timeout
  }: {
    params?: Record<string, unknown | any>,
    configs?: Configs,
    headers?: Partial<HeadersInit>,
    responseType?: ResponseType,
    meta?: Record<string, any>,
    timeout?: number;
  } = {},
  abortCallback?: (controller: AbortController) => void
): FetchData<Type> {
  const controller = setFetchAbort();
  if (controller instanceof AbortController) {
    configs.signal = controller.signal;
  }

  if (abortCallback) {
    abortCallback(controller);
  }
  const timerId = HandleTimeOut(timeout, controller);
  const { data, response, error } = await init('GET', route, { params, configs, headers, responseType, meta });
  clearTimeout(timerId);

  return {
    data,
    response,
    error,
    meta
  };
};

export async function HEAD<Type = any>(
  route: string,
  {
    params,
    configs = {},
    headers,
    meta = {},
    timeout
  }: {
    params?: Record<string, unknown | any>,
    configs?: Configs,
    headers?: Partial<HeadersInit>,
    meta?: Record<string, any>;
    timeout?: number;
  } = {},
  abortCallback?: (controller: AbortController) => void
): FetchData<Type> {
  const controller = setFetchAbort();
  if (controller instanceof AbortController) {
    configs.signal = controller.signal;
  }

  if (abortCallback) {
    abortCallback(controller);
  }
  const timerId = HandleTimeOut(timeout, controller);
  const { data, response, error } = await init('HEAD', route, { params, configs, headers, meta });
  clearTimeout(timerId);

  return {
    data,
    response,
    error,
    meta
  };
};

export async function POST<Type = any>(
  route: string,
  {
    body = {},
    params,
    configs = {},
    headers = {},
    responseType,
    meta = {},
    timeout

  }: {
    body?: any,
    params?: Record<string, unknown | any>,
    configs?: Configs,
    headers?: Partial<HeadersInit>,
    responseType?: ResponseType,
    meta?: Record<string, any>;
    timeout?: number;
  } = {},
  abortCallback?: (controller: AbortController) => void
): FetchData<Type> {
  const controller = setFetchAbort();
  if (controller instanceof AbortController) {
    configs.signal = controller.signal;
  }

  if (abortCallback) {
    abortCallback(controller);
  }
  const timerId = HandleTimeOut(timeout, controller);
  const { data, response, error } = await init('POST', route,
    {
      params, configs, body, headers, responseType, meta
    });
  clearTimeout(timerId);

  return {
    data,
    response,
    error,
    meta
  };
};

export async function PUT<Type = any>(route: string,
  {
    body = {}, params, configs = {}, headers = {}, responseType, meta = {}, timeout

  }: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeout?: number;
  } = {},
  abortCallback?: (controller: AbortController) => void
): FetchData<Type> {
  const controller = setFetchAbort();
  if (controller instanceof AbortController) {
    configs.signal = controller.signal;
  }

  if (abortCallback) {
    abortCallback(controller);
  }
  const timerId = HandleTimeOut(timeout, controller);
  const { data, response, error } = await init('PUT', route, {
    params, configs, body, headers, responseType, meta
  });
  clearTimeout(timerId);

  return {
    data,
    response,
    error,
    meta
  };
}

export async function DELETE<Type = any>(route: string,
  {
    body = {}, params, configs = {}, headers = {}, responseType, meta = {},
    timeout
  }: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeout?: number;
  } = {},
  abortCallback?: (controller: AbortController) => void): FetchData<Type> {
  const controller = setFetchAbort();
  if (controller instanceof AbortController) {
    configs.signal = controller.signal;
  }

  if (abortCallback) {
    abortCallback(controller);
  }
  const timerId = HandleTimeOut(timeout, controller);
  const { data, response, error } = await init('DELETE', route, {
    params, configs, body, headers, responseType, meta
  });
  clearTimeout(timerId);

  return {
    data,
    response,
    error,
    meta
  };
}

export async function PATCH<Type = any>(route: string,
  {
    body = {}, params, configs = {}, headers = {}, responseType, meta = {}, timeout

  }: {
    body?: any;
    params?: Record<string, unknown | any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeout?: number;
  } = {},
  abortCallback?: (controller: AbortController) => void): FetchData<Type> {
  const controller = setFetchAbort();
  if (controller instanceof AbortController) {
    configs.signal = controller.signal;
  }

  if (abortCallback) {
    abortCallback(controller);
  }
  const timerId = HandleTimeOut(timeout, controller);
  const { data, response, error } = await init('PATCH', route, {
    params, configs, body, headers, responseType, meta
  });
  clearTimeout(timerId);

  return {
    data,
    response,
    error,
    meta
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
