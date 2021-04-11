import React, { forwardRef }  from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import t from 'prop-types'

const useTabStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    flexShrink: '0',
    minWidth: '88px',
    height: '36px',
    padding: '0 16px',
    borderRadius: '18px',
    fontSize: '14px',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    zIndex: 1,
    transition: 'color 300ms cubic-bezier(0.7, 0, 0, .8)',
  },
  selected: {
    color: '#fff'
  },
  disabled: {
    backgroundColor: 'transparent',
    color: '#999',
    cursor: 'not-allowed'
  }
}))

const Tab = forwardRef((props, ref) => {
  const { label, value, disabled, icon, classes, className, ...extraProps } = props
  const tabClasses = useTabStyles()
  const cls = clsx(tabClasses.root, classes.root, className, extraProps._selected && tabClasses.selected, disabled && tabClasses.disabled)
  const handleClick = (e) => {
    if (disabled) {
      return
    }
    typeof extraProps._handleSelect == 'function' && extraProps._handleSelect(value, e)
  }
  return <div className={cls} onClick={handleClick} ref={ref}>
    {icon && (<span className={'tab-icon'}>{icon}</span>)}
    <span className={'tab-label'}>{label}</span>
  </div>
})

Tab.propTypes = {
  value: t.any,
  label: t.node,
  disabled: t.bool,
  icon: t.element,
  classes: t.object,
  className: t.string,
}

Tab.defaultProps = {
  label: '',
  value: '',
  disabled: false,
  className: '',
  classes: {
    root: ''
  }
}

Tab.displayName = 'VcTab'

export default Tab
