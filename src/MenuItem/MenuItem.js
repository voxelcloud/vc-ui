import React from 'react'
import MaMenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import t from 'prop-types'

const useStyles = makeStyles({
  menuItemRoot: {
    color: 'rgba(0, 0, 0, 0.64)',
    fontSize: '0.875rem',
  },
})

const MenuItem = React.forwardRef((props, ref) => {
  const { classes, ...restProps } = props
  const customClasses = useStyles()
  return <MaMenuItem
    ref={ref}
    classes={{
      root: customClasses.menuItemRoot,
      ...classes
    }}
    {...restProps}
  />
})

MenuItem.propTypes = {
  classes: t.object
}

MenuItem.displayName = 'VcMenuItem'

export default MenuItem