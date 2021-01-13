import React, { memo } from 'react'
import t from 'prop-types'
import MaButton from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '../Icon'
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
  startIcon: {
    display: 'unset',
  },
  endIcon: {
    display: 'unset',
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
  type, classes, children, className, emphasis, variant, iconName, iconClassName, ...otherProps
}, ref) {

  const theme = useTheme()

  if (type === 'icon') {
    const customClasses = useIconButtonStyles(theme)
    return (
      <IconButton
        classes={{
          root: customClasses.root,
          ...classes
        }}
        className={`${className} ${variant === 'contained' && customClasses.contained} ${emphasis && customClasses.highLight}`}
        ref={ref}
        {...otherProps}
      >
        <Icon name={iconName} className={iconClassName} />
      </IconButton>
    )
  }
  const customClasses = useButtonStyles(theme)
  return (
    <MaButton
      classes={{
        root: customClasses.root,
        contained: customClasses.contained,
        text: customClasses.text,
        startIcon: customClasses.startIcon,
        endIcon: customClasses.endIcon,
        ...classes
      }}
      className={`${className} ${emphasis && customClasses.highLight}`}
      ref={ref}
      variant={variant}
      {...otherProps}
    >
      {children}
    </MaButton>
  )
})

Button.propTypes = {
  type: t.oneOf(['primary', 'icon']),
  classes: t.object,
  children: t.node,
  className: t.string,
  emphasis: t.bool,
  variant: t.oneOf(['contained', 'outlined', 'text']),
  iconName: t.string,
  iconClassName: t.string,
}

Button.defaultProps = {
  type: 'primary',
  color: 'primary',
  variant: 'text'
}

Button.displayName = 'VcButton'

export default memo(Button)