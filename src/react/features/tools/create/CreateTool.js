import React from 'react'

import { useSelector } from '../../../store'
import { useCreateDiory } from './useCreateDiory'

import UpdateView from '../update/UpdateView'

import { CREATE_TOOL_BUTTON } from './buttons'

const CreateTool = () => {
  const { active } = useSelector((state) => state.buttons)
  const createDiory = useCreateDiory()

  return CREATE_TOOL_BUTTON === active ? (
    <UpdateView title="Create diory" isShown onDone={createDiory} />
  ) : null
}

export default CreateTool
