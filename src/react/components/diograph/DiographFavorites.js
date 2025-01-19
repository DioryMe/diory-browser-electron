import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'evergreen-ui'

import { useDispatchActions } from '../../store'

import NavigationButton from '../NavigationButton'
import { MenuItem } from '../MenuItem'

const DiographFavorites = ({ favorites, selectStory }) => {
  const { dispatch } = useDispatchActions()
  return (
    <Menu appearance="minimal">
      {favorites.map(({ id, text }) => (
        <MenuItem key={text} onClick={() => dispatch(selectStory({ id }))}>
          {text}
        </MenuItem>
      ))}
      <NavigationButton text="Add" image="plus" onClick={console.log} />
    </Menu>
  )
}

DiographFavorites.propTypes = {
  favorites: PropTypes.array,
  selectStory: PropTypes.func,
}

export default DiographFavorites
