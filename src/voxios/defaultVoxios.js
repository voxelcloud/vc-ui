import { Voxios, defaultConfig } from './index'
import message from '../message'

Voxios.registerConfig('default', defaultConfig)

const defaultVoxios = new Voxios()
  .useConfig('default')
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