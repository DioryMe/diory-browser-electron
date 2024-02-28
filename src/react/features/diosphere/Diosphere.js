import React from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { selectRoom } from '../navigation/navigationActions'

import { DiosphereView } from './DiosphereView'

const useActions = () => {
  const { dispatch } = useDispatchActions()
  return {
    onEnterRoom: (id) => dispatch(selectRoom({ id })),
    onNewRoom: (id) => console.log('Create door to new room', id),
  }
}

const getParentIds = (roomId, rooms) => {
  const { id: homeRoomId } = rooms['/']
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

export const Diosphere = () => <DiosphereView state={useState()} actions={useActions()} />
