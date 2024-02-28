import React from 'react'
import PropTypes from 'prop-types'
import {
  ChevronRightIcon,
  ChevronDownIcon,
  BlankIcon,
  LogInIcon,
  PlusIcon,
  Pane,
  IconButton,
  Icon,
} from 'evergreen-ui'

const resolveIcon = ({ doors = [] }, open) => {
  if (!doors.length) {
    return <BlankIcon />
  }
  return open ? <ChevronDownIcon /> : <ChevronRightIcon />
}

const RoomButton = ({ icon, onClick, ...props }) => (
  <IconButton
    {...props}
    icon={icon}
    onClick={onClick}
    appearance="minimal"
    intent="success"
    alignSelf="right"
  />
)

RoomButton.propTypes = {
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
}

const RoomButtons = ({ room, isOpen, isInRoom, level, onToggle, onEnterRoom, onNewRoom }) => (
  <Pane
    display="flex"
    color="white"
    paddingLeft={(level + 1) * 8}
    background={isInRoom ? 'grey' : ''}
  >
    <Pane onClick={onToggle} flex={1} display="flex" alignItems="center" cursor="pointer">
      <Icon icon={resolveIcon(room, isOpen)} marginRight={8} />
      <Pane>{room.text || room.id}</Pane>
    </Pane>
    <Pane>
      <RoomButton icon={<LogInIcon />} onClick={() => onEnterRoom(room.id)} />
      <RoomButton icon={<PlusIcon />} onClick={() => onNewRoom(room.id)} marginRight={16} />
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
  onNewRoom: PropTypes.func.isRequired,
}

export { RoomButtons }
