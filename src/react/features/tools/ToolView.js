import React from 'react'

import { useStore } from '../../store'
import Tools from './index'

const ToolView = () => {
  const [{ selectedToolId }] = useStore((state) => state.tools)
  const SelectedTool = Tools[selectedToolId]
  return selectedToolId ? <SelectedTool /> : null
}

export default ToolView
