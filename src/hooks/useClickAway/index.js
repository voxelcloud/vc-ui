import * as React from 'react'

const defaultEvent = 'click'

const getTargetElement = function (target, defaultElement) {
  if (!target) {
    return defaultElement
  }
  let targetElement
  if (typeof target === 'function') {
    targetElement = target()
  } else if ('current' in target) {
    targetElement = target.current
  } else {
    targetElement = target
  }
  return targetElement
}

const useClickAway = (onClickAway, target, eventName = defaultEvent) => {
  if (process.env.NODE_ENV !== 'production' && typeof onClickAway !== 'function') {
    throw new Error('VC-UI: `useClickAway(onClickAway, target, eventName)` onClickAway expects a function argument.')
  }
  const onClickAwayRef = React.useRef(onClickAway)
  onClickAwayRef.current = onClickAway

  React.useEffect(() => {
    const handler = (event) => {
      const targets = Array.isArray(target) ? target : [target]
      if (
        targets.some((targetItem) => {
          const targetElement = getTargetElement(targetItem)
          return !targetElement || targetElement?.contains(event.target)
        })
      ) {
        return
      }
      typeof onClickAwayRef.current === 'function' && onClickAwayRef.current(event)
    }
    document.addEventListener(eventName, handler)
    return () => {
      document.removeEventListener(eventName, handler)
    }
  }, [target, eventName])
}

export default useClickAway