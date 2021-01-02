import React from 'react'
import MaSelect from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
// eslint-disable-next-line no-unused-vars
import t from 'prop-types'

const useStyles = makeStyles({
  select: {
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
})

const Select = (props) => {
  const classes = useStyles()
  return <MaSelect
    classes={{
      select: classes.select,
    }}
    {...props}
  />
}

Select.propTypes = {
}

export default Select