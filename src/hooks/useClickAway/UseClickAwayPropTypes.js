import React from 'react'
import t from 'prop-types'

const UseClickAwayPropTypes = () => <div></div>

UseClickAwayPropTypes.propTypes = {
  onClickAway: t.func,
  target: t.oneOf([t.element, t.shape({ current: t.element }), t.func, t.arrayOf(t.element, t.func)]),
  eventName: t.string,
}

UseClickAwayPropTypes.defaultProps = {
  eventName: 'click'
}

UseClickAwayPropTypes.displayName = 'VcUseClickAway'

export default UseClickAwayPropTypes