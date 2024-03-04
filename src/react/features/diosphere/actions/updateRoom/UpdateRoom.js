import React from 'react'

import { useUpdateRoom } from './useUpdateRoom'
import { useDiosphere } from '../../useDiosphere'

import { UpdateRoomModal } from './UpdateRoomModal'

const UpdateRoom = () => {
  const { showModal, updateRoom, toggleModal } = useUpdateRoom()
  const { room } = useDiosphere()
  return showModal ? (
    <UpdateRoomModal title="Update room" room={room} onDone={updateRoom} onCancel={toggleModal} />
  ) : null
}

export { UpdateRoom }
