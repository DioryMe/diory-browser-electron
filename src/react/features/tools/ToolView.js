import React from 'react'

import { useStore } from '../../store'
import Tools from './index'

const ToolView = () => {
  // const [{ selectedToolId }] = useStore((state) => state.tools)
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.room)
  const diory = diograph[focus]

  if (diory && diory.video) {
    const selectedToolId = 'video'
    const SelectedTool = Tools[selectedToolId]
    return selectedToolId ? <SelectedTool /> : null
  }
  return null
}

export default ToolView
