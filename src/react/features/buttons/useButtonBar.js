import { useState } from 'react'
import { useStore } from '../../store'
import { useTools } from '../tools/hooks'

const useButtons = () => {
  const [{ buttons }] = useStore((state) => state.buttons)
  return {
    buttons: Object.values(buttons),
  }
}

export const useButtonBar = () => {
  const [open, setOpen] = useState(false)
  const { active, onSelect, onClear } = useTools()

  const { buttons } = useButtons()

  if (!open && buttons.length > 1) {
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

  return {
    buttons: buttons.map((button) => ({
      ...button,
      active: button.id === active,
      onClick: () => {
        if (button.id !== active) {
          return onSelect(button.id)
        }

        onClear()
        setOpen(false)
      },
    })),
  }
}
