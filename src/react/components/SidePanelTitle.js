import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from './MenuItem'

const SidePanelTitle = ({ diory, isSelected, onClick }) => (
  <MenuItem
    diory={diory}
    isSelected={isSelected}
    marginTop={4}
    marginBottom={4}
    onClick={onClick}
  />
)

SidePanelTitle.propTypes = {
  diory: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
}

export { SidePanelTitle }
