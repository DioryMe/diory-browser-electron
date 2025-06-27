import React from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { useDiories } from '../../diograph/utils/useDiories'

import { selectMemory } from '../../navigation/navigationActions'
import { updateDiory } from '../../diograph/diographActions'

import { FormModal } from '../../../components/FormModal'

import { buttons, UPDATE_TOOL_BUTTON } from './buttons'

import dioryFields from './dioryFields'
import { useButtons } from '../../buttons/useButtons'

const useToolActions = () => {
  const { dispatch } = useDispatchActions()
  return {
    onDone: (updatedDiory) => {
      dispatch(updateDiory(updatedDiory))
      dispatch(selectMemory())
    },
    onCancel: () => {
      dispatch(selectMemory())
    },
  }
}

export const UpdateTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const { memory } = useDiories()
  const toolActions = useToolActions()

  // TODO: Use own store to show
  return UPDATE_TOOL_BUTTON === active && !!memory ? (
    <FormModal title="Update diory" fields={dioryFields} values={memory} {...toolActions} />
  ) : null
}
