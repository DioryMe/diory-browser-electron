import React from 'react'

import { useSelector } from '../../../store'
import { useCreateDiory } from './useCreateDiory'
import { useButtons } from '../../buttons/useButtons'
import { useCloseButtons } from '../../buttons/useButtonActions'

import { FormModal } from '../../../components/FormModal'

import { BUTTON, buttons } from './buttons'

import dioryFields from './dioryFields'

const useToolActions = () => {
  const { closeButtons  } = useCloseButtons()
  const createDiory = useCreateDiory()
  return {
    onDone: (updatedDiory) => {
      createDiory(updatedDiory)
      closeButtons()
    },
    onCancel: closeButtons,
  }
}

export const CreateDioryTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const toolActions = useToolActions()

  return BUTTON === active ? (
    <FormModal title="Create diory" fields={dioryFields} {...toolActions} />
  ) : null
}
