// session 管理

import { getStorage } from './storage'

const DEFAULT_TOKEN = 'token'
const DEFAULT_AUTH_HEADER = 'token'
const DEFAULT_USER_ID = 'userId'

class Session {
  constructor() {
    this.token = DEFAULT_TOKEN
    this.authHeader = DEFAULT_AUTH_HEADER
    this.userId = DEFAULT_USER_ID
  }

  config({ token, authHeader, userId } = {}) {
    if (token) {
      this.token = token
    }
    if (authHeader) {
      this.authHeader = authHeader
    }
    if (userId) {
      this.userId = userId
    }
    return this
  }

  getAuthHeader() {
    return {
      [this.authHeader]: this.getToken(),
    }
  }

  saveToken(data) {
    const storage = getStorage()
    const key = this.token
    storage.save(key, data)
  }

  getToken() {
    const storage = getStorage()
    const key = this.token
    const res = storage.get(key)
    return res === null ? '' : res
  }

  removeToken() {
    const storage = getStorage()
    const key = this.token
    storage.remove(key)
  }

  saveUserId(data) {
    const storage = getStorage()
    const key = this.userId
    storage.save(key, data)
  }

  removeUserId() {
    const storage = getStorage()
    const key = this.userId
    storage.remove(key)
  }

  getUserId() {
    const storage = getStorage()
    const key = this.userId
    const res = storage.get(key)
    return res === null ? '' : res
  }

  saveSession(token) {
    if (token) {
      this.saveToken(token)
    }
  }

  clearSession() {
    this.removeToken()
    this.removeUserId()
  }
}

export {
  Session,
}