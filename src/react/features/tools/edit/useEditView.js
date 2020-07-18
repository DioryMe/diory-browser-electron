import { useState } from 'react'

import { useDispatch, useStore } from '../../../store'

import { updateDiory } from '../../room/actions'
import { useFocusDiory } from '../../room/hooks'
import { setInactive } from '../actions'

import { EDIT_TOOL } from './button'

export const useEditView = () => {
  const [updatedDiory, setDiory] = useState({})
  const { diory } = useFocusDiory()

  const [{ active }] = useStore((state) => state.tools)
  const dispatch = useDispatch()

  return {
    diory: { ...diory, ...updatedDiory },
    isShown: EDIT_TOOL === active,
    onChange: (key, value) => setDiory({ ...updatedDiory, [key]: value }),
    onDone: () => dispatch(updateDiory(updatedDiory)),
    onCancel: () => dispatch(setInactive()),
  }
}
