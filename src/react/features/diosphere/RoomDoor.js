import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { RoomNavigation } from './RoomNavigation'

const RoomDoor = ({ roomId, level = 0, state, actions }) => {
  const room = state.rooms[roomId]

  const [isOpen, toggleOpen] = useState(state.openRooms.includes(roomId))
  if (!room) {
    return null
  }

  const { doors = [] } = room
  return (
    <>
      <RoomNavigation
        room={room}
        isOpen={isOpen}
        isInRoom={state.roomId === room.id}
        level={level}
        onToggle={() => toggleOpen((prev) => !prev)}
        {...actions}
      />

      {isOpen &&
        doors.map(({ id }) => (
          <RoomDoor
            key={id}
            roomId={id}
            level={level + 1}
            actions={actions}
            state={state}
            onToggle={toggleOpen}
          />
        ))}
    </>
  )
}

RoomDoor.propTypes = {
  level: PropTypes.number,
  roomId: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

export { RoomDoor }
