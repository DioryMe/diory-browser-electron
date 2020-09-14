import React from 'react'
import { v4 as uuid } from 'uuid'
import { useDispatchActions, useStore } from '../../../../../store'
import { useFocusDiory } from '../../../../room/hooks'

import { createDiory, createLink } from '../../../../room/actions'

import { CREATE_TOOL_BUTTON } from '../../buttons'

import UpdateView from '../update/UpdateView'

const CreateTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { diory: focusDiory } = useFocusDiory()
  const { dispatch } = useDispatchActions()

  return CREATE_TOOL_BUTTON === active ? (
    <UpdateView
      title="Create diory"
      isShown
      onDone={(newDiory) => {
        const id = uuid()
        dispatch(createDiory({ ...newDiory, id }))
        dispatch(createLink(focusDiory, { id }))
      }}
    />
  ) : null
}

export default CreateTool
