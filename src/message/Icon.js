import React from 'react'
import t from 'prop-types'
import clsx from 'clsx'
import iconMap from '../Icon/iconMap'
import { makeStyles } from '@material-ui/core/styles'
import { getTheme } from '../theme'

const useIconStyles = makeStyles({
  vcRoot: {
    fontSize: '24px',
  },
  primary: {
    color: theme => theme?.palette?.primary?.main
  },
  secondary: {
    color: theme => theme?.palette?.secondary?.main
  },
  error: {
    color: theme => theme?.palette?.error?.main
  },
  disabled: {
    color: theme => theme?.palette?.action?.disabled
  },
  warning: {
    color: theme => theme?.palette?.warning?.main
  },
  success: {
    color: theme => theme?.palette?.success?.main
  },
  info: {
    color: theme => theme?.palette?.info?.main
  },
  text: {
    color: theme => theme?.palette?.text?.main
  }
})

function Icon({ color, className, name, ...otherProps }) {
  const theme = getTheme()
  const customClasses = useIconStyles(theme)
  
  const iconMapTotal = { ...iconMap, ...theme.iconMap }
  const customClassname = clsx({
    iconfont: 'iconfont',
    [customClasses.vcRoot]: customClasses.vcRoot,
    [iconMapTotal[name]]: name,
    [customClasses.primary]: color === 'primary',
    [customClasses.secondary]: color === 'secondary',
    [customClasses.error]: color === 'error',
    [customClasses.disabled]: color === 'disabled',
    [customClasses.warning]: color === 'warning',
    [customClasses.success]: color === 'success',
    [customClasses.info]: color === 'info',
    [customClasses.text]: color === 'text',
    [className]: className
  })

  return (
    <i className={customClassname} { ...otherProps } />
  )
}

Icon.propTypes = {
  color: t.oneOf(['primary', 'secondary', 'warning', 'error', 'disabled', 'success', 'info', 'text']),
  name: t.string,
  className: t.string,
}

export default Icon