const _fetch = require('cross-fetch');

  global.fetch = _fetch;
  globalThis.fetch = _fetch;
  module.exports = require('./index.ts');