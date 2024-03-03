import React from 'react'
import PropTypes from 'prop-types'
import { ChevronRightIcon, ChevronDownIcon, BlankIcon, Pane, Icon } from 'evergreen-ui'

import { UpdateRoomButton } from '../actions/updateRoom/UpdateRoomButton'
import { AddRoomButton } from '../actions/addRoom/AddRoomButton'

const resolveIcon = ({ doors = [] }, open) => {
  if (!doors.length) {
    return <BlankIcon />
  }
  return open ? <ChevronDownIcon /> : <ChevronRightIcon />
}

const RoomButtons = ({ room, isOpen, isInRoom, level, onToggle, onEnterRoom }) => (
  <Pane
    display="flex"
    color="white"
    paddingLeft={(level + 1) * 8}
    background={isInRoom ? 'grey' : ''}
  >
    <Pane flex={1} display="flex" alignItems="center" cursor="pointer">
      <Icon icon={resolveIcon(room, isOpen)} marginRight={8} onClick={onToggle} />
      <Pane onClick={() => onEnterRoom(room.id)}>{room.text || room.id}</Pane>
    </Pane>
    <Pane>
      <AddRoomButton room={room} />
      <UpdateRoomButton room={room} />
    </Pane>
  </Pane>
)

RoomButtons.propTypes = {
  room: PropTypes.object.isRequired,
  isInRoom: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEnterRoom: PropTypes.func.isRequired,
}

export { RoomButtons }
