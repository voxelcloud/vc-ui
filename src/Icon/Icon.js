import React from 'react'
import t from 'prop-types'
import MaIcon from '@material-ui/core/Icon'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import iconMap from './iconMap'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  warning: {
    color: theme?.palette?.warning?.main
  },
  success: {
    color: theme?.palette?.success?.main
  },
  info: {
    color: theme?.palette?.info?.main
  },
  text: {
    color: theme?.palette?.text?.main
  }
}))
const customColor = ['warning', 'success', 'info', 'text']
const Icon = React.forwardRef(({ name, className, color, ...otherProps }, ref) => {
  const theme = useTheme()
  const iconMapTotal = { ...iconMap, ...theme.iconMap }
  const customClasses = useStyles()
  const customClassname = clsx({
    [iconMapTotal[name]]: name,
    [customClasses.warning]: color === 'warning',
    [customClasses.success]: color === 'success',
    [customClasses.info]: color === 'info',
    [customClasses.text]: color === 'text',
    [className]: className
  })
  const colorProp = {}
  if(!customColor.includes(color)) {
    colorProp.color = color
  }
  return <MaIcon
    ref={ref}
    className={customClassname}
    {...colorProp}
    {...otherProps}
  />
})

Icon.propTypes = {
  name: t.string,
  className: t.string,
  color: t.string
}

Icon.displayName = 'VcIcon'


export default Icon