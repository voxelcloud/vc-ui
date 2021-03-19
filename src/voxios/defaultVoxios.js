import { Voxios, defaultConfig } from './index'

Voxios.registerConfig('default', defaultConfig)

const defaultVoxios = new Voxios().useConfig('default')
        
export default defaultVoxios