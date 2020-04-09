import React, { useState } from 'react'
import { useStore } from '../../store'
import { useLenses } from '../lenses/hooks'
import { useTools } from './hooks'
import ToolButton from './ToolButton'

const useToolsBar = () => {
  const [open, setOpen] = useState(false)
  const { active, onSelect, onClear } = useTools()
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const { toolButtons } = useLenses()

  let buttons = []
  if (selectedLensId) {
    buttons = toolButtons[selectedLensId]
  }
  const clearAndClose = () => {
    onClear()
    setOpen(false)
  }

  return {
    tools: !open && buttons.length > 1,
    showButtons: () => setOpen(true),
    buttons: buttons.map((button) => ({
      ...button,
      key: button.id,
      active: button.id === active,
      onClick: () => (button.id === active ? clearAndClose() : onSelect(button.id)),
    })),
  }
}

const ToolsBar = () => {
  const { tools, showButtons, buttons } = useToolsBar()
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 1000,
        bottom: 0,
        cursor: 'pointer',
        left: 0,
        padding: 8,
      }}
    >
      {tools && <ToolButton id="tools" data={{ icon: 'wrench' }} onClick={showButtons} />}
      {!tools && buttons.map((button) => <ToolButton {...button} />)}
    </div>
  )
}

export default ToolsBar
