import { createInstance } from './core'
import defaultConfig from './defaultConfig'
import primaryConfig from './primaryConfig'

function create(instanceConfig, context) {
  return createInstance({ ...defaultConfig, ...instanceConfig }, context)
}

class Voxios {
  static create = () => new Voxios()

  static configMap = {
    primary: {},
    secondary: {},
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
    const { configMap } = Voxios
    configMap[key] = value
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

  usePrimaryConfig() {
    return this.useConfig('primary')
  }
}

Voxios.primaryConfig = primaryConfig

Voxios.core = {
  create,
  createInstance
}

const primaryVoxios = new Voxios()
  .registerConfig('primary', primaryConfig)
  .usePrimaryConfig()

const primaryVoxiosRequest = primaryVoxios.getInstance()

export {
  Voxios,
  primaryVoxios,
  primaryVoxiosRequest,
}