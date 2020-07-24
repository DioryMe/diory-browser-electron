import { useEffect, useState } from 'react'

import { useDispatch } from '../../../store'

import { updateDiory } from '../../room/actions'
import { useFocusDiory } from '../../room/hooks'
import { setInactive } from '../actions'

import fields from './fields'

export const useEditView = () => {
  const [updatedFields, setFields] = useState({})
  const { diory } = useFocusDiory()

  useEffect(() => {
    setFields({})
  }, [diory])

  const updatedDiory = { ...diory, ...updatedFields }
  const dispatch = useDispatch()
  return {
    fields: fields.map((field) => ({ ...field, value: updatedDiory[field.key] })),
    onChange: (key, value) => setFields({ ...updatedFields, [key]: value }),
    onDone: () => {
      dispatch(updateDiory({ id: diory.id, ...updatedFields }))
      dispatch(setInactive())
    },
    onCancel: () => dispatch(setInactive()),
  }
}
