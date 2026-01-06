import React from 'react'
import PropTypes from 'prop-types'
import { MenuItem } from './MenuItem'

const formatTextToUpperCase = (text) => (text ? text.toUpperCase() : '')

const MenuTitle = ({ diory = {}, onClick }) => (
  <MenuItem
    diory={{ ...diory, text: formatTextToUpperCase(diory.text) }}
    marginTop={4}
    marginBottom={4}
    alignSelf="start"
    onClick={onClick}
  />
)

MenuTitle.propTypes = {
  diory: PropTypes.object,
  onClick: PropTypes.func,
}

export { MenuTitle }
