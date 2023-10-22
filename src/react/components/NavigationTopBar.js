import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const NavigationTopBar = ({ children }) => (
  <Pane
    display="flex"
    justifyContent="space-between"
    padding={8}
    background="#222"
    zIndex={15}
    position="absolute"
    width="100%"
  >
    {children}
  </Pane>
)

NavigationTopBar.propTypes = {
  children: PropTypes.node,
}

export default NavigationTopBar
