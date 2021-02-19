import React from 'react'
import t from 'prop-types'

const UseClickAwayPropTypes = () => <div></div>

UseClickAwayPropTypes.propTypes = {
  onClickAway: t.func,
  target: t.oneOf(['element', 'React useRef result', 'a func return element', 'a array of previous element']),
  eventName: t.string,
}

UseClickAwayPropTypes.defaultProps = {
  eventName: 'click'
}

UseClickAwayPropTypes.displayName = 'VcUseClickAway'

export default UseClickAwayPropTypes