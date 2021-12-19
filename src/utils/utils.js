export function Trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 将文件复制到剪贴板
export async function copyTextToClipboard(text) {
  await navigator.clipboard.writeText(text);
}

/**
 * 判断类型
 * 用法： isType({a: 1}, 'object') {}
 */
export function isType(data, type) {
  const typeObj = {
    "[object String]": "string",
    "[object Number]": "number",
    "[object Boolean]": "boolean",
    "[object Null]": "null",
    "[object Undefined]": "undefined",
    "[object Object]": "object",
    "[object Array]": "array",
    "[object Function]": "function",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Map]": "map",
    "[object Set]": "set",
    "[object HTMLDivElement]": "dom",
    "[object WeakMap]": "weakMap",
    "[object Window]": "window",
    "[object Error]": "error",
    "[object Arguments]": "arguments",
  };
  const name = Object.prototype.toString.call(data);
  console.log("name---", name);
  const typeName = typeObj[name] || "unknow";
  return typeName === type;
}

/**
 * @desc 判断obj是否为空
 * @param {Object} obj
 * @return {Boolean}
 *
 */
export function isEmptyObject(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
  return !Object.keys(obj).length;
}
