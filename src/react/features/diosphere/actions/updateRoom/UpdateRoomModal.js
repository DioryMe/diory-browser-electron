import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { InputFields } from '../InputFields'
import { Modal } from '../../../modal/Modal'

import { roomFields } from '../roomFields'

const UpdateRoomModal = ({ title, room, onDone, onCancel }) => {
  const [roomValues, updateRoomValues] = useState(room)
  return (
    <Modal
      title={title}
      onDone={() => {
        onDone(roomValues)
        updateRoomValues({})
      }}
      onCancel={() => {
        onCancel()
        updateRoomValues({})
      }}
    >
      <InputFields fields={roomFields} values={roomValues} onChange={updateRoomValues} />
    </Modal>
  )
}

UpdateRoomModal.propTypes = {
  title: PropTypes.string.isRequired,
  room: PropTypes.object.isRequired,
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export { UpdateRoomModal }
