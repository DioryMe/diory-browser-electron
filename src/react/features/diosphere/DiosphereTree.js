import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Room } from './Room'
import { getParentIds } from './utils/getParentIds'

const DiosphereTree = ({ roomId, level = -1, selectedRoomId, rooms, actions }) => {
  const parentIds = getParentIds(selectedRoomId, rooms)
  const [isOpen, toggleOpen] = useState(parentIds.includes(roomId))

  const room = rooms[roomId]
  if (!room) {
    return null
  }

  const { doors = [] } = room
  return (
    <>
      <Room
        room={room}
        isOpen={isOpen}
        isInRoom={selectedRoomId === room.id}
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
            selectedRoomId={selectedRoomId}
            rooms={rooms}
            onToggle={toggleOpen}
          />
        ))}
    </>
  )
}

DiosphereTree.propTypes = {
  level: PropTypes.number,
  roomId: PropTypes.string.isRequired,
  selectedRoomId: PropTypes.string.isRequired,
  rooms: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

export { DiosphereTree }
