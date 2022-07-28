/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dist/browser/build.esm.mjs":
/*!*******************************************!*\
  !*** ../../../dist/browser/build.esm.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2hlbHBlcnMvaW5kZXgudHMiLCAiLi4vLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmV4cG9ydCBjb25zdCBpc0Jyb3dzZXIgPSAoKTogYm9vbGVhbiA9PiB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JztcbmNvbnN0IGlzT2JqZWN0ID0gPFR5cGU+KGFyZzogVHlwZSk6Ym9vbGVhbiA9PiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoQXJyYXkpO1xuXG5jb25zdCBpc0VtcHR5ID0gPFR5cGU+KGFyZzogVHlwZSk6Ym9vbGVhbiA9PiB7XG4gIGlmICghaXNPYmplY3QoYXJnKSkgdGhyb3cgRXJyb3IoJ3R5cGUgc2hvdWxkIGJlIG9iamVjdCEnKTtcbiAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXMoYXJnKTtcbiAgcmV0dXJuICFrZXkubGVuZ3RoO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZFFldXJ5UGFyYW0oXG4gIHBhcmFtOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHxcbiAgQXJyYXk8c3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbj4sXG4pIHtcbiAgaWYgKHBhcmFtID09PSB1bmRlZmluZWQgfHwgcGFyYW0gPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIHBhcmFtID09PSAnc3RyaW5nJ1xuICB8fCB0eXBlb2YgcGFyYW0gPT09ICdiaWdpbnQnXG4gIHx8IHR5cGVvZiBwYXJhbSA9PT0gJ251bWJlcidcbiAgfHwgdHlwZW9mIHBhcmFtID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHBhcmFtKSAmJiBwYXJhbS5sZW5ndGgpIHJldHVybiB0cnVlO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZU9iamVjdChvYmo6IFJlY29yZDxzdHJpbmcsIGFueT4pOiBzdHJpbmcge1xuICBpZiAoIWlzT2JqZWN0KG9iaikgfHwgaXNFbXB0eShvYmopKSByZXR1cm4gJyc7XG4gIGxldCBzdHJpbmcgPSAnPyc7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBrZXlzLmZvckVhY2goKGtleSwgaSkgPT4ge1xuICAgIGlmICghaXNWYWxpZFFldXJ5UGFyYW0ob2JqW2tleV0pKSByZXR1cm47XG4gICAgaWYgKGkgIT09IDApIHtcbiAgICAgIHN0cmluZyArPSAnJic7XG4gICAgfVxuICAgIGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KG9ialtrZXldKTtcblxuICAgIGlmIChpc0FycmF5KSB7XG4gICAgICBvYmpba2V5XS5mb3JFYWNoKChwYXJhbTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAoaXNWYWxpZFFldXJ5UGFyYW0ocGFyYW0pKSB7XG4gICAgICAgICAgaWYgKGluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gJyYnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdHJpbmcgKz0gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtKX1gO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyaW5nICs9IGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke2VuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSl9YDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyYW1zRnJvbVN0cmluZyhpbnB1dDogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XG4gIGNvbnN0IG1hdGNoZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgaW5wdXQucmVwbGFjZSgvKFxceyspKFtefV0rKSh9KykvZywgKF8sIGxiLCB0eHQsIHJiKTogc3RyaW5nID0+IHtcbiAgICBpZiAobGIubGVuZ3RoID09PSByYi5sZW5ndGgpIG1hdGNoZXMucHVzaCh0eHQpO1xuICAgIHJldHVybiB0eHQ7XG4gIH0pO1xuICByZXR1cm4gbWF0Y2hlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VQYXJhbXNJblN0cmluZyhpbnB1dDogc3RyaW5nLCBwYXJhbXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pOiBzdHJpbmcge1xuICBsZXQgc3RyID0gaW5wdXQ7XG4gIGNvbnN0IG1hdGNoZXMgPSBnZXRQYXJhbXNGcm9tU3RyaW5nKGlucHV0KTtcbiAgbWF0Y2hlcy5mb3JFYWNoKChtYXRjaDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHBhcmFtc1ttYXRjaF0pIHtcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKGB7JHttYXRjaH19YCwgcGFyYW1zW21hdGNoXSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBub3AoKSB7fSIsICIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHtcbiAgc2VyaWFsaXplT2JqZWN0XG59IGZyb20gJy4vaGVscGVycyc7XG5cbmRlY2xhcmUgY29uc3QgRmlsZU91dHB1dDogc3RyaW5nO1xuXG4vKiA9PT09PT09PT09PT09PT09PSBTVEFSVCBUWVBFUyA9PT09PT09PT09PT09PT09PSAqL1xuZGVjbGFyZSBjb25zdCBnbG9iYWw6IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuZXhwb3J0IHR5cGUgRmV0Y2hlZERhdGE8RGF0YVR5cGU+ID0ge1xuICBkYXRhPzogRGF0YVR5cGU7XG4gIHJlc3BvbnNlPzogUmVzcG9uc2U7XG4gIGVycm9yPzogYW55O1xuICBhYm9ydD86ICgpID0+IHZvaWQ7XG59O1xuZXhwb3J0IHR5cGUgQ29uZmlncyA9IE9taXQ8UmVxdWVzdEluaXQsICdib2R5JyB8ICdoZWFkZXJzJyB8ICdtZXRob2QnPiAmIHtcbiAgYmFzZVVSTD86IHN0cmluZyxcbn1cbmV4cG9ydCB0eXBlIEZldGNoUmVzdWx0ID0ge1xuICBkYXRhOiBhbnk7XG4gIHJlc3BvbnNlOiBSZXNwb25zZTtcbiAgZXJyb3I/OiB1bmRlZmluZWQ7XG59IHwge1xuICBlcnJvcjogYW55O1xuICBkYXRhPzogdW5kZWZpbmVkO1xuICByZXNwb25zZT86IHVuZGVmaW5lZDtcbn07XG5leHBvcnQgdHlwZSBNZXRob2QgPSAnUE9TVCcgfCAnR0VUJyB8ICdERUxFVEUnIHwgJ1BVVCcgfCAnUEFUQ0gnIHwgJ0hFQUQnO1xuZXhwb3J0IHR5cGUgUmVzcG9uc2VUeXBlID0gJ2pzb24nIHwgJ3RleHQnIHwgJ2Jsb2InIHwgJ2FycmF5QnVmZmVyJyB8ICdmb3JtRGF0YScgLy8gVE9ETzogbmVlZCB0byBhZGQgdGhlIGR5bmFtaWMgdHlwZVxuZXhwb3J0IHR5cGUgRmV0Y2hEYXRhPERhdGFUeXBlPiA9IFByb21pc2U8RmV0Y2hlZERhdGE8RGF0YVR5cGU+PjtcbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJjZXB0b3JzIHtcbiAgcmVxdWVzdD86IChyZXF1ZXN0OiBSZXF1ZXN0SW5pdCkgPT4gdm9pZCxcbiAgcmVzcG9uc2U/OiAocmVzdWx0OiBGZXRjaFJlc3VsdCwgcmVxdWVzdEluaXQ6IFJlcXVlc3RJbml0KSA9PiBQcm9taXNlPEZldGNoUmVzdWx0PlxufVxuLyogPT09PT09PT09PT09PT09PT0gRU5EIFRZUEVTID09PT09PT09PT09PT09PT09ICovXG5cbmNvbnN0IHJlc3BvbnNlVHlwZXM6IEFycmF5PFJlc3BvbnNlVHlwZT4gPSBbJ2pzb24nLCAndGV4dCcsICdibG9iJywgJ2FycmF5QnVmZmVyJywgJ2Zvcm1EYXRhJ107XG5cbmV4cG9ydCBjb25zdCBnbG9iYWxDb25maWdzID0gKGZ1bmN0aW9uIGdsb2JhbENvbmZpZ3MoKSB7XG4gIGxldCBfY29uZmlnczogQ29uZmlncyA9IHt9O1xuICBjb25zdCBnZXRBbGwgPSBmdW5jdGlvbiBnZXRBbGwoKTogQ29uZmlncyB7XG4gICAgcmV0dXJuIF9jb25maWdzO1xuICB9O1xuXG4gIGNvbnN0IHNldCA9IGZ1bmN0aW9uIHNldChjb25maWdzOiBDb25maWdzKTogdm9pZCB7XG4gICAgX2NvbmZpZ3MgPSBjb25maWdzO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZShjb25maWdzOiBDb25maWdzKTogdm9pZCB7XG4gICAgX2NvbmZpZ3MgPSB7IC4uLl9jb25maWdzLCAuLi5jb25maWdzIH07XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKGtleToga2V5b2YgQ29uZmlncyB8IChrZXlvZiBDb25maWdzKVtdKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkZWxldGUgX2NvbmZpZ3Nba2V5XTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzZXQsXG4gICAgZ2V0QWxsLFxuICAgIHVwZGF0ZSxcbiAgICByZW1vdmUsXG4gIH07XG59KCkpO1xuXG5leHBvcnQgY29uc3QgZ2xvYmFsSGVhZGVycyA9IChmdW5jdGlvbiBnbG9iYWxIZWFkZXJzKCkge1xuICBsZXQgX2hlYWRlcnM6IFBhcnRpYWw8SGVhZGVyc0luaXQ+ID0ge307XG5cbiAgY29uc3QgZ2V0QWxsID0gZnVuY3Rpb24gZ2V0QWxsKCk6IFBhcnRpYWw8SGVhZGVyc0luaXQ+IHtcbiAgICByZXR1cm4gX2hlYWRlcnM7XG4gIH07XG5cbiAgY29uc3Qgc2V0ID0gZnVuY3Rpb24gc2V0KGhlYWRlcnM6IFBhcnRpYWw8SGVhZGVyc0luaXQ+KTogdm9pZCB7XG4gICAgX2hlYWRlcnMgPSBoZWFkZXJzIGFzIFBhcnRpYWw8SGVhZGVyc0luaXQ+O1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZShoZWFkZXJzOiBQYXJ0aWFsPEhlYWRlcnNJbml0Pik6IHZvaWQge1xuICAgIF9oZWFkZXJzID0geyAuLi5faGVhZGVycywgLi4uaGVhZGVycyB9IGFzIFBhcnRpYWw8SGVhZGVyc0luaXQ+O1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShrZXk6IHN0cmluZyB8IChzdHJpbmcpW10pIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRlbGV0ZSBfaGVhZGVyc1trZXkgYXMga2V5b2YgUGFydGlhbDxIZWFkZXJzSW5pdD5dO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNldCxcbiAgICBnZXRBbGwsXG4gICAgdXBkYXRlLFxuICAgIHJlbW92ZSxcbiAgfTtcbn0oKSk7XG5cbmNvbnN0IGludGVyY2VwdG9yczogSW50ZXJjZXB0b3JzID0ge1xuICByZXF1ZXN0OiB1bmRlZmluZWQsXG4gIHJlc3BvbnNlOiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0SW50ZXJjZXB0b3JzKHsgcmVxdWVzdCwgcmVzcG9uc2UgfTogSW50ZXJjZXB0b3JzKTogdm9pZCB7XG4gIGlmIChyZXF1ZXN0KVxuICAgIGludGVyY2VwdG9ycy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgaWYgKHJlc3BvbnNlKVxuICAgIGludGVyY2VwdG9ycy5yZXNwb25zZSA9IHJlc3BvbnNlO1xufVxuXG5mdW5jdGlvbiBzZXRVUkwoYmFzZVVSTDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBwYXRoOiBzdHJpbmcsXG4gIHBhcmFtczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fSk6IHN0cmluZyB7XG4gIGNvbnN0IHVybCA9IHBhdGguc3RhcnRzV2l0aCgnaHR0cCcpID8gcGF0aFxuICAgIDogYCR7YmFzZVVSTH0vJHtwYXRofSR7c2VyaWFsaXplT2JqZWN0KHBhcmFtcyl9YDtcblxuICByZXR1cm4gdXJsO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbml0KHR5cGU6IHN0cmluZyxcbiAgcGF0aDogc3RyaW5nLFxuICB7XG4gICAgcGFyYW1zID0ge30sIGNvbmZpZ3MgPSB7fSwgYm9keSwgaGVhZGVycyA9IHt9LCByZXNwb25zZVR5cGUgPSAnanNvbicsIG1ldGEgPSB7fVxuICB9OiB7XG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT47XG4gICAgY29uZmlncz86IENvbmZpZ3M7XG4gICAgYm9keT86IGFueTtcbiAgICBoZWFkZXJzPzogUGFydGlhbDxIZWFkZXJzSW5pdD47XG4gICAgcmVzcG9uc2VUeXBlPzogUmVzcG9uc2VUeXBlO1xuICAgIG1ldGE6IFJlY29yZDxzdHJpbmcsIGFueT47XG4gIH0pOiBQcm9taXNlPEZldGNoUmVzdWx0PiB7XG4gIGxldCByZXF1ZXN0SW5pdDogUmVxdWVzdEluaXQgPSB7fTtcbiAgbGV0IHJlc3VsdDogYW55O1xuICBsZXQgdXJsOiBzdHJpbmc7XG4gIGxldCByZXNwb25zZTogUmVzcG9uc2U7XG4gIGNvbnN0IGdsb2JhbENvbmZpZyA9IGdsb2JhbENvbmZpZ3MuZ2V0QWxsKCk7XG4gIGNvbnN0IHsgYmFzZVVSTCwgLi4ucmVzdEdsb2JhbENvbmZpZyB9ID0gZ2xvYmFsQ29uZmlnO1xuICByZXF1ZXN0SW5pdC5tZXRob2QgPSB0eXBlO1xuICBpZiAoYm9keSAmJiB0eXBlICYmIHR5cGUgIT09ICdHRVQnKSB7XG4gICAgaWYgKGJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSB8fCB0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJlcXVlc3RJbml0LmJvZHkgPSBib2R5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0SW5pdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgfVxuICB9XG4gIGNvbnN0IF9oZWFkZXJzID0geyAuLi5nbG9iYWxIZWFkZXJzLmdldEFsbCgpLCAuLi5oZWFkZXJzIH0gYXMgSGVhZGVyc0luaXQ7XG5cbiAgT2JqZWN0LmtleXMoX2hlYWRlcnMpLmZvckVhY2goKGspID0+IHtcbiAgICBpZiAoX2hlYWRlcnNba10gPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgX2hlYWRlcnNba10gPT09ICd1bmRlZmluZWQnKSBkZWxldGUgX2hlYWRlcnNba107XG4gIH0pXG5cblxuICByZXF1ZXN0SW5pdCA9IHtcbiAgICAuLi5yZXF1ZXN0SW5pdCxcbiAgICAuLi5yZXN0R2xvYmFsQ29uZmlnLFxuICAgIC4uLmNvbmZpZ3MsXG4gICAgaGVhZGVyczogX2hlYWRlcnMsXG4gIH07XG5cbiAgaWYgKGludGVyY2VwdG9ycy5yZXF1ZXN0KSB7XG4gICAgaW50ZXJjZXB0b3JzLnJlcXVlc3QocmVxdWVzdEluaXQpO1xuICB9XG4gIHVybCA9IHNldFVSTChjb25maWdzLmJhc2VVUkwgfHwgYmFzZVVSTCwgcGF0aCwgcGFyYW1zKTtcbiAgdHJ5IHtcblxuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCByZXF1ZXN0SW5pdCk7XG4gICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlcy5pbmNsdWRlcyhyZXNwb25zZVR5cGUpID8gcmVzcG9uc2VUeXBlIDogJ2pzb24nO1xuICAgIGxldCByZXNwb25zZUJvZHkgPSB7fTtcbiAgICAvLyBUT0RPIGNoZWNrIGlmIF9ib2R5QmxvYiBpcyB2YWxpZCB0byB1c2VcbiAgICByZXNwb25zZUJvZHkgPSBhd2FpdCByZXNwb25zZVtyZXNwb25zZVR5cGVdKCk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBtZXRhLFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAuLi5yZXNwb25zZUJvZHksXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICB0aHJvdyByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmVzdWx0ID0geyBkYXRhOiByZXNwb25zZUJvZHksIHJlc3BvbnNlLCBtZXRhIH07XG4gICAgaWYgKGludGVyY2VwdG9ycy5yZXNwb25zZSkge1xuICAgICAgcmV0dXJuIGludGVyY2VwdG9ycy5yZXNwb25zZShyZXN1bHQsIHJlcXVlc3RJbml0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG5cbiAgICBjb25zdCBpc1R5cGVFcnJvciA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgISgncmVzcG9uc2UnIGluIGVycm9yKTtcbiAgICBjb25zdCBlcnJSZXNwb25zZTogRmV0Y2hSZXN1bHQgPSBpc1R5cGVFcnJvciA/XG4gICAgICB7XG4gICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgbmFtZTogZXJyb3IubmFtZSxcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIDogZXJyb3I7XG4gICAgaWYgKGludGVyY2VwdG9ycy5yZXNwb25zZSkge1xuICAgICAgcmV0dXJuIGludGVyY2VwdG9ycy5yZXNwb25zZShlcnJSZXNwb25zZSwgcmVxdWVzdEluaXQpO1xuXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGVyclJlc3BvbnNlLCBpc1R5cGVFcnJvcik7XG5cbiAgICByZXR1cm4gZXJyUmVzcG9uc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0RmV0Y2hBYm9ydCgpIHtcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgcmV0dXJuIGNvbnRyb2xsZXI7XG59XG5cblxuZnVuY3Rpb24gSGFuZGxlVGltZU91dCh0aW1lb3V0OiBudW1iZXIsIGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcikge1xuICBpZiAodHlwZW9mIHRpbWVvdXQgIT09ICdudW1iZXInKSByZXR1cm47XG5cbiAgY29uc3QgdGltZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgfSwgdGltZW91dCk7XG5cbiAgcmV0dXJuIHRpbWVySWQ7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVDxUeXBlID0gYW55PihcbiAgcm91dGU6IHN0cmluZyxcbiAge1xuICAgIHBhcmFtcyxcbiAgICBjb25maWdzID0ge30sXG4gICAgaGVhZGVycyxcbiAgICByZXNwb25zZVR5cGUsXG4gICAgbWV0YSA9IHt9LFxuICAgIHRpbWVvdXRcbiAgfToge1xuICAgIHBhcmFtcz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBhbnk+LFxuICAgIGNvbmZpZ3M/OiBDb25maWdzLFxuICAgIGhlYWRlcnM/OiBQYXJ0aWFsPEhlYWRlcnNJbml0PixcbiAgICByZXNwb25zZVR5cGU/OiBSZXNwb25zZVR5cGUsXG4gICAgbWV0YT86IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gICAgdGltZW91dD86IG51bWJlcjtcbiAgfSA9IHt9LFxuICBhYm9ydENhbGxiYWNrPzogKGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcikgPT4gdm9pZFxuKTogRmV0Y2hEYXRhPFR5cGU+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IHNldEZldGNoQWJvcnQoKTtcbiAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBBYm9ydENvbnRyb2xsZXIpIHtcbiAgICBjb25maWdzLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgaWYgKGFib3J0Q2FsbGJhY2spIHtcbiAgICBhYm9ydENhbGxiYWNrKGNvbnRyb2xsZXIpO1xuICB9XG4gIGNvbnN0IHRpbWVySWQgPSBIYW5kbGVUaW1lT3V0KHRpbWVvdXQsIGNvbnRyb2xsZXIpO1xuICBjb25zdCB7IGRhdGEsIHJlc3BvbnNlLCBlcnJvciB9ID0gYXdhaXQgaW5pdCgnR0VUJywgcm91dGUsIHsgcGFyYW1zLCBjb25maWdzLCBoZWFkZXJzLCByZXNwb25zZVR5cGUsIG1ldGEgfSk7XG4gIGNsZWFyVGltZW91dCh0aW1lcklkKTtcblxuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgcmVzcG9uc2UsXG4gICAgZXJyb3JcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBIRUFEPFR5cGUgPSBhbnk+KFxuICByb3V0ZTogc3RyaW5nLFxuICB7XG4gICAgcGFyYW1zLFxuICAgIGNvbmZpZ3MsXG4gICAgaGVhZGVycyxcbiAgICBtZXRhID0ge30sXG4gICAgdGltZW91dFxuICB9OiB7XG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT4sXG4gICAgY29uZmlncz86IENvbmZpZ3MsXG4gICAgaGVhZGVycz86IFBhcnRpYWw8SGVhZGVyc0luaXQ+LFxuICAgIG1ldGE/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICAgIHRpbWVvdXQ/OiBudW1iZXI7XG4gIH0gPSB7fSxcbiAgYWJvcnRDYWxsYmFjaz86IChjb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIpID0+IHZvaWRcbik6IEZldGNoRGF0YTxUeXBlPiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBzZXRGZXRjaEFib3J0KCk7XG4gIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQWJvcnRDb250cm9sbGVyKSB7XG4gICAgY29uZmlncy5zaWduYWwgPSBjb250cm9sbGVyLnNpZ25hbDtcbiAgfVxuXG4gIGlmIChhYm9ydENhbGxiYWNrKSB7XG4gICAgYWJvcnRDYWxsYmFjayhjb250cm9sbGVyKTtcbiAgfVxuICBjb25zdCB0aW1lcklkID0gSGFuZGxlVGltZU91dCh0aW1lb3V0LCBjb250cm9sbGVyKTtcbiAgY29uc3QgeyBkYXRhLCByZXNwb25zZSwgZXJyb3IgfSA9IGF3YWl0IGluaXQoJ0hFQUQnLCByb3V0ZSwgeyBwYXJhbXMsIGNvbmZpZ3MsIGhlYWRlcnMsIG1ldGEgfSk7XG4gIGNsZWFyVGltZW91dCh0aW1lcklkKTtcblxuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgcmVzcG9uc2UsXG4gICAgZXJyb3JcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUPFR5cGUgPSBhbnk+KFxuICByb3V0ZTogc3RyaW5nLFxuICB7XG4gICAgYm9keSA9IHt9LFxuICAgIHBhcmFtcyxcbiAgICBjb25maWdzID0ge30sXG4gICAgaGVhZGVycyA9IHt9LFxuICAgIHJlc3BvbnNlVHlwZSxcbiAgICBtZXRhID0ge30sXG4gICAgdGltZW91dFxuXG4gIH06IHtcbiAgICBib2R5PzogYW55LFxuICAgIHBhcmFtcz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBhbnk+LFxuICAgIGNvbmZpZ3M/OiBDb25maWdzLFxuICAgIGhlYWRlcnM/OiBQYXJ0aWFsPEhlYWRlcnNJbml0PixcbiAgICByZXNwb25zZVR5cGU/OiBSZXNwb25zZVR5cGUsXG4gICAgbWV0YT86IFJlY29yZDxzdHJpbmcsIGFueT47XG4gICAgdGltZW91dD86IG51bWJlcjtcbiAgfSA9IHt9LFxuICBhYm9ydENhbGxiYWNrPzogKGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcikgPT4gdm9pZFxuKTogRmV0Y2hEYXRhPFR5cGU+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IHNldEZldGNoQWJvcnQoKTtcbiAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBBYm9ydENvbnRyb2xsZXIpIHtcbiAgICBjb25maWdzLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgaWYgKGFib3J0Q2FsbGJhY2spIHtcbiAgICBhYm9ydENhbGxiYWNrKGNvbnRyb2xsZXIpO1xuICB9XG4gIGNvbnN0IHRpbWVySWQgPSBIYW5kbGVUaW1lT3V0KHRpbWVvdXQsIGNvbnRyb2xsZXIpO1xuICBjb25zdCB7IGRhdGEsIHJlc3BvbnNlLCBlcnJvciB9ID0gYXdhaXQgaW5pdCgnUE9TVCcsIHJvdXRlLFxuICAgIHtcbiAgICAgIHBhcmFtcywgY29uZmlncywgYm9keSwgaGVhZGVycywgcmVzcG9uc2VUeXBlLCBtZXRhXG4gICAgfSk7XG4gIGNsZWFyVGltZW91dCh0aW1lcklkKTtcblxuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgcmVzcG9uc2UsXG4gICAgZXJyb3JcbiAgfTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQVVQ8VHlwZSA9IGFueT4ocm91dGU6IHN0cmluZyxcbiAge1xuICAgIGJvZHkgPSB7fSwgcGFyYW1zLCBjb25maWdzID0ge30sIGhlYWRlcnMgPSB7fSwgcmVzcG9uc2VUeXBlLCBtZXRhID0ge30sIHRpbWVvdXRcblxuICB9OiB7XG4gICAgYm9keT86IGFueTtcbiAgICBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duIHwgYW55PjtcbiAgICBjb25maWdzPzogQ29uZmlncztcbiAgICBoZWFkZXJzPzogUGFydGlhbDxIZWFkZXJzSW5pdD47XG4gICAgcmVzcG9uc2VUeXBlPzogUmVzcG9uc2VUeXBlO1xuICAgIG1ldGE/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICAgIHRpbWVvdXQ/OiBudW1iZXI7XG4gIH0gPSB7fSxcbiAgYWJvcnRDYWxsYmFjaz86IChjb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIpID0+IHZvaWRcbik6IEZldGNoRGF0YTxUeXBlPiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBzZXRGZXRjaEFib3J0KCk7XG4gIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQWJvcnRDb250cm9sbGVyKSB7XG4gICAgY29uZmlncy5zaWduYWwgPSBjb250cm9sbGVyLnNpZ25hbDtcbiAgfVxuXG4gIGlmIChhYm9ydENhbGxiYWNrKSB7XG4gICAgYWJvcnRDYWxsYmFjayhjb250cm9sbGVyKTtcbiAgfVxuICBjb25zdCB0aW1lcklkID0gSGFuZGxlVGltZU91dCh0aW1lb3V0LCBjb250cm9sbGVyKTtcbiAgY29uc3QgeyBkYXRhLCByZXNwb25zZSwgZXJyb3IgfSA9IGF3YWl0IGluaXQoJ1BVVCcsIHJvdXRlLCB7XG4gICAgcGFyYW1zLCBjb25maWdzLCBib2R5LCBoZWFkZXJzLCByZXNwb25zZVR5cGUsIG1ldGFcbiAgfSk7XG4gIGNsZWFyVGltZW91dCh0aW1lcklkKTtcblxuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgcmVzcG9uc2UsXG4gICAgZXJyb3JcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERFTEVURTxUeXBlID0gYW55Pihyb3V0ZTogc3RyaW5nLFxuICB7XG4gICAgYm9keSA9IHt9LCBwYXJhbXMsIGNvbmZpZ3MgPSB7fSwgaGVhZGVycyA9IHt9LCByZXNwb25zZVR5cGUsIG1ldGEgPSB7fSxcbiAgICB0aW1lb3V0XG4gIH06IHtcbiAgICBib2R5PzogYW55O1xuICAgIHBhcmFtcz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBhbnk+O1xuICAgIGNvbmZpZ3M/OiBDb25maWdzO1xuICAgIGhlYWRlcnM/OiBQYXJ0aWFsPEhlYWRlcnNJbml0PjtcbiAgICByZXNwb25zZVR5cGU/OiBSZXNwb25zZVR5cGU7XG4gICAgbWV0YT86IFJlY29yZDxzdHJpbmcsIGFueT47XG4gICAgdGltZW91dD86IG51bWJlcjtcbiAgfSA9IHt9LFxuICBhYm9ydENhbGxiYWNrPzogKGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcikgPT4gdm9pZCk6IEZldGNoRGF0YTxUeXBlPiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBzZXRGZXRjaEFib3J0KCk7XG4gIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQWJvcnRDb250cm9sbGVyKSB7XG4gICAgY29uZmlncy5zaWduYWwgPSBjb250cm9sbGVyLnNpZ25hbDtcbiAgfVxuXG4gIGlmIChhYm9ydENhbGxiYWNrKSB7XG4gICAgYWJvcnRDYWxsYmFjayhjb250cm9sbGVyKTtcbiAgfVxuICBjb25zdCB0aW1lcklkID0gSGFuZGxlVGltZU91dCh0aW1lb3V0LCBjb250cm9sbGVyKTtcbiAgY29uc3QgeyBkYXRhLCByZXNwb25zZSwgZXJyb3IgfSA9IGF3YWl0IGluaXQoJ0RFTEVURScsIHJvdXRlLCB7XG4gICAgcGFyYW1zLCBjb25maWdzLCBib2R5LCBoZWFkZXJzLCByZXNwb25zZVR5cGUsIG1ldGFcbiAgfSk7XG4gIGNsZWFyVGltZW91dCh0aW1lcklkKTtcblxuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgcmVzcG9uc2UsXG4gICAgZXJyb3JcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBBVENIPFR5cGUgPSBhbnk+KHJvdXRlOiBzdHJpbmcsXG4gIHtcbiAgICBib2R5ID0ge30sIHBhcmFtcywgY29uZmlncyA9IHt9LCBoZWFkZXJzID0ge30sIHJlc3BvbnNlVHlwZSwgbWV0YSA9IHt9LCB0aW1lb3V0XG5cbiAgfToge1xuICAgIGJvZHk/OiBhbnk7XG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT47XG4gICAgY29uZmlncz86IENvbmZpZ3M7XG4gICAgaGVhZGVycz86IFBhcnRpYWw8SGVhZGVyc0luaXQ+O1xuICAgIHJlc3BvbnNlVHlwZT86IFJlc3BvbnNlVHlwZTtcbiAgICBtZXRhPzogUmVjb3JkPHN0cmluZywgYW55PjtcbiAgICB0aW1lb3V0PzogbnVtYmVyO1xuICB9ID0ge30sXG4gIGFib3J0Q2FsbGJhY2s/OiAoY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyKSA9PiB2b2lkKTogRmV0Y2hEYXRhPFR5cGU+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IHNldEZldGNoQWJvcnQoKTtcbiAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBBYm9ydENvbnRyb2xsZXIpIHtcbiAgICBjb25maWdzLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgaWYgKGFib3J0Q2FsbGJhY2spIHtcbiAgICBhYm9ydENhbGxiYWNrKGNvbnRyb2xsZXIpO1xuICB9XG4gIGNvbnN0IHRpbWVySWQgPSBIYW5kbGVUaW1lT3V0KHRpbWVvdXQsIGNvbnRyb2xsZXIpO1xuICBjb25zdCB7IGRhdGEsIHJlc3BvbnNlLCBlcnJvciB9ID0gYXdhaXQgaW5pdCgnUEFUQ0gnLCByb3V0ZSwge1xuICAgIHBhcmFtcywgY29uZmlncywgYm9keSwgaGVhZGVycywgcmVzcG9uc2VUeXBlLCBtZXRhXG4gIH0pO1xuICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRhLFxuICAgIHJlc3BvbnNlLFxuICAgIGVycm9yXG4gIH07XG59XG5cbmNvbnN0IGZldGNoaWZ5ID0ge1xuICBQT1NULFxuICBHRVQsXG4gIERFTEVURSxcbiAgUFVULFxuICBQQVRDSCxcbiAgSEVBRCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZldGNoaWZ5O1xuXG5leHBvcnQge1xuICBpc0Jyb3dzZXIsXG4gIG5vcCxcbiAgc2VyaWFsaXplT2JqZWN0LFxuICBnZXRQYXJhbXNGcm9tU3RyaW5nLFxuICByZXBsYWNlUGFyYW1zSW5TdHJpbmdcbn0gZnJvbSAnLi9oZWxwZXJzJ1xuXG5cblxuLyoqXG4gKiA9PT09PT09PSAgRk9SIERFQlVHR0lORyAgPT09PT09PT09PVxuICovXG5cbi8vIGNvbnN0IHggPSBGaWxlT3V0cHV0XG4vLyBGaWxlT3V0cHV0ICYmIGNvbnNvbGUubG9nKEZpbGVPdXRwdXQpIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7OztBQUNPLElBQU0sWUFBWSxNQUFlLE9BQU8sV0FBVztBQUMxRCxJQUFNLFdBQVcsQ0FBTyxRQUFzQixPQUFPLE9BQU8sUUFBUSxZQUFZLENBQUMsTUFBTSxRQUFRLEtBQUs7QUFFcEcsSUFBTSxVQUFVLENBQU8sUUFBc0I7QUFDM0MsTUFBSSxDQUFDLFNBQVMsR0FBRztBQUFHLFVBQU0sTUFBTSx3QkFBd0I7QUFDeEQsUUFBTSxNQUFNLE9BQU8sS0FBSyxHQUFHO0FBQzNCLFNBQU8sQ0FBQyxJQUFJO0FBQ2Q7QUFFQSxTQUFTLGtCQUNQLE9BRUE7QUFDQSxNQUFJLFVBQVUsVUFBYSxVQUFVO0FBQU0sV0FBTztBQUVsRCxNQUFJLE9BQU8sVUFBVSxZQUNsQixPQUFPLFVBQVUsWUFDakIsT0FBTyxVQUFVLFlBQ2pCLE9BQU8sVUFBVSxXQUFXO0FBQzdCLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxNQUFNLFFBQVEsS0FBSyxLQUFLLE1BQU07QUFBUSxXQUFPO0FBRWpELFNBQU87QUFDVDtBQUVPLFNBQVMsZ0JBQWdCLEtBQWtDO0FBQ2hFLE1B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QSxFQUM5QjtBQUVBLE1BQUksZUFBZTtBQUNqQixrQkFBYyxVQUFVO0FBQUEsRUFDMUI7QUFDQSxRQUFNLFVBQVUsY0FBYyxTQUFTLFVBQVU7QUFDakQsUUFBTSxFQUFFLE1BQU0sVUFBVSxNQUFNLElBQUksTUFBTSxLQUFLLFNBQVMsT0FBTztBQUFBLElBQzNEO0FBQUEsSUFBUTtBQUFBLElBQVM7QUFBQSxJQUFNO0FBQUEsSUFBUztBQUFBLElBQWM7QUFBQSxFQUNoRCxDQUFDO0FBQ0QsZUFBYSxPQUFPO0FBRXBCLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFNLFdBQVc7QUFBQSxFQUNmO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLElBQU8sZUFBUTsiLAogICJuYW1lcyI6IFsiZ2xvYmFsQ29uZmlncyIsICJnZXRBbGwiLCAic2V0IiwgInVwZGF0ZSIsICJyZW1vdmUiLCAiZ2xvYmFsSGVhZGVycyJdCn0K


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
/* harmony import */ var _elghandour_fetchify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @elghandour/fetchify */ "../../../dist/browser/build.esm.mjs");

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