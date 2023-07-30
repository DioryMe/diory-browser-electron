import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const SideBar = ({ children, ...props }) => (
  <Pane
    background="tint2"
    position="absolute"
    top={0}
    right={0}
    bottom={0}
    display="flex"
    flexDirection="column"
    {...props}
  >
    {children}
  </Pane>
)

SideBar.propTypes = {
  children: PropTypes.node,
}

export default SideBar
