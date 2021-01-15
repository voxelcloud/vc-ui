import React from 'react'
import t from 'prop-types'

const OpenOptionsTypes = () => <div></div>

OpenOptionsTypes.propTypes = {
  noticeIconName: t.string,
  noticeIconClassName: t.string,
  content: t.string,
  duration: t.number,
  style: t.object,
  maxCount: t.number,
  getContainer: t.func,
  closable: t.bool,
  expandActions: t.any,
  onClose: t.func
}

OpenOptionsTypes.displayName = 'VcMessageOpen'

export default OpenOptionsTypes