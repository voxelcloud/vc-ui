
import isPlainObject from './isPlainObject'

/**
 * 将对象的key格式转换为驼峰或下划线
 * @method objectCaseConvert
 * @param {Object} object
 * @param {Object} option deep: 是否深度转换; exclude: 排除项目; -- 默认值 { deep: false, exclude: [] }
 * @param {Function} converter
 * @returns {Object} 返回新对象
 */
const objectCaseConvert = (object, option, converter) => {
  if (!isPlainObject(object)) {
    return object
  }
  const defaultOption = { deep: false, exclude: [] }
  const config = { ...defaultOption, ...option }
  const { deep, exclude } = config
  if (Array.isArray(exclude)) {
    console.warn('objectCaseConvert: option.exclude expects a array!')
  }
  const isDeep = Boolean(deep)
  const newObject = {}
  Object.keys(object).forEach(v => {
    if (exclude.length > 0 && exclude.includes(v)) {
      return newObject[v] = object[v]
    }
    const newKey = converter(v)
    newObject[newKey] = isDeep ? objectCaseConvert(object[v], option, converter) : object[v]
  })
  return newObject
}

export const camelToUnderscore = (name = '') => {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export const underscoreToCamel = (name = '') => {
  return name.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

/**
 * 对象键名格式转换器, 可将对象的key格式转换为驼峰或下划线.
 */
export const objectCaseConverter = {
  toCamelCase: (object, option) => {
    return objectCaseConvert(object, option, underscoreToCamel)
  },
  toUnderscoreCase: (object, option) => {
    return objectCaseConvert(object, option, camelToUnderscore)
  }
}