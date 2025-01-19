import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const NavigationBar = ({ children, ...props }) => (
  <Pane
    display="flex"
    justifyContent="space-between"
    padding={8}
    background="#222"
    zIndex={15}
    position="absolute"
    width="100%"
    {...props}
  >
    {children}
  </Pane>
)

NavigationBar.propTypes = {
  children: PropTypes.node,
}

export default NavigationBar
