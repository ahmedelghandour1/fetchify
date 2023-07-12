/* eslint-disable import/prefer-default-export */
export const isBrowser = (): boolean => typeof window === 'object';
const isObject = <Type>(arg: Type): boolean => arg && typeof arg === 'object' && !Array.isArray(Array);

const isEmpty = <Type>(arg: Type): boolean => {
  if (!isObject(arg)) throw Error('type should be object!');
  const key = Object.keys(arg as Record<string, unknown>);
  return !key.length;
};

function isValidQeuryParam(
  param: string | number | boolean |
    Array<string | number | boolean>,
) {
  if (param === undefined || param === null) return false;

  if (typeof param === 'string'
    || typeof param === 'bigint'
    || typeof param === 'number'
    || typeof param === 'boolean') {
    return true;
  }

  if (Array.isArray(param) && param.length) return true;

  return false;
}

export function serializeObject(obj: Record<string, any>): string {
  if (!isObject(obj) || isEmpty(obj)) return '';
  let string = '?';
  const keys = Object.keys(obj);
  keys.forEach((key, i) => {
    if (!isValidQeuryParam(obj[key])) return;
    if (i !== 0) {
      string += '&';
    }
    const isArray = Array.isArray(obj[key]);

    if (isArray) {
      obj[key].forEach((param: string | number | boolean, index: number) => {
        if (isValidQeuryParam(param)) {
          if (index !== 0) {
            string += '&';
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

export function getParamsFromString(input: string): Array<string> {
  const matches: Array<string> = [];
  input.replace(/(\{+)([^}]+)(}+)/g, (_, lb, txt, rb): string => {
    if (lb.length === rb.length) matches.push(txt);
    return txt;
  });
  return matches;
}

export function replaceParamsInString(input: string, params: Record<string, string>): string {
  let str = input;
  const matches = getParamsFromString(input);
  matches.forEach((match: string) => {
    if (params[match]) {
      str = str.replace(`{${match}}`, params[match]);
    }
  });
  return str;
}



export function nop() { }