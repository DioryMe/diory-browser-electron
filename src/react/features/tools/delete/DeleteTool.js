import React from 'react'
import { useStore } from '../../../store'
import { useLinkDiory, useFocus } from '../../diograph/hooks'

import DeleteView from './DeleteView'

import { DELETE_TOOL_BUTTON } from './buttons'

const DeleteTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const [{ link }] = useStore((state) => state.navigation)
  const linkDiory = useLinkDiory().diory
  const { diory } = useFocus()

  return DELETE_TOOL_BUTTON === active && !!link ? (
    <DeleteView focus={diory} linkDiory={linkDiory} />
  ) : null
}

export default DeleteTool
