import * as axios from 'axios'
import { compile } from 'path-to-regexp'

export const transformAxiosOptions = (options = {}, config = {}) => {
  const {
    url = '',
    method = 'get',
    data,
    params,
    headers,
    axiosConfig: axiosConfigFromOptions,
    ...restOptions
  } = options
  const { axiosConfig: axiosConfigFromConfig } = config
  const finalAxiosConfig = { ...axiosConfigFromConfig, ...axiosConfigFromOptions }
  let newUrl = url
  try {
    let domain = ''
    if (newUrl.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domain] = newUrl.match(/[a-zA-z]+:\/\/[^/]*/)
      newUrl = url.slice(domain.length)
    }
    newUrl = compile(newUrl, { encode: encodeURIComponent })(params)
    newUrl = domain + newUrl
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('voxios compile url params fail!', e, options)
  }
  const newOptions = {
    ...restOptions,
    method: method.toLowerCase(),
    headers,
    data,
  }
  if (newOptions.method === 'get') {
    newOptions.params = data
    delete newOptions.data
  }
  return {
    url: newUrl,
    ...newOptions,
    ...finalAxiosConfig,
  }
}

export const request = (options = {}, config = {}, context) => {
  console.log('request option config', options, config)
  const { onSuccess, onError } = config
  context.options = options
  context.config = config
  return axios(options)
    .then((res) => {
      const { data = {}, status } = res
      data.httpCode = status
      return res
    }).then((res) => {
      if (typeof onSuccess === 'function') {
        return onSuccess(res, context)
      }
      const { data } = res
      return data
    }).catch((error) => {
      if (typeof onError === 'function') {
        onError(error, context)
      }
      throw error
    })
}

export const createInstance = (config = {}, context) => (options = {}) => {
  const mergedConfig = { ...config, ...options.config }
  const { onBeforeRequest, addAuthHeader, transformHeaders } = mergedConfig
  const axiosOptions = transformAxiosOptions(options, mergedConfig)
  if (typeof addAuthHeader === 'function') {
    axiosOptions.headers = { ...axiosOptions.headers, ...addAuthHeader(axiosOptions.headers) }
  }
  if (typeof transformHeaders === 'function') {
    axiosOptions.headers = transformHeaders(axiosOptions.headers)
  }
  if (typeof onBeforeRequest === 'function') {
    onBeforeRequest(axiosOptions, mergedConfig)
  }
  return request(axiosOptions, mergedConfig, context)
}
