import React from 'react'
import MaSelect from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import t from 'prop-types'

const useStyles = makeStyles({
  select: {
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
})

const Select = React.forwardRef((props, ref) => {
  const { classes, ...restProps } = props
  const customClasses = useStyles()
  return <MaSelect
    ref={ref}
    classes={{
      select: customClasses.select,
      ...classes
    }}
    {...restProps}
  />
})

Select.propTypes = {
  classes: t.object
}

Select.displayName = 'VcSelect'

export default Select