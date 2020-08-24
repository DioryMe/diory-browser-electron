import { useDispatch, useStore } from '../../store'
import { useTools } from '../tools/hooks'

import { setOpen } from './actions'

const useButtonsArray = () => {
  const [{ buttons }] = useStore((state) => state.buttons)
  return {
    buttons: Object.values(buttons),
  }
}

export const useButtonBar = () => {
  const [{ open }] = useStore((state) => state.buttons)
  const { active, onSelect, onClear } = useTools()

  const { buttons } = useButtonsArray()
  const dispatch = useDispatch()

  const toggleButton = {
    id: 'tools',
    data: {
      icon: open ? 'cross' : 'wrench',
      testid: 'tools',
    },
    onClick: () => dispatch(setOpen(!open)),
  }

  const toolButtons = buttons.map((button) => ({
    ...button,
    active: button.id === active,
    onClick: () => {
      if (button.id !== active) {
        return onSelect(button.id)
      }

      onClear()
      dispatch(setOpen(false))
    },
  }))

  if (toolButtons.length < 2) {
    return {
      buttons: toolButtons,
    }
  }

  if (!open) {
    return {
      buttons: [toggleButton],
    }
  }

  return {
    buttons: [...(open && toolButtons), toggleButton],
  }
}
