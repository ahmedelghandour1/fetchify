if (!globalThis.fetch) {
    const fetch = require('node-fetch');
    const FormData = require('form-data');
    globalThis.fetch = fetch;
    globalThis.FormData = FormData;
    // globalThis.Headers = Headers as any;
    // globalThis.Request = Request as any;
    // globalThis.Response = Response as any;
    // globalThis.Blob = Blob;
    // globalThis.blobFrom = blobFrom;
    // globalThis.blobFromSync = blobFromSync;
    // globalThis.File = File;
    // globalThis.fileFrom = fileFrom;
    // globalThis.fileFromSync = fileFromSync;
}
