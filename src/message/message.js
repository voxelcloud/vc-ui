import React from 'react'
import Notification from 'rc-notification'
import MessageContent from './MessageContent'

const DefaultDuration = 3 // second
const transitionName = 'move-down'
let messageInstance
let messageInstances = {}

function getMessageInstance(key, isSingleton, maxCount, getContainer, callback) {

  if (!isSingleton) {
    Notification.newInstance({
      transitionName,
      maxCount,
      getContainer
    }, (instance) => {
      messageInstances[key] = instance
      callback(instance)
    })
  } else {
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
}

function notice({
  isSingleton = true, type, noticeIconName, noticeIconClassName, content, duration = DefaultDuration,
  style, maxCount = 1, getContainer, closable = true, expandActions = [], onClose,
}) {
  const key = Date.now()

  const removeNotice = () => {
    if (isSingleton) {
      messageInstance.removeNotice(key)
    } else {
      messageInstances[key].removeNotice(key)
    }
  }

  const closeNotice = (e) => {
    removeNotice()
    if (onClose) onClose(e)
  }

  getMessageInstance(key, isSingleton, maxCount, getContainer, (instance) => {
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
  for (let key in messageInstances) {
    messageInstances[key].destroy()
  }
  messageInstances = {}

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
