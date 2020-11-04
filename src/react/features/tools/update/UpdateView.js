import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from '../../../store'

import { setOpen, setInactive } from '../../buttons/actions'
import { setLink } from '../../navigation/actions'

import Modal from '../../../components/Modal'
import TextInput from '../../../components/TextInput'

import fields from './fields'

const useUpdateView = (diory = {}) => {
  const [values, setValues] = useState({})

  const updatedDiory = { ...diory, ...values }
  const dispatch = useDispatch()
  return {
    fields: fields.map((field) => ({ ...field, value: updatedDiory[field.key] })),
    setValue: (key, value) => setValues({ ...values, [key]: value }),
    updatedDiory,
    resetView: () => {
      dispatch(setInactive())
      dispatch(setLink())
      dispatch(setOpen(false))
      setValues({})
    },
  }
}

const UpdateView = ({ diory, title, isShown, onDone }) => {
  const { fields, setValue, updatedDiory, resetView } = useUpdateView(diory)
  return (
    <Modal
      title={title}
      isShown={isShown}
      onDone={() => {
        onDone(updatedDiory)
        resetView()
      }}
      onCancel={resetView}
    >
      {fields.map(({ key, label, format, value }) => (
        <TextInput
          key={key}
          label={label}
          format={format}
          value={value}
          onChange={(value) => setValue(key, value)}
        />
      ))}
    </Modal>
  )
}

UpdateView.defaultProps = {
  title: '',
  diory: {},
  isShown: false,
  onDone: () => {},
}

UpdateView.propTypes = {
  title: PropTypes.string,
  diory: PropTypes.shape({
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
  }),
  isShown: PropTypes.bool,
  onDone: PropTypes.func,
}

export default UpdateView
