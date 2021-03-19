/**
 * 判断数据是否为空, 包括 空字符串，空数组， 空对象，null，undefined
 * @param {*} obj 
 * @returns 
 */
const isEmpty = (obj) => {
  if (obj === null || obj === undefined || obj === '') {
    return true
  }
  if (Array.isArray(obj)) {
    return obj.length === 0
  }
  return obj.constructor === Object && Object.keys(obj).length === 0
}

export default isEmpty