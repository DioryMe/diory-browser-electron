import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'evergreen-ui'

import { RoomDoor } from './RoomDoor'

const getHomeRoomId = ({ rooms }) => {
  const { id } = rooms['/']
  return id
}

const DiosphereView = ({ state, actions }) => (
  <Menu appearance="minimal">
    <RoomDoor roomId={getHomeRoomId(state)} actions={actions} state={state} />
  </Menu>
)

DiosphereView.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

export { DiosphereView }
