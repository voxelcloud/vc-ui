import React, { memo } from 'react'
import t from 'prop-types'
import MaButton from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { useTheme, makeStyles } from '@material-ui/core/styles'

const useButtonStyles = makeStyles({
  root: {
    height: '36px',
    minWidth: '88px',
    padding: '0 16px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme => theme.palette.action.hover,
    }
  },
  contained: {
    color: theme => theme.palette.primary.contrastText,
    boxShadow: 'none',
    '&:hover': {
      background: theme => theme.palette.primary.main,
    },
  },
  highLight: {
    color: theme => theme.palette.text.secondary,
    '&:hover': {
      background: 'unset !important',
      color: theme => theme.palette.primary.main,
    },
    '&.MuiButton-contained': {
      background: 'unset',
      color: theme => theme.palette.text.secondary,
      '&:hover': {
        background: theme => theme.palette.action.hover,
        color: theme => theme.palette.primary.main,
        boxShadow: 'none',
      },
      '&:disabled': {
        color: theme => theme.palette.action.disabled,
      },
    },
  }
})

const useIconButtonStyles = makeStyles({
  root: {
    width: '40px',
    height: '40px',
    '&:hover': {
      color: theme => theme.palette.primary.main,
    },
    '& .iconfont': {
      fontSize: '24px',
    }
  },
  contained: {
    backgroundColor: theme => theme.palette.action.hover,
    '&:hover': {
      backgroundColor: theme => theme.palette.primary.main,
      color: theme => theme.palette.primary.contrastText,
    },
  },
  highLight: {
    color: theme => theme.palette.text.secondary,
    '&:hover': {
      background: 'unset',
    },
    '&:disabled': {
      backgroundColor: theme => theme.palette.action.disabledBackground,
    },
  }
})

const Button = React.forwardRef(function Button({
  type, children, className, emphasis, variant, icon, startIcon, endIcon, ...otherProps
}, ref) {

  const theme = useTheme()

  if (type === 'icon') {
    const classes = useIconButtonStyles(theme)
    return (
      <IconButton
        classes={{
          root: classes.root,
        }}
        className={`${className} ${variant === 'contained' && classes.contained} ${emphasis && classes.highLight}`}
        ref={ref}
        {...otherProps}
      >
        <i className={`icon iconfont ${icon}`} />
      </IconButton>
    )
  }
  const classes = useButtonStyles(theme)
  return (
    <MaButton
      classes={{
        root: classes.root,
        contained: classes.contained,
        text: classes.text,
      }}
      className={`${className} ${emphasis && classes.highLight}`}
      ref={ref}
      variant={variant}
      startIcon={<i className={`icon iconfont ${startIcon}`} />}
      endIcon={<i className={`icon iconfont ${endIcon}`} />}
      {...otherProps}
    >
      {children}
    </MaButton>
  )
})

Button.propTypes = {
  type: t.oneOf(['primary', 'icon']),
  children: t.node,
  className: t.string,
  emphasis: t.bool,
  variant: t.oneOf(['contained', 'outlined', 'text']),
  icon: t.string,
  startIcon: t.string,
  endIcon: t.string,
}

Button.defaultProps = {
  type: 'primary',
  color: 'primary',
  variant: 'text'
}

Button.displayName = 'VcButton'

export default memo(Button)