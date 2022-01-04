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
 * 判断类型
 */
export function myTypeOf(data) {
  return Object.prototype.toString
    .call(data)
    .slice(8, -1)
    .toLowerCase();
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

/**
 * 保留指定的小数位
 * toFixed(25.198726354, 1);       // 25.1
toFixed(25.198726354, 2);       // 25.19
toFixed(25.198726354, 3);       // 25.198
toFixed(25.198726354, 4);       // 25.1987
toFixed(25.198726354, 5);       // 25.19872
toFixed(25.198726354, 6);       // 25.198726
 */
export function toFixed(number, fixed) {
  return (Math.pow(10, fixed) * number) / Math.pow(10, fixed);
}

/**
 * 获取所有参数的平均值
 * average(1, 2, 3, 4)
 */
export const average = (...args) => args.reduce((a, b) => a + b) / args.length;

/**
 * 数组对象去重(通过对象hasOwnProperty())
 * arr: 数组
 * key: 根据那个字段去重
 */
export default function removeSame(arr, key) {
  const res = {};
  return arr.filter(item => {
    // console.log("log---", res[item[key]]);
    // return !res.hasOwnProperty(item[key]) && (res[item[key]] = 1);
    return !Object.prototype.hasOwnProperty.call(res, item[key]) && (res[item[key]] = 1)
  });
}
