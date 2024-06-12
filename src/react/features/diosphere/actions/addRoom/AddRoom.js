import React from 'react'

import { useAddRoom } from './useAddRoom'
import { UpdateRoomModal } from '../updateRoom/UpdateRoomModal'

const AddRoom = () => {
  const { showModal, addRoom, toggleModal } = useAddRoom()
  return showModal ? (
    <UpdateRoomModal title="Add room" onDone={addRoom} onCancel={toggleModal} />
  ) : null
}

export { AddRoom }
