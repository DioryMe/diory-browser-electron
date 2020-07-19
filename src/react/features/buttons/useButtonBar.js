import { useState } from 'react'
import { useStore } from '../../store'
import { roomButtons } from '../connector/buttons'
import { useLenses } from '../lenses/hooks'
import { useTools } from '../tools/hooks'

export const useButtonBar = () => {
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
