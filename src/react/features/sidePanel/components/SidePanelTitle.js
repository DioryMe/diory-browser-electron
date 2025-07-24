import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from '../../../components/MenuItem'

const SidePanelTitle = ({ diory, amount, isSelected, onClick }) => (
  <MenuItem
    diory={diory}
    amount={amount}
    isSelected={isSelected}
    marginTop={4}
    marginBottom={4}
    onClick={onClick}
  />
)

SidePanelTitle.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  amount: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
}

export { SidePanelTitle }
