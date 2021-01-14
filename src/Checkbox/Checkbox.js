import React, { memo } from 'react'
import t from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MaCheckbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

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

const Checkbox = React.forwardRef(function Checkbox({ labelClasses, classes, label, checked, ...otherProps
}, ref) {
  const customLabelClasses = useControlLabelStyles()
  const customCheckboxClasses = useCheckboxStyles()
  return (
    <FormControlLabel
      classes={{
        root: customLabelClasses.root,
        label: customLabelClasses.label,
        ...labelClasses
      }}
      className={clsx(checked && 'MuiFormControlLabel-checked')}
      ref={ref}
      control={
        <MaCheckbox
          classes={{
            root: customCheckboxClasses.root,
            ...classes,
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
  labelClasses: t.object,
  classes: t.object,
  label: t.string,
  checked: t.bool,
}

Checkbox.defaultProps = {
  color: 'primary',
}

Checkbox.displayName = 'VcCheckbox'

export default memo(Checkbox)
