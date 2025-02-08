import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'evergreen-ui'

import { useDispatchActions } from '../../store'

import NavigationButton from '../NavigationButton'
import { MenuItem } from '../MenuItem'

const DiographFavorites = ({ favorites, setStore, selectStory }) => {
  const { dispatch } = useDispatchActions()
  return (
    <Menu appearance="minimal">
      {Object.entries(favorites).map(([connection, { id, text }]) => (
        <MenuItem
          key={text}
          onClick={() => {
            dispatch(setStore(connection))
            dispatch(selectStory(id))
          }}
        >
          {text}
        </MenuItem>
      ))}
      <NavigationButton text="Add" image="plus" onClick={console.log} />
    </Menu>
  )
}

DiographFavorites.propTypes = {
  favorites: PropTypes.object,
  setStore: PropTypes.func,
  selectStory: PropTypes.func,
}

export default DiographFavorites
