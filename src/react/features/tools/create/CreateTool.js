import React from 'react'

import { useSelector } from '../../../store'
import { useCreateDiory } from './useCreateDiory'

import UpdateView from '../update/UpdateView'
import { BUTTON } from './buttons'
import { useCreateTool } from './useCreateTool'

const CreateTool = () => {
  useCreateTool()

  const { active } = useSelector((state) => state.buttons)
  const createDiory = useCreateDiory()
  return BUTTON === active ? <UpdateView title="Create diory" onDone={createDiory} /> : null
}

export default CreateTool
