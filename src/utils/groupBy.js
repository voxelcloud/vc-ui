
/**
 * 分组函数
 * @param {Array} array 
 * @param {function} fn 
 * @returns {Array} [{type: '', list: []}]
 */
const groupBy = (array = [], fn) => {
  const category = new Map()
  array.forEach((item) => {
    const key = fn(item)
    if (category.has(key) && Array.isArray(category.get(key))) {
      category.get(key).push(item)
    } else {
      category.set(key, [item])
    }
  })
  const result = []
  category.forEach((value, key) => {
    result.push({
      type: key,
      list: value,
    })
  })
  return result
}

export default groupBy