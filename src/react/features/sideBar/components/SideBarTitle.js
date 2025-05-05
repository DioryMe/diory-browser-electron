import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from '../../../components/MenuItem'

const SideBarTitle = ({ id, text, isSelected, onClick }) => (
  <MenuItem
    text={text ? text.toUpperCase() : ''}
    isSelected={isSelected}
    marginTop={4}
    marginBottom={4}
    onClick={() => onClick({ id })}
  />
)

SideBarTitle.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
}

export { SideBarTitle }
