import { parse, stringify } from 'qs'
import { compile } from 'path-to-regexp'

export const parseUrl = function (search) {
  if (search) {
    return parse(search.split('?')[1])
  }
  return parse(window.location.href.split('?')[1])
}

export const stringifyUrl = function (url = '', params = {}) {
  const queryStr = stringify(params)
  if (!queryStr) {
    return url
  }
  if (url.indexOf('?') < 0) {
    return url += `?${queryStr}`
  }
  if (url.endsWith('&') || url.endsWith('?')) {
    url += queryStr
  } else {
    url += `&${queryStr}`
  }
  return url
}

export const compilePath = function (path = '', params = {}) {
  return compile(path, { encode: encodeURIComponent })(params)
}