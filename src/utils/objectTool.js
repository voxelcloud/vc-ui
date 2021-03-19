
/** lodash获取对象的值
* const object = { 'a': [{ 'b': { 'c': 3 } }] }
* get(object, 'a[0].b.c')
* // => 3
* get(object, ['a', '0', 'b', 'c'])
* // => 3
* get(object, 'a.b.c', 'default')
* // => 'default'
*/
export const objectTool = {
  isKey: function isKey(value, object) {
    const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
    const reIsPlainProp = /^\w*$/
    if (Array.isArray(value)) {
      return false
    }
    const type = typeof value
    if (type === 'number' || type === 'boolean' || value == null) {
      return true
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value)
      || (object != null && value in Object(object))
  },
  toKey: function toKey(value) {
    if (typeof value === 'string') {
      return value
    }
    const result = `${value}`
    return (result === '0' && (1 / value) === Number.NEGATIVE_INFINITY) ? '-0' : result
  },
  stringToPath(string) {
    const charCodeOfDot = '.'.charCodeAt(0)
    const reEscapeChar = /\\(\\)?/g
    const rePropName = RegExp(
      '[^.[\\]]+' + '|'
      + '\\[(?:'
      + '([^"\'][^[]*)' + '|'
      + '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2'
      + ')\\]' + '|'
      + '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
      'g',
    )
    const result = []
    if (string.charCodeAt(0) === charCodeOfDot) {
      result.push('')
    }
    string.replace(rePropName, (match, expression, quote, subString) => {
      let key = match
      if (quote) {
        key = subString.replace(reEscapeChar, '$1')
      } else if (expression) {
        key = expression.trim()
      }
      result.push(key)
    })
    return result
  },
  castPath: function castPath(value, object) {
    if (Array.isArray(value)) {
      return value
    }
    return this.isKey(value, object) ? [value] : this.stringToPath(value)
  },
  get(object, path, defaultValue) {
    const baseGet = (object, path) => {
      path = this.castPath(path, object)
      let index = 0
      const { length } = path
      while (object != null && index < length) {
        object = object[this.toKey(path[index++])]
      }
      return (index && index == length) ? object : undefined
    }
    const result = object == null ? undefined : baseGet(object, path)
    return result === undefined ? defaultValue : result
  },
  set(object, path, targetValue) {
    const baseSet = (object, path, targetValue) => {
      path = this.castPath(path, object)
      let index = 0
      const { length } = path
      if (length === 1) {
        return object[path[0]] = targetValue
      }
      while (object != null && index < length - 1) {
        object = object[this.toKey(path[index++])]
      }
      if (index && index == length - 1) {
        return object[path[index]] = targetValue
      }
    }
    if (object === null) {
      return
    }
    const result = baseSet(object, path, targetValue)
    return result
  },
}

export const objectGet = function (object, path, defaultValue) {
  return objectTool.get(object, path, defaultValue)
}

export const objectSet = function (object, path, targetValue) {
  return objectTool.set(object, path, targetValue)
}