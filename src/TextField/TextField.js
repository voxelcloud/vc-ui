import React, { memo, useRef, useState } from 'react'
import t from 'prop-types'
import MaTextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import { useTheme, makeStyles } from '@material-ui/core/styles'

export const TEXT_FIELD_TYPE = {
  TEXT: 'text',
  NUMBER: 'number',
  SELECT: 'select',
  PASSWORD: 'password',
}

const useTextFieldStyles = makeStyles({
  root: {
    height: '68px',
    minWidth: '100px',
    '& .MuiInputLabel-root': {
      fontSize: '14px',
      lineHeight: '20px',
      '&.MuiFormLabel-filled, &.Mui-focused': {
        lineHeight: '18px',
      },
      '& .MuiInputLabel-asterisk': {
        color: theme => theme.palette.error.main,
      }
    },
    '& .MuiInputBase-root': {
      '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderColor: 'rgba(0, 0, 0, 0.42)',
      },
      '& .MuiInputBase-input': {
        fontSize: '14px',
        lineHeight: '20px',
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
            fontSize: '24px',
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
    }
  }
})

const TextField = React.forwardRef(function TextField({
  type, children, readonly, disabled, multiline, value, onChange, ...otherProps
}, ref) {

  const theme = useTheme()
  const classes = useTextFieldStyles(theme)

  const [isShowPwd, setIsShowPwd] = useState(false)
  const inputRef = useRef()
  let selectProps = {}
  const InputProps = {
    readOnly: readonly,
  }

  const onClear = (e) => {
    e.target.value = ''
    onChange(e)
    inputRef.current.focus()
  }

  const changePwdVisible = () => {
    setIsShowPwd(prevIsShowPwd => !prevIsShowPwd)
  }

  const isSelect = type === TEXT_FIELD_TYPE.SELECT
  if (isSelect) {
    selectProps = {
      MenuProps: {
        className: 'select-menu',
      },
    }
  }
  if ([TEXT_FIELD_TYPE.TEXT, TEXT_FIELD_TYPE.NUMBER].includes(type) && !disabled && !readonly) {
    InputProps.endAdornment = (
      <InputAdornment className={`input-clear ${multiline === true && value ? 'show' : ''}`} position="end">
        <IconButton
          tabIndex="-1"
          onClick={onClear}
        >
          <i className="iconfont icon-ic_close_px" />
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
          {isShowPwd ? <i className="iconfont icon-ic_visibility_px" /> : <i className="iconfont icon-ic_visibility_off_" />}
        </IconButton>
      </InputAdornment>
    )
  }
  const inputType = isSelect || (isPassword && isShowPwd) ? TEXT_FIELD_TYPE.TEXT : type
  return (
    <MaTextField
      classes={{
        root: classes.root,
      }}
      type={inputType}
      ref={ref}
      select={isSelect}
      value={value}
      SelectProps={selectProps}
      InputProps={InputProps}
      inputRef={inputRef}
      margin="normal"
      {...otherProps}
      onChange={onChange}
    >
      {children}
    </MaTextField>
  )
})

TextField.propTypes = {
  type: t.oneOf(['text', 'number', 'select', 'password']),
  children: t.node,
  readonly: t.bool,
  disabled: t.bool,
  multiline: t.bool,
  value: t.any,
  onChange: t.func,
}

TextField.defaultProps = {
  type: TEXT_FIELD_TYPE.TEXT,
  onChange: () => {},
}

TextField.displayName = 'VcTextField'

export default memo(TextField)
