/* eslint-disable react/prop-types */
import React from 'react'

const Button = ({ onClick, children }) => {
  console.log('render Button: ', children)
  return (
    <button onClick={onClick}>{children}</button>
  )
}

export default React.memo(Button)