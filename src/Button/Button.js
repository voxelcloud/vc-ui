import React, { memo } from 'react'
import t from 'prop-types'
import MaButton from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '../Icon'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useButtonStyles = makeStyles({
  root: {
    height: '36px',
    padding: '0 16px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme => theme?.palette?.action.hover,
    }
  },
  contained: {
    color: theme => theme?.palette?.primary.contrastText,
    boxShadow: 'none',
    '&:hover': {
      background: theme => theme?.palette?.primary.main,
    },
  },
  startIcon: {
    display: 'unset',
  },
  endIcon: {
    display: 'unset',
  },
  highLight: {
    color: theme => theme?.palette?.text.secondary,
    '&:hover': {
      background: 'unset !important',
      color: theme => theme?.palette?.primary.main,
    },
    '&.MuiButton-contained': {
      background: 'unset',
      color: theme => theme?.palette?.text.secondary,
      '&:hover': {
        background: theme => theme?.palette?.action.hover,
        color: theme => theme?.palette?.primary.main,
        boxShadow: 'none',
      },
      '&:disabled': {
        color: theme => theme?.palette?.action.disabled,
      },
    },
  },
  superEmphasis: {
    color: theme => theme?.palette?.text.secondary,
    '&:hover': {
      backgroundColor: theme => theme?.palette?.action.hover,
      color: theme => theme?.palette?.primary.main,
    }
  }
})

const useIconButtonStyles = makeStyles({
  root: {
    width: '40px',
    height: '40px',
    '&:hover': {
      color: theme => theme?.palette?.primary.main,
    },
    '& .iconfont': {
      fontSize: '24px',
    }
  },
  contained: {
    backgroundColor: theme => theme?.palette?.action?.hover,
    '&:hover': {
      backgroundColor: theme => theme?.palette?.primary?.main,
      color: theme => theme?.palette?.primary?.contrastText,
    },
  },
  highLight: {
    color: theme => theme?.palette?.text?.secondary,
    '&:hover': {
      background: 'unset',
    },
    '&:disabled': {
      backgroundColor: theme => theme?.palette?.action?.disabledBackground,
    },
  },
  superEmphasis: {
    color: theme => theme?.palette?.text.secondary,
    '&:hover': {
      backgroundColor: theme => theme?.palette?.action.hover,
      color: theme => theme?.palette?.primary.main,
    }
  }
})

const Button = React.forwardRef(function Button({
  type, classes, children, className, emphasis, superEmphasis, variant, iconName, iconClassName, ...otherProps
}, ref) {
  const { root, ...restClasses } = classes || {}
  const theme = useTheme()
  if (type === 'icon') {
    const customClasses = useIconButtonStyles(theme)
    return (
      <IconButton
        classes={{
          root: clsx(customClasses.root, root),
          ...restClasses
        }}
        className={clsx(
          className,
          variant === 'contained' && customClasses.contained,
          emphasis && customClasses.highLight,
          superEmphasis && customClasses.superEmphasis
        )}
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
        root: clsx(customClasses.root, root),
        contained: customClasses.contained,
        text: customClasses.text,
        startIcon: customClasses.startIcon,
        endIcon: customClasses.endIcon,
        ...restClasses
      }}
      className={clsx(
        className,
        emphasis && customClasses.highLight,
        superEmphasis && customClasses.superEmphasis
      )}
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
  superEmphasis: t.bool,
  variant: t.oneOf(['contained', 'outlined', 'text']),
  iconName: t.string,
  iconClassName: t.string,
}

Button.defaultProps = {
  classes: {},
  type: 'primary',
  color: 'primary',
  variant: 'text'
}

Button.displayName = 'VcButton'

export default memo(Button)