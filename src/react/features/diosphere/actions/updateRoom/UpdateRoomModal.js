import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

import { InputFields } from '../InputFields'
import { Modal } from '../../../modal/Modal'

import { roomFields } from '../roomFields'
import { invokeChannel } from '../../../../client/client'

const addConnection = async () => {
  const { filePaths } = await invokeChannel('showOpenDialog')
  return { id: uuid(), address: filePaths[0], client: 'LocalClient' }
}

const UpdateRoomModal = ({ title, room, onDone, onCancel }) => {
  const [roomValues, updateRoomValues] = useState(structuredClone(room))
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
      <InputFields
        fields={roomFields}
        values={roomValues}
        onChange={updateRoomValues}
        onAdd={addConnection}
      />
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
