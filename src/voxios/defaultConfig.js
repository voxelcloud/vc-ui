import * as qs from 'qs'
import { Session } from '../utils/session'

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// }

const INVALID_HTTP_CODE = {
  INVALID_TOKEN: -301001,
  TOKEN_EXPIRED: -301002,
}

// const STATUS_CODE = 'status'
const ERROR_CODE = 'error_code'

const defaultLogout = () => {
  new Session().clearSession()
  window.location.href = '/login'
}

const defaultConfig = {
  addAuthHeader: () => ({ ...new Session().getAuthHeader() }),
  transformHeaders: headers => headers,
  axiosConfig: {
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  },
  invalidToken: [
    INVALID_HTTP_CODE.INVALID_TOKEN,
    INVALID_HTTP_CODE.TOKEN_EXPIRED,
  ],
  isTokenInvalid: (response, invalidToken) => {
    const { data = {} } = response
    const code = data[ERROR_CODE]
    if (invalidToken.includes(code)) {
      return true
    }
    return false
  },
  isSuccess: (response) => {
    const { status } = response
    if (status === 200) {
      return true
    }
    return false
  },
  getErrorCode: (response) => {
    const { data = {} } = response
    return data[ERROR_CODE]
  },
  onBeforeRequest: () => { },
  onSuccess: (res, context) => {
    const { options, config } = context
    const invalidToken = options?.config?.invalidToken || config?.invalidToken
    const isTokenInvalid = options?.config?.isTokenInvalid || config?.isTokenInvalid
    const isSuccess = options?.config?.isSuccess || config?.isSuccess
    const getErrorCode = options?.config?.getErrorCode || config?.getErrorCode
    const { data = {} } = res

    if (isTokenInvalid(res, invalidToken)) {
      // tokenInvalid钩子
      const onTokenInvalid = context.getModule('onTokenInvalid')
      typeof onTokenInvalid === 'function' && onTokenInvalid(res)
      // 直接退出, 如果不想走该步骤，可以用一个空函数覆盖掉logout
      const logout = context.getModule('logout') || defaultLogout
      typeof logout === 'function' && logout(res)
      // eslint-disable-next-line no-console
      console.warn('token无效或过期')
      return data
    }

    if ((typeof isSuccess === 'function' && isSuccess(res)) || isSuccess === true) {
      data.statusText = 'OK'
      return data
    }

    const error = {
      code: getErrorCode(res),
      message: data.message || data.msg || data.errmsg,
      data,
      origin: res,
    }

    return Promise.reject(error)
  },
  onError: (error, context) => {
    const { options, config } = context
    const showErrorMessage = Boolean(options?.config?.throwErrorMessage || config?.throwErrorMessage)
    const normalizeError = options?.config?.normalizeError || config?.normalizeError
    let threwError = error
    let messageText = ''

    if (typeof error === 'string') {
      messageText = '操作失败，请稍后重试！'
    } else if (typeof error === 'object' && error !== null && error.response) {
      const { response } = error
      if (response && response.status) {
        const errorText = response.statusText
        const { status, data } = response
        // eslint-disable-next-line no-console
        console.error(`axios threw error detail: ${status} ${data.path}`, errorText, error)
      }
      messageText = '操作失败，请稍后重试!'
      if (typeof normalizeError === 'function') {
        threwError = normalizeError(error)
      }
    }
    messageText = messageText || '您的网络发生异常，无法连接服务器'
    if (showErrorMessage) {
      // eslint-disable-next-line no-console
      console.error('voxios threw http error detail: ', threwError, messageText)
      const onThrowError = context.getModule('onThrowError')
      typeof onThrowError === 'function' && onThrowError(threwError)
    }
  },
  normalizeError: (error) => {
    if (!error || !error.response) {
      return error
    }
    const { response } = error
    let { data, status } = response
    if (typeof data === 'string') {
      data = { data }
    }
    return {
      code: data[ERROR_CODE],
      message: data.message,
      data: {
        ...data,
        httpCode: status
      },
      origin: response,
      error: error
    }
  }
}

export default defaultConfig
