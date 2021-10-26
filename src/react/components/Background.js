import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const Background = ({ children, ...props }) => (
  <Pane height="100%" display="flex" flexWrap="wrap" alignContent="flex-start" {...props}>
    {children}
  </Pane>
)

Background.propTypes = {
  children: PropTypes.node,
}

export default Background
