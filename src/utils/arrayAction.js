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


/**
 * 获取两个数组之间不同的元素
 * arr1 (Array) ： 需要获取不同元素的数组一。
 * arr2 (Array) ： 需要获取不同元素的数组二。
 * 
 */
export const arrDifference = (arr1, arr2) => arr1.concat(arr2).filter((v, i, arr) => arr.indexOf(v) === arr.lastIndexOf(v));
// const arr1 = [1,2,4,5,8]
// const arr2 = [2,3,5,8,9]
// const result = arrDifference(arr1,arr2)
// console.log(result) //=> [1,4,3,9]

/**
 * 获取两个数组之间相同的元素
 */
export const arrSimilarity = (arr1, arr2) => arr1.filter((v) => arr2.includes(v));
// const arr1 = [1,2,4,5,8]
// const arr2 = [2,3,5,8,9]
// const result = arrSimilarity(arr1,arr2)
// console.log(result) //=> [2,5,8]

/**
 * 获取数组二相对于数组一不同的元素
 */
export const getDifferenceFrom = (arr1, arr2) => {
  const values = new Set(arr2);
  return arr1.filter((element) => !values.has(element));
};
// const arr1 = [1,2,4,5,8]
// const arr2 = [2,3,5,8,9]
// const result = getDifferenceFrom(arr1,arr2)
// console.log(result) //=> [1,4]
