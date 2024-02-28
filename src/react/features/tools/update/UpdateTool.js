import React from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { updateDiory } from '../../diograph/diographActions'
import { useDiograph } from '../../diograph/useDiograph'

import UpdateView from './UpdateView'

import { UPDATE_TOOL_BUTTON } from './buttons'

const UpdateTool = () => {
  const { active } = useSelector((state) => state.buttons)
  const { memoryId } = useSelector((state) => state.navigation)
  const { memory } = useDiograph()

  const { dispatchAction } = useDispatchActions()
  return UPDATE_TOOL_BUTTON === active && !!memoryId ? (
    <UpdateView diory={memory} title="Update diory" onDone={dispatchAction(updateDiory)} />
  ) : null
}

export default UpdateTool
