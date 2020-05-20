import React, { useState } from 'react'
import { useStore } from '../../store'
import { useLenses } from '../lenses/hooks'
import { roomButtons } from '../connector/tools/buttons'
import { useTools } from './hooks'
import ToolButton from './ToolButton'

const useToolsBar = () => {
  const [open, setOpen] = useState(false)
  const { active, onSelect, onClear } = useTools()
  const [{ roomId }] = useStore((state) => state.navigation)
  const { lensButtons } = useLenses()

  function clearAndClose() {
    onClear()
    setOpen(false)
  }

  let buttons = []
  if (lensButtons) {
    buttons = lensButtons
  } else if (roomId) {
    buttons = roomButtons
  }

  if (open || buttons.length === 1) {
    return {
      buttons: buttons.map((button) => ({
        ...button,
        active: button.id === active,
        onClick: () => (button.id === active ? clearAndClose() : onSelect(button.id)),
      })),
    }
  }

  if (buttons.length > 1) {
    return {
      buttons: [
        {
          id: 'tools',
          data: {
            icon: 'wrench',
            testid: 'tools',
          },
          onClick: () => setOpen(true),
        },
      ],
    }
  }

  return { buttons: [] }
}

const ToolsBar = () => {
  const { buttons } = useToolsBar()
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
      {buttons.map((button) => (
        <ToolButton key={button.id} {...button} />
      ))}
    </div>
  )
}

export default ToolsBar
