import React, { memo, useRef, useState } from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import t from 'prop-types'
import MaTextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Icon from '../Icon'

export const TEXT_FIELD_TYPE = {
  TEXT: 'text',
  NUMBER: 'number',
  SELECT: 'select',
  PASSWORD: 'password',
}

const useTextFieldStyles = makeStyles({
  root: {
    height: '4.25rem',
    minWidth: '6.25rem',
    marginTop: '1rem',
    marginBottom: '0.5rem',
    '& label + .MuiInput-formControl': {
      marginTop: '1rem',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      '&.MuiFormLabel-filled, &.Mui-focused': {
        lineHeight: '1.125rem',
      },
      '& .MuiInputLabel-asterisk': {
        color: theme => theme.palette.error.main,
      }
    },
    '& .MuiInputBase-root': {
      height: '2rem',
      '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderColor: 'rgba(0, 0, 0, 0.42)',
      },
      '& .MuiInputBase-input': {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      },
      '& .input-clear': {
        display: 'none',
      },
      '& input:not([value=""]) ~ .input-clear': {
        display: 'inherit',
      },
      '& .MuiInputAdornment-positionEnd': {
        '& .MuiIconButton-root': {
          padding: '0',
          '& .iconfont': {
            fontSize: '1.5rem',
          },
          '&:hover': {
            background: 'unset',
            color: theme => theme.palette.primary.main,
          }
        },
      },
      '& .MuiSelect-root': {
        background: 'unset'
      },
    },
    '& .MuiFormHelperText-root': {
      fontSize: '0.625rem',
      lineHeight: '0.75rem',
      color: '#00000042',
      '&.Mui-error': {
        color: theme => theme.palette.error.main,
      },
    },
  },
  readOnlyRoot: {
    '& .MuiSelect-select': {
      cursor: 'default',
    },
    '& .MuiInputBase-root': {
      '&.MuiInput-underline:after': {
        opacity: 0
      },
      '&.MuiInput-underline:before': {
        opacity: 0
      },
      '& .MuiSelect-icon': {
        opacity: 0
      },
    },
    '& .MuiFormLabel-root.Mui-focused': {
      // color: 'inherit',
      color: 'rgba(0, 0, 0, 0.54)'
    }
  },
  weak: {
    '& .MuiInputBase-input': {
      color: theme => theme.palette.text.disabled,
    }
  }
})

const TextField = React.forwardRef(function TextField({
  name, type, classes, children, readOnly, disabled, weak, value, extraInputProps, onChange, ...otherProps
}, ref) {

  const theme = useTheme()
  const customClasses = useTextFieldStyles(theme)
  const [isShowPwd, setIsShowPwd] = useState(false)
  const inputRef = useRef()
  const InputProps = {
    readOnly: readOnly,
    ...extraInputProps
  }

  const onClear = () => {
    const element = inputRef.current
    if (!element) {
      return
    }
    // 写法一
    const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
    setValue.call(element, '')
    element.dispatchEvent(new Event('input', { bubbles: true }))

    // 写法二
    // const handler = (e) => {
    //   typeof onChange === 'function' && onChange(e)
    //   element.focus()
    //   element.removeEventListener('input', handler)
    // }
    // element.addEventListener('input', handler)
    // element.value = ''
    // element.dispatchEvent(new Event('input'))
  }

  const changePwdVisible = () => {
    setIsShowPwd(prevIsShowPwd => !prevIsShowPwd)
  }

  const isSelect = type === TEXT_FIELD_TYPE.SELECT

  if ([TEXT_FIELD_TYPE.TEXT, TEXT_FIELD_TYPE.NUMBER].includes(type) && !disabled && !readOnly) {
    InputProps.endAdornment = (
      <InputAdornment className="input-clear" position="end">
        <IconButton tabIndex="-1" onClick={onClear}>
          <Icon name="close" />
        </IconButton>
      </InputAdornment>
    )
  }

  const isPassword = type === TEXT_FIELD_TYPE.PASSWORD

  if (isPassword) {
    InputProps.endAdornment = (
      <InputAdornment position="end">
        <IconButton
          tabIndex="-1"
          onClick={changePwdVisible}
        >
          <Icon name={isShowPwd ? 'visibility' : 'visibilityOff'} />
        </IconButton>
      </InputAdornment>
    )
  }

  const inputType = isSelect || (isPassword && isShowPwd) ? TEXT_FIELD_TYPE.TEXT : type

  const { root, ...restClasses } = classes

  return (
    <MaTextField
      classes={{
        root: `${customClasses.root}${root ? ` ${root}` : ''}`,
        ...restClasses,
      }}
      className={clsx(readOnly && customClasses.readOnlyRoot, weak && customClasses.weak)}
      type={inputType}
      ref={ref}
      select={isSelect}
      value={value}
      disabled={disabled}
      InputProps={InputProps}
      inputRef={inputRef}
      margin="normal"
      {...otherProps}
      name={name}
      onChange={onChange}
    >
      {children}
    </MaTextField>
  )
})

TextField.propTypes = {
  type: t.oneOf(['text', 'number', 'select', 'password']),
  classes: t.object,
  children: t.node,
  readOnly: t.bool,
  weak: t.bool,
  extraInputProps: t.object,
  disabled: t.bool,
  name: t.string,
  value: t.any,
  onChange: t.func,
}

TextField.defaultProps = {
  classes: {},
  type: TEXT_FIELD_TYPE.TEXT,
  weak: false,
  onChange: () => { },
}

TextField.displayName = 'VcTextField'

export default memo(TextField)
