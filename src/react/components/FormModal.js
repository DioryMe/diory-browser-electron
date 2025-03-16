import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import TextInput from './TextInput'
import { Modal } from '../features/modal/Modal'
import Button from './Button'
import { invokeChannel } from '../client/client'

const useUpdatedValues = (oldValues = {}) => {
  const [newValues, setNewValues] = useState({})

  const updatedValues = { ...oldValues, ...newValues }
  return {
    setValue: (key, value) => setNewValues({ ...newValues, [key]: value }),
    updatedValues,
    resetView: () => setNewValues({}),
  }
}

const useOpenDialog = () => async () => {
  const { filePaths } = await invokeChannel('showOpenDialog')
  return filePaths[0]
}

const FormModal = ({ title, values, fields, onDone, onCancel }) => {
  const { setValue, updatedValues, resetView } = useUpdatedValues(values)
  const openDialog = useOpenDialog()
  return (
    <Modal
      title={title}
      onDone={() => {
        onDone(updatedValues)
        resetView()
      }}
      onCancel={() => {
        onCancel()
        resetView()
      }}
    >
      {fields.map(({ key, ...field }) => (
        <Fragment key={key}>
          <TextInput
            {...field}
            onChange={(value) => setValue(key, value)}
            value={updatedValues[key]}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                onDone(updatedValues)
                resetView()
                event.preventDefault()
              }
            }}
          />
          {field.format === 'dialog' && (
            <Button
              data={{ icon: 'plus' }}
              onClick={async () => {
                const filePath = await openDialog()
                setValue(key, filePath)
              }}
            />
          )}
        </Fragment>
      ))}
    </Modal>
  )
}

FormModal.defaultProps = {
  title: '',
  values: {},
  fields: [],
  onDone: () => {},
  onCancel: () => {},
}

FormModal.propTypes = {
  title: PropTypes.string,
  values: PropTypes.object,
  fields: PropTypes.array,
  onDone: PropTypes.func,
  onCancel: PropTypes.func,
}

export { FormModal }
