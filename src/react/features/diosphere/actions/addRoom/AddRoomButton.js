import React from 'react'
import PropTypes from 'prop-types'

import { useAddRoom } from './useAddRoom'

import { RoomButton } from '../RoomButton'

import { buttons } from './buttons'

const AddRoomButton = ({ room }) => {
  const { openAddRoomModal } = useAddRoom()

  return (
    <>
      {buttons.map((button) => (
        <RoomButton key={button.id} {...button} onClick={() => openAddRoomModal(room)} />
      ))}
    </>
  )
}

AddRoomButton.propTypes = {
  room: PropTypes.object.isRequired,
}

export { AddRoomButton }
