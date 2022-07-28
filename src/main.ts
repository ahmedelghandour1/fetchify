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
    responseBody = await response[responseType]();
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
    const errResponse: FetchResult = isTypeError ?
      {
        error: {
          name: error.name,
          message: error.message
        }
      }
      : error;
    if (interceptors.response) {
      return interceptors.response(errResponse, requestInit);

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
    error
  };
};

export async function HEAD<Type = any>(
  route: string,
  {
    params,
    configs,
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
    error
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
    error
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
    error
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
    error
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
    error
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



/**
 * ========  FOR DEBUGGING  ==========
 */

// const x = FileOutput
// FileOutput && console.log(FileOutput)