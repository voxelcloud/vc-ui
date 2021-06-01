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
    height: '2.25rem',
    minWidth: '5.5rem',
    padding: '0 1rem',
    borderRadius: '0.25rem',
    fontSize: '1rem',
    cursor: 'pointer',
    color: theme => theme?.palette?.primary?.light,
    '& i': {
      marginRight: '0.5rem',
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