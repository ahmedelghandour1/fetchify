/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dist/browser/build.common.js":
/*!*********************************************!*\
  !*** ../../../dist/browser/build.common.js ***!
  \*********************************************/
/***/ ((module) => {

/** 
 * fetchify v1.0.5 (https://github.com/ahmedElghandour1/fetchify#readme)
 * Copyright 2021 - 2022 | Author: Ahmed Elghandour
 * Licensed under MIT (https://github.com/ahmedElghandour1/fetchify/blob/master/LICENSE)
 */

var C=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var z=Object.getOwnPropertyNames;var _=Object.prototype.hasOwnProperty;var M=(e,t)=>{for(var s in t)C(e,s,{get:t[s],enumerable:!0})},J=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of z(t))!_.call(e,n)&&n!==s&&C(e,n,{get:()=>t[n],enumerable:!(r=k(t,n))||r.enumerable});return e};var N=e=>J(C({},"__esModule",{value:!0}),e);var X={};M(X,{DELETE:()=>U,GET:()=>w,HEAD:()=>F,PATCH:()=>q,POST:()=>v,PUT:()=>O,default:()=>B,getParamsFromString:()=>A,globalConfigs:()=>x,globalHeaders:()=>D,isBrowser:()=>P,nop:()=>H,replaceParamsInString:()=>E,serializeObject:()=>R,setInterceptors:()=>$});module.exports=N(X);var P=()=>typeof window=="object",L=e=>e&&typeof e=="object"&&!Array.isArray(Array),Q=e=>{if(!L(e))throw Error("type should be object!");return!Object.keys(e).length};function j(e){return e==null?!1:!!(typeof e=="string"||typeof e=="bigint"||typeof e=="number"||typeof e=="boolean"||Array.isArray(e)&&e.length)}function R(e){if(!L(e)||Q(e))return"";let t="?";return Object.keys(e).forEach((r,n)=>{if(!j(e[r]))return;n!==0&&(t+="&"),Array.isArray(e[r])?e[r].forEach((a,o)=>{j(a)&&(o!==0&&(t+="&"),t+=`${encodeURIComponent(r)}=${encodeURIComponent(a)}`)}):t+=`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`}),t}function A(e){let t=[];return e.replace(/(\{+)([^}]+)(}+)/g,(s,r,n,l)=>(r.length===l.length&&t.push(n),n)),t}function E(e,t){let s=e;return A(e).forEach(n=>{t[n]&&(s=s.replace(`{${n}}`,t[n]))}),s}function H(){}var V=["json","text","blob","arrayBuffer","formData"],x=function(){let t={};return{set:function(o){t=o},getAll:function(){return t},update:function(o){t={...t,...o}},remove:function(o){typeof o=="string"&&delete t[o]}}}(),D=function(){let t={};return{set:function(o){t=o},getAll:function(){return t},update:function(o){t={...t,...o}},remove:function(o){typeof o=="string"&&delete t[o]}}}(),y={request:void 0,response:void 0};function $({request:e,response:t}){e&&(y.request=e),t&&(y.response=t)}function W(e,t,s={}){return t.startsWith("http")?t:`${e}/${t}${R(s)}`}async function m(e,t,{params:s={},configs:r={},body:n,headers:l={},responseType:a="json",meta:o={}}){let c={},i,f,u,d=x.getAll(),{baseURL:g,...G}=d;c.method=e,n&&e&&e!=="GET"&&(n instanceof FormData||typeof n=="string"?c.body=n:c.body=JSON.stringify(n));let h={...D.getAll(),...l};Object.keys(h).forEach(p=>{h[p]===void 0&&typeof h[p]>"u"&&delete h[p]}),c={...c,...G,...r,headers:h},y.request&&y.request(c),f=W(r.baseURL||g,t,s);try{u=await fetch(f,c),a=V.includes(a)?a:"json";let p={};if(p=await u[a](),!u.ok)throw i={meta:o,response:u,error:{...p}},i;return i={data:p,response:u,meta:o},y.response?y.response(i,c):i}catch(p){let S=p instanceof Error&&!("response"in p),I=S?{error:{name:p.name,message:p.message}}:p;return y.response?y.response(I,c):(console.log(I,S),I)}}function T(){return new AbortController}function b(e,t){return typeof e!="number"?void 0:setTimeout(()=>{t.abort()},e)}async function w(e,{params:t,configs:s={},headers:r,responseType:n,meta:l={},timeout:a}={},o){let c=T();c instanceof AbortController&&(s.signal=c.signal),o&&o(c);let i=b(a,c),{data:f,response:u,error:d}=await m("GET",e,{params:t,configs:s,headers:r,responseType:n,meta:l});return clearTimeout(i),{data:f,response:u,error:d}}async function F(e,{params:t,configs:s,headers:r,meta:n={},timeout:l}={},a){let o=T();o instanceof AbortController&&(s.signal=o.signal),a&&a(o);let c=b(l,o),{data:i,response:f,error:u}=await m("HEAD",e,{params:t,configs:s,headers:r,meta:n});return clearTimeout(c),{data:i,response:f,error:u}}async function v(e,{body:t={},params:s,configs:r={},headers:n={},responseType:l,meta:a={},timeout:o}={},c){let i=T();i instanceof AbortController&&(r.signal=i.signal),c&&c(i);let f=b(o,i),{data:u,response:d,error:g}=await m("POST",e,{params:s,configs:r,body:t,headers:n,responseType:l,meta:a});return clearTimeout(f),{data:u,response:d,error:g}}async function O(e,{body:t={},params:s,configs:r={},headers:n={},responseType:l,meta:a={},timeout:o}={},c){let i=T();i instanceof AbortController&&(r.signal=i.signal),c&&c(i);let f=b(o,i),{data:u,response:d,error:g}=await m("PUT",e,{params:s,configs:r,body:t,headers:n,responseType:l,meta:a});return clearTimeout(f),{data:u,response:d,error:g}}async function U(e,{body:t={},params:s,configs:r={},headers:n={},responseType:l,meta:a={},timeout:o}={},c){let i=T();i instanceof AbortController&&(r.signal=i.signal),c&&c(i);let f=b(o,i),{data:u,response:d,error:g}=await m("DELETE",e,{params:s,configs:r,body:t,headers:n,responseType:l,meta:a});return clearTimeout(f),{data:u,response:d,error:g}}async function q(e,{body:t={},params:s,configs:r={},headers:n={},responseType:l,meta:a={},timeout:o}={},c){let i=T();i instanceof AbortController&&(r.signal=i.signal),c&&c(i);let f=b(o,i),{data:u,response:d,error:g}=await m("PATCH",e,{params:s,configs:r,body:t,headers:n,responseType:l,meta:a});return clearTimeout(f),{data:u,response:d,error:g}}var K={POST:v,GET:w,DELETE:U,PUT:O,PATCH:q,HEAD:F},B=K;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BsYXRmb3Jtcy9icm93c2VyLnRzIiwgIi4uLy4uL3NyYy9oZWxwZXJzL2luZGV4LnRzIiwgIi4uLy4uL3NyYy9tYWluLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgeyBcbiAgICBERUxFVEUsIFxuICAgIEdFVCwgXG4gICAgSEVBRCwgXG4gICAgUEFUQ0gsIFxuICAgIFBPU1QsIFxuICAgIFBVVCwgXG4gICAgZ2xvYmFsQ29uZmlncywgXG4gICAgZ2xvYmFsSGVhZGVycywgXG4gICAgc2V0SW50ZXJjZXB0b3JzICxcbiAgICBnZXRQYXJhbXNGcm9tU3RyaW5nLFxuICAgIGlzQnJvd3NlcixcbiAgICBub3AsXG4gICAgcmVwbGFjZVBhcmFtc0luU3RyaW5nLFxuICAgIHNlcmlhbGl6ZU9iamVjdCxcbiAgICBkZWZhdWx0XG59IGZyb20gJ0AvbWFpbic7XG5cbmV4cG9ydCB0eXBlIHsgXG4gICAgQ29uZmlncywgXG4gICAgRmV0Y2hEYXRhLCBcbiAgICBGZXRjaFJlc3VsdCwgXG4gICAgRmV0Y2hlZERhdGEsIFxuICAgIEludGVyY2VwdG9ycywgXG4gICAgTWV0aG9kLCBcbiAgICBSZXNwb25zZVR5cGUsIFxufSBmcm9tICdAL21haW4nXG4iLCAiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuZXhwb3J0IGNvbnN0IGlzQnJvd3NlciA9ICgpOiBib29sZWFuID0+IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnO1xuY29uc3QgaXNPYmplY3QgPSA8VHlwZT4oYXJnOiBUeXBlKTpib29sZWFuID0+IGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShBcnJheSk7XG5cbmNvbnN0IGlzRW1wdHkgPSA8VHlwZT4oYXJnOiBUeXBlKTpib29sZWFuID0+IHtcbiAgaWYgKCFpc09iamVjdChhcmcpKSB0aHJvdyBFcnJvcigndHlwZSBzaG91bGQgYmUgb2JqZWN0IScpO1xuICBjb25zdCBrZXkgPSBPYmplY3Qua2V5cyhhcmcpO1xuICByZXR1cm4gIWtleS5sZW5ndGg7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkUWV1cnlQYXJhbShcbiAgcGFyYW06IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfFxuICBBcnJheTxzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuPixcbikge1xuICBpZiAocGFyYW0gPT09IHVuZGVmaW5lZCB8fCBwYXJhbSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgcGFyYW0gPT09ICdzdHJpbmcnXG4gIHx8IHR5cGVvZiBwYXJhbSA9PT0gJ2JpZ2ludCdcbiAgfHwgdHlwZW9mIHBhcmFtID09PSAnbnVtYmVyJ1xuICB8fCB0eXBlb2YgcGFyYW0gPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW0pICYmIHBhcmFtLmxlbmd0aCkgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplT2JqZWN0KG9iajogUmVjb3JkPHN0cmluZywgYW55Pik6IHN0cmluZyB7XG4gIGlmICghaXNPYmplY3Qob2JqKSB8fCBpc0VtcHR5KG9iaikpIHJldHVybiAnJztcbiAgbGV0IHN0cmluZyA9ICc/JztcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGtleXMuZm9yRWFjaCgoa2V5LCBpKSA9PiB7XG4gICAgaWYgKCFpc1ZhbGlkUWV1cnlQYXJhbShvYmpba2V5XSkpIHJldHVybjtcbiAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgc3RyaW5nICs9ICcmJztcbiAgICB9XG4gICAgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkob2JqW2tleV0pO1xuXG4gICAgaWYgKGlzQXJyYXkpIHtcbiAgICAgIG9ialtrZXldLmZvckVhY2goKHBhcmFtOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmIChpc1ZhbGlkUWV1cnlQYXJhbShwYXJhbSkpIHtcbiAgICAgICAgICBpZiAoaW5kZXggIT09IDApIHtcbiAgICAgICAgICAgIHN0cmluZyArPSAnJic7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0cmluZyArPSBgJHtlbmNvZGVVUklDb21wb25lbnQoa2V5KX09JHtlbmNvZGVVUklDb21wb25lbnQocGFyYW0pfWA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHJpbmcgKz0gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKX1gO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJhbXNGcm9tU3RyaW5nKGlucHV0OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgY29uc3QgbWF0Y2hlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBpbnB1dC5yZXBsYWNlKC8oXFx7KykoW159XSspKH0rKS9nLCAoXywgbGIsIHR4dCwgcmIpOiBzdHJpbmcgPT4ge1xuICAgIGlmIChsYi5sZW5ndGggPT09IHJiLmxlbmd0aCkgbWF0Y2hlcy5wdXNoKHR4dCk7XG4gICAgcmV0dXJuIHR4dDtcbiAgfSk7XG4gIHJldHVybiBtYXRjaGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVBhcmFtc0luU3RyaW5nKGlucHV0OiBzdHJpbmcsIHBhcmFtczogUmVjb3JkPHN0cmluZywgc3RyaW5nPik6IHN0cmluZyB7XG4gIGxldCBzdHIgPSBpbnB1dDtcbiAgY29uc3QgbWF0Y2hlcyA9IGdldFBhcmFtc0Zyb21TdHJpbmcoaW5wdXQpO1xuICBtYXRjaGVzLmZvckVhY2goKG1hdGNoOiBzdHJpbmcpID0+IHtcbiAgICBpZiAocGFyYW1zW21hdGNoXSkge1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UoYHske21hdGNofX1gLCBwYXJhbXNbbWF0Y2hdKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc3RyO1xufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcCgpIHt9IiwgIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQge1xuICBub3AsXG4gIHNlcmlhbGl6ZU9iamVjdFxufSBmcm9tICcuL2hlbHBlcnMnO1xuXG5kZWNsYXJlIGNvbnN0IEZpbGVPdXRwdXQ6IHN0cmluZztcblxuLyogPT09PT09PT09PT09PT09PT0gU1RBUlQgVFlQRVMgPT09PT09PT09PT09PT09PT0gKi9cbmRlY2xhcmUgY29uc3QgZ2xvYmFsOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbmV4cG9ydCB0eXBlIEZldGNoZWREYXRhPERhdGFUeXBlPiA9IHtcbiAgZGF0YT86IERhdGFUeXBlO1xuICByZXNwb25zZT86IFJlc3BvbnNlO1xuICBlcnJvcj86IGFueTtcbiAgYWJvcnQ/OiAoKSA9PiB2b2lkO1xufTtcbmV4cG9ydCB0eXBlIENvbmZpZ3MgPSBPbWl0PFJlcXVlc3RJbml0LCAnYm9keScgfCAnaGVhZGVycycgfCAnbWV0aG9kJz4gJiB7XG4gIGJhc2VVUkw/OiBzdHJpbmcsXG59XG5leHBvcnQgdHlwZSBGZXRjaFJlc3VsdCA9IHtcbiAgZGF0YTogYW55O1xuICByZXNwb25zZTogUmVzcG9uc2U7XG4gIGVycm9yPzogdW5kZWZpbmVkO1xufSB8IHtcbiAgZXJyb3I6IGFueTtcbiAgZGF0YT86IHVuZGVmaW5lZDtcbiAgcmVzcG9uc2U/OiB1bmRlZmluZWQ7XG59O1xuZXhwb3J0IHR5cGUgTWV0aG9kID0gJ1BPU1QnIHwgJ0dFVCcgfCAnREVMRVRFJyB8ICdQVVQnIHwgJ1BBVENIJyB8ICdIRUFEJztcbmV4cG9ydCB0eXBlIFJlc3BvbnNlVHlwZSA9ICdqc29uJyB8ICd0ZXh0JyB8ICdibG9iJyB8ICdhcnJheUJ1ZmZlcicgfCAnZm9ybURhdGEnIC8vIFRPRE86IG5lZWQgdG8gYWRkIHRoZSBkeW5hbWljIHR5cGVcbmV4cG9ydCB0eXBlIEZldGNoRGF0YTxEYXRhVHlwZT4gPSBQcm9taXNlPEZldGNoZWREYXRhPERhdGFUeXBlPj47XG5leHBvcnQgaW50ZXJmYWNlIEludGVyY2VwdG9ycyB7XG4gIHJlcXVlc3Q/OiAocmVxdWVzdDogUmVxdWVzdEluaXQpID0+IHZvaWQsXG4gIHJlc3BvbnNlPzogKHJlc3VsdDogRmV0Y2hSZXN1bHQsIHJlcXVlc3RJbml0OiBSZXF1ZXN0SW5pdCkgPT4gUHJvbWlzZTxGZXRjaFJlc3VsdD5cbn1cbi8qID09PT09PT09PT09PT09PT09IEVORCBUWVBFUyA9PT09PT09PT09PT09PT09PSAqL1xuXG5jb25zdCByZXNwb25zZVR5cGVzOiBBcnJheTxSZXNwb25zZVR5cGU+ID0gWydqc29uJywgJ3RleHQnLCAnYmxvYicsICdhcnJheUJ1ZmZlcicsICdmb3JtRGF0YSddO1xuXG5leHBvcnQgY29uc3QgZ2xvYmFsQ29uZmlncyA9IChmdW5jdGlvbiBnbG9iYWxDb25maWdzKCkge1xuICBsZXQgX2NvbmZpZ3M6IENvbmZpZ3MgPSB7fTtcbiAgY29uc3QgZ2V0QWxsID0gZnVuY3Rpb24gZ2V0QWxsKCk6IENvbmZpZ3Mge1xuICAgIHJldHVybiBfY29uZmlncztcbiAgfTtcblxuICBjb25zdCBzZXQgPSBmdW5jdGlvbiBzZXQoY29uZmlnczogQ29uZmlncyk6IHZvaWQge1xuICAgIF9jb25maWdzID0gY29uZmlncztcbiAgfTtcblxuICBjb25zdCB1cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoY29uZmlnczogQ29uZmlncyk6IHZvaWQge1xuICAgIF9jb25maWdzID0geyAuLi5fY29uZmlncywgLi4uY29uZmlncyB9O1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShrZXk6IGtleW9mIENvbmZpZ3MgfCAoa2V5b2YgQ29uZmlncylbXSkge1xuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgZGVsZXRlIF9jb25maWdzW2tleV07XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc2V0LFxuICAgIGdldEFsbCxcbiAgICB1cGRhdGUsXG4gICAgcmVtb3ZlLFxuICB9O1xufSgpKTtcblxuZXhwb3J0IGNvbnN0IGdsb2JhbEhlYWRlcnMgPSAoZnVuY3Rpb24gZ2xvYmFsSGVhZGVycygpIHtcbiAgbGV0IF9oZWFkZXJzOiBQYXJ0aWFsPEhlYWRlcnNJbml0PiA9IHt9O1xuXG4gIGNvbnN0IGdldEFsbCA9IGZ1bmN0aW9uIGdldEFsbCgpOiBQYXJ0aWFsPEhlYWRlcnNJbml0PiB7XG4gICAgcmV0dXJuIF9oZWFkZXJzO1xuICB9O1xuXG4gIGNvbnN0IHNldCA9IGZ1bmN0aW9uIHNldChoZWFkZXJzOiBQYXJ0aWFsPEhlYWRlcnNJbml0Pik6IHZvaWQge1xuICAgIF9oZWFkZXJzID0gaGVhZGVycyBhcyBQYXJ0aWFsPEhlYWRlcnNJbml0PjtcbiAgfTtcblxuICBjb25zdCB1cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoaGVhZGVyczogUGFydGlhbDxIZWFkZXJzSW5pdD4pOiB2b2lkIHtcbiAgICBfaGVhZGVycyA9IHsgLi4uX2hlYWRlcnMsIC4uLmhlYWRlcnMgfSBhcyBQYXJ0aWFsPEhlYWRlcnNJbml0PjtcbiAgfTtcblxuICBjb25zdCByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoa2V5OiBzdHJpbmcgfCAoc3RyaW5nKVtdKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkZWxldGUgX2hlYWRlcnNba2V5IGFzIGtleW9mIFBhcnRpYWw8SGVhZGVyc0luaXQ+XTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzZXQsXG4gICAgZ2V0QWxsLFxuICAgIHVwZGF0ZSxcbiAgICByZW1vdmUsXG4gIH07XG59KCkpO1xuXG5jb25zdCBpbnRlcmNlcHRvcnM6IEludGVyY2VwdG9ycyA9IHtcbiAgcmVxdWVzdDogdW5kZWZpbmVkLFxuICByZXNwb25zZTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEludGVyY2VwdG9ycyh7IHJlcXVlc3QsIHJlc3BvbnNlIH06IEludGVyY2VwdG9ycyk6IHZvaWQge1xuICBpZiAocmVxdWVzdClcbiAgICBpbnRlcmNlcHRvcnMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGlmIChyZXNwb25zZSlcbiAgICBpbnRlcmNlcHRvcnMucmVzcG9uc2UgPSByZXNwb25zZTtcbn1cblxuZnVuY3Rpb24gc2V0VVJMKGJhc2VVUkw6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgcGF0aDogc3RyaW5nLFxuICBwYXJhbXM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge30pOiBzdHJpbmcge1xuICBjb25zdCB1cmwgPSBwYXRoLnN0YXJ0c1dpdGgoJ2h0dHAnKSA/IHBhdGhcbiAgICA6IGAke2Jhc2VVUkx9LyR7cGF0aH0ke3NlcmlhbGl6ZU9iamVjdChwYXJhbXMpfWA7XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5pdCh0eXBlOiBzdHJpbmcsXG4gIHBhdGg6IHN0cmluZyxcbiAge1xuICAgIHBhcmFtcyA9IHt9LCBjb25maWdzID0ge30sIGJvZHksIGhlYWRlcnMgPSB7fSwgcmVzcG9uc2VUeXBlID0gJ2pzb24nLCBtZXRhID0ge31cbiAgfToge1xuICAgIHBhcmFtcz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBhbnk+O1xuICAgIGNvbmZpZ3M/OiBDb25maWdzO1xuICAgIGJvZHk/OiBhbnk7XG4gICAgaGVhZGVycz86IFBhcnRpYWw8SGVhZGVyc0luaXQ+O1xuICAgIHJlc3BvbnNlVHlwZT86IFJlc3BvbnNlVHlwZTtcbiAgICBtZXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICB9KTogUHJvbWlzZTxGZXRjaFJlc3VsdD4ge1xuICBsZXQgcmVxdWVzdEluaXQ6IFJlcXVlc3RJbml0ID0ge307XG4gIGxldCByZXN1bHQ6IGFueTtcbiAgbGV0IHVybDogc3RyaW5nO1xuICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlO1xuICBjb25zdCBnbG9iYWxDb25maWcgPSBnbG9iYWxDb25maWdzLmdldEFsbCgpO1xuICBjb25zdCB7IGJhc2VVUkwsIC4uLnJlc3RHbG9iYWxDb25maWcgfSA9IGdsb2JhbENvbmZpZztcbiAgcmVxdWVzdEluaXQubWV0aG9kID0gdHlwZTtcbiAgaWYgKGJvZHkgJiYgdHlwZSAmJiB0eXBlICE9PSAnR0VUJykge1xuICAgIGlmIChib2R5IGluc3RhbmNlb2YgRm9ybURhdGEgfHwgdHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXF1ZXN0SW5pdC5ib2R5ID0gYm9keTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdEluaXQuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgIH1cbiAgfVxuICBjb25zdCBfaGVhZGVycyA9IHsgLi4uZ2xvYmFsSGVhZGVycy5nZXRBbGwoKSwgLi4uaGVhZGVycyB9IGFzIEhlYWRlcnNJbml0O1xuXG4gIE9iamVjdC5rZXlzKF9oZWFkZXJzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgaWYgKF9oZWFkZXJzW2tdID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIF9oZWFkZXJzW2tdID09PSAndW5kZWZpbmVkJykgZGVsZXRlIF9oZWFkZXJzW2tdO1xuICB9KVxuXG5cbiAgcmVxdWVzdEluaXQgPSB7XG4gICAgLi4ucmVxdWVzdEluaXQsXG4gICAgLi4ucmVzdEdsb2JhbENvbmZpZyxcbiAgICAuLi5jb25maWdzLFxuICAgIGhlYWRlcnM6IF9oZWFkZXJzLFxuICB9O1xuXG4gIGlmIChpbnRlcmNlcHRvcnMucmVxdWVzdCkge1xuICAgIGludGVyY2VwdG9ycy5yZXF1ZXN0KHJlcXVlc3RJbml0KTtcbiAgfVxuICB1cmwgPSBzZXRVUkwoY29uZmlncy5iYXNlVVJMIHx8IGJhc2VVUkwsIHBhdGgsIHBhcmFtcyk7XG4gIHRyeSB7XG5cbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgcmVxdWVzdEluaXQpO1xuICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZXMuaW5jbHVkZXMocmVzcG9uc2VUeXBlKSA/IHJlc3BvbnNlVHlwZSA6ICdqc29uJztcbiAgICBsZXQgcmVzcG9uc2VCb2R5ID0ge307XG4gICAgLy8gVE9ETyBjaGVjayBpZiBfYm9keUJsb2IgaXMgdmFsaWQgdG8gdXNlXG4gICAgLy8gaWYgKChyZXNwb25zZSBhcyBhbnkpLl9ib2R5QmxvYi5zaXplKSB7XG4gICAgcmVzcG9uc2VCb2R5ID0gYXdhaXQgcmVzcG9uc2VbcmVzcG9uc2VUeXBlXSgpO1xuICAgIC8vIH1cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG1ldGEsXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgICBlcnJvcjoge1xuICAgICAgICAgIC4uLnJlc3BvbnNlQm9keSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIHRocm93IHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXN1bHQgPSB7IGRhdGE6IHJlc3BvbnNlQm9keSwgcmVzcG9uc2UsIG1ldGEgfTtcbiAgICBpZiAoaW50ZXJjZXB0b3JzLnJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gaW50ZXJjZXB0b3JzLnJlc3BvbnNlKHJlc3VsdCwgcmVxdWVzdEluaXQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcblxuICAgIGNvbnN0IGlzVHlwZUVycm9yID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKCdyZXNwb25zZScgaW4gZXJyb3IpO1xuICAgIGNvbnN0IGVyclJlc3BvbnNlOiBGZXRjaFJlc3VsdCA9IGlzVHlwZUVycm9yID9cbiAgICAgIHtcbiAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICBuYW1lOiBlcnJvci5uYW1lLFxuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgOiBlcnJvcjtcbiAgICBpZiAoaW50ZXJjZXB0b3JzLnJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gaW50ZXJjZXB0b3JzLnJlc3BvbnNlKGVyclJlc3BvbnNlLCByZXF1ZXN0SW5pdCk7XG5cbiAgICB9XG4gICAgY29uc29sZS5sb2coZXJyUmVzcG9uc2UsIGlzVHlwZUVycm9yKTtcblxuICAgIHJldHVybiBlcnJSZXNwb25zZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRGZXRjaEFib3J0KCkge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICByZXR1cm4gY29udHJvbGxlcjtcbn1cblxuXG5mdW5jdGlvbiBIYW5kbGVUaW1lT3V0KHRpbWVvdXQ6IG51bWJlciwgY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyKSB7XG4gIGlmICh0eXBlb2YgdGltZW91dCAhPT0gJ251bWJlcicpIHJldHVybjtcblxuICBjb25zdCB0aW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29udHJvbGxlci5hYm9ydCgpO1xuICB9LCB0aW1lb3V0KTtcblxuICByZXR1cm4gdGltZXJJZDtcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUPFR5cGUgPSBhbnk+KFxuICByb3V0ZTogc3RyaW5nLFxuICB7XG4gICAgcGFyYW1zLFxuICAgIGNvbmZpZ3MgPSB7fSxcbiAgICBoZWFkZXJzLFxuICAgIHJlc3BvbnNlVHlwZSxcbiAgICBtZXRhID0ge30sXG4gICAgdGltZW91dFxuICB9OiB7XG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT4sXG4gICAgY29uZmlncz86IENvbmZpZ3MsXG4gICAgaGVhZGVycz86IFBhcnRpYWw8SGVhZGVyc0luaXQ+LFxuICAgIHJlc3BvbnNlVHlwZT86IFJlc3BvbnNlVHlwZSxcbiAgICBtZXRhPzogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICB0aW1lb3V0PzogbnVtYmVyO1xuICB9ID0ge30sXG4gIGFib3J0Q2FsbGJhY2s/OiAoY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyKSA9PiB2b2lkXG4pOiBGZXRjaERhdGE8VHlwZT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gc2V0RmV0Y2hBYm9ydCgpO1xuICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEFib3J0Q29udHJvbGxlcikge1xuICAgIGNvbmZpZ3Muc2lnbmFsID0gY29udHJvbGxlci5zaWduYWw7XG4gIH1cblxuICBpZiAoYWJvcnRDYWxsYmFjaykge1xuICAgIGFib3J0Q2FsbGJhY2soY29udHJvbGxlcik7XG4gIH1cbiAgY29uc3QgdGltZXJJZCA9IEhhbmRsZVRpbWVPdXQodGltZW91dCwgY29udHJvbGxlcik7XG4gIGNvbnN0IHsgZGF0YSwgcmVzcG9uc2UsIGVycm9yIH0gPSBhd2FpdCBpbml0KCdHRVQnLCByb3V0ZSwgeyBwYXJhbXMsIGNvbmZpZ3MsIGhlYWRlcnMsIHJlc3BvbnNlVHlwZSwgbWV0YSB9KTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICByZXNwb25zZSxcbiAgICBlcnJvclxuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEhFQUQ8VHlwZSA9IGFueT4oXG4gIHJvdXRlOiBzdHJpbmcsXG4gIHtcbiAgICBwYXJhbXMsXG4gICAgY29uZmlncyxcbiAgICBoZWFkZXJzLFxuICAgIG1ldGEgPSB7fSxcbiAgICB0aW1lb3V0XG4gIH06IHtcbiAgICBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duIHwgYW55PixcbiAgICBjb25maWdzPzogQ29uZmlncyxcbiAgICBoZWFkZXJzPzogUGFydGlhbDxIZWFkZXJzSW5pdD4sXG4gICAgbWV0YT86IFJlY29yZDxzdHJpbmcsIGFueT47XG4gICAgdGltZW91dD86IG51bWJlcjtcbiAgfSA9IHt9LFxuICBhYm9ydENhbGxiYWNrPzogKGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcikgPT4gdm9pZFxuKTogRmV0Y2hEYXRhPFR5cGU+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IHNldEZldGNoQWJvcnQoKTtcbiAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBBYm9ydENvbnRyb2xsZXIpIHtcbiAgICBjb25maWdzLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgaWYgKGFib3J0Q2FsbGJhY2spIHtcbiAgICBhYm9ydENhbGxiYWNrKGNvbnRyb2xsZXIpO1xuICB9XG4gIGNvbnN0IHRpbWVySWQgPSBIYW5kbGVUaW1lT3V0KHRpbWVvdXQsIGNvbnRyb2xsZXIpO1xuICBjb25zdCB7IGRhdGEsIHJlc3BvbnNlLCBlcnJvciB9ID0gYXdhaXQgaW5pdCgnSEVBRCcsIHJvdXRlLCB7IHBhcmFtcywgY29uZmlncywgaGVhZGVycywgbWV0YSB9KTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICByZXNwb25zZSxcbiAgICBlcnJvclxuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1Q8VHlwZSA9IGFueT4oXG4gIHJvdXRlOiBzdHJpbmcsXG4gIHtcbiAgICBib2R5ID0ge30sXG4gICAgcGFyYW1zLFxuICAgIGNvbmZpZ3MgPSB7fSxcbiAgICBoZWFkZXJzID0ge30sXG4gICAgcmVzcG9uc2VUeXBlLFxuICAgIG1ldGEgPSB7fSxcbiAgICB0aW1lb3V0XG5cbiAgfToge1xuICAgIGJvZHk/OiBhbnksXG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT4sXG4gICAgY29uZmlncz86IENvbmZpZ3MsXG4gICAgaGVhZGVycz86IFBhcnRpYWw8SGVhZGVyc0luaXQ+LFxuICAgIHJlc3BvbnNlVHlwZT86IFJlc3BvbnNlVHlwZSxcbiAgICBtZXRhPzogUmVjb3JkPHN0cmluZywgYW55PjtcbiAgICB0aW1lb3V0PzogbnVtYmVyO1xuICB9ID0ge30sXG4gIGFib3J0Q2FsbGJhY2s/OiAoY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyKSA9PiB2b2lkXG4pOiBGZXRjaERhdGE8VHlwZT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gc2V0RmV0Y2hBYm9ydCgpO1xuICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEFib3J0Q29udHJvbGxlcikge1xuICAgIGNvbmZpZ3Muc2lnbmFsID0gY29udHJvbGxlci5zaWduYWw7XG4gIH1cblxuICBpZiAoYWJvcnRDYWxsYmFjaykge1xuICAgIGFib3J0Q2FsbGJhY2soY29udHJvbGxlcik7XG4gIH1cbiAgY29uc3QgdGltZXJJZCA9IEhhbmRsZVRpbWVPdXQodGltZW91dCwgY29udHJvbGxlcik7XG4gIGNvbnN0IHsgZGF0YSwgcmVzcG9uc2UsIGVycm9yIH0gPSBhd2FpdCBpbml0KCdQT1NUJywgcm91dGUsXG4gICAge1xuICAgICAgcGFyYW1zLCBjb25maWdzLCBib2R5LCBoZWFkZXJzLCByZXNwb25zZVR5cGUsIG1ldGFcbiAgICB9KTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICByZXNwb25zZSxcbiAgICBlcnJvclxuICB9O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBVVDxUeXBlID0gYW55Pihyb3V0ZTogc3RyaW5nLFxuICB7XG4gICAgYm9keSA9IHt9LCBwYXJhbXMsIGNvbmZpZ3MgPSB7fSwgaGVhZGVycyA9IHt9LCByZXNwb25zZVR5cGUsIG1ldGEgPSB7fSwgdGltZW91dFxuXG4gIH06IHtcbiAgICBib2R5PzogYW55O1xuICAgIHBhcmFtcz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBhbnk+O1xuICAgIGNvbmZpZ3M/OiBDb25maWdzO1xuICAgIGhlYWRlcnM/OiBQYXJ0aWFsPEhlYWRlcnNJbml0PjtcbiAgICByZXNwb25zZVR5cGU/OiBSZXNwb25zZVR5cGU7XG4gICAgbWV0YT86IFJlY29yZDxzdHJpbmcsIGFueT47XG4gICAgdGltZW91dD86IG51bWJlcjtcbiAgfSA9IHt9LFxuICBhYm9ydENhbGxiYWNrPzogKGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcikgPT4gdm9pZFxuKTogRmV0Y2hEYXRhPFR5cGU+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IHNldEZldGNoQWJvcnQoKTtcbiAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBBYm9ydENvbnRyb2xsZXIpIHtcbiAgICBjb25maWdzLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgaWYgKGFib3J0Q2FsbGJhY2spIHtcbiAgICBhYm9ydENhbGxiYWNrKGNvbnRyb2xsZXIpO1xuICB9XG4gIGNvbnN0IHRpbWVySWQgPSBIYW5kbGVUaW1lT3V0KHRpbWVvdXQsIGNvbnRyb2xsZXIpO1xuICBjb25zdCB7IGRhdGEsIHJlc3BvbnNlLCBlcnJvciB9ID0gYXdhaXQgaW5pdCgnUFVUJywgcm91dGUsIHtcbiAgICBwYXJhbXMsIGNvbmZpZ3MsIGJvZHksIGhlYWRlcnMsIHJlc3BvbnNlVHlwZSwgbWV0YVxuICB9KTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICByZXNwb25zZSxcbiAgICBlcnJvclxuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFPFR5cGUgPSBhbnk+KHJvdXRlOiBzdHJpbmcsXG4gIHtcbiAgICBib2R5ID0ge30sIHBhcmFtcywgY29uZmlncyA9IHt9LCBoZWFkZXJzID0ge30sIHJlc3BvbnNlVHlwZSwgbWV0YSA9IHt9LFxuICAgIHRpbWVvdXRcbiAgfToge1xuICAgIGJvZHk/OiBhbnk7XG4gICAgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IGFueT47XG4gICAgY29uZmlncz86IENvbmZpZ3M7XG4gICAgaGVhZGVycz86IFBhcnRpYWw8SGVhZGVyc0luaXQ+O1xuICAgIHJlc3BvbnNlVHlwZT86IFJlc3BvbnNlVHlwZTtcbiAgICBtZXRhPzogUmVjb3JkPHN0cmluZywgYW55PjtcbiAgICB0aW1lb3V0PzogbnVtYmVyO1xuICB9ID0ge30sXG4gIGFib3J0Q2FsbGJhY2s/OiAoY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyKSA9PiB2b2lkKTogRmV0Y2hEYXRhPFR5cGU+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IHNldEZldGNoQWJvcnQoKTtcbiAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBBYm9ydENvbnRyb2xsZXIpIHtcbiAgICBjb25maWdzLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgaWYgKGFib3J0Q2FsbGJhY2spIHtcbiAgICBhYm9ydENhbGxiYWNrKGNvbnRyb2xsZXIpO1xuICB9XG4gIGNvbnN0IHRpbWVySWQgPSBIYW5kbGVUaW1lT3V0KHRpbWVvdXQsIGNvbnRyb2xsZXIpO1xuICBjb25zdCB7IGRhdGEsIHJlc3BvbnNlLCBlcnJvciB9ID0gYXdhaXQgaW5pdCgnREVMRVRFJywgcm91dGUsIHtcbiAgICBwYXJhbXMsIGNvbmZpZ3MsIGJvZHksIGhlYWRlcnMsIHJlc3BvbnNlVHlwZSwgbWV0YVxuICB9KTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICByZXNwb25zZSxcbiAgICBlcnJvclxuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUEFUQ0g8VHlwZSA9IGFueT4ocm91dGU6IHN0cmluZyxcbiAge1xuICAgIGJvZHkgPSB7fSwgcGFyYW1zLCBjb25maWdzID0ge30sIGhlYWRlcnMgPSB7fSwgcmVzcG9uc2VUeXBlLCBtZXRhID0ge30sIHRpbWVvdXRcblxuICB9OiB7XG4gICAgYm9keT86IGFueTtcbiAgICBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duIHwgYW55PjtcbiAgICBjb25maWdzPzogQ29uZmlncztcbiAgICBoZWFkZXJzPzogUGFydGlhbDxIZWFkZXJzSW5pdD47XG4gICAgcmVzcG9uc2VUeXBlPzogUmVzcG9uc2VUeXBlO1xuICAgIG1ldGE/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICAgIHRpbWVvdXQ/OiBudW1iZXI7XG4gIH0gPSB7fSxcbiAgYWJvcnRDYWxsYmFjaz86IChjb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIpID0+IHZvaWQpOiBGZXRjaERhdGE8VHlwZT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gc2V0RmV0Y2hBYm9ydCgpO1xuICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEFib3J0Q29udHJvbGxlcikge1xuICAgIGNvbmZpZ3Muc2lnbmFsID0gY29udHJvbGxlci5zaWduYWw7XG4gIH1cblxuICBpZiAoYWJvcnRDYWxsYmFjaykge1xuICAgIGFib3J0Q2FsbGJhY2soY29udHJvbGxlcik7XG4gIH1cbiAgY29uc3QgdGltZXJJZCA9IEhhbmRsZVRpbWVPdXQodGltZW91dCwgY29udHJvbGxlcik7XG4gIGNvbnN0IHsgZGF0YSwgcmVzcG9uc2UsIGVycm9yIH0gPSBhd2FpdCBpbml0KCdQQVRDSCcsIHJvdXRlLCB7XG4gICAgcGFyYW1zLCBjb25maWdzLCBib2R5LCBoZWFkZXJzLCByZXNwb25zZVR5cGUsIG1ldGFcbiAgfSk7XG4gIGNsZWFyVGltZW91dCh0aW1lcklkKTtcblxuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgcmVzcG9uc2UsXG4gICAgZXJyb3JcbiAgfTtcbn1cblxuY29uc3QgZmV0Y2hpZnkgPSB7XG4gIFBPU1QsXG4gIEdFVCxcbiAgREVMRVRFLFxuICBQVVQsXG4gIFBBVENILFxuICBIRUFELFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZmV0Y2hpZnk7XG5cbmV4cG9ydCB7XG4gIGlzQnJvd3NlcixcbiAgbm9wLFxuICBzZXJpYWxpemVPYmplY3QsXG4gIGdldFBhcmFtc0Zyb21TdHJpbmcsXG4gIHJlcGxhY2VQYXJhbXNJblN0cmluZ1xufSBmcm9tICcuL2hlbHBlcnMnXG5cblxuXG4vKipcbiAqID09PT09PT09ICBGT1IgREVCVUdHSU5HICA9PT09PT09PT09XG4gKi9cblxuLy8gY29uc3QgeCA9IEZpbGVP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


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
const { GET } = __webpack_require__(/*! @elghandour/fetchify */ "../../../dist/browser/build.common.js");
(async function () {
    const { data, error, response } = await GET('https://jsonplaceholder.typicode.com/posts');
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