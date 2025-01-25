import React from 'react'
import { useDispatchActions, useSelector } from '../../../../store'

import { updateDiory } from '../../diographActions'
import { useDiograph } from '../../../home/useDiograph'

import UpdateDioryView from '../../../../components/diories/UpdateDioryView'

import { UPDATE_TOOL_BUTTON } from './buttons'
import { inactivateButton } from '../../../buttons/buttonsActions'
import { selectMemory } from '../../../navigation/navigationActions'

const useToolActions = () => {
  const { dispatch } = useDispatchActions()
  return {
    onDone: (updatedDiory) => {
      dispatch(updateDiory(updatedDiory))
      dispatch(inactivateButton())
      dispatch(selectMemory())
    },
    onCancel: () => {
      dispatch(inactivateButton())
      dispatch(selectMemory())
    },
  }
}

const UpdateTool = () => {
  const { active } = useSelector((state) => state.buttons)
  const { memoryId } = useSelector((state) => state.navigation)
  const { memory } = useDiograph()
  const toolActions = useToolActions()

  return UPDATE_TOOL_BUTTON === active && !!memoryId ? (
    <UpdateDioryView diory={memory} title="Update diory" {...toolActions} />
  ) : null
}

export default UpdateTool
