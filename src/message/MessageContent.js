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
    minWidth: '528px',
    maxWidth: '900px',
    width: 'fit-content',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '4px',
    backgroundColor: 'rgb(69,79,91)',
    padding: '10px 16px',
    fontSize: '16px',
    lineHeight: '1.5em',
    color: theme => theme?.palette?.primary?.contrastText,
    boxShadow: '0 9px 46px rgba(0, 0, 0, 0.14), 0 24px 38px rgba(0, 0, 0, 0.18), 0 11px 15px rgba(0, 0, 0, 0.24)',
    zIndex: '999',
  },
  contain: {
    display: 'flex',
    alignItems: 'center',
    wordBreak: 'break-word'
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
    marginRight: '10px',
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