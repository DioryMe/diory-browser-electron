import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'evergreen-ui'

import NavigationButton from '../NavigationButton'
import { MenuItem } from '../MenuItem'

const DiographLinks = ({ links, onClick }) => (
  <Menu appearance="minimal">
    {links.map(({ key, text }) => (
      <MenuItem
        key={text}
        onClick={() => onClick({ key })}
      >
        {text}
      </MenuItem>
    ))}
    <NavigationButton text="Add" image="plus" onClick={console.log} />
  </Menu>
)

DiographLinks.propTypes = {
  links: PropTypes.array,
  onClick: PropTypes.func,
}

export { DiographLinks }
