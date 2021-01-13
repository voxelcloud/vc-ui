import React from 'react'
import t from 'prop-types'
import MaIcon from '@material-ui/core/Icon'
import { useTheme } from '@material-ui/core/styles'
import iconMap from './iconMap'
import clsx from 'clsx'

const Icon = React.forwardRef(({ name, className, ...otherProps }, ref) => {
  const theme = useTheme()
  const iconMapTotal = { ...iconMap, ...theme.iconMap }
  return <MaIcon
    ref={ref}
    className={clsx(name && iconMapTotal[name], className)}
    {...otherProps}
  />
})

Icon.propTypes = {
  name: t.string,
  className: t.string,
}

Icon.displayName = 'VcIcon'


export default Icon