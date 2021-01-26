import React from 'react'
import Notification from 'rc-notification'
import MessageContent from './MessageContent'

const DefaultDuration = 3 // second
const transitionName = 'move-down'
let messageInstance

function getMessageInstance(maxCount, getContainer, callback) {
  if (messageInstance) {
    callback(messageInstance)
    return
  }
  Notification.newInstance({
    transitionName,
    maxCount,
    getContainer
  }, (instance) => {
    if (messageInstance) {
      callback(messageInstance)
      return
    }
    messageInstance = instance
    callback(instance)
  })
}

function notice({
  type, noticeIconName, noticeIconClassName, content, duration = DefaultDuration, style, maxCount = 1, getContainer,
  closable = true, expandActions = [], onClose,
}) {
  const key = Date.now()

  const removeNotice = () => {
    messageInstance.removeNotice(key)
  }

  const closeNotice = (e) => {
    removeNotice()
    if (onClose) onClose(e)
  }

  getMessageInstance(maxCount, getContainer, (instance) => {
    instance.notice({
      key,
      content: (
        <MessageContent
          style={style}
          type={type}
          content={content}
          closable={closable}
          noticeIconName={noticeIconName}
          noticeIconClassName={noticeIconClassName}
          expandActions={expandActions}
          removeNotice={removeNotice}
          closeNotice={closeNotice}
        />
      ),
      duration,
      onClose,
    })
  })
}

function destroy() {
  if (messageInstance) {
    messageInstance.destroy()
    messageInstance = null
  }
}

const message = {
  open: notice,
  destroy,
}

export default message
