import React from 'react'

import { useDispatchActions, useSelector } from '../../../store'
import { useCreateDiory } from './useCreateDiory'
import { useButtons } from '../../buttons/useButtons'

import { inactivateButton } from '../../buttons/buttonsActions'
import { selectMemory } from '../../navigation/navigationActions'

import { FormModal } from '../../../components/FormModal'

import { BUTTON, buttons } from './buttons'

import dioryFields from './dioryFields'

const useToolActions = () => {
  const { dispatch } = useDispatchActions()
  const createDiory = useCreateDiory()
  return {
    onDone: (updatedDiory) => {
      createDiory(updatedDiory)
      dispatch(inactivateButton())
      dispatch(selectMemory())
    },
    onCancel: () => {
      dispatch(inactivateButton())
      dispatch(selectMemory())
    },
  }
}

export const CreateTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const toolActions = useToolActions()

  return BUTTON === active ? (
    <FormModal title="Create diory" fields={dioryFields} {...toolActions} />
  ) : null
}
