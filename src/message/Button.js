import React from 'react'
import t from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { getTheme } from '../theme'
import clsx from 'clsx'

const useButtonStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    outline: 'none',
    background: 'unset',
    border: 'none',
    height: '36px',
    minWidth: '88px',
    padding: '0 16px',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    color: theme => theme?.palette?.primary?.light,
    '& i': {
      marginRight: '8px',
    }
  },
})
function Button({ className, startIcon, children, ...otherProps }) {
  const theme = getTheme()
  const customClasses = useButtonStyles(theme)
  return (
    <button className={clsx(customClasses.root, className)} {...otherProps}>
      {startIcon}
      {children}
    </button>
  )
}

Button.propTypes = {
  startIcon: t.node,
  className: t.string,
  children: t.node,
}

export default Button