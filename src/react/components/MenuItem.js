import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const MenuItem = ({ onClick, children }) => (
  <Pane
    position="relative"
    color="grey"
    fontSize={12}
    padding={4}
    marginLeft={8}
    cursor="pointer"
    onClick={onClick}
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    overflow="hidden"
  >
    {children}
  </Pane>
)

MenuItem.propTypes = {
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export { MenuItem }
