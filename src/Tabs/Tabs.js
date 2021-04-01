import React, { useState, useCallback, useRef, useEffect, forwardRef } from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import t from 'prop-types'

const useTabsStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  containRoot: {
    display: 'inline-flex',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, .08)',
    borderRadius: '18px',
  }
}))
const useIndicatorStyle = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    height: '36px',
    borderRadius: '18px',
    transition: 'all 300ms cubic-bezier(0.7, 0, 0, .8)',
    backgroundColor: theme.palette.primary.main,
    zIndex: '0',
  }
}))

const Indicator = React.memo(function Indicator(props) {
  const indicatorClasses = useIndicatorStyle()
  // eslint-disable-next-line react/prop-types
  const { style, className } = props
  return <div className={clsx(indicatorClasses.root, className)} style={style} />
})

const Tabs = forwardRef((props, ref) => {
  const { children, value, classes, className, onChange = () => {} } = props
  const theme = useTheme()
  const tabClasses = useTabsStyles(theme)
  const tabsListRef = useRef(null)
  let valueToIndex = new Map()
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const getTabMate = () => {
    let tabMeta
    let containNode = tabsListRef.current
    if (containNode && value) {
      let tabsList = containNode.children
      if (children.length > 0) {
        const tab = tabsList[valueToIndex.get(value)]
        if (tab) {
          const rect = tab.getBoundingClientRect()
          tabMeta = {
            width: rect.width,
            offsetLeft: tab.offsetLeft
          }
        }
      }
    }
    return tabMeta
  }
  const updateIndicatorStyle = useCallback(() => {
    const tabMeta = getTabMate()
    setIndicatorStyle(state => ({
      ...state,
      left: tabMeta?.offsetLeft,
      width: tabMeta?.width
    }))
  }, [value])
  useEffect(() => {
    updateIndicatorStyle()
  }, [updateIndicatorStyle])
  const handleChange = useCallback((...args) => {
    typeof onChange === 'function' && onChange(...args)
  }, [onChange])

  let childIndex = 0
  const childrenRender = React.Children.map(children, child => {
    if (!React.isValidElement(child)){
      return
    }
    const { props: childProps } = child
    const childValue = childProps.value === undefined ? childIndex : childProps.value
    const selected = value === childValue
    valueToIndex.set(childValue, childIndex)
    childIndex += 1
    const newProps = {
      ...childProps,
      value: childValue,
      _selected: selected,
      _handleSelect: handleChange,
    }
    return React.cloneElement(child, newProps, child.children)
  })
  const rootClasses = clsx('vc-tabs', tabClasses.root, classes.root, className)
  return <div className={rootClasses} ref={ref}>
    <div className={clsx(tabClasses.containRoot)} ref={tabsListRef}>
      {childrenRender}
    </div>
    <Indicator className={classes.indicator} style={{...indicatorStyle}} />
  </div>
})

Tabs.propTypes = {
  value: t.string,
  children: t.oneOfType([
    t.arrayOf(t.node),
    t.node
  ]),
  classes: t.object,
  className: t.string,
  onChange: t.func,
}

Tabs.defaultProps = {
  value: '',
  classes: {
    root: '',
    indicator: '',
  },
  className: '',
  onChange: () => {},
}

Tabs.displayName = 'VcTabs'

export default Tabs