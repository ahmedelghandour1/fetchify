/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dist/browser/build.esm.js":
/*!******************************************!*\
  !*** ../../../dist/browser/build.esm.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DELETE": () => (/* binding */ DELETE),
/* harmony export */   "GET": () => (/* binding */ GET),
/* harmony export */   "HEAD": () => (/* binding */ HEAD),
/* harmony export */   "PATCH": () => (/* binding */ PATCH),
/* harmony export */   "POST": () => (/* binding */ POST),
/* harmony export */   "PUT": () => (/* binding */ PUT),
/* harmony export */   "default": () => (/* binding */ main_default),
/* harmony export */   "getParamsFromString": () => (/* binding */ getParamsFromString),
/* harmony export */   "globalConfigs": () => (/* binding */ globalConfigs),
/* harmony export */   "globalHeaders": () => (/* binding */ globalHeaders),
/* harmony export */   "isBrowser": () => (/* binding */ isBrowser),
/* harmony export */   "nop": () => (/* binding */ nop),
/* harmony export */   "replaceParamsInString": () => (/* binding */ replaceParamsInString),
/* harmony export */   "serializeObject": () => (/* binding */ serializeObject),
/* harmony export */   "setInterceptors": () => (/* binding */ setInterceptors)
/* harmony export */ });
/** 
 * fetchify v1.0.5 (https://github.com/ahmedElghandour1/fetchify#readme)
 * Copyright 2021 - 2022 | Author: Ahmed Elghandour
 * Licensed under MIT (https://github.com/ahmedElghandour1/fetchify/blob/master/LICENSE)
 */

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
  const { data, response, error } = await init("POST", route, {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2hlbHBlcnMvaW5kZXgudHMiLCAiLi4vLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cclxuZXhwb3J0IGNvbnN0IGlzQnJvd3NlciA9ICgpOiBib29sZWFuID0+IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnO1xyXG5jb25zdCBpc09iamVjdCA9IDxUeXBlPihhcmc6IFR5cGUpOmJvb2xlYW4gPT4gYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KEFycmF5KTtcclxuXHJcbmNvbnN0IGlzRW1wdHkgPSA8VHlwZT4oYXJnOiBUeXBlKTpib29sZWFuID0+IHtcclxuICBpZiAoIWlzT2JqZWN0KGFyZykpIHRocm93IEVycm9yKCd0eXBlIHNob3VsZCBiZSBvYmplY3QhJyk7XHJcbiAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXMoYXJnKTtcclxuICByZXR1cm4gIWtleS5sZW5ndGg7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBpc1ZhbGlkUWV1cnlQYXJhbShcclxuICBwYXJhbTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8XHJcbiAgQXJyYXk8c3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbj4sXHJcbikge1xyXG4gIGlmIChwYXJhbSA9PT0gdW5kZWZpbmVkIHx8IHBhcmFtID09PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmICh0eXBlb2YgcGFyYW0gPT09ICdzdHJpbmcnXHJcbiAgfHwgdHlwZW9mIHBhcmFtID09PSAnYmlnaW50J1xyXG4gIHx8IHR5cGVvZiBwYXJhbSA9PT0gJ251bWJlcidcclxuICB8fCB0eXBlb2YgcGFyYW0gPT09ICdib29sZWFuJykge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbSkgJiYgcGFyYW0ubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplT2JqZWN0KG9iajogUmVjb3JkPHN0cmluZywgYW55Pik6IHN0cmluZyB7XHJcbiAgaWYgKCFpc09iamVjdChvYmopIHx8IGlzRW1wdHkob2JqKSkgcmV0dXJuICcnO1xyXG4gIGxldCBzdHJpbmcgPSAnPyc7XHJcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XHJcbiAga2V5cy5mb3JFYWNoKChrZXksIGkpID0+IHtcclxuICAgIGlmICghaXNWYWxpZFFldXJ5UGFyYW0ob2JqW2tleV0pKSByZXR1cm47XHJcbiAgICBpZiAoaSAhPT0gMCkge1xyXG4gICAgICBzdHJpbmcgKz0gJyYnO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkob2JqW2tleV0pO1xyXG5cclxuICAgIGlmIChpc0FycmF5KSB7XHJcbiAgICAgIG9ialtrZXldLmZvckVhY2goKHBhcmFtOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzVmFsaWRRZXVyeVBhcmFtKHBhcmFtKSkge1xyXG4gICAgICAgICAgaWYgKGluZGV4ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHN0cmluZyArPSAnJic7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzdHJpbmcgKz0gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtKX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdHJpbmcgKz0gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKX1gO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJhbXNGcm9tU3RyaW5nKGlucHV0OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcclxuICBjb25zdCBtYXRjaGVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgaW5wdXQucmVwbGFjZSgvKFxceyspKFtefV0rKSh9KykvZywgKF8sIGxiLCB0eHQsIHJiKTogc3RyaW5nID0+IHtcclxuICAgIGlmIChsYi5sZW5ndGggPT09IHJiLmxlbmd0aCkgbWF0Y2hlcy5wdXNoKHR4dCk7XHJcbiAgICByZXR1cm4gdHh0O1xyXG4gIH0pO1xyXG4gIHJldHVybiBtYXRjaGVzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVBhcmFtc0luU3RyaW5nKGlucHV0OiBzdHJpbmcsIHBhcmFtczogUmVjb3JkPHN0cmluZywgc3RyaW5nPik6IHN0cmluZyB7XHJcbiAgbGV0IHN0ciA9IGlucHV0O1xyXG4gIGNvbnN0IG1hdGNoZXMgPSBnZXRQYXJhbXNGcm9tU3RyaW5nKGlucHV0KTtcclxuICBtYXRjaGVzLmZvckVhY2goKG1hdGNoOiBzdHJpbmcpID0+IHtcclxuICAgIGlmIChwYXJhbXNbbWF0Y2hdKSB7XHJcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKGB7JHttYXRjaH19YCwgcGFyYW1zW21hdGNoXSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHN0cjtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbm9wKCkge30iLCAiLyogZXNsaW50LWRpc2FibGUgKi9cclxuaW1wb3J0IHtcclxuICBub3AsXHJcbiAgc2VyaWFsaXplT2JqZWN0XHJcbn0gZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PSBTVEFSVCBUWVBFUyA9PT09PT09PT09PT09PT09PSAqL1xyXG5kZWNsYXJlIGNvbnN0IGdsb2JhbDogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbmV4cG9ydCB0eXBlIEZldGNoZWREYXRhPERhdGFUeXBlPiA9IHtcclxuICBkYXRhPzogRGF0YVR5cGU7XHJcbiAgcmVzcG9uc2U/OiBSZXNwb25zZTtcclxuICBlcnJvcj86IGFueTtcclxuICBhYm9ydD86ICgpID0+IHZvaWQ7XHJcbn07XHJcbmV4cG9ydCB0eXBlIENvbmZpZ3MgPSBPbWl0PFJlcXVlc3RJbml0LCAnYm9keScgfCAnaGVhZGVycycgfCAnbWV0aG9kJz4gJiB7XHJcbiAgYmFzZVVSTD86IHN0cmluZyxcclxufVxyXG5leHBvcnQgdHlwZSBGZXRjaFJlc3VsdCA9IHtcclxuICBkYXRhOiBhbnk7XHJcbiAgcmVzcG9uc2U6IFJlc3BvbnNlO1xyXG4gIGVycm9yPzogdW5kZWZpbmVkO1xyXG59IHwge1xyXG4gIGVycm9yOiBhbnk7XHJcbiAgZGF0YT86IHVuZGVmaW5lZDtcclxuICByZXNwb25zZT86IHVuZGVmaW5lZDtcclxufTtcclxuZXhwb3J0IHR5cGUgTWV0aG9kID0gJ1BPU1QnIHwgJ0dFVCcgfCAnREVMRVRFJyB8ICdQVVQnIHwgJ1BBVENIJyB8ICdIRUFEJztcclxuZXhwb3J0IHR5cGUgUmVzcG9uc2VUeXBlID0gJ2pzb24nIHwgJ3RleHQnIHwgJ2Jsb2InIHwgJ2FycmF5QnVmZmVyJyB8ICdmb3JtRGF0YScgLy8gVE9ETzogbmVlZCB0byBhZGQgdGhlIGR5bmFtaWMgdHlwZVxyXG5leHBvcnQgdHlwZSBGZXRjaERhdGE8RGF0YVR5cGU+ID0gUHJvbWlzZTxGZXRjaGVkRGF0YTxEYXRhVHlwZT4+O1xyXG5leHBvcnQgaW50ZXJmYWNlIEludGVyY2VwdG9ycyB7XHJcbiAgcmVxdWVzdD86IChyZXF1ZXN0OiBSZXF1ZXN0SW5pdCkgPT4gdm9pZCxcclxuICByZXNwb25zZT86IChyZXN1bHQ6IEZldGNoUmVzdWx0LCByZXF1ZXN0SW5pdDogUmVxdWVzdEluaXQpID0+IFByb21pc2U8RmV0Y2hSZXN1bHQ+XHJcbn1cclxuLyogPT09PT09PT09PT09PT09PT0gRU5EIFRZUEVTID09PT09PT09PT09PT09PT09ICovXHJcblxyXG5jb25zdCByZXNwb25zZVR5cGVzOiBBcnJheTxSZXNwb25zZVR5cGU+ID0gWydqc29uJywgJ3RleHQnLCAnYmxvYicsICdhcnJheUJ1ZmZlcicsICdmb3JtRGF0YSddO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdsb2JhbENvbmZpZ3MgPSAoZnVuY3Rpb24gZ2xvYmFsQ29uZmlncygpIHtcclxuICBsZXQgX2NvbmZpZ3M6IENvbmZpZ3MgPSB7fTtcclxuICBjb25zdCBnZXRBbGwgPSBmdW5jdGlvbiBnZXRBbGwoKTogQ29uZmlncyB7XHJcbiAgICByZXR1cm4gX2NvbmZpZ3M7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2V0ID0gZnVuY3Rpb24gc2V0KGNvbmZpZ3M6IENvbmZpZ3MpOiB2b2lkIHtcclxuICAgIF9jb25maWdzID0gY29uZmlncztcclxuICB9O1xyXG5cclxuICBjb25zdCB1cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoY29uZmlnczogQ29uZmlncyk6IHZvaWQge1xyXG4gICAgX2NvbmZpZ3MgPSB7IC4uLl9jb25maWdzLCAuLi5jb25maWdzIH07XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKGtleToga2V5b2YgQ29uZmlncyB8IChrZXlvZiBDb25maWdzKVtdKSB7XHJcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgZGVsZXRlIF9jb25maWdzW2tleV07XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNldCxcclxuICAgIGdldEFsbCxcclxuICAgIHVwZGF0ZSxcclxuICAgIHJlbW92ZSxcclxuICB9O1xyXG59KCkpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdsb2JhbEhlYWRlcnMgPSAoZnVuY3Rpb24gZ2xvYmFsSGVhZGVycygpIHtcclxuICBsZXQgX2hlYWRlcnM6IFBhcnRpYWw8SGVhZGVyc0luaXQ+ID0ge307XHJcblxyXG4gIGNvbnN0IGdldEFsbCA9IGZ1bmN0aW9uIGdldEFsbCgpOiBQYXJ0aWFsPEhlYWRlcnNJbml0PiB7XHJcbiAgICByZXR1cm4gX2hlYWRlcnM7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2V0ID0gZnVuY3Rpb24gc2V0KGhlYWRlcnM6IFBhcnRpYWw8SGVhZGVyc0luaXQ+KTogdm9pZCB7XHJcbiAgICBfaGVhZGVycyA9IGhlYWRlcnMgYXMgUGFydGlhbDxIZWFkZXJzSW5pdD47XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKGhlYWRlcnM6IFBhcnRpYWw8SGVhZGVyc0luaXQ+KTogdm9pZCB7XHJcbiAgICBfaGVhZGVycyA9IHsgLi4uX2hlYWRlcnMsIC4uLmhlYWRlcnMgfSBhcyBQYXJ0aWFsPEhlYWRlcnNJbml0PjtcclxuICB9O1xyXG5cclxuICBjb25zdCByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoa2V5OiBzdHJpbmcgfCAoc3RyaW5nKVtdKSB7XHJcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgZGVsZXRlIF9oZWFkZXJzW2tleSBhcyBrZXlvZiBQYXJ0aWFsPEhlYWRlcnNJbml0Pl07XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNldCxcclxuICAgIGdldEFsbCxcclxuICAgIHVwZGF0ZSxcclxuICAgIHJlbW92ZSxcclxuICB9O1xyXG59KCkpO1xyXG5cclxuY29uc3QgaW50ZXJjZXB0b3JzOiBJbnRlcmNlcHRvcnMgPSB7XHJcbiAgcmVxdWVzdDogdW5kZWZpbmVkLFxyXG4gIHJlc3BvbnNlOiB1bmRlZmluZWQsXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SW50ZXJjZXB0b3JzKHsgcmVxdWVzdCwgcmVzcG9uc2UgfTogSW50ZXJjZXB0b3JzKTogdm9pZCB7XHJcbiAgaWYgKHJlcXVlc3QpXHJcbiAgICBpbnRlcmNlcHRvcnMucmVxdWVzdCA9IHJlcXVlc3Q7XHJcbiAgaWYgKHJlc3BvbnNlKVxyXG4gICAgaW50ZXJjZXB0b3JzLnJlc3BvbnNlID0gcmVzcG9uc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFVSTChiYXNlVVJMOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgcGF0aDogc3RyaW5nLFxyXG4gIHBhcmFtczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fSk6IHN0cmluZyB7XHJcbiAgY29uc3QgdXJsID0gcGF0aC5zdGFydHNXaXRoKCdodHRwJykgPyBwYXRoXHJcbiAgICA6IGAke2Jhc2VVUkx9LyR7cGF0aH0ke3NlcmlhbGl6ZU9iamVjdChwYXJhbXMpfWA7XHJcblxyXG4gIHJldHVybiB1cmw7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXQodHlwZTogc3RyaW5nLFxyXG4gIHBhdGg6IHN0cmluZyxcclxuICB7XHJcbiAgICBwYXJhbXMgPSB7fSwgY29uZmlncyA9IHt9LCBib2R5LCBoZWFkZXJzID0ge30sIHJlc3BvbnNlVHlwZSA9ICdqc29uJywgbWV0YSA9IHt9XHJcbiAgfToge1xyXG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT47XHJcbiAgICBjb25maWdzPzogQ29uZmlncztcclxuICAgIGJvZHk/OiBhbnk7XHJcbiAgICBoZWFkZXJzPzogUGFydGlhbDxIZWFkZXJzSW5pdD47XHJcbiAgICByZXNwb25zZVR5cGU/OiBSZXNwb25zZVR5cGU7XHJcbiAgICBtZXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG4gIH0pOiBQcm9taXNlPEZldGNoUmVzdWx0PiB7XHJcbiAgbGV0IHJlcXVlc3RJbml0OiBSZXF1ZXN0SW5pdCA9IHt9O1xyXG4gIGxldCByZXN1bHQ6IGFueTtcclxuICBsZXQgdXJsOiBzdHJpbmc7XHJcbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcclxuICBjb25zdCBnbG9iYWxDb25maWcgPSBnbG9iYWxDb25maWdzLmdldEFsbCgpO1xyXG4gIGNvbnN0IHsgYmFzZVVSTCwgLi4ucmVzdEdsb2JhbENvbmZpZyB9ID0gZ2xvYmFsQ29uZmlnO1xyXG4gIHJlcXVlc3RJbml0Lm1ldGhvZCA9IHR5cGU7XHJcbiAgaWYgKGJvZHkgJiYgdHlwZSAmJiB0eXBlICE9PSAnR0VUJykge1xyXG4gICAgaWYgKGJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSB8fCB0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmVxdWVzdEluaXQuYm9keSA9IGJvZHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXF1ZXN0SW5pdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnN0IF9oZWFkZXJzID0geyAuLi5nbG9iYWxIZWFkZXJzLmdldEFsbCgpLCAuLi5oZWFkZXJzIH0gYXMgSGVhZGVyc0luaXQ7XHJcblxyXG4gIE9iamVjdC5rZXlzKF9oZWFkZXJzKS5mb3JFYWNoKChrKSA9PiB7XHJcbiAgICBpZiAoX2hlYWRlcnNba10gPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgX2hlYWRlcnNba10gPT09ICd1bmRlZmluZWQnKSBkZWxldGUgX2hlYWRlcnNba107XHJcbiAgfSlcclxuXHJcblxyXG4gIHJlcXVlc3RJbml0ID0ge1xyXG4gICAgLi4ucmVxdWVzdEluaXQsXHJcbiAgICAuLi5yZXN0R2xvYmFsQ29uZmlnLFxyXG4gICAgLi4uY29uZmlncyxcclxuICAgIGhlYWRlcnM6IF9oZWFkZXJzLFxyXG4gIH07XHJcblxyXG4gIGlmIChpbnRlcmNlcHRvcnMucmVxdWVzdCkge1xyXG4gICAgaW50ZXJjZXB0b3JzLnJlcXVlc3QocmVxdWVzdEluaXQpO1xyXG4gIH1cclxuICB1cmwgPSBzZXRVUkwoY29uZmlncy5iYXNlVVJMIHx8IGJhc2VVUkwsIHBhdGgsIHBhcmFtcyk7XHJcbiAgdHJ5IHtcclxuXHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgcmVxdWVzdEluaXQpO1xyXG4gICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlcy5pbmNsdWRlcyhyZXNwb25zZVR5cGUpID8gcmVzcG9uc2VUeXBlIDogJ2pzb24nO1xyXG4gICAgbGV0IHJlc3BvbnNlQm9keSA9IHt9O1xyXG4gICAgLy8gVE9ETyBjaGVjayBpZiBfYm9keUJsb2IgaXMgdmFsaWQgdG8gdXNlXHJcbiAgICAvLyBpZiAoKHJlc3BvbnNlIGFzIGFueSkuX2JvZHlCbG9iLnNpemUpIHtcclxuICAgIHJlc3BvbnNlQm9keSA9IGF3YWl0IHJlc3BvbnNlW3Jlc3BvbnNlVHlwZV0oKTtcclxuICAgIC8vIH1cclxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgcmVzdWx0ID0ge1xyXG4gICAgICAgIG1ldGEsXHJcbiAgICAgICAgcmVzcG9uc2UsXHJcbiAgICAgICAgZXJyb3I6IHtcclxuICAgICAgICAgIC4uLnJlc3BvbnNlQm9keSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhyb3cgcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3VsdCA9IHsgZGF0YTogcmVzcG9uc2VCb2R5LCByZXNwb25zZSwgbWV0YSB9O1xyXG4gICAgaWYgKGludGVyY2VwdG9ycy5yZXNwb25zZSkge1xyXG4gICAgICByZXR1cm4gaW50ZXJjZXB0b3JzLnJlc3BvbnNlKHJlc3VsdCwgcmVxdWVzdEluaXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG5cclxuICAgIGNvbnN0IGlzVHlwZUVycm9yID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKCdyZXNwb25zZScgaW4gZXJyb3IpO1xyXG4gICAgY29uc3QgZXJyUmVzcG9uc2U6IEZldGNoUmVzdWx0ID0gaXNUeXBlRXJyb3IgP1xyXG4gICAgICB7XHJcbiAgICAgICAgZXJyb3I6IHtcclxuICAgICAgICAgIG5hbWU6IGVycm9yLm5hbWUsXHJcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIDogZXJyb3I7XHJcbiAgICBpZiAoaW50ZXJjZXB0b3JzLnJlc3BvbnNlKSB7XHJcbiAgICAgIHJldHVybiBpbnRlcmNlcHRvcnMucmVzcG9uc2UoZXJyUmVzcG9uc2UsIHJlcXVlc3RJbml0KTtcclxuXHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhlcnJSZXNwb25zZSwgaXNUeXBlRXJyb3IpO1xyXG5cclxuICAgIHJldHVybiBlcnJSZXNwb25zZTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEZldGNoQWJvcnQoKSB7XHJcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICByZXR1cm4gY29udHJvbGxlcjtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIEhhbmRsZVRpbWVPdXQodGltZW91dDogbnVtYmVyLCBjb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIpIHtcclxuICBpZiAodHlwZW9mIHRpbWVvdXQgIT09ICdudW1iZXInKSByZXR1cm47XHJcblxyXG4gIGNvbnN0IHRpbWVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcclxuICB9LCB0aW1lb3V0KTtcclxuXHJcbiAgcmV0dXJuIHRpbWVySWQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUPFR5cGUgPSBhbnk+KFxyXG4gIHJvdXRlOiBzdHJpbmcsXHJcbiAge1xyXG4gICAgcGFyYW1zLFxyXG4gICAgY29uZmlncyA9IHt9LFxyXG4gICAgaGVhZGVycyxcclxuICAgIHJlc3BvbnNlVHlwZSxcclxuICAgIG1ldGEgPSB7fSxcclxuICAgIHRpbWVvdXRcclxuICB9OiB7XHJcbiAgICBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duIHwgYW55PixcclxuICAgIGNvbmZpZ3M/OiBDb25maWdzLFxyXG4gICAgaGVhZGVycz86IFBhcnRpYWw8SGVhZGVyc0luaXQ+LFxyXG4gICAgcmVzcG9uc2VUeXBlPzogUmVzcG9uc2VUeXBlLFxyXG4gICAgbWV0YT86IFJlY29yZDxzdHJpbmcsIGFueT4sXHJcbiAgICB0aW1lb3V0PzogbnVtYmVyO1xyXG4gIH0gPSB7fSxcclxuICBhYm9ydENhbGxiYWNrPzogKGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcikgPT4gdm9pZFxyXG4pOiBGZXRjaERhdGE8VHlwZT4ge1xyXG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBzZXRGZXRjaEFib3J0KCk7XHJcbiAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBBYm9ydENvbnRyb2xsZXIpIHtcclxuICAgIGNvbmZpZ3Muc2lnbmFsID0gY29udHJvbGxlci5zaWduYWw7XHJcbiAgfVxyXG5cclxuICBpZiAoYWJvcnRDYWxsYmFjaykge1xyXG4gICAgYWJvcnRDYWxsYmFjayhjb250cm9sbGVyKTtcclxuICB9XHJcbiAgY29uc3QgdGltZXJJZCA9IEhhbmRsZVRpbWVPdXQodGltZW91dCwgY29udHJvbGxlcik7XHJcbiAgY29uc3QgeyBkYXRhLCByZXNwb25zZSwgZXJyb3IgfSA9IGF3YWl0IGluaXQoJ0dFVCcsIHJvdXRlLCB7IHBhcmFtcywgY29uZmlncywgaGVhZGVycywgcmVzcG9uc2VUeXBlLCBtZXRhIH0pO1xyXG4gIGNsZWFyVGltZW91dCh0aW1lcklkKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGRhdGEsXHJcbiAgICByZXNwb25zZSxcclxuICAgIGVycm9yXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBIRUFEPFR5cGUgPSBhbnk+KFxyXG4gIHJvdXRlOiBzdHJpbmcsXHJcbiAge1xyXG4gICAgcGFyYW1zLFxyXG4gICAgY29uZmlncyxcclxuICAgIGhlYWRlcnMsXHJcbiAgICBtZXRhID0ge30sXHJcbiAgICB0aW1lb3V0XHJcbiAgfToge1xyXG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT4sXHJcbiAgICBjb25maWdzPzogQ29uZmlncyxcclxuICAgIGhlYWRlcnM/OiBQYXJ0aWFsPEhlYWRlcnNJbml0PixcclxuICAgIG1ldGE/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG4gICAgdGltZW91dD86IG51bWJlcjtcclxuICB9ID0ge30sXHJcbiAgYWJvcnRDYWxsYmFjaz86IChjb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIpID0+IHZvaWRcclxuKTogRmV0Y2hEYXRhPFR5cGU+IHtcclxuICBjb25zdCBjb250cm9sbGVyID0gc2V0RmV0Y2hBYm9ydCgpO1xyXG4gIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQWJvcnRDb250cm9sbGVyKSB7XHJcbiAgICBjb25maWdzLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xyXG4gIH1cclxuXHJcbiAgaWYgKGFib3J0Q2FsbGJhY2spIHtcclxuICAgIGFib3J0Q2FsbGJhY2soY29udHJvbGxlcik7XHJcbiAgfVxyXG4gIGNvbnN0IHRpbWVySWQgPSBIYW5kbGVUaW1lT3V0KHRpbWVvdXQsIGNvbnRyb2xsZXIpO1xyXG4gIGNvbnN0IHsgZGF0YSwgcmVzcG9uc2UsIGVycm9yIH0gPSBhd2FpdCBpbml0KCdIRUFEJywgcm91dGUsIHsgcGFyYW1zLCBjb25maWdzLCBoZWFkZXJzLCBtZXRhIH0pO1xyXG4gIGNsZWFyVGltZW91dCh0aW1lcklkKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGRhdGEsXHJcbiAgICByZXNwb25zZSxcclxuICAgIGVycm9yXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUPFR5cGUgPSBhbnk+KFxyXG4gIHJvdXRlOiBzdHJpbmcsXHJcbiAge1xyXG4gICAgYm9keSA9IHt9LFxyXG4gICAgcGFyYW1zLFxyXG4gICAgY29uZmlncyA9IHt9LFxyXG4gICAgaGVhZGVycyA9IHt9LFxyXG4gICAgcmVzcG9uc2VUeXBlLFxyXG4gICAgbWV0YSA9IHt9LFxyXG4gICAgdGltZW91dFxyXG5cclxuICB9OiB7XHJcbiAgICBib2R5PzogYW55LFxyXG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT4sXHJcbiAgICBjb25maWdzPzogQ29uZmlncyxcclxuICAgIGhlYWRlcnM/OiBQYXJ0aWFsPEhlYWRlcnNJbml0PixcclxuICAgIHJlc3BvbnNlVHlwZT86IFJlc3BvbnNlVHlwZSxcclxuICAgIG1ldGE/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG4gICAgdGltZW91dD86IG51bWJlcjtcclxuICB9ID0ge30sXHJcbiAgYWJvcnRDYWxsYmFjaz86IChjb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIpID0+IHZvaWRcclxuKTogRmV0Y2hEYXRhPFR5cGU+IHtcclxuICBjb25zdCBjb250cm9sbGVyID0gc2V0RmV0Y2hBYm9ydCgpO1xyXG4gIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQWJvcnRDb250cm9sbGVyKSB7XHJcbiAgICBjb25maWdzLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xyXG4gIH1cclxuXHJcbiAgaWYgKGFib3J0Q2FsbGJhY2spIHtcclxuICAgIGFib3J0Q2FsbGJhY2soY29udHJvbGxlcik7XHJcbiAgfVxyXG4gIGNvbnN0IHRpbWVySWQgPSBIYW5kbGVUaW1lT3V0KHRpbWVvdXQsIGNvbnRyb2xsZXIpO1xyXG4gIGNvbnN0IHsgZGF0YSwgcmVzcG9uc2UsIGVycm9yIH0gPSBhd2FpdCBpbml0KCdQT1NUJywgcm91dGUsXHJcbiAgICB7XHJcbiAgICAgIHBhcmFtcywgY29uZmlncywgYm9keSwgaGVhZGVycywgcmVzcG9uc2VUeXBlLCBtZXRhXHJcbiAgICB9KTtcclxuICBjbGVhclRpbWVvdXQodGltZXJJZCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBkYXRhLFxyXG4gICAgcmVzcG9uc2UsXHJcbiAgICBlcnJvclxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUFVUPFR5cGUgPSBhbnk+KHJvdXRlOiBzdHJpbmcsXHJcbiAge1xyXG4gICAgYm9keSA9IHt9LCBwYXJhbXMsIGNvbmZpZ3MgPSB7fSwgaGVhZGVycyA9IHt9LCByZXNwb25zZVR5cGUsIG1ldGEgPSB7fSwgdGltZW91dFxyXG5cclxuICB9OiB7XHJcbiAgICBib2R5PzogYW55O1xyXG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT47XHJcbiAgICBjb25maWdzPzogQ29uZmlncztcclxuICAgIGhlYWRlcnM/OiBQYXJ0aWFsPEhlYWRlcnNJbml0PjtcclxuICAgIHJlc3BvbnNlVHlwZT86IFJlc3BvbnNlVHlwZTtcclxuICAgIG1ldGE/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG4gICAgdGltZW91dD86IG51bWJlcjtcclxuICB9ID0ge30sXHJcbiAgYWJvcnRDYWxsYmFjaz86IChjb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIpID0+IHZvaWRcclxuKTogRmV0Y2hEYXRhPFR5cGU+IHtcclxuICBjb25zdCBjb250cm9sbGVyID0gc2V0RmV0Y2hBYm9ydCgpO1xyXG4gIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQWJvcnRDb250cm9sbGVyKSB7XHJcbiAgICBjb25maWdzLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xyXG4gIH1cclxuXHJcbiAgaWYgKGFib3J0Q2FsbGJhY2spIHtcclxuICAgIGFib3J0Q2FsbGJhY2soY29udHJvbGxlcik7XHJcbiAgfVxyXG4gIGNvbnN0IHRpbWVySWQgPSBIYW5kbGVUaW1lT3V0KHRpbWVvdXQsIGNvbnRyb2xsZXIpO1xyXG4gIGNvbnN0IHsgZGF0YSwgcmVzcG9uc2UsIGVycm9yIH0gPSBhd2FpdCBpbml0KCdQVVQnLCByb3V0ZSwge1xyXG4gICAgcGFyYW1zLCBjb25maWdzLCBib2R5LCBoZWFkZXJzLCByZXNwb25zZVR5cGUsIG1ldGFcclxuICB9KTtcclxuICBjbGVhclRpbWVvdXQodGltZXJJZCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBkYXRhLFxyXG4gICAgcmVzcG9uc2UsXHJcbiAgICBlcnJvclxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEU8VHlwZSA9IGFueT4ocm91dGU6IHN0cmluZyxcclxuICB7XHJcbiAgICBib2R5ID0ge30sIHBhcmFtcywgY29uZmlncyA9IHt9LCBoZWFkZXJzID0ge30sIHJlc3BvbnNlVHlwZSwgbWV0YSA9IHt9LFxyXG4gICAgdGltZW91dFxyXG4gIH06IHtcclxuICAgIGJvZHk/OiBhbnk7XHJcbiAgICBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duIHwgYW55PjtcclxuICAgIGNvbmZpZ3M/OiBDb25maWdzO1xyXG4gICAgaGVhZGVycz86IFBhcnRpYWw8SGVhZGVyc0luaXQ+O1xyXG4gICAgcmVzcG9uc2VUeXBlPzogUmVzcG9uc2VUeXBlO1xyXG4gICAgbWV0YT86IFJlY29yZDxzdHJpbmcsIGFueT47XHJcbiAgICB0aW1lb3V0PzogbnVtYmVyO1xyXG4gIH0gPSB7fSxcclxuICBhYm9ydENhbGxiYWNrPzogKGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcikgPT4gdm9pZCk6IEZldGNoRGF0YTxUeXBlPiB7XHJcbiAgY29uc3QgY29udHJvbGxlciA9IHNldEZldGNoQWJvcnQoKTtcclxuICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEFib3J0Q29udHJvbGxlcikge1xyXG4gICAgY29uZmlncy5zaWduYWwgPSBjb250cm9sbGVyLnNpZ25hbDtcclxuICB9XHJcblxyXG4gIGlmIChhYm9ydENhbGxiYWNrKSB7XHJcbiAgICBhYm9ydENhbGxiYWNrKGNvbnRyb2xsZXIpO1xyXG4gIH1cclxuICBjb25zdCB0aW1lcklkID0gSGFuZGxlVGltZU91dCh0aW1lb3V0LCBjb250cm9sbGVyKTtcclxuICBjb25zdCB7IGRhdGEsIHJlc3BvbnNlLCBlcnJvciB9ID0gYXdhaXQgaW5pdCgnREVMRVRFJywgcm91dGUsIHtcclxuICAgIHBhcmFtcywgY29uZmlncywgYm9keSwgaGVhZGVycywgcmVzcG9uc2VUeXBlLCBtZXRhXHJcbiAgfSk7XHJcbiAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZGF0YSxcclxuICAgIHJlc3BvbnNlLFxyXG4gICAgZXJyb3JcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUEFUQ0g8VHlwZSA9IGFueT4ocm91dGU6IHN0cmluZyxcclxuICB7XHJcbiAgICBib2R5ID0ge30sIHBhcmFtcywgY29uZmlncyA9IHt9LCBoZWFkZXJzID0ge30sIHJlc3BvbnNlVHlwZSwgbWV0YSA9IHt9LCB0aW1lb3V0XHJcblxyXG4gIH06IHtcclxuICAgIGJvZHk/OiBhbnk7XHJcbiAgICBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duIHwgYW55PjtcclxuICAgIGNvbmZpZ3M/OiBDb25maWdzO1xyXG4gICAgaGVhZGVycz86IFBhcnRpYWw8SGVhZGVyc0luaXQ+O1xyXG4gICAgcmVzcG9uc2VUeXBlPzogUmVzcG9uc2VUeXBlO1xyXG4gICAgbWV0YT86IFJlY29yZDxzdHJpbmcsIGFueT47XHJcbiAgICB0aW1lb3V0PzogbnVtYmVyO1xyXG4gIH0gPSB7fSxcclxuICBhYm9ydENhbGxiYWNrPzogKGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcikgPT4gdm9pZCk6IEZldGNoRGF0YTxUeXBlPiB7XHJcbiAgY29uc3QgY29udHJvbGxlciA9IHNldEZldGNoQWJvcnQoKTtcclxuICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEFib3J0Q29udHJvbGxlcikge1xyXG4gICAgY29uZmlncy5zaWduYWwgPSBjb250cm9sbGVyLnNpZ25hbDtcclxuICB9XHJcblxyXG4gIGlmIChhYm9ydENhbGxiYWNrKSB7XHJcbiAgICBhYm9ydENhbGxiYWNrKGNvbnRyb2xsZXIpO1xyXG4gIH1cclxuICBjb25zdCB0aW1lcklkID0gSGFuZGxlVGltZU91dCh0aW1lb3V0LCBjb250cm9sbGVyKTtcclxuICBjb25zdCB7IGRhdGEsIHJlc3BvbnNlLCBlcnJvciB9ID0gYXdhaXQgaW5pdCgnUEFUQ0gnLCByb3V0ZSwge1xyXG4gICAgcGFyYW1zLCBjb25maWdzLCBib2R5LCBoZWFkZXJzLCByZXNwb25zZVR5cGUsIG1ldGFcclxuICB9KTtcclxuICBjbGVhclRpbWVvdXQodGltZXJJZCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBkYXRhLFxyXG4gICAgcmVzcG9uc2UsXHJcbiAgICBlcnJvclxyXG4gIH07XHJcbn1cclxuXHJcbmNvbnN0IGZldGNoaWZ5ID0ge1xyXG4gIFBPU1QsXHJcbiAgR0VULFxyXG4gIERFTEVURSxcclxuICBQVVQsXHJcbiAgUEFUQ0gsXHJcbiAgSEVBRCxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZldGNoaWZ5O1xyXG5cclxuZXhwb3J0IHtcclxuICBpc0Jyb3dzZXIsXHJcbiAgbm9wLFxyXG4gIHNlcmlhbGl6ZU9iamVjdCxcclxuICBnZXRQYXJhbXNGcm9tU3RyaW5nLFxyXG4gIHJlcGxhY2VQYXJhbXNJblN0cmluZ1xyXG59IGZyb20gJy4vaGVscGVycydcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7OztBQUNPLElBQU0sWUFBWSxNQUFlLE9BQU8sV0FBVztBQUMxRCxJQUFNLFdBQVcsQ0FBTyxRQUFzQixPQUFPLE9BQU8sUUFBUSxZQUFZLENBQUMsTUFBTSxRQUFRLEtBQUs7QUFFcEcsSUFBTSxVQUFVLENBQU8sUUFBc0I7QUFDM0MsTUFBSSxDQUFDLFNBQVMsR0FBRztBQUFHLFVBQU0sTUFBTSx3QkFBd0I7QUFDeEQsUUFBTSxNQUFNLE9BQU8sS0FBSyxHQUFHO0FBQzNCLFNBQU8sQ0FBQyxJQUFJO0FBQ2Q7QUFFQSwyQkFDRSxPQUVBO0FBQ0EsTUFBSSxVQUFVLFVBQWEsVUFBVTtBQUFNLFdBQU87QUFFbEQsTUFBSSxPQUFPLFVBQVUsWUFDbEIsT0FBTyxVQUFVLFlBQ2pCLE9BQU8sVUFBVSxZQUNqQixPQUFPLFVBQVUsV0FBVztBQUM3QixXQUFPO0FBQUEsRUFDVDtB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


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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elghandour_fetchify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @elghandour/fetchify */ "../../../dist/browser/build.esm.js");

(async function () {
    /** @type {import('../../../dist/types/main')} */
    const { data, error, response } = await (0,_elghandour_fetchify__WEBPACK_IMPORTED_MODULE_0__.GET)('https://jsonplaceholder.typicode.com/posts');
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