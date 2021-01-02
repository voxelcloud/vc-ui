import React from 'react'
import t from 'prop-types'
import MaButton from '@material-ui/core/Button'

const Button = ({ children, ...props }) => {
  return <MaButton variant="contained" color="primary" {...props}>
    {children}
  </MaButton>
}


Button.propTypes = {
  type: t.oneOf(['primary', 'secondary']),
  children: t.node
}

export default Button