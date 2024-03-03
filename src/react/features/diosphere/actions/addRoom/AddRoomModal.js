import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../modal/Modal'
import { InputFields } from '../InputFields'

import { roomFields } from '../roomFields'

const AddRoomModal = ({ title, onDone, onCancel }) => {
  const [roomValues, updateRoomValues] = useState({})
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

AddRoomModal.propTypes = {
  title: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export { AddRoomModal }
