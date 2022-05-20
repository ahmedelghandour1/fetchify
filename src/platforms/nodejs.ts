if(!(globalThis?.fetch && global?.fetch)) {
  const _fetch = require('node-fetch');
  const _AbortController = require('node-abort-controller') 
  global.fetch = _fetch;
  globalThis.fetch = _fetch;
  global._AbortController = _AbortController;
  globalThis._AbortController = _AbortController;
}
  module.exports = require('@/main');