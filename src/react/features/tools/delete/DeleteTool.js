import React from 'react'
import { useStore } from '../../../store'
import { useLinkDiory, useFocus } from '../../diograph/hooks'
import { useDeleteTool } from './useDeleteDioryAndLinks'

import DeleteView from './DeleteView'

import { DELETE_TOOL_BUTTON } from './buttons'

const DeleteTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const [{ link }] = useStore((state) => state.navigation)
  const { diory: focusDiory } = useFocus()
  const { diory: linkDiory } = useLinkDiory()
  const props = useDeleteTool(focusDiory, linkDiory)

  if (DELETE_TOOL_BUTTON === active && !!link) {
    return <DeleteView {...props} />
  }

  return null
}

export default DeleteTool
