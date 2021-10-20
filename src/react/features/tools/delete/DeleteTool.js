import React from 'react'
import { useStore } from '../../../store'
import { useDeleteView } from './useDeleteView'

import DeleteView from './DeleteView'

import { DELETE_TOOL_BUTTON } from './buttons'

const DeleteTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const [{ memoryId }] = useStore((state) => state.navigation)
  const props = useDeleteView()

  if (DELETE_TOOL_BUTTON === active && !!memoryId) {
    return <DeleteView {...props} />
  }

  return null
}

export default DeleteTool
