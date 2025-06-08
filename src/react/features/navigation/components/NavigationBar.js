import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const NavigationBar = ({ side, children, ...props }) => (
  <Pane
    zIndex={10}
    flex="0 0 44px"
    display="flex"
    background="#222"
    padding={8}
    justifyContent={side || 'space-between'}
    {...props}
  >
    {children}
  </Pane>
)

NavigationBar.propTypes = {
  children: PropTypes.node,
}

export { NavigationBar }
