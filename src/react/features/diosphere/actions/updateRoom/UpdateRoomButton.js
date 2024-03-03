import React from 'react'
import PropTypes from 'prop-types'

import { useUpdateRoom } from './useUpdateRoom'

import { RoomButton } from '../RoomButton'

import { buttons } from './buttons'

const UpdateRoomButton = ({ room }) => {
  const { openUpdateRoomModal } = useUpdateRoom()

  return (
    <>
      {buttons.map((button) => (
        <RoomButton key={button.id} {...button} onClick={() => openUpdateRoomModal(room)} />
      ))}
    </>
  )
}

UpdateRoomButton.propTypes = {
  room: PropTypes.object.isRequired,
}

export { UpdateRoomButton }
