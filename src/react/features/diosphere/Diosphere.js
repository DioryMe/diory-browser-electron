import React from 'react'
import { Menu } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../store'
import { useSideBar } from '../sideBar/useSideBar'

import { selectRoom } from '../navigation/navigationActions'
import { getHomeRoomId } from './utils/getHomeRoomId'
import { getParentIds } from './utils/getParentIds'

import { UpdateRoom } from './actions/updateRoom/UpdateRoom'
import { AddRoom } from './actions/addRoom/AddRoom'
import SideBar from '../sideBar/SideBar'
import { DiosphereTree } from './sidebar/DiosphereTree'

const useActions = () => {
  const { dispatch } = useDispatchActions()
  const { toggleSideBar } = useSideBar('left')
  return {
    onEnterRoom: (id) => {
      dispatch(selectRoom({ id }))
      toggleSideBar()
    },
  }
}

const useDiosphereState = () => {
  const { roomId } = useSelector((state) => state.navigation)
  const { rooms } = useSelector((state) => state.diosphere)
  const rootId = getHomeRoomId(rooms)
  return {
    rootId,
    roomId,
    rooms,
    openRooms: getParentIds(rootId, roomId, rooms),
  }
}

export const Diosphere = () => {
  const actions = useActions()
  const diosphereState = useDiosphereState()
  const roomId = diosphereState.rootId
  return roomId ? (
    <>
      <SideBar id="left" left={0} top={48} width={300} backgroundColor="#222">
        <Menu appearance="minimal">
          <DiosphereTree roomId={roomId} diosphereState={diosphereState} actions={actions} />
        </Menu>
      </SideBar>
      <UpdateRoom />
      <AddRoom />
    </>
  ) : null
}
