import React from 'react'
import { useDispatchActions, useStore } from '../../../store'

import { updateDiory } from '../../diograph/actions'
import { useDiograph } from '../../diograph/useDiograph'

import UpdateView from './UpdateView'

import { UPDATE_TOOL_BUTTON } from './buttons'

const UpdateTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const [{ memoryId }] = useStore((state) => state.navigation)
  const { memory } = useDiograph()

  const { dispatchAction } = useDispatchActions()
  return UPDATE_TOOL_BUTTON === active && !!memoryId ? (
    <UpdateView diory={memory} title="Update diory" isShown onDone={dispatchAction(updateDiory)} />
  ) : null
}

export default UpdateTool
