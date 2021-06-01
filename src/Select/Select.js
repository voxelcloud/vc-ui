import React from 'react'
import MaSelect from '@material-ui/core/Select'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import t from 'prop-types'

const useStyles = makeStyles({
  vcRoot: {
    display: 'inline-flex',
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '0.125rem solid rgba(0, 0, 0, 0.54)'
    }
  },
  select: {
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
})

const Select = React.forwardRef((props, ref) => {
  const { classes = {}, ...restProps } = props
  const customClasses = useStyles()
  const { vcRoot, ...restClasses } = classes
  return (
    <div className={clsx(customClasses.vcRoot, vcRoot)}>
      <MaSelect
        ref={ref}
        classes={{
          select: customClasses.select,
          ...restClasses
        }}
        {...restProps}
      />
    </div>
  )
})

Select.propTypes = {
  classes: t.object
}

Select.displayName = 'VcSelect'

export default Select