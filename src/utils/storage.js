
export const localStorage = {
  save(key, value) {
    return window.localStorage.setItem(key, value)
  },
  get(key) {
    return window.localStorage.getItem(key)
  },
  remove(key) {
    return window.localStorage.removeItem(key)
  },
  canSupport() {
    return window && typeof window.localStorage === 'object'
  }
}

export const sessionStorage = {
  save: function (key, value) {
    return window.sessionStorage.setItem(key, value)
  },
  get: function (key) {
    return window.sessionStorage.getItem(key)
  },
  remove: function (key) {
    return window.sessionStorage.removeItem(key)
  },
  canSupport() {
    return window && typeof window.sessionStorage === 'object'
  }
}

const global = {}
export const globalStorage = {
  save: function (key, value) {
    return global[key] = value
  },
  get: function (key) {
    return global[key]
  },
  remove: function (key) {
    return delete global[key]
  },
  getState: function () {
    return global
  },
  canSupport() {
    return true
  },
}

export const getStorage = () => {
  return [localStorage, sessionStorage, globalStorage].find(v => {
    return typeof v.canSupport === 'function' && v.canSupport()
  })
}

