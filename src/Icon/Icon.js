import React from 'react'
import t from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import iconMap from './iconMap'

const useIconStyles = makeStyles({
  iconRoot: {
    fontSize: '24px',
  },
})

const Icon = React.forwardRef(({ name, className }, ref) => {
  const iconClasses = useIconStyles()
  const theme = useTheme()
  const iconMapTotal = { ...iconMap, ...theme.iconMap }
  const iconClass = iconMapTotal[name] ? `${iconMapTotal[name]} ${className}` : className
  return <i ref={ref} className={`${iconClasses.iconRoot} ${iconClass}`} />
})

Icon.propTypes = {
  name: t.string,
  className: t.string,
}

Icon.displayName = 'VcIcon'


export default Icon