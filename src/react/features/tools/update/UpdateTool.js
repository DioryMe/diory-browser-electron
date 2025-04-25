import React from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { useDiories } from '../../diograph/utils/useDiories'

import { inactivateButton } from '../../buttons/buttonsActions'
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
      dispatch(inactivateButton())
      dispatch(selectMemory())
    },
    onCancel: () => {
      dispatch(inactivateButton())
      dispatch(selectMemory())
    },
  }
}

export const UpdateTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const { memory } = useDiories()
  const toolActions = useToolActions()

  return UPDATE_TOOL_BUTTON === active && !!memory ? (
    <FormModal title="Update diory" fields={dioryFields} values={memory} {...toolActions} />
  ) : null
}
