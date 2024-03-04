import React from 'react'

import { RoomsSideBar } from './sidebar/RoomsSideBar'
import { UpdateRoom } from './actions/updateRoom/UpdateRoom'
import { AddRoom } from './actions/addRoom/AddRoom'

export const Diosphere = () => (
  <>
    <RoomsSideBar />
    <UpdateRoom />
    <AddRoom />
  </>
)
