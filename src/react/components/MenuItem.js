import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const MenuItem = ({ isSelected, onClick, children }) => (
  <Pane display="flex" color={isSelected ? 'white' : 'grey'}>
    <Pane flex={1} display="flex" alignItems="center" cursor="pointer">
      <Pane onClick={onClick}>{children}</Pane>
    </Pane>
  </Pane>
)

MenuItem.propTypes = {
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export { MenuItem }
