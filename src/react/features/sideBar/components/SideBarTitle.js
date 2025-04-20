import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from '../../../components/MenuItem'

const SideBarTitle = ({ diory, onClick }) => (
  <MenuItem
    text={diory.text ? diory.text.toUpperCase() : ''}
    marginTop={4}
    marginBottom={4}
    onClick={() => onClick({ diory })}
  />
)

SideBarTitle.propTypes = {
  diory: PropTypes.object,
  onClick: PropTypes.func,
}

export { SideBarTitle }
