import React from 'react'
import { Menu, Pane } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../store'
import { useSideBar } from '../sideBar/useSideBar'

import { selectRoom } from '../navigation/navigationActions'
import { getHomeRoomId } from './utils/getHomeRoomId'

import { UpdateRoom } from './actions/updateRoom/UpdateRoom'
import { AddRoom } from './actions/addRoom/AddRoom'

import NavigationButton from '../../components/NavigationButton'
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

export const Diosphere = () => {
  const actions = useActions()
  const { roomId } = useSelector((state) => state.navigation)
  const { rooms } = useSelector((state) => state.diosphere)
  return roomId ? (
    <>
      <Pane id="left" left={0} top={0} height="100%" backgroundColor="#222">
        <NavigationButton text="ROOMS" />
        <Menu appearance="minimal">
          <DiosphereTree
            roomId={getHomeRoomId(rooms)}
            selectedRoomId={roomId}
            rooms={rooms}
            actions={actions}
          />
        </Menu>
      </Pane>
      <UpdateRoom />
      <AddRoom />
    </>
  ) : null
}
