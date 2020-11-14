import React from 'react'

import { useStore } from '../../../store'
import { useCreateTool } from './useCreateTool'

import UpdateView from '../update/UpdateView'

import { CREATE_TOOL_BUTTON } from './buttons'

const CreateTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const createDiory = useCreateTool()

  return CREATE_TOOL_BUTTON === active ? (
    <UpdateView
      title="Create diory"
      isShown
      onDone={createDiory}
    />
  ) : null
}

export default CreateTool
