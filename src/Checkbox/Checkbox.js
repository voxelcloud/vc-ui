import React, { memo } from 'react'
import t from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MaCheckbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'

const useControlLabelStyles = makeStyles({
  root: {
    margin: '0',
  },
  label: {
    marginLeft: '18px',
  }
})

const useCheckboxStyles = makeStyles({
  root: {
    width:' 18px',
    height: '18px',
    padding: '0',
    '&:hover': {
      background: 'unset',
    }
  },
})

const Checkbox = React.forwardRef(function Checkbox({ label, checked, ...otherProps
}, ref) {
  const labelClasses = useControlLabelStyles()
  const checkboxClasses = useCheckboxStyles()
  return (
    <FormControlLabel
      classes={{
        root: labelClasses.root,
        label: labelClasses.label,
      }}
      className={checked ? 'MuiFormControlLabel-checked' : ''}
      ref={ref}
      control={
        <MaCheckbox
          classes={{
            root: checkboxClasses.root,
          }}
          checked={checked}
          {...otherProps}
        />
      }
      label={label}
    />
  )
})

Checkbox.propTypes = {
  label: t.string,
  checked: t.bool,
}

Checkbox.defaultProps = {
  color: 'primary',
}

Checkbox.displayName = 'VcCheckbox'

export default memo(Checkbox)
