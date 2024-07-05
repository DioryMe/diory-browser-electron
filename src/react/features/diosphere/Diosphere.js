import React from 'react'
import { Menu, Pane } from 'evergreen-ui'

import { useDispatchActions } from '../../store'
import { useSideBar } from '../sideBar/useSideBar'
import { useDiosphere } from './useDiosphere'
import { useAddRoom } from './addRoom/useAddRoom'
import { useUpdateRoom } from './updateRoom/useUpdateRoom'

import { selectRoom } from '../navigation/navigationActions'

import { UpdateRoom } from './updateRoom/UpdateRoom'
import { AddRoom } from './addRoom/AddRoom'

import { Room } from './Room'
import NavigationButton from '../../components/NavigationButton'

const useActions = () => {
  const { dispatch } = useDispatchActions()
  const { toggleSideBar } = useSideBar('left')
  const { openAddRoomModal } = useAddRoom()
  const { openUpdateRoomModal } = useUpdateRoom()
  return {
    onEnterRoom: (id) => {
      dispatch(selectRoom({ id }))
      toggleSideBar()
    },
    openAddRoomModal,
    openUpdateRoomModal,
  }
}

export const Diosphere = () => {
  const { room, rooms } = useDiosphere()
  const actions = useActions()

  const selectedRoomId = room.id
  return selectedRoomId ? (
    <>
      <Pane id="left" height="100%" backgroundColor="#222" paddingLeft={24}>
        <Menu appearance="minimal">
          {Object.values(rooms).map((room) => (
            <Room key={room.id} room={room} isInRoom={selectedRoomId === room.id} {...actions} />
          ))}
        </Menu>
        <NavigationButton text="Add room" image="plus" onClick={actions.openAddRoomModal} />
      </Pane>
      <UpdateRoom />
      <AddRoom />
    </>
  ) : null
}
