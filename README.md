![Fetchify](fetchify-logo.png)
# Fetchify
## What is Fetchify?
Fetchify is a Javascript wrapper API that simplifies writing fetch requests. While native Javascript fetch is not expressive nor semantic, Fetchify simplifies the process of writing fetch requests and has a smaller, and more semantic, footprint. Fetchify also comes loaded with helper utils out the box. These utils have the added benefit of standardardizing implementation, saving you the time usually spent on figuring out the best practices. Fetchify also allows you to use the fetch API in Node.js, in fact it dynamically builds for the environment you are using under the hood. Fetchify is built with and supports Typescript.

## Using Fetchify
### Installion
Using your package manager of choice, add Fetchify to your project's dependencies.  
  
Using npm:
 
> npm install @elghandour/fetchify
  
Using Yarn:
> yarn add @elghandour/fetchify

### Importing
To use Fetchify in your project, simply import the required functions (and types):  
```
import { DELETE, GET, PATCH, POST, FetchData } from '@/utils/fetchify';
```
To import helpers:
```
import { replaceParamsInString } from '@/utils/fetchify/helpers';
```
### Usage
Using Fetchify is easily explained with a simple example:
```
async getCake(name: string): FetchData<Cake> {
    return GET(replaceParamsInString(BAKERY_ENDPOINT_PATH, { param: name }),
  );
}

const response = getCake("Sachertorte");
```
`getCake()` will return an object:
```
{
    response: {},
    data: {},
    error: {},
}
```
## Get In Touch:
Feel free to leave a comment, create an issue, or message us with suggestions and feedback.