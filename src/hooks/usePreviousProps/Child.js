/* eslint-disable react/prop-types */
import * as React from 'react'
import usePreviousProps from './index'

const Child = ({ value }) => {
  const previousValue = usePreviousProps(value)
  if (previousValue !== value) {
    console.log('changed')
  } else {
    console.log('not changed')
  }
  return (
    <div>
      <p>previous: {JSON.stringify(previousValue)}</p>
      <p>current: {JSON.stringify(value)}</p>
    </div>
  )
}

export default Child