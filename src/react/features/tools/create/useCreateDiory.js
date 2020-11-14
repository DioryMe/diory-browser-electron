import React from 'react'
import { v4 as uuid } from 'uuid'

import { useDispatchActions, useStore } from '../../../store'
import { setInactive } from '../../buttons/actions'
import { useFocusDiory } from '../../diograph/hooks'

import { createDiory, createLink } from '../../diograph/actions'

import { CREATE_TOOL_BUTTON } from './buttons'

export const useCreateDiory = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { diory: focusDiory } = useFocusDiory()
  const { dispatch } = useDispatchActions()

  return (newDiory) => {
    if (CREATE_TOOL_BUTTON === active) {
      const id = uuid()
      dispatch(createDiory({ ...newDiory, id }))
      dispatch(createLink(focusDiory, { id }))
      dispatch(setInactive())
    }
  }
}
