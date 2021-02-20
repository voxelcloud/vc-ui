/* eslint-disable react/prop-types */
import * as React from 'react'
import usePreviousProps from './index'

const Child = (props) => {
  const previousProps = usePreviousProps(props)
  if (previousProps.value !== props.value) {
    console.log('changed')
  } else {
    console.log('not changed')
  }
  return (
    <div>
      <p>previous: {JSON.stringify(previousProps)}</p>
      <p>current: {JSON.stringify(props)}</p>
    </div>
  )
}

export default Child