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
} from 'node-fetch-esm';


if (!globalThis.fetch) {
    globalThis.fetch = fetch as any;
    globalThis.Headers = Headers as any;
    globalThis.Request = Request as any;
    globalThis.Response = Response as any;
    globalThis.Blob = Blob;
    globalThis.blobFrom = blobFrom;
    globalThis.blobFromSync = blobFromSync;
    globalThis.File = File;
    globalThis.fileFrom = fileFrom;
    globalThis.fileFromSync = fileFromSync;
    globalThis.FormData = FormData;
}
