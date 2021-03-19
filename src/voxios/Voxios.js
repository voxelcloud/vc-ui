import { createInstance } from './core'
import baseConfig from './baseConfig'

function create(instanceConfig, context) {
  return createInstance({ ...baseConfig, ...instanceConfig }, context)
}

class Voxios {
  static configMap = {
    default: {},
  }

  static registerConfig(key, value) {
    const { configMap } = Voxios
    configMap[key] = value
  }

  static unregisterConfig(key) {
    const { configMap } = Voxios
    delete configMap[key]
  }

  constructor() {
    this.info = 'Voxios is axios-like request util'
    this.state = {
      currentConfig: {},
      module: {},
    }
    this.instance = null
    this.createInstance()
  }

  createInstance() {
    const { currentConfig } = this.state
    this.instance = create(currentConfig, this)
  }

  getInstance() {
    return this.instance
  }

  addModule(key, value) {
    const { module } = this.state
    module[key] = value
    return this
  }

  removeModule(key) {
    const { module } = this.state
    delete module[key]
    return this
  }

  getModule(key) {
    const { module } = this.state
    return module[key]
  }

  setConfig(config) {
    this.state.currentConfig = config
    this.createInstance()
    return this
  }

  registerConfig(key, value) {
    Voxios.registerConfig(key, value)
    return this
  }

  useConfig(name) {
    const { configMap } = Voxios
    this.setConfig(configMap[name])
    return this
  }

  updateConfig(updater) {
    if (typeof updater !== 'function') {
      // eslint-disable-next-line no-console
      console.error('Voxios updateConfig params should be a function')
      return this
    }
    const newConfig = updater(this.state.currentConfig)
    return this.setConfig(newConfig)
  }

  useDefaultConfig() {
    return this.useConfig('default')
  }
}

Voxios.core = {
  create,
  createInstance
}

export default Voxios