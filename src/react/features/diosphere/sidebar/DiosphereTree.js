import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Room } from './Room'

const DiosphereTree = ({ roomId, level = 0, diosphereState, actions }) => {
  const room = diosphereState.rooms[roomId]

  const [isOpen, toggleOpen] = useState(diosphereState.openRooms.includes(roomId))
  if (!room) {
    return null
  }

  const { doors = [] } = room
  return (
    <>
      <Room
        room={room}
        isOpen={isOpen}
        isInRoom={diosphereState.roomId === room.id}
        level={level}
        onToggle={() => toggleOpen((prev) => !prev)}
        {...actions}
      />

      {isOpen &&
        doors.map(({ id }) => (
          <DiosphereTree
            key={id}
            roomId={id}
            level={level + 1}
            actions={actions}
            diosphereState={diosphereState}
            onToggle={toggleOpen}
          />
        ))}
    </>
  )
}

DiosphereTree.propTypes = {
  level: PropTypes.number,
  roomId: PropTypes.string.isRequired,
  diosphereState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

export { DiosphereTree }
