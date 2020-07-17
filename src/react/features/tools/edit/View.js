import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../../components/Modal'
import TextInput from '../../../components/TextInput'

import { useView } from './useView'

const fields = [
  {
    label: 'Text',
    key: 'text',
    format: 'string',
  },
  {
    label: 'Image',
    key: 'image',
    format: 'string',
  },
  {
    label: 'Style',
    key: 'style',
    format: 'object',
  },
  {
    label: 'Location',
    key: 'location',
    format: 'object',
  },
  {
    label: 'Date',
    key: 'date',
    format: 'object',
  },
]

const stringifyValue = (value, format) => {
  if (format === 'object') {
    return JSON.stringify(value)
  }

  return value
}

const parseValue = (value, format) => {
  if (format === 'object') {
    return JSON.parse(value)
  }

  return value
}

export const View = ({ diory, isShown, onChange, onDone, onCancel }) => (
  <Modal title={diory.id} isShown={isShown} onDone={onDone} onCancel={onCancel}>
    {fields.map(({ label, key, format }) => (
      <TextInput
        label={label}
        value={stringifyValue(diory[key], format)}
        onChange={(value) => onChange(key, parseValue(value, format))}
      />
    ))}
  </Modal>
)

View.defaultProps = {
  diory: {},
  isShown: false,
  onChange: () => {},
  onDone: () => {},
  onCancel: () => {},
}

View.propTypes = {
  diory: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
    location: PropTypes.object,
    date: PropTypes.string,
  }),
  isShown: PropTypes.bool,
  onChange: PropTypes.func,
  onDone: PropTypes.func,
  onCancel: PropTypes.func,
}

const ViewWithHook = () => <View {...useView()} />

export default ViewWithHook
