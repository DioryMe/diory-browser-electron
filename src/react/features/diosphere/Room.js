import React from 'react'
import PropTypes from 'prop-types'
import {
  ChevronRightIcon,
  ChevronDownIcon,
  BlankIcon,
  Pane,
  Icon,
  IconButton,
  EditIcon,
} from 'evergreen-ui'

const resolveIcon = ({ doors = [] }, open) => {
  if (!doors.length) {
    return <BlankIcon />
  }
  return open ? <ChevronDownIcon /> : <ChevronRightIcon />
}

const Room = ({ room, isOpen, isInRoom, level, onToggle, onEnterRoom, openUpdateRoomModal }) => (
  <Pane display="flex" paddingLeft={(level + 1) * 8} color={isInRoom ? 'white' : 'grey'}>
    <Pane flex={1} display="flex" alignItems="center" cursor="pointer">
      {isOpen !== undefined && (
        <Icon icon={resolveIcon(room, isOpen)} marginRight={8} onClick={onToggle} />
      )}
      <Pane onClick={() => onEnterRoom(room.id)}>{room.text || room.id}</Pane>
    </Pane>
    <Pane>
      <IconButton
        icon={<EditIcon />}
        onClick={() => openUpdateRoomModal(room)}
        appearance="minimal"
        alignSelf="right"
      />
    </Pane>
  </Pane>
)

Room.propTypes = {
  room: PropTypes.object.isRequired,
  isInRoom: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool,
  level: PropTypes.number,
  onToggle: PropTypes.func,
  onEnterRoom: PropTypes.func.isRequired,
  openUpdateRoomModal: PropTypes.func.isRequired,
}

export { Room }
