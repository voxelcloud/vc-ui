import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import t from 'prop-types'
import Icon from './Icon'
import Button from './Button'
import { getTheme } from '../theme'
import clsx from 'clsx'

const useMsgContentStyles = makeStyles({
  message: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    minWidth: '33rem',
    maxWidth: '56.25rem',
    width: 'fit-content',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '0.25rem',
    backgroundColor: 'rgb(69,79,91)',
    padding: '0.625rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5em',
    color: theme => theme?.palette?.primary?.contrastText,
    boxShadow: '0 0.5625rem 2.875rem rgba(0, 0, 0, 0.14), 0 1.5rem 2.375rem rgba(0, 0, 0, 0.18), 0 0.6875rem 0.9375rem rgba(0, 0, 0, 0.24)',
    zIndex: '999',
  },
  contain: {
    display: 'flex',
    alignItems: 'center',
    wordBreak: 'break-word',
  },
  actionBtn: {
    display: 'flex',
    flexShrink: '0',
    alignItems: 'center',
  },
  clear: {
    cursor: 'pointer',
  },
  rightBtn: {
    color: theme => theme?.palette?.primary?.light,
  },
  leftIcon: {
    marginRight: '0.625rem',
  }
})

const MessageContent = ({
  type, style, noticeIconName, noticeIconClassName, content, closable,
  expandActions, closeNotice, removeNotice,
}) => {
  const theme = getTheme()
  const customClasses = useMsgContentStyles(theme)
  const expandClick = (e, onClick) => {
    if (onClick) {
      onClick(e)
    }
    removeNotice()
  }

  return (
    <div style={style} className={customClasses.message}>
      <div className={customClasses.contain}>
        {
          noticeIconName || noticeIconClassName ? (
            <Icon color={type} name={noticeIconName} className={clsx(customClasses.leftIcon, noticeIconClassName)} />
          ) : null
        }
        <span>{content}</span>
      </div>
      <div className={customClasses.actionBtn}>
        {
          Array.isArray(expandActions) ? expandActions.map((action, index) => (
            <Button
              key={index}
              className={customClasses.rightBtn}
              startIcon={<Icon name={action?.iconName} className={action?.iconClassName} />}
              onClick={e => expandClick(e, action.onClick)}
            >
              {action.text}
            </Button>
          )) : expandActions
        }
        {
          closable && <Icon className={customClasses.clear} name="close" onClick={closeNotice} />
        }
      </div>
    </div>
  )
}

MessageContent.propTypes = {
  type: t.oneOf(['primary', 'secondary', 'warning', 'error', 'disabled', 'success', 'info', 'text']),
  style: t.object,
  noticeIconName: t.string,
  noticeIconClassName: t.string,
  content: t.string,
  closable: t.bool,
  expandActions: t.any,
  removeNotice: t.func,
  closeNotice: t.func,
}

MessageContent.defaultProps = {
  style: {},
  closable: true,
}

MessageContent.displayName = 'VcMessageContent'

export default MessageContent