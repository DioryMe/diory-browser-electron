import { useState } from 'react'

import { useDispatch } from '../../../store'

import { setInactive } from '../actions'
import { setOpen } from '../../buttons/actions'

import fields from './fields'

export const useEditView = (diory = {}) => {
  const [updatedFields, setFields] = useState({})

  const updatedDiory = { ...diory, ...updatedFields }
  const dispatch = useDispatch()
  return {
    fields: fields.map((field) => ({ ...field, value: updatedDiory[field.key] })),
    onChange: (key, value) => setFields({ ...updatedFields, [key]: value }),
    onCancel: () => {
      dispatch(setInactive())
      dispatch(setOpen(false))
      setFields({})
    },
    onDone: () => {
      dispatch(setInactive())
      dispatch(setOpen(false))
      setFields({})
    },
    updatedFields,
  }
}
