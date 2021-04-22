import { Voxios, defaultConfig } from './index'
import message from '../message'

Voxios.registerConfig('default', defaultConfig)

const defaultVoxios = new Voxios()
  .useConfig('default')
  .updateConfig(config => {
    const isSuccess = (response) => {
      const { status, data = {} } = response
      if (status === 200 && data['status_code'] == 200) {
        return true
      }
      return false
    }
    return { ...config, isSuccess }
  })
  .addModule('onThrowError', (err) => {
    console.log('err', err)
    message.open({
      type: 'warning',
      noticeIconName: 'notificationWarning',
      content: '--- onThrowError ---',
      style: {
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
      },
    })
  })

export default defaultVoxios