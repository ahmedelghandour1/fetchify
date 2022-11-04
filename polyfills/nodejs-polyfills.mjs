/* eslint-disable no-undef */

import fetch, {
    Blob,
    blobFrom,
    blobFromSync,
    File,
    fileFrom,
    fileFromSync,
    FormData,
    Headers,
    Request,
    Response,
} from "node-fetch";

globalThis.fetch = fetch;
globalThis.Headers = Headers;
globalThis.Request = Request;
globalThis.Response = Response;
globalThis.Blob = Blob;
globalThis.blobFrom = blobFrom;
globalThis.blobFromSync = blobFromSync;
globalThis.File = File;
globalThis.fileFrom = fileFrom;
globalThis.fileFromSync = fileFromSync;
globalThis.FormData = FormData;
