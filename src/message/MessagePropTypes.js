import React from 'react'
import t from 'prop-types'

const MessagePropTypes = () => <div></div>

MessagePropTypes.propTypes = {
  open: t.func,
  destroy: t.func,
}

MessagePropTypes.displayName = 'VcMessage'

export default MessagePropTypes