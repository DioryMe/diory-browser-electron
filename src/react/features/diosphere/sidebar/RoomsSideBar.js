import React from 'react'
import { Menu } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../../store'

import { selectRoom } from '../../navigation/navigationActions'

import SideBar from '../../sideBar/SideBar'
import { RoomDoor } from './RoomDoor'
import { useSideBar } from '../../sideBar/useSideBar'

const useActions = () => {
  const { dispatch } = useDispatchActions()
  return {
    onEnterRoom: (id) => dispatch(selectRoom({ id })),
  }
}

const getHomeRoomId = (rooms = {}) => {
  const { id } = rooms['/'] || {}
  return id
}

const getParentIds = (roomId, rooms) => {
  if (!rooms.length) {
    return []
  }

  const homeRoomId = getHomeRoomId(rooms)
  if (roomId === homeRoomId) {
    return []
  }

  const parentId = Object.entries(rooms).find(([, { doors = [] }]) =>
    doors.some(({ id }) => id === roomId)
  )[0]

  return [parentId].concat(getParentIds(parentId, rooms))
}

const useState = () => {
  const { roomId } = useSelector((state) => state.navigation)
  const { rooms } = useSelector((state) => state.diosphere)
  return {
    rooms,
    roomId,
    openRooms: getParentIds(roomId, rooms),
  }
}

export const RoomsSideBar = () => {
  const { showSideBar } = useSideBar('left')
  const state = useState()
  const actions = useActions()
  const roomId = getHomeRoomId(state.rooms)
  return showSideBar ? (
    <SideBar id="left" left={0} top={48} width={300} backgroundColor="#222">
      <Menu appearance="minimal">
        <RoomDoor roomId={roomId} actions={actions} state={state} />
      </Menu>
    </SideBar>
  ) : null
}
