import React from 'react'
import { useSelector } from '../../../store'
import { useDeleteView } from './view/useDeleteView'

import DeleteView from './view/DeleteView'

import { DELETE_TOOL_BUTTON } from './buttons'

export const DeleteTool = () => {
  const { active } = useSelector((state) => state.buttons)
  const { memoryKey } = useSelector((state) => state.navigation)
  const props = useDeleteView()

  if (DELETE_TOOL_BUTTON === active && !!memoryKey) {
    return <DeleteView {...props} />
  }

  return null
}
