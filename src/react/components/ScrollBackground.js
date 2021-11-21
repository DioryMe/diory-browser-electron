import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'
import Fullscreen from './Fullscreen'

const ScrollBackground = ({ children, ...props }) => (
  <Fullscreen>
    <Pane
      data-testid="background"
      height="100%"
      display="flex"
      flexWrap="wrap"
      alignContent="flex-start"
      {...props}
    >
      {children}
    </Pane>
  </Fullscreen>
)

ScrollBackground.propTypes = {
  children: PropTypes.node,
}

export default ScrollBackground
