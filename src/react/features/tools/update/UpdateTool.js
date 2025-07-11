import React from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { updateDiory } from '../../diograph/diographActions'
import { useButtons } from '../../buttons/useButtons'
import { useSelectedDiories } from '../useSelectedDiories'

import { FormModal } from '../../../components/FormModal'

import { buttons, UPDATE_TOOL_BUTTON } from './buttons'
import dioryFields from './dioryFields'
import { useCloseButtons } from '../../buttons/useButtonActions'

const useToolActions = () => {
  const { closeButtons } = useCloseButtons()
  const { dispatch } = useDispatchActions()
  return {
    onDone: (updatedDiory) => {
      dispatch(updateDiory(updatedDiory))
      closeButtons()
    },
    onCancel: closeButtons,
  }
}

export const UpdateTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const { selectedDiories } = useSelectedDiories()
  const toolActions = useToolActions()

  // TODO multiupdate
  return UPDATE_TOOL_BUTTON === active && selectedDiories.length ? (
    <FormModal
      title="Update diory"
      fields={dioryFields}
      values={selectedDiories[0]}
      {...toolActions}
    />
  ) : null
}
