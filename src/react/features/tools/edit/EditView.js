import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Modal from '../../../components/Modal'
import TextInput from '../../../components/TextInput'

import { useEditView } from './useEditView'

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

export const EditView = ({ diory, isShown, onChange, onDone, onCancel }) => (
  <Modal title={`Edit diory ${diory.id}`} isShown={isShown} onDone={onDone} onCancel={onCancel}>
    {fields.map(({ label, key, format }) => (
      <TextInput
        label={label}
        format={format}
        value={diory[key]}
        onChange={(value) => onChange(key, value)}
      />
    ))}
  </Modal>
)

EditView.defaultProps = {
  diory: {},
  isShown: false,
  onChange: () => {},
  onDone: () => {},
  onCancel: () => {},
}

EditView.propTypes = {
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

const EditViewWithHooks = () => <EditView {...useEditView()} />

export default EditViewWithHooks
