/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dist/browser/build.common.js":
/*!*********************************************!*\
  !*** ../../../dist/browser/build.common.js ***!
  \*********************************************/
/***/ ((module) => {

/** 
 * fetchify v1.0.5 (https://github.com/ahmedElghandour1/fetchify#readme)
 * Copyright 2021 - 2022 | Author: Ahmed Elghandour
 * Licensed under MIT (https://github.com/ahmedElghandour1/fetchify/blob/master/LICENSE)
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/platforms/browser.ts
var browser_exports = {};
__export(browser_exports, {
  DELETE: () => DELETE,
  GET: () => GET,
  HEAD: () => HEAD,
  PATCH: () => PATCH,
  POST: () => POST,
  PUT: () => PUT,
  default: () => main_default,
  getParamsFromString: () => getParamsFromString,
  globalConfigs: () => globalConfigs,
  globalHeaders: () => globalHeaders,
  isBrowser: () => isBrowser,
  nop: () => nop,
  replaceParamsInString: () => replaceParamsInString,
  serializeObject: () => serializeObject,
  setInterceptors: () => setInterceptors
});
module.exports = __toCommonJS(browser_exports);

// src/helpers/index.ts
var isBrowser = () => typeof window === "object";
var isObject = (arg) => arg && typeof arg === "object" && !Array.isArray(Array);
var isEmpty = (arg) => {
  if (!isObject(arg))
    throw Error("type should be object!");
  const key = Object.keys(arg);
  return !key.length;
};
function isValidQeuryParam(param) {
  if (param === void 0 || param === null)
    return false;
  if (typeof param === "string" || typeof param === "bigint" || typeof param === "number" || typeof param === "boolean") {
    return true;
  }
  if (Array.isArray(param) && param.length)
    return true;
  return false;
}
function serializeObject(obj) {
  if (!isObject(obj) || isEmpty(obj))
    return "";
  let string = "?";
  const keys = Object.keys(obj);
  keys.forEach((key, i) => {
    if (!isValidQeuryParam(obj[key]))
      return;
    if (i !== 0) {
      string += "&";
    }
    const isArray = Array.isArray(obj[key]);
    if (isArray) {
      obj[key].forEach((param, index) => {
        if (isValidQeuryParam(param)) {
          if (index !== 0) {
            string += "&";
          }
          string += `${encodeURIComponent(key)}=${encodeURIComponent(param)}`;
        }
      });
    } else {
      string += `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
    }
  });
  return string;
}
function getParamsFromString(input) {
  const matches = [];
  input.replace(/(\{+)([^}]+)(}+)/g, (_, lb, txt, rb) => {
    if (lb.length === rb.length)
      matches.push(txt);
    return txt;
  });
  return matches;
}
function replaceParamsInString(input, params) {
  let str = input;
  const matches = getParamsFromString(input);
  matches.forEach((match) => {
    if (params[match]) {
      str = str.replace(`{${match}}`, params[match]);
    }
  });
  return str;
}
function nop() {
}

// src/main.ts
var responseTypes = ["json", "text", "blob", "arrayBuffer", "formData"];
var globalConfigs = function globalConfigs2() {
  let _configs = {};
  const getAll = function getAll2() {
    return _configs;
  };
  const set = function set2(configs) {
    _configs = configs;
  };
  const update = function update2(configs) {
    _configs = { ..._configs, ...configs };
  };
  const remove = function remove2(key) {
    if (typeof key === "string") {
      delete _configs[key];
    }
  };
  return {
    set,
    getAll,
    update,
    remove
  };
}();
var globalHeaders = function globalHeaders2() {
  let _headers = {};
  const getAll = function getAll2() {
    return _headers;
  };
  const set = function set2(headers) {
    _headers = headers;
  };
  const update = function update2(headers) {
    _headers = { ..._headers, ...headers };
  };
  const remove = function remove2(key) {
    if (typeof key === "string") {
      delete _headers[key];
    }
  };
  return {
    set,
    getAll,
    update,
    remove
  };
}();
var interceptors = {
  request: void 0,
  response: void 0
};
function setInterceptors({ request, response }) {
  if (request)
    interceptors.request = request;
  if (response)
    interceptors.response = response;
}
function setURL(baseURL, path, params = {}) {
  const url = path.startsWith("http") ? path : `${baseURL}/${path}${serializeObject(params)}`;
  return url;
}
async function init(type, path, {
  params = {},
  configs = {},
  body,
  headers = {},
  responseType = "json",
  meta = {}
}) {
  let requestInit = {};
  let result;
  let url;
  let response;
  const globalConfig = globalConfigs.getAll();
  const { baseURL, ...restGlobalConfig } = globalConfig;
  requestInit.method = type;
  if (body && type && type !== "GET") {
    if (body instanceof FormData || typeof body === "string") {
      requestInit.body = body;
    } else {
      requestInit.body = JSON.stringify(body);
    }
  }
  const _headers = { ...globalHeaders.getAll(), ...headers };
  Object.keys(_headers).forEach((k) => {
    if (_headers[k] === void 0 && typeof _headers[k] === "undefined")
      delete _headers[k];
  });
  requestInit = {
    ...requestInit,
    ...restGlobalConfig,
    ...configs,
    headers: _headers
  };
  if (interceptors.request) {
    interceptors.request(requestInit);
  }
  url = setURL(configs.baseURL || baseURL, path, params);
  try {
    response = await fetch(url, requestInit);
    responseType = responseTypes.includes(responseType) ? responseType : "json";
    let responseBody = {};
    responseBody = await response[responseType]();
    if (!response.ok) {
      result = {
        meta,
        response,
        error: {
          ...responseBody
        }
      };
      throw result;
    }
    result = { data: responseBody, response, meta };
    if (interceptors.response) {
      return interceptors.response(result, requestInit);
    }
    return result;
  } catch (error) {
    const isTypeError = error instanceof Error && !("response" in error);
    const errResponse = isTypeError ? {
      error: {
        name: error.name,
        message: error.message
      }
    } : error;
    if (interceptors.response) {
      return interceptors.response(errResponse, requestInit);
    }
    console.log(errResponse, isTypeError);
    return errResponse;
  }
}
function setFetchAbort() {
  const controller = new AbortController();
  return controller;
}
function HandleTimeOut(timeout, controller) {
  if (typeof timeout !== "number")
    return;
  const timerId = setTimeout(() => {
    controller.abort();
  }, timeout);
  return timerId;
}
async function GET(route, {
  params,
  configs = {},
  headers,
  responseType,
  meta = {},
  timeout
} = {}, abortCallback) {
  const controller = setFetchAbort();
  if (controller instanceof AbortController) {
    configs.signal = controller.signal;
  }
  if (abortCallback) {
    abortCallback(controller);
  }
  const timerId = HandleTimeOut(timeout, controller);
  const { data, response, error } = await init("GET", route, { params, configs, headers, responseType, meta });
  clearTimeout(timerId);
  return {
    data,
    response,
    error
  };
}
async function HEAD(route, {
  params,
  configs,
  headers,
  meta = {},
  timeout
} = {}, abortCallback) {
  const controller = setFetchAbort();
  if (controller instanceof AbortController) {
    configs.signal = controller.signal;
  }
  if (abortCallback) {
    abortCallback(controller);
  }
  const timerId = HandleTimeOut(timeout, controller);
  const { data, response, error } = await init("HEAD", route, { params, configs, headers, meta });
  clearTimeout(timerId);
  return {
    data,
    response,
    error
  };
}
async function POST(route, {
  body = {},
  params,
  configs = {},
  headers = {},
  responseType,
  meta = {},
  timeout
} = {}, abortCallback) {
  const controller = setFetchAbort();
  if (controller instanceof AbortController) {
    configs.signal = controller.signal;
  }
  if (abortCallback) {
    abortCallback(controller);
  }
  const timerId = HandleTimeOut(timeout, controller);
  const { data, response, error } = await init(
    "POST",
    route,
    {
      params,
      configs,
      body,
      headers,
      responseType,
      meta
    }
  );
  clearTimeout(timerId);
  return {
    data,
    response,
    error
  };
}
async function PUT(route, {
  body = {},
  params,
  configs = {},
  headers = {},
  responseType,
  meta = {},
  timeout
} = {}, abortCallback) {
  const controller = setFetchAbort();
  if (controller instanceof AbortController) {
    configs.signal = controller.signal;
  }
  if (abortCallback) {
    abortCallback(controller);
  }
  const timerId = HandleTimeOut(timeout, controller);
  const { data, response, error } = await init("PUT", route, {
    params,
    configs,
    body,
    headers,
    responseType,
    meta
  });
  clearTimeout(timerId);
  return {
    data,
    response,
    error
  };
}
async function DELETE(route, {
  body = {},
  params,
  configs = {},
  headers = {},
  responseType,
  meta = {},
  timeout
} = {}, abortCallback) {
  const controller = setFetchAbort();
  if (controller instanceof AbortController) {
    configs.signal = controller.signal;
  }
  if (abortCallback) {
    abortCallback(controller);
  }
  const timerId = HandleTimeOut(timeout, controller);
  const { data, response, error } = await init("DELETE", route, {
    params,
    configs,
    body,
    headers,
    responseType,
    meta
  });
  clearTimeout(timerId);
  return {
    data,
    response,
    error
  };
}
async function PATCH(route, {
  body = {},
  params,
  configs = {},
  headers = {},
  responseType,
  meta = {},
  timeout
} = {}, abortCallback) {
  const controller = setFetchAbort();
  if (controller instanceof AbortController) {
    configs.signal = controller.signal;
  }
  if (abortCallback) {
    abortCallback(controller);
  }
  const timerId = HandleTimeOut(timeout, controller);
  const { data, response, error } = await init("PATCH", route, {
    params,
    configs,
    body,
    headers,
    responseType,
    meta
  });
  clearTimeout(timerId);
  return {
    data,
    response,
    error
  };
}
var fetchify = {
  POST,
  GET,
  DELETE,
  PUT,
  PATCH,
  HEAD
};
var main_default = fetchify;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BsYXRmb3Jtcy9icm93c2VyLnRzIiwgIi4uLy4uL3NyYy9oZWxwZXJzL2luZGV4LnRzIiwgIi4uLy4uL3NyYy9tYWluLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgeyBcbiAgICBERUxFVEUsIFxuICAgIEdFVCwgXG4gICAgSEVBRCwgXG4gICAgUEFUQ0gsIFxuICAgIFBPU1QsIFxuICAgIFBVVCwgXG4gICAgZ2xvYmFsQ29uZmlncywgXG4gICAgZ2xvYmFsSGVhZGVycywgXG4gICAgc2V0SW50ZXJjZXB0b3JzICxcbiAgICBnZXRQYXJhbXNGcm9tU3RyaW5nLFxuICAgIGlzQnJvd3NlcixcbiAgICBub3AsXG4gICAgcmVwbGFjZVBhcmFtc0luU3RyaW5nLFxuICAgIHNlcmlhbGl6ZU9iamVjdCxcbiAgICBkZWZhdWx0XG59IGZyb20gJ0AvbWFpbic7XG5cbmV4cG9ydCB0eXBlIHsgXG4gICAgQ29uZmlncywgXG4gICAgRmV0Y2hEYXRhLCBcbiAgICBGZXRjaFJlc3VsdCwgXG4gICAgRmV0Y2hlZERhdGEsIFxuICAgIEludGVyY2VwdG9ycywgXG4gICAgTWV0aG9kLCBcbiAgICBSZXNwb25zZVR5cGUsIFxufSBmcm9tICdAL21haW4nXG4iLCAiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuZXhwb3J0IGNvbnN0IGlzQnJvd3NlciA9ICgpOiBib29sZWFuID0+IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnO1xuY29uc3QgaXNPYmplY3QgPSA8VHlwZT4oYXJnOiBUeXBlKTpib29sZWFuID0+IGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShBcnJheSk7XG5cbmNvbnN0IGlzRW1wdHkgPSA8VHlwZT4oYXJnOiBUeXBlKTpib29sZWFuID0+IHtcbiAgaWYgKCFpc09iamVjdChhcmcpKSB0aHJvdyBFcnJvcigndHlwZSBzaG91bGQgYmUgb2JqZWN0IScpO1xuICBjb25zdCBrZXkgPSBPYmplY3Qua2V5cyhhcmcpO1xuICByZXR1cm4gIWtleS5sZW5ndGg7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkUWV1cnlQYXJhbShcbiAgcGFyYW06IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfFxuICBBcnJheTxzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuPixcbikge1xuICBpZiAocGFyYW0gPT09IHVuZGVmaW5lZCB8fCBwYXJhbSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgcGFyYW0gPT09ICdzdHJpbmcnXG4gIHx8IHR5cGVvZiBwYXJhbSA9PT0gJ2JpZ2ludCdcbiAgfHwgdHlwZW9mIHBhcmFtID09PSAnbnVtYmVyJ1xuICB8fCB0eXBlb2YgcGFyYW0gPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW0pICYmIHBhcmFtLmxlbmd0aCkgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplT2JqZWN0KG9iajogUmVjb3JkPHN0cmluZywgYW55Pik6IHN0cmluZyB7XG4gIGlmICghaXNPYmplY3Qob2JqKSB8fCBpc0VtcHR5KG9iaikpIHJldHVybiAnJztcbiAgbGV0IHN0cmluZyA9ICc/JztcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGtleXMuZm9yRWFjaCgoa2V5LCBpKSA9PiB7XG4gICAgaWYgKCFpc1ZhbGlkUWV1cnlQYXJhbShvYmpba2V5XSkpIHJldHVybjtcbiAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgc3RyaW5nICs9ICcmJztcbiAgICB9XG4gICAgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkob2JqW2tleV0pO1xuXG4gICAgaWYgKGlzQXJyYXkpIHtcbiAgICAgIG9ialtrZXldLmZvckVhY2goKHBhcmFtOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmIChpc1ZhbGlkUWV1cnlQYXJhbShwYXJhbSkpIHtcbiAgICAgICAgICBpZiAoaW5kZXggIT09IDApIHtcbiAgICAgICAgICAgIHN0cmluZyArPSAnJic7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0cmluZyArPSBgJHtlbmNvZGVVUklDb21wb25lbnQoa2V5KX09JHtlbmNvZGVVUklDb21wb25lbnQocGFyYW0pfWA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHJpbmcgKz0gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKX1gO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJhbXNGcm9tU3RyaW5nKGlucHV0OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgY29uc3QgbWF0Y2hlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBpbnB1dC5yZXBsYWNlKC8oXFx7KykoW159XSspKH0rKS9nLCAoXywgbGIsIHR4dCwgcmIpOiBzdHJpbmcgPT4ge1xuICAgIGlmIChsYi5sZW5ndGggPT09IHJiLmxlbmd0aCkgbWF0Y2hlcy5wdXNoKHR4dCk7XG4gICAgcmV0dXJuIHR4dDtcbiAgfSk7XG4gIHJldHVybiBtYXRjaGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVBhcmFtc0luU3RyaW5nKGlucHV0OiBzdHJpbmcsIHBhcmFtczogUmVjb3JkPHN0cmluZywgc3RyaW5nPik6IHN0cmluZyB7XG4gIGxldCBzdHIgPSBpbnB1dDtcbiAgY29uc3QgbWF0Y2hlcyA9IGdldFBhcmFtc0Zyb21TdHJpbmcoaW5wdXQpO1xuICBtYXRjaGVzLmZvckVhY2goKG1hdGNoOiBzdHJpbmcpID0+IHtcbiAgICBpZiAocGFyYW1zW21hdGNoXSkge1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UoYHske21hdGNofX1gLCBwYXJhbXNbbWF0Y2hdKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc3RyO1xufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcCgpIHt9IiwgIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQge1xuICBzZXJpYWxpemVPYmplY3Rcbn0gZnJvbSAnLi9oZWxwZXJzJztcblxuZGVjbGFyZSBjb25zdCBGaWxlT3V0cHV0OiBzdHJpbmc7XG5cbi8qID09PT09PT09PT09PT09PT09IFNUQVJUIFRZUEVTID09PT09PT09PT09PT09PT09ICovXG5kZWNsYXJlIGNvbnN0IGdsb2JhbDogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG5leHBvcnQgdHlwZSBGZXRjaGVkRGF0YTxEYXRhVHlwZT4gPSB7XG4gIGRhdGE/OiBEYXRhVHlwZTtcbiAgcmVzcG9uc2U/OiBSZXNwb25zZTtcbiAgZXJyb3I/OiBhbnk7XG4gIGFib3J0PzogKCkgPT4gdm9pZDtcbn07XG5leHBvcnQgdHlwZSBDb25maWdzID0gT21pdDxSZXF1ZXN0SW5pdCwgJ2JvZHknIHwgJ2hlYWRlcnMnIHwgJ21ldGhvZCc+ICYge1xuICBiYXNlVVJMPzogc3RyaW5nLFxufVxuZXhwb3J0IHR5cGUgRmV0Y2hSZXN1bHQgPSB7XG4gIGRhdGE6IGFueTtcbiAgcmVzcG9uc2U6IFJlc3BvbnNlO1xuICBlcnJvcj86IHVuZGVmaW5lZDtcbn0gfCB7XG4gIGVycm9yOiBhbnk7XG4gIGRhdGE/OiB1bmRlZmluZWQ7XG4gIHJlc3BvbnNlPzogdW5kZWZpbmVkO1xufTtcbmV4cG9ydCB0eXBlIE1ldGhvZCA9ICdQT1NUJyB8ICdHRVQnIHwgJ0RFTEVURScgfCAnUFVUJyB8ICdQQVRDSCcgfCAnSEVBRCc7XG5leHBvcnQgdHlwZSBSZXNwb25zZVR5cGUgPSAnanNvbicgfCAndGV4dCcgfCAnYmxvYicgfCAnYXJyYXlCdWZmZXInIHwgJ2Zvcm1EYXRhJyAvLyBUT0RPOiBuZWVkIHRvIGFkZCB0aGUgZHluYW1pYyB0eXBlXG5leHBvcnQgdHlwZSBGZXRjaERhdGE8RGF0YVR5cGU+ID0gUHJvbWlzZTxGZXRjaGVkRGF0YTxEYXRhVHlwZT4+O1xuZXhwb3J0IGludGVyZmFjZSBJbnRlcmNlcHRvcnMge1xuICByZXF1ZXN0PzogKHJlcXVlc3Q6IFJlcXVlc3RJbml0KSA9PiB2b2lkLFxuICByZXNwb25zZT86IChyZXN1bHQ6IEZldGNoUmVzdWx0LCByZXF1ZXN0SW5pdDogUmVxdWVzdEluaXQpID0+IFByb21pc2U8RmV0Y2hSZXN1bHQ+XG59XG4vKiA9PT09PT09PT09PT09PT09PSBFTkQgVFlQRVMgPT09PT09PT09PT09PT09PT0gKi9cblxuY29uc3QgcmVzcG9uc2VUeXBlczogQXJyYXk8UmVzcG9uc2VUeXBlPiA9IFsnanNvbicsICd0ZXh0JywgJ2Jsb2InLCAnYXJyYXlCdWZmZXInLCAnZm9ybURhdGEnXTtcblxuZXhwb3J0IGNvbnN0IGdsb2JhbENvbmZpZ3MgPSAoZnVuY3Rpb24gZ2xvYmFsQ29uZmlncygpIHtcbiAgbGV0IF9jb25maWdzOiBDb25maWdzID0ge307XG4gIGNvbnN0IGdldEFsbCA9IGZ1bmN0aW9uIGdldEFsbCgpOiBDb25maWdzIHtcbiAgICByZXR1cm4gX2NvbmZpZ3M7XG4gIH07XG5cbiAgY29uc3Qgc2V0ID0gZnVuY3Rpb24gc2V0KGNvbmZpZ3M6IENvbmZpZ3MpOiB2b2lkIHtcbiAgICBfY29uZmlncyA9IGNvbmZpZ3M7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKGNvbmZpZ3M6IENvbmZpZ3MpOiB2b2lkIHtcbiAgICBfY29uZmlncyA9IHsgLi4uX2NvbmZpZ3MsIC4uLmNvbmZpZ3MgfTtcbiAgfTtcblxuICBjb25zdCByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoa2V5OiBrZXlvZiBDb25maWdzIHwgKGtleW9mIENvbmZpZ3MpW10pIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRlbGV0ZSBfY29uZmlnc1trZXldO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNldCxcbiAgICBnZXRBbGwsXG4gICAgdXBkYXRlLFxuICAgIHJlbW92ZSxcbiAgfTtcbn0oKSk7XG5cbmV4cG9ydCBjb25zdCBnbG9iYWxIZWFkZXJzID0gKGZ1bmN0aW9uIGdsb2JhbEhlYWRlcnMoKSB7XG4gIGxldCBfaGVhZGVyczogUGFydGlhbDxIZWFkZXJzSW5pdD4gPSB7fTtcblxuICBjb25zdCBnZXRBbGwgPSBmdW5jdGlvbiBnZXRBbGwoKTogUGFydGlhbDxIZWFkZXJzSW5pdD4ge1xuICAgIHJldHVybiBfaGVhZGVycztcbiAgfTtcblxuICBjb25zdCBzZXQgPSBmdW5jdGlvbiBzZXQoaGVhZGVyczogUGFydGlhbDxIZWFkZXJzSW5pdD4pOiB2b2lkIHtcbiAgICBfaGVhZGVycyA9IGhlYWRlcnMgYXMgUGFydGlhbDxIZWFkZXJzSW5pdD47XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKGhlYWRlcnM6IFBhcnRpYWw8SGVhZGVyc0luaXQ+KTogdm9pZCB7XG4gICAgX2hlYWRlcnMgPSB7IC4uLl9oZWFkZXJzLCAuLi5oZWFkZXJzIH0gYXMgUGFydGlhbDxIZWFkZXJzSW5pdD47XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKGtleTogc3RyaW5nIHwgKHN0cmluZylbXSkge1xuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgZGVsZXRlIF9oZWFkZXJzW2tleSBhcyBrZXlvZiBQYXJ0aWFsPEhlYWRlcnNJbml0Pl07XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc2V0LFxuICAgIGdldEFsbCxcbiAgICB1cGRhdGUsXG4gICAgcmVtb3ZlLFxuICB9O1xufSgpKTtcblxuY29uc3QgaW50ZXJjZXB0b3JzOiBJbnRlcmNlcHRvcnMgPSB7XG4gIHJlcXVlc3Q6IHVuZGVmaW5lZCxcbiAgcmVzcG9uc2U6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRJbnRlcmNlcHRvcnMoeyByZXF1ZXN0LCByZXNwb25zZSB9OiBJbnRlcmNlcHRvcnMpOiB2b2lkIHtcbiAgaWYgKHJlcXVlc3QpXG4gICAgaW50ZXJjZXB0b3JzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBpZiAocmVzcG9uc2UpXG4gICAgaW50ZXJjZXB0b3JzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG59XG5cbmZ1bmN0aW9uIHNldFVSTChiYXNlVVJMOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIHBhdGg6IHN0cmluZyxcbiAgcGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9KTogc3RyaW5nIHtcbiAgY29uc3QgdXJsID0gcGF0aC5zdGFydHNXaXRoKCdodHRwJykgPyBwYXRoXG4gICAgOiBgJHtiYXNlVVJMfS8ke3BhdGh9JHtzZXJpYWxpemVPYmplY3QocGFyYW1zKX1gO1xuXG4gIHJldHVybiB1cmw7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXQodHlwZTogc3RyaW5nLFxuICBwYXRoOiBzdHJpbmcsXG4gIHtcbiAgICBwYXJhbXMgPSB7fSwgY29uZmlncyA9IHt9LCBib2R5LCBoZWFkZXJzID0ge30sIHJlc3BvbnNlVHlwZSA9ICdqc29uJywgbWV0YSA9IHt9XG4gIH06IHtcbiAgICBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duIHwgYW55PjtcbiAgICBjb25maWdzPzogQ29uZmlncztcbiAgICBib2R5PzogYW55O1xuICAgIGhlYWRlcnM/OiBQYXJ0aWFsPEhlYWRlcnNJbml0PjtcbiAgICByZXNwb25zZVR5cGU/OiBSZXNwb25zZVR5cGU7XG4gICAgbWV0YTogUmVjb3JkPHN0cmluZywgYW55PjtcbiAgfSk6IFByb21pc2U8RmV0Y2hSZXN1bHQ+IHtcbiAgbGV0IHJlcXVlc3RJbml0OiBSZXF1ZXN0SW5pdCA9IHt9O1xuICBsZXQgcmVzdWx0OiBhbnk7XG4gIGxldCB1cmw6IHN0cmluZztcbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcbiAgY29uc3QgZ2xvYmFsQ29uZmlnID0gZ2xvYmFsQ29uZmlncy5nZXRBbGwoKTtcbiAgY29uc3QgeyBiYXNlVVJMLCAuLi5yZXN0R2xvYmFsQ29uZmlnIH0gPSBnbG9iYWxDb25maWc7XG4gIHJlcXVlc3RJbml0Lm1ldGhvZCA9IHR5cGU7XG4gIGlmIChib2R5ICYmIHR5cGUgJiYgdHlwZSAhPT0gJ0dFVCcpIHtcbiAgICBpZiAoYm9keSBpbnN0YW5jZW9mIEZvcm1EYXRhIHx8IHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgcmVxdWVzdEluaXQuYm9keSA9IGJvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3RJbml0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICB9XG4gIH1cbiAgY29uc3QgX2hlYWRlcnMgPSB7IC4uLmdsb2JhbEhlYWRlcnMuZ2V0QWxsKCksIC4uLmhlYWRlcnMgfSBhcyBIZWFkZXJzSW5pdDtcblxuICBPYmplY3Qua2V5cyhfaGVhZGVycykuZm9yRWFjaCgoaykgPT4ge1xuICAgIGlmIChfaGVhZGVyc1trXSA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBfaGVhZGVyc1trXSA9PT0gJ3VuZGVmaW5lZCcpIGRlbGV0ZSBfaGVhZGVyc1trXTtcbiAgfSlcblxuXG4gIHJlcXVlc3RJbml0ID0ge1xuICAgIC4uLnJlcXVlc3RJbml0LFxuICAgIC4uLnJlc3RHbG9iYWxDb25maWcsXG4gICAgLi4uY29uZmlncyxcbiAgICBoZWFkZXJzOiBfaGVhZGVycyxcbiAgfTtcblxuICBpZiAoaW50ZXJjZXB0b3JzLnJlcXVlc3QpIHtcbiAgICBpbnRlcmNlcHRvcnMucmVxdWVzdChyZXF1ZXN0SW5pdCk7XG4gIH1cbiAgdXJsID0gc2V0VVJMKGNvbmZpZ3MuYmFzZVVSTCB8fCBiYXNlVVJMLCBwYXRoLCBwYXJhbXMpO1xuICB0cnkge1xuXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHJlcXVlc3RJbml0KTtcbiAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGVzLmluY2x1ZGVzKHJlc3BvbnNlVHlwZSkgPyByZXNwb25zZVR5cGUgOiAnanNvbic7XG4gICAgbGV0IHJlc3BvbnNlQm9keSA9IHt9O1xuICAgIC8vIFRPRE8gY2hlY2sgaWYgX2JvZHlCbG9iIGlzIHZhbGlkIHRvIHVzZVxuICAgIHJlc3BvbnNlQm9keSA9IGF3YWl0IHJlc3BvbnNlW3Jlc3BvbnNlVHlwZV0oKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG1ldGEsXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgICBlcnJvcjoge1xuICAgICAgICAgIC4uLnJlc3BvbnNlQm9keSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIHRocm93IHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXN1bHQgPSB7IGRhdGE6IHJlc3BvbnNlQm9keSwgcmVzcG9uc2UsIG1ldGEgfTtcbiAgICBpZiAoaW50ZXJjZXB0b3JzLnJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gaW50ZXJjZXB0b3JzLnJlc3BvbnNlKHJlc3VsdCwgcmVxdWVzdEluaXQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcblxuICAgIGNvbnN0IGlzVHlwZUVycm9yID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKCdyZXNwb25zZScgaW4gZXJyb3IpO1xuICAgIGNvbnN0IGVyclJlc3BvbnNlOiBGZXRjaFJlc3VsdCA9IGlzVHlwZUVycm9yID9cbiAgICAgIHtcbiAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICBuYW1lOiBlcnJvci5uYW1lLFxuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgOiBlcnJvcjtcbiAgICBpZiAoaW50ZXJjZXB0b3JzLnJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gaW50ZXJjZXB0b3JzLnJlc3BvbnNlKGVyclJlc3BvbnNlLCByZXF1ZXN0SW5pdCk7XG5cbiAgICB9XG4gICAgY29uc29sZS5sb2coZXJyUmVzcG9uc2UsIGlzVHlwZUVycm9yKTtcblxuICAgIHJldHVybiBlcnJSZXNwb25zZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRGZXRjaEFib3J0KCkge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICByZXR1cm4gY29udHJvbGxlcjtcbn1cblxuXG5mdW5jdGlvbiBIYW5kbGVUaW1lT3V0KHRpbWVvdXQ6IG51bWJlciwgY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyKSB7XG4gIGlmICh0eXBlb2YgdGltZW91dCAhPT0gJ251bWJlcicpIHJldHVybjtcblxuICBjb25zdCB0aW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29udHJvbGxlci5hYm9ydCgpO1xuICB9LCB0aW1lb3V0KTtcblxuICByZXR1cm4gdGltZXJJZDtcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUPFR5cGUgPSBhbnk+KFxuICByb3V0ZTogc3RyaW5nLFxuICB7XG4gICAgcGFyYW1zLFxuICAgIGNvbmZpZ3MgPSB7fSxcbiAgICBoZWFkZXJzLFxuICAgIHJlc3BvbnNlVHlwZSxcbiAgICBtZXRhID0ge30sXG4gICAgdGltZW91dFxuICB9OiB7XG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT4sXG4gICAgY29uZmlncz86IENvbmZpZ3MsXG4gICAgaGVhZGVycz86IFBhcnRpYWw8SGVhZGVyc0luaXQ+LFxuICAgIHJlc3BvbnNlVHlwZT86IFJlc3BvbnNlVHlwZSxcbiAgICBtZXRhPzogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICB0aW1lb3V0PzogbnVtYmVyO1xuICB9ID0ge30sXG4gIGFib3J0Q2FsbGJhY2s/OiAoY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyKSA9PiB2b2lkXG4pOiBGZXRjaERhdGE8VHlwZT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gc2V0RmV0Y2hBYm9ydCgpO1xuICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEFib3J0Q29udHJvbGxlcikge1xuICAgIGNvbmZpZ3Muc2lnbmFsID0gY29udHJvbGxlci5zaWduYWw7XG4gIH1cblxuICBpZiAoYWJvcnRDYWxsYmFjaykge1xuICAgIGFib3J0Q2FsbGJhY2soY29udHJvbGxlcik7XG4gIH1cbiAgY29uc3QgdGltZXJJZCA9IEhhbmRsZVRpbWVPdXQodGltZW91dCwgY29udHJvbGxlcik7XG4gIGNvbnN0IHsgZGF0YSwgcmVzcG9uc2UsIGVycm9yIH0gPSBhd2FpdCBpbml0KCdHRVQnLCByb3V0ZSwgeyBwYXJhbXMsIGNvbmZpZ3MsIGhlYWRlcnMsIHJlc3BvbnNlVHlwZSwgbWV0YSB9KTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICByZXNwb25zZSxcbiAgICBlcnJvclxuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEhFQUQ8VHlwZSA9IGFueT4oXG4gIHJvdXRlOiBzdHJpbmcsXG4gIHtcbiAgICBwYXJhbXMsXG4gICAgY29uZmlncyxcbiAgICBoZWFkZXJzLFxuICAgIG1ldGEgPSB7fSxcbiAgICB0aW1lb3V0XG4gIH06IHtcbiAgICBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duIHwgYW55PixcbiAgICBjb25maWdzPzogQ29uZmlncyxcbiAgICBoZWFkZXJzPzogUGFydGlhbDxIZWFkZXJzSW5pdD4sXG4gICAgbWV0YT86IFJlY29yZDxzdHJpbmcsIGFueT47XG4gICAgdGltZW91dD86IG51bWJlcjtcbiAgfSA9IHt9LFxuICBhYm9ydENhbGxiYWNrPzogKGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcikgPT4gdm9pZFxuKTogRmV0Y2hEYXRhPFR5cGU+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IHNldEZldGNoQWJvcnQoKTtcbiAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBBYm9ydENvbnRyb2xsZXIpIHtcbiAgICBjb25maWdzLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgaWYgKGFib3J0Q2FsbGJhY2spIHtcbiAgICBhYm9ydENhbGxiYWNrKGNvbnRyb2xsZXIpO1xuICB9XG4gIGNvbnN0IHRpbWVySWQgPSBIYW5kbGVUaW1lT3V0KHRpbWVvdXQsIGNvbnRyb2xsZXIpO1xuICBjb25zdCB7IGRhdGEsIHJlc3BvbnNlLCBlcnJvciB9ID0gYXdhaXQgaW5pdCgnSEVBRCcsIHJvdXRlLCB7IHBhcmFtcywgY29uZmlncywgaGVhZGVycywgbWV0YSB9KTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICByZXNwb25zZSxcbiAgICBlcnJvclxuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1Q8VHlwZSA9IGFueT4oXG4gIHJvdXRlOiBzdHJpbmcsXG4gIHtcbiAgICBib2R5ID0ge30sXG4gICAgcGFyYW1zLFxuICAgIGNvbmZpZ3MgPSB7fSxcbiAgICBoZWFkZXJzID0ge30sXG4gICAgcmVzcG9uc2VUeXBlLFxuICAgIG1ldGEgPSB7fSxcbiAgICB0aW1lb3V0XG5cbiAgfToge1xuICAgIGJvZHk/OiBhbnksXG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT4sXG4gICAgY29uZmlncz86IENvbmZpZ3MsXG4gICAgaGVhZGVycz86IFBhcnRpYWw8SGVhZGVyc0luaXQ+LFxuICAgIHJlc3BvbnNlVHlwZT86IFJlc3BvbnNlVHlwZSxcbiAgICBtZXRhPzogUmVjb3JkPHN0cmluZywgYW55PjtcbiAgICB0aW1lb3V0PzogbnVtYmVyO1xuICB9ID0ge30sXG4gIGFib3J0Q2FsbGJhY2s/OiAoY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyKSA9PiB2b2lkXG4pOiBGZXRjaERhdGE8VHlwZT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gc2V0RmV0Y2hBYm9ydCgpO1xuICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEFib3J0Q29udHJvbGxlcikge1xuICAgIGNvbmZpZ3Muc2lnbmFsID0gY29udHJvbGxlci5zaWduYWw7XG4gIH1cblxuICBpZiAoYWJvcnRDYWxsYmFjaykge1xuICAgIGFib3J0Q2FsbGJhY2soY29udHJvbGxlcik7XG4gIH1cbiAgY29uc3QgdGltZXJJZCA9IEhhbmRsZVRpbWVPdXQodGltZW91dCwgY29udHJvbGxlcik7XG4gIGNvbnN0IHsgZGF0YSwgcmVzcG9uc2UsIGVycm9yIH0gPSBhd2FpdCBpbml0KCdQT1NUJywgcm91dGUsXG4gICAge1xuICAgICAgcGFyYW1zLCBjb25maWdzLCBib2R5LCBoZWFkZXJzLCByZXNwb25zZVR5cGUsIG1ldGFcbiAgICB9KTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICByZXNwb25zZSxcbiAgICBlcnJvclxuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBVVDxUeXBlID0gYW55Pihyb3V0ZTogc3RyaW5nLFxuICB7XG4gICAgYm9keSA9IHt9LCBwYXJhbXMsIGNvbmZpZ3MgPSB7fSwgaGVhZGVycyA9IHt9LCByZXNwb25zZVR5cGUsIG1ldGEgPSB7fSwgdGltZW91dFxuXG4gIH06IHtcbiAgICBib2R5PzogYW55O1xuICAgIHBhcmFtcz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBhbnk+O1xuICAgIGNvbmZpZ3M/OiBDb25maWdzO1xuICAgIGhlYWRlcnM/OiBQYXJ0aWFsPEhlYWRlcnNJbml0PjtcbiAgICByZXNwb25zZVR5cGU/OiBSZXNwb25zZVR5cGU7XG4gICAgbWV0YT86IFJlY29yZDxzdHJpbmcsIGFueT47XG4gICAgdGltZW91dD86IG51bWJlcjtcbiAgfSA9IHt9LFxuICBhYm9ydENhbGxiYWNrPzogKGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcikgPT4gdm9pZFxuKTogRmV0Y2hEYXRhPFR5cGU+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IHNldEZldGNoQWJvcnQoKTtcbiAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBBYm9ydENvbnRyb2xsZXIpIHtcbiAgICBjb25maWdzLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgaWYgKGFib3J0Q2FsbGJhY2spIHtcbiAgICBhYm9ydENhbGxiYWNrKGNvbnRyb2xsZXIpO1xuICB9XG4gIGNvbnN0IHRpbWVySWQgPSBIYW5kbGVUaW1lT3V0KHRpbWVvdXQsIGNvbnRyb2xsZXIpO1xuICBjb25zdCB7IGRhdGEsIHJlc3BvbnNlLCBlcnJvciB9ID0gYXdhaXQgaW5pdCgnUFVUJywgcm91dGUsIHtcbiAgICBwYXJhbXMsIGNvbmZpZ3MsIGJvZHksIGhlYWRlcnMsIHJlc3BvbnNlVHlwZSwgbWV0YVxuICB9KTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICByZXNwb25zZSxcbiAgICBlcnJvclxuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFPFR5cGUgPSBhbnk+KHJvdXRlOiBzdHJpbmcsXG4gIHtcbiAgICBib2R5ID0ge30sIHBhcmFtcywgY29uZmlncyA9IHt9LCBoZWFkZXJzID0ge30sIHJlc3BvbnNlVHlwZSwgbWV0YSA9IHt9LFxuICAgIHRpbWVvdXRcbiAgfToge1xuICAgIGJvZHk/OiBhbnk7XG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT47XG4gICAgY29uZmlncz86IENvbmZpZ3M7XG4gICAgaGVhZGVycz86IFBhcnRpYWw8SGVhZGVyc0luaXQ+O1xuICAgIHJlc3BvbnNlVHlwZT86IFJlc3BvbnNlVHlwZTtcbiAgICBtZXRhPzogUmVjb3JkPHN0cmluZywgYW55PjtcbiAgICB0aW1lb3V0PzogbnVtYmVyO1xuICB9ID0ge30sXG4gIGFib3J0Q2FsbGJhY2s/OiAoY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyKSA9PiB2b2lkKTogRmV0Y2hEYXRhPFR5cGU+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IHNldEZldGNoQWJvcnQoKTtcbiAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBBYm9ydENvbnRyb2xsZXIpIHtcbiAgICBjb25maWdzLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgaWYgKGFib3J0Q2FsbGJhY2spIHtcbiAgICBhYm9ydENhbGxiYWNrKGNvbnRyb2xsZXIpO1xuICB9XG4gIGNvbnN0IHRpbWVySWQgPSBIYW5kbGVUaW1lT3V0KHRpbWVvdXQsIGNvbnRyb2xsZXIpO1xuICBjb25zdCB7IGRhdGEsIHJlc3BvbnNlLCBlcnJvciB9ID0gYXdhaXQgaW5pdCgnREVMRVRFJywgcm91dGUsIHtcbiAgICBwYXJhbXMsIGNvbmZpZ3MsIGJvZHksIGhlYWRlcnMsIHJlc3BvbnNlVHlwZSwgbWV0YVxuICB9KTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICByZXNwb25zZSxcbiAgICBlcnJvclxuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUEFUQ0g8VHlwZSA9IGFueT4ocm91dGU6IHN0cmluZyxcbiAge1xuICAgIGJvZHkgPSB7fSwgcGFyYW1zLCBjb25maWdzID0ge30sIGhlYWRlcnMgPSB7fSwgcmVzcG9uc2VUeXBlLCBtZXRhID0ge30sIHRpbWVvdXRcblxuICB9OiB7XG4gICAgYm9keT86IGFueTtcbiAgICBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duIHwgYW55PjtcbiAgICBjb25maWdzPzogQ29uZmlncztcbiAgICBoZWFkZXJzPzogUGFydGlhbDxIZWFkZXJzSW5pdD47XG4gICAgcmVzcG9uc2VUeXBlPzogUmVzcG9uc2VUeXBlO1xuICAgIG1ldGE/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICAgIHRpbWVvdXQ/OiBudW1iZXI7XG4gIH0gPSB7fSxcbiAgYWJvcnRDYWxsYmFjaz86IChjb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIpID0+IHZvaWQpOiBGZXRjaERhdGE8VHlwZT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gc2V0RmV0Y2hBYm9ydCgpO1xuICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEFib3J0Q29udHJvbGxlcikge1xuICAgIGNvbmZpZ3Muc2lnbmFsID0gY29udHJvbGxlci5zaWduYWw7XG4gIH1cblxuICBpZiAoYWJvcnRDYWxsYmFjaykge1xuICAgIGFib3J0Q2FsbGJhY2soY29udHJvbGxlcik7XG4gIH1cbiAgY29uc3QgdGltZXJJZCA9IEhhbmRsZVRpbWVPdXQodGltZW91dCwgY29udHJvbGxlcik7XG4gIGNvbnN0IHsgZGF0YSwgcmVzcG9uc2UsIGVycm9yIH0gPSBhd2FpdCBpbml0KCdQQVRDSCcsIHJvdXRlLCB7XG4gICAgcGFyYW1zLCBjb25maWdzLCBib2R5LCBoZWFkZXJzLCByZXNwb25zZVR5cGUsIG1ldGFcbiAgfSk7XG4gIGNsZWFyVGltZW91dCh0aW1lcklkKTtcblxuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgcmVzcG9uc2UsXG4gICAgZXJyb3JcbiAgfTtcbn1cblxuY29uc3QgZmV0Y2hpZnkgPSB7XG4gIFBPU1QsXG4gIEdFVCxcbiAgREVMRVRFLFxuICBQVVQsXG4gIFBBVENILFxuICBIRUFELFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZmV0Y2hpZnk7XG5cbmV4cG9ydCB7XG4gIGlzQnJvd3NlcixcbiAgbm9wLFxuICBzZXJpYWxpemVPYmplY3QsXG4gIGdldFBhcmFtc0Zyb21TdHJpbmcsXG4gIHJlcGxhY2VQYXJhbXNJblN0cmluZ1xufSBmcm9tICcuL2hlbHBlcnMnXG5cblxuXG4vKipcbiAqID09PT09PT09ICBGT1IgREVCVUdHSU5HICA9PT09PT09PT09XG4gKi9cblxuLy8gY29uc3QgeCA9IEZpbGVPdXRwdXRcbi8vIEZpbGVPdXRwdXQgJiYgY29uc29sZS5sb2coRmlsZU91dHB1dCkiXSwKICAibWFwcGluZ3MiOiAi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Q0wsZUFBd0U7QUFDeEUsUUFBTSxhQUFhLGNBQWM7QUFDakMsTUFBSSxzQkFBc0IsaUJBQWlCO0FBQ3pDLFlBQVEsU0FBUyxXQUFXO0FBQUEsRUFDOUI7QUFFQSxNQUFJLGVBQWU7QUFDakIsa0JBQWMsVUFBVTtBQUFBLEVBQzFCO0FBQ0EsUUFBTSxVQUFVLGNBQWMsU0FBUyxVQUFVO0FBQ2pELFFBQU0sRUFBRSxNQUFNLFVBQVUsTUFBTSxJQUFJLE1BQU0sS0FBSyxVQUFVLE9BQU87QUFBQSxJQUM1RDtBQUFBLElBQVE7QUFBQSxJQUFTO0FBQUEsSUFBTTtBQUFBLElBQVM7QUFBQSxJQUFjO0FBQUEsRUFDaEQsQ0FBQztBQUNELGVBQWEsT0FBTztBQUVwQixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGO0FBRUEsZUFBc0IsTUFBa0IsT0FDdEM7QUFBQSxFQUNFLE9BQU8sQ0FBQztBQUFBLEVBQUc7QUFBQSxFQUFRLFVBQVUsQ0FBQztBQUFBLEVBQUcsVUFBVSxDQUFDO0FBQUEsRUFBRztBQUFBLEVBQWMsT0FBTyxDQUFDO0FBQUEsRUFBRztBQUUxRSxJQVFJLENBQUMsR0FDTCxlQUF3RTtBQUN4RSxRQUFNLGFBQWEsY0FBYztBQUNqQyxNQUFJLHNCQUFzQixpQkFBaUI7QUFDekMsWUFBUSxTQUFTLFdBQVc7QUFBQSxFQUM5QjtBQUVBLE1BQUksZUFBZTtBQUNqQixrQkFBYyxVQUFVO0FBQUEsRUFDMUI7QUFDQSxRQUFNLFVBQVUsY0FBYyxTQUFTLFVBQVU7QUFDakQsUUFBTSxFQUFFLE1BQU0sVUFBVSxNQUFNLElBQUksTUFBTSxLQUFLLFNBQVMsT0FBTztBQUFBLElBQzNEO0FBQUEsSUFBUTtBQUFBLElBQVM7QUFBQSxJQUFNO0FBQUEsSUFBUztBQUFBLElBQWM7QUFBQSxFQUNoRCxDQUFDO0FBQ0QsZUFBYSxPQUFPO0FBRXBCLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFNLFdBQVc7QUFBQSxFQUNmO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLElBQU8sZUFBUTsiLAogICJuYW1lcyI6IFsiZ2xvYmFsQ29uZmlncyIsICJnZXRBbGwiLCAic2V0IiwgInVwZGF0ZSIsICJyZW1vdmUiLCAiZ2xvYmFsSGVhZGVycyJdCn0K


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
const { GET } = __webpack_require__(/*! @elghandour/fetchify */ "../../../dist/browser/build.common.js");
(async function () {
    const { data, error, response } = await GET('https://jsonplaceholder.typicode.com/posts');
    console.log(data, error, response);
    if (response.status === 200 && data) {
        console.log(data);
        const appElement = document.querySelector('#app');
        const setPost = (post) => (
        /* html */ `
            <div class="post">
                <div class="item post-id"><strong>ID:</strong> ${post.id}</div>
                <div class="item post-title"><strong>Title:</strong> ${post.title}</div>
                <div class="item post-body"><strong>Body:</strong> ${post.body}</div>
            </div>
        `);
        const posts = data.map(post => {
            return setPost(post);
        });
        appElement.innerHTML = posts.join('\n');
    }
})();

})();

/******/ })()
;
//# sourceMappingURL=script.js.map