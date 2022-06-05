if(!(globalThis?.fetch && global?.fetch)) {
  const _fetch = require('node-fetch');
  const _AbortController = require('node-abort-controller') 
  global.fetch = _fetch;
  globalThis.fetch = _fetch;
  global._AbortController = _AbortController;
  globalThis._AbortController = _AbortController;
}

 export { 
    DELETE, 
    GET, 
    HEAD, 
    PATCH, 
    POST, 
    PUT, 
    globalConfigs, 
    globalHeaders, 
    setInterceptors ,
    getParamsFromString,
    isBrowser,
    nop,
    replaceParamsInString,
    serializeObject,
    default
} from '@/main';

