import React from 'react'
import t from 'prop-types'

const OpenOptionsTypes = () => <div></div>

OpenOptionsTypes.propTypes = {
  type: t.oneOf(['primary', 'secondary', 'warning', 'error', 'disabled', 'success', 'info', 'text']),
  noticeIconName: t.string,
  noticeIconClassName: t.string,
  content: t.string,
  duration: t.number,
  style: t.object,
  maxCount: t.number,
  getContainer: t.func,
  closable: t.bool,
  expandActions: t.oneOf([t.array, t.node]),
  onClose: t.func
}

OpenOptionsTypes.displayName = 'VcMessageOpen'

export default OpenOptionsTypes