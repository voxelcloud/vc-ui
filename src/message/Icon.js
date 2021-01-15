import React from 'react'
import t from 'prop-types'
import clsx from 'clsx'
import iconMap from '../Icon/iconMap'
import { makeStyles } from '@material-ui/core/styles'
import { getTheme } from '../theme'

const useIconStyles = makeStyles({
  root: {
    fontSize: '24px',
  },
})

function Icon({ className, name, ...otherProps }) {
  const theme = getTheme()
  const customClasses = useIconStyles(theme)
  
  const iconMapTotal = { ...iconMap, ...theme.iconMap }
  return (
    <i className={clsx(customClasses.root, className, 'iconfont', iconMapTotal[name] )} { ...otherProps } />
  )
}

Icon.propTypes = {
  name: t.string,
  className: t.string,
}

export default Icon