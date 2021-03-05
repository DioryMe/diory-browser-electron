import React from 'react'
import { useStore } from '../../../store'
import { useLinkDiory, useFocusDiory } from '../../diograph/hooks'

import DeleteView from './DeleteView'

import { DELETE_TOOL_BUTTON } from './buttons'

const DeleteTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const [{ link }] = useStore((state) => state.navigation)
  const linkDiory = useLinkDiory().diory
  const { diory } = useFocusDiory()

  return DELETE_TOOL_BUTTON === active && !!link ? (
    <DeleteView diory={linkDiory} focus={diory} />
  ) : null
}

export default DeleteTool
