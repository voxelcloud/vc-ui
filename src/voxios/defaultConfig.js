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

// LACK_PARAM = -400000  缺少参数
// INVALID_PARAM = -400001  参数不合法
// EXISTED = -400002   数据已存在
// NOT_FOUND = 400003   数据不存在
// ADD_FAILED = -400004  添加数据失败
// SET_FAILED = -400005  修改数据失败
// DELETE_FAILED = -400006  删除数据失败
// HAS_NO_PRIVILEGE = -400007  没有权限
// INVALID_TOKEN = -400101  token不合法
// TOKEN_EXPIRED = -400102  token已过期

const INVALID_HTTP_CODE = {
  INVALID_TOKEN: -301001,
  TOKEN_EXPIRED: -301002,
}

const STATUS_CODE = 'status_code'
const ERROR_CODE = 'error_code'

const isTokenInvalid = (code, invalidToken = []) => invalidToken.includes(code)

const defaultLogout = () => {
  new Session().clearSession()
  window.location.href = '/login'
}

const defaultConfig = {
  invalidToken: [
    INVALID_HTTP_CODE.INVALID_TOKEN,
    INVALID_HTTP_CODE.TOKEN_EXPIRED,
  ],
  addAuthHeader: () => ({ ...new Session().getAuthHeader() }),
  transformHeaders: headers => headers,
  axiosConfig: {
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  },
  // onBeforeRequest: (context) => { },
  onSuccess: (res, context) => {
    const { options, config } = context
    const invalidToken = options?.config?.invalidToken || config?.invalidToken
    const { data = {} } = res
    if (isTokenInvalid(data[ERROR_CODE], invalidToken)) {
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

    // if (data[ERROR_CODE] !== undefined && data[ERROR_CODE] !== 0) {
    //   return Promise.reject({message: data.msg || data.errmsg});
    // }

    if (data[STATUS_CODE] === 200) {
      data.statusText = 'OK'
      return data
    }

    const error = {
      code: data[ERROR_CODE],
      message: data.message || data.msg || data.errmsg,
      data,
      origin: res
    }
    return Promise.reject(error)
  },
  onError: (error, context) => {
    const { options, config } = context
    const showErrorMessage = Boolean(options?.config?.throwErrorMessage || config?.throwErrorMessage)
    const normalizeError = Boolean(options?.config?.normalizeError || config?.normalizeError)
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
    const { data } = response
    return {
      code: data[ERROR_CODE],
      message: data.message,
      data,
      origin: response,
      error: error
    }
  }
}

export default defaultConfig
