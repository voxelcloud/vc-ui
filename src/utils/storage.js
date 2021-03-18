
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
    return typeof window.localStorage === 'object'
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
    return typeof window.sessionStorage === 'object'
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
  canSupport() {
    return true
  },
  getState: function () {
    return global
  },
}

export const storage = [localStorage, sessionStorage, globalStorage].find(v => {
  return v.canSupport()
})

// export {
//   storage
// }
