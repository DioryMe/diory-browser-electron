import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const MenuItem = ({ onClick, children, ...props }) => (
  <Pane
    position="relative"
    color="grey"
    fontSize={12}
    padding={4}
    marginLeft={12}
    cursor="pointer"
    onClick={onClick}
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    overflow="hidden"
    {...props}
  >
    {children}
  </Pane>
)

MenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export { MenuItem }
