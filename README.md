# Fetchify

[![npm version](https://badge.fury.io/js/%40elghandour%2Ffetchify.svg)](https://badge.fury.io/js/%40elghandour%2Ffetchify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A universal, lightweight wrapper for the Fetch API that works seamlessly in both browser and Node.js environments. Provides a clean, consistent interface with powerful features like interceptors, global configuration, timeout support, and more.

## Features

- 🚀 **Universal**: Works in browser and Node.js
- 🔧 **Interceptors**: Global and per-request interceptors for advanced use cases
- ⚙️ **Flexible Configuration**: Both global configs (browser) and instance-based configs (server-side) using `defineConfigs` and `defineHeaders`
- ⏱️ **Timeout Support**: Built-in request timeout handling
- 🛑 **Abort Support**: Easy request cancellation with AbortController
- 📝 **TypeScript**: Full TypeScript support with type definitions
- 🎯 **Multiple Response Types**: JSON, text, blob, arrayBuffer, formData
- 🔄 **Query Parameters**: Automatic query string serialization
- 📊 **Meta Data**: Pass custom metadata through requests
- 🏗️ **Vite Built**: Optimized build with Vite for better performance

## Installation

```bash
npm install @elghandour/fetchify
```

or

```bash
pnpm add @elghandour/fetchify
```

or

```bash
yarn add @elghandour/fetchify
```

## Server-Side Usage

For Node.js/server environments, use instance-based configuration to avoid global state:

```javascript
import { defineConfigs, defineHeaders, GET, POST } from '@elghandour/fetchify';

// Import polyfills for Node.js
import '@elghandour/fetchify/nodejs-polyfills.js';

// Create instance-based configuration
const apiConfigs = defineConfigs({
  baseURL: 'https://api.example.com'
});

const apiHeaders = defineHeaders({
  'Authorization': 'Bearer your-token',
  'Content-Type': 'application/json'
});

// Use in requests
const { data } = await GET('/users', {
  configs: apiConfigs.getAll(),
  headers: apiHeaders.getAll()
});
```

## Quick Start

```javascript
import { GET, POST } from '@elghandour/fetchify';

// Simple GET request
const { data, error } = await GET('https://api.example.com/users');
if (error) {
  console.error('Error:', error);
} else {
  console.log('Users:', data);
}

// POST request with body
const { data, error } = await POST('https://api.example.com/users', {
  body: { name: 'John Doe', email: 'john@example.com' }
});
```

## API Reference

### Methods

All HTTP methods return a `Promise<FetchedData<T>>` with the following structure:

```typescript
type FetchedData<T> = {
  data?: T;           // Response data (if successful)
  response?: Response; // Fetch Response object
  error?: any;        // Error object (if failed)
  meta: Record<string, any> | null; // Custom metadata
};
```

#### GET

```typescript
GET<T>(
  route: string,
  options?: {
    params?: Record<string, any>;     // Query parameters
    configs?: Configs;                // Request configuration
    headers?: Partial<HeadersInit>;   // Request headers
    responseType?: ResponseType;      // 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'
    meta?: Record<string, any>;       // Custom metadata
    timeout?: number;                 // Timeout in milliseconds
    requestInterceptor?: (request: FetchifyRequestParameters) => Promise<FetchifyRequestParameters>;
    responseInterceptor?: (result: FetchResult, requestInit: RequestInit, fetchParams: FetchifyRequestParameters) => Promise<FetchResult>;
  },
  abortCallback?: (controller: AbortController) => void
): Promise<FetchedData<T>>
```

#### POST

```typescript
POST<T>(
  route: string,
  options?: {
    body?: any;                       // Request body
    params?: Record<string, any>;     // Query parameters
    configs?: Configs;                // Request configuration
    headers?: Partial<HeadersInit>;   // Request headers
    responseType?: ResponseType;      // Response type
    meta?: Record<string, any>;       // Custom metadata
    timeout?: number;                 // Timeout in milliseconds
    requestInterceptor?: (request: FetchifyRequestParameters) => Promise<FetchifyRequestParameters>;
    responseInterceptor?: (result: FetchResult, requestInit: RequestInit, fetchParams: FetchifyRequestParameters) => Promise<FetchResult>;
  },
  abortCallback?: (controller: AbortController) => void
): Promise<FetchedData<T>>
```

#### PUT

```typescript
PUT<T>(
  route: string,
  options?: {
    body?: any;
    params?: Record<string, any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeout?: number;
    requestInterceptor?: (request: FetchifyRequestParameters) => Promise<FetchifyRequestParameters>;
    responseInterceptor?: (result: FetchResult, requestInit: RequestInit, fetchParams: FetchifyRequestParameters) => Promise<FetchResult>;
  },
  abortCallback?: (controller: AbortController) => void
): Promise<FetchedData<T>>
```

#### DELETE

```typescript
DELETE<T>(
  route: string,
  options?: {
    body?: any;
    params?: Record<string, any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeout?: number;
    requestInterceptor?: (request: FetchifyRequestParameters) => Promise<FetchifyRequestParameters>;
    responseInterceptor?: (result: FetchResult, requestInit: RequestInit, fetchParams: FetchifyRequestParameters) => Promise<FetchResult>;
  },
  abortCallback?: (controller: AbortController) => void
): Promise<FetchedData<T>>
```

#### PATCH

```typescript
PATCH<T>(
  route: string,
  options?: {
    body?: any;
    params?: Record<string, any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    responseType?: ResponseType;
    meta?: Record<string, any>;
    timeout?: number;
    requestInterceptor?: (request: FetchifyRequestParameters) => Promise<FetchifyRequestParameters>;
    responseInterceptor?: (result: FetchResult, requestInit: RequestInit, fetchParams: FetchifyRequestParameters) => Promise<FetchResult>;
  },
  abortCallback?: (controller: AbortController) => void
): Promise<FetchedData<T>>
```

#### HEAD

```typescript
HEAD<T>(
  route: string,
  options?: {
    params?: Record<string, any>;
    configs?: Configs;
    headers?: Partial<HeadersInit>;
    meta?: Record<string, any>;
    timeout?: number;
    requestInterceptor?: (request: FetchifyRequestParameters) => Promise<FetchifyRequestParameters>;
    responseInterceptor?: (result: FetchResult, requestInit: RequestInit, fetchParams: FetchifyRequestParameters) => Promise<FetchResult>;
  },
  abortCallback?: (controller: AbortController) => void
): Promise<FetchedData<T>>
```

### Configuration

#### Server-Side Configuration (Recommended)

For server-side usage, use `defineConfigs` and `defineHeaders` to create instance-based configurations that avoid global state pollution:

```javascript
import { defineConfigs, defineHeaders, GET, POST } from '@elghandour/fetchify';

// Create instance-based configs and headers
const apiConfigs = defineConfigs({
  baseURL: 'https://api.example.com',
  credentials: 'include'
});

const apiHeaders = defineHeaders({
  'Authorization': 'Bearer token',
  'Content-Type': 'application/json'
});

// Use in requests
const { data } = await GET('/users', {
  configs: apiConfigs.getAll(),
  headers: apiHeaders.getAll()
});

// Update configurations for specific requests
apiHeaders.update({ 'X-API-Key': 'your-api-key' });
apiConfigs.update({ timeout: 10000 });

// Create multiple instances for different APIs
const paymentConfigs = defineConfigs({
  baseURL: 'https://payments.example.com'
});

const paymentHeaders = defineHeaders({
  'Authorization': 'Bearer payment-token'
});
```

#### Global Configuration (Browser/Client-Side)

For browser environments where global state is acceptable, you can use the global configuration:

```javascript
import { globalConfigs, globalHeaders } from '@elghandour/fetchify';

// Set global configs
globalConfigs.set({
  baseURL: 'https://api.example.com',
  credentials: 'include'
});

// Update existing configs
globalConfigs.update({
  mode: 'cors'
});

// Get all configs
const configs = globalConfigs.getAll();

// Remove specific configs
globalConfigs.remove('baseURL');

// Set global headers
globalHeaders.set({
  'Authorization': 'Bearer token',
  'Content-Type': 'application/json'
});

// Update headers
globalHeaders.update({
  'X-API-Key': 'your-api-key'
});

// Get all headers
const headers = globalHeaders.getAll();

// Remove headers
globalHeaders.remove('Authorization');
```

### Interceptors

#### Global Interceptors

```javascript
import { setInterceptors } from '@elghandour/fetchify';

setInterceptors({
  request: async (request) => {
    // Modify request before sending
    console.log('Request:', request);
    return {
      ...request,
      headers: {
        ...request.headers,
        'X-Request-ID': Date.now().toString()
      }
    };
  },

  response: async (result, requestInit, fetchParams) => {
    // Modify response before returning
    if (result.error) {
      console.error('Response error:', result.error);
    } else {
      console.log('Response success:', result.data);
    }
    return result;
  }
});
```

#### Per-Request Interceptors

```javascript
import { GET } from '@elghandour/fetchify';

// Per-request interceptors override global ones for this specific request
const { data, error } = await GET('/api/data', {
  requestInterceptor: async (request) => {
    // Custom request interceptor for this request only
    return {
      ...request,
      headers: {
        ...request.headers,
        'X-Custom-Header': 'custom-value'
      }
    };
  },
  responseInterceptor: async (result, requestInit, fetchParams) => {
    // Custom response interceptor for this request only
    if (result.error) {
      // Handle error specifically for this request
      console.log('Custom error handling');
    }
    return result;
  }
});
```

### Request Cancellation

```javascript
import { GET } from '@elghandour/fetchify';

const abortController = new AbortController();

// Method 1: Using abortCallback
const promise = GET('/api/data', {}, (controller) => {
  // Store controller for later cancellation
  abortController = controller;
});

// Cancel the request
abortController.abort();

// Method 2: Manual AbortController
const controller = new AbortController();
const promise = GET('/api/data', {
  configs: { signal: controller.signal }
});

// Cancel the request
controller.abort();
```

### Timeout

```javascript
import { GET } from '@elghandour/fetchify';

// Request with 5 second timeout
const { data, error } = await GET('/api/data', {
  timeout: 5000
});

if (error) {
  console.log('Request timed out or failed');
}
```

### Response Types

```javascript
import { GET } from '@elghandour/fetchify';

// Get JSON response (default)
const { data } = await GET('/api/users');

// Get text response
const { data: textData } = await GET('/api/text', {
  responseType: 'text'
});

// Get blob response
const { data: blobData } = await GET('/api/file', {
  responseType: 'blob'
});

// Get ArrayBuffer response
const { data: bufferData } = await GET('/api/binary', {
  responseType: 'arrayBuffer'
});

// Get FormData response
const { data: formData } = await GET('/api/form', {
  responseType: 'formData'
});
```

### Query Parameters

Query parameters are automatically serialized:

```javascript
import { GET } from '@elghandour/fetchify';

// Simple params
GET('/api/search', {
  params: { q: 'javascript', limit: 10 }
});
// Results in: /api/search?q=javascript&limit=10

// Array params
GET('/api/items', {
  params: { tags: ['react', 'typescript'] }
});
// Results in: /api/items?tags=react&tags=typescript

// Nested objects (using qs library)
GET('/api/filter', {
  params: { filter: { category: 'tech', price: { min: 100 } } }
});
// Results in: /api/filter?filter[category]=tech&filter[price][min]=100
```

### Error Handling

```javascript
import { GET } from '@elghandour/fetchify';

const { data, error, response } = await GET('/api/data');

if (error) {
  // Handle error
  if (response) {
    // HTTP error (4xx, 5xx)
    console.log('Status:', response.status);
    console.log('Error data:', error);
  } else {
    // Network error or other
    console.log('Network error:', error);
  }
} else {
  // Success
  console.log('Data:', data);
}
```

### Advanced Usage

#### Creating an API Client (Server-Side)

For server-side usage, create instance-based API clients:

```javascript
import { GET, POST, PUT, DELETE, defineConfigs, defineHeaders } from '@elghandour/fetchify';

// Create API configuration instance
const apiConfigs = defineConfigs({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

const apiHeaders = defineHeaders({
  'Content-Type': 'application/json'
});

// Create API client with instance-based configuration
const createApiClient = (configs, headers) => ({
  getUsers: () => GET('/users', {
    configs: configs.getAll(),
    headers: headers.getAll()
  }),
  getUser: (id) => GET(`/users/${id}`, {
    configs: configs.getAll(),
    headers: headers.getAll()
  }),
  createUser: (user) => POST('/users', {
    body: user,
    configs: configs.getAll(),
    headers: headers.getAll()
  }),
  updateUser: (id, user) => PUT(`/users/${id}`, {
    body: user,
    configs: configs.getAll(),
    headers: headers.getAll()
  }),
  deleteUser: (id) => DELETE(`/users/${id}`, {
    configs: configs.getAll(),
    headers: headers.getAll()
  })
});

// Create API instance
const api = createApiClient(apiConfigs, apiHeaders);

// Usage
const users = await api.getUsers();
const user = await api.getUser(1);
```

#### Creating an API Client (Browser/Client-Side)

For browser environments, you can use global configuration:

```javascript
import { GET, POST, PUT, DELETE, globalConfigs, globalHeaders } from '@elghandour/fetchify';

// Configure defaults
globalConfigs.set({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

globalHeaders.set({
  'Content-Type': 'application/json'
});

// Create API methods
const api = {
  getUsers: () => GET('/users'),
  getUser: (id) => GET(`/users/${id}`),
  createUser: (user) => POST('/users', { body: user }),
  updateUser: (id, user) => PUT(`/users/${id}`, { body: user }),
  deleteUser: (id) => DELETE(`/users/${id}`)
};

export default api;
```

#### Using with React

```javascript
import React, { useState, useEffect } from 'react';
import { GET } from '@elghandour/fetchify';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await GET('https://jsonplaceholder.typicode.com/users');

      if (error) {
        setError(error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

#### Advanced Request Body Types

Fetchify supports various request body types automatically:

```javascript
import { POST } from '@elghandour/fetchify';

// JSON object (automatically stringified)
await POST('/api/data', {
  body: { name: 'John', age: 30 }
});

// FormData
const formData = new FormData();
formData.append('file', fileInput.files[0]);
await POST('/api/upload', {
  body: formData
});

// ArrayBuffer, Blob, File, etc.
await POST('/api/binary', {
  body: new ArrayBuffer(8)
});

// URLSearchParams
const params = new URLSearchParams();
params.append('key', 'value');
await POST('/api/form', {
  body: params
});
```

## Browser Support

Fetchify works in all modern browsers that support the Fetch API and AbortController:

- Chrome 66+
- Firefox 60+
- Safari 12+
- Edge 79+

For older browsers, consider using a polyfill.

## Node.js Support

Works in Node.js with the included polyfills. The package includes Node.js polyfills for:

- `node-fetch` for Fetch API
- `abort-controller` for AbortController

```javascript
// For Node.js usage, import the polyfills
import '@elghandour/fetchify/nodejs-polyfills.js';
import { GET } from '@elghandour/fetchify';
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Ahmed Elghandour** - [GitHub](https://github.com/ahmedElghandour1)

## Issues

If you find any bugs or have feature requests, please create an issue on [GitHub](https://github.com/ahmedElghandour1/fetchify/issues).</content>
