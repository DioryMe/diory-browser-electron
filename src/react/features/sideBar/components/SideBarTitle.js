import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from '../../../components/MenuItem'

const SideBarTitle = ({ diory, onClick }) => (
  <MenuItem marginTop={4} marginBottom={4} onClick={() => onClick({ diory })}>
    {diory.text ? diory.text.toUpperCase() : ''}
  </MenuItem>
)

SideBarTitle.propTypes = {
  diory: PropTypes.object,
  onClick: PropTypes.func,
}

export { SideBarTitle }
