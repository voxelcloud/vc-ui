import React from 'react'
import Notification from 'rc-notification'
import MessageContent from './MessageContent'

const DefaultDuration = 3 // second
const transitionName = 'move-down'
let messageInstance = {}

function getMessageInstance(key, isSingleton, maxCount, getContainer, callback) {

  if (!isSingleton) {
    Notification.newInstance({
      transitionName,
      maxCount,
      getContainer
    }, (instance) => {
      messageInstance[key] = instance
      callback(instance)
    })
  } else {
    if (messageInstance[key]) {
      callback(messageInstance[key])
      return
    }
    Notification.newInstance({
      transitionName,
      maxCount,
      getContainer
    }, (instance) => {
      if (messageInstance[key]) {
        callback(messageInstance[key])
        return
      }
      messageInstance[key] = instance
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
    messageInstance[key].removeNotice(key)
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
  for (let key in messageInstance) {
    messageInstance[key].destroy()
  }
  messageInstance = {}
}

const message = {
  open: notice,
  destroy,
}

export default message
