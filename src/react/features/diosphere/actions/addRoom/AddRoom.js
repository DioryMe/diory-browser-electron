import React from 'react'

import { useAddRoom } from './useAddRoom'
import { AddRoomModal } from './AddRoomModal'

const AddRoom = () => {
  const { showModal, addRoom, toggleModal } = useAddRoom()
  return showModal ? (
    <AddRoomModal title="Add room" onDone={addRoom} onCancel={toggleModal} />
  ) : null
}

export { AddRoom }
