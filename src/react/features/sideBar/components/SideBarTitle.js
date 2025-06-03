import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from '../../../components/MenuItem'

const SideBarTitle = ({ id, text, amount, isSelected, onClick }) => (
  <MenuItem
    text={text ? text.toUpperCase() : ''}
    amount={amount}
    isSelected={isSelected}
    marginTop={4}
    marginBottom={4}
    onClick={() => onClick && onClick({ id })}
  />
)

SideBarTitle.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  amount: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
}

export { SideBarTitle }
