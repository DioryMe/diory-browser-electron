import React from 'react'

import { useDispatchActions, useSelector } from '../../../store'
import { useCreateDiory } from './useCreateDiory'
import { useButtons } from '../../buttons/useButtons'

import { inactivateButton } from '../../buttons/buttonsActions'
import { selectMemory } from '../../navigation/navigationActions'

import UpdateDioryView from '../../../components/diories/UpdateDioryView'

import { BUTTON, buttons } from './buttons'

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

const CreateTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const toolActions = useToolActions()

  return BUTTON === active ? <UpdateDioryView title="Create diory" {...toolActions} /> : null
}

export default CreateTool
