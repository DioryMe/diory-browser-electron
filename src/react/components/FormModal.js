import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Modal from './Modal'
import TextInput from './TextInput'

const useUpdatedValues = (oldValues = {}) => {
  const [newValues, setNewValues] = useState({})

  const updatedValues = { ...oldValues, ...newValues }
  return {
    setValue: (key, value) => setNewValues({ ...newValues, [key]: value }),
    updatedValues,
    resetView: () => setNewValues({}),
  }
}

const FormModal = ({ title, values, fields, onDone, onCancel }) => {
  const { setValue, updatedValues, resetView } = useUpdatedValues(values)

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
      {fields.map(({ key, label, format, autoFocus }) => (
        <TextInput
          id={key}
          key={key}
          label={label}
          format={format}
          value={updatedValues[key]}
          onChange={(value) => setValue(key, value)}
          autoFocus={autoFocus}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              onDone(updatedValues)
              resetView()
              event.preventDefault()
            }
          }}
        />
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
