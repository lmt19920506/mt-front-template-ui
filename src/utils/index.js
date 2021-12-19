import * as R from 'ramda'

export const generateUUID = (prefix = null) => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      // eslint-disable-next-line eqeqeq
      return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
    }
  );
  if (prefix) {
    return `${prefix}-${uuid}`;
  }
  return uuid;
};

export function mixinObjs(...objs) {
  return Object.assign.apply(null, objs)
}

export const isSame = R.curry(function(target, a, b) {
  if (!target) return a === b
  return a[target] === b[target]
})

export const diff = R.curry(function(target, a, b) {
  if (!target) return a - b
  return a[target] - b[target]
})

export const diffIndex = diff('index')

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function reDup(array) {
  return Array.from(new Set(array))
}