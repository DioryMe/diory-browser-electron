import React from 'react'
import { useStore } from '../../../store'
import { useLinkDiory, useFocus } from '../../diograph/hooks'
import { useDeleteDioryAndLinks, useGenerateDeletedLinks } from './useDeleteDioryAndLinks'

import DeleteView from './DeleteView'

import { DELETE_TOOL_BUTTON } from './buttons'

const DeleteTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const [{ link }] = useStore((state) => state.navigation)
  const { diory: focusDiory } = useFocus()
  const { diory: linkDiory } = useLinkDiory()

  const isFocusDeleted = focusDiory && linkDiory ? focusDiory.id === linkDiory.id : false
  const deletedDiory = isFocusDeleted ? focusDiory : null

  const links = focusDiory && linkDiory ? (isFocusDeleted ? focusDiory.links || {} : { [linkDiory.id]: { id: linkDiory.id } }) : []
  const deletedLinks = useGenerateDeletedLinks(focusDiory, links, isFocusDeleted)

  const props = useDeleteDioryAndLinks(deletedDiory, deletedLinks)

  if (DELETE_TOOL_BUTTON === active && !!link) {
    return <DeleteView {...props} />
  }

  return null
}

export default DeleteTool
