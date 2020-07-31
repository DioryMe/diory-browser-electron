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

  if (!open && buttons.length > 1) {
    return {
      buttons: [
        {
          id: 'tools',
          data: {
            icon: 'wrench',
            testid: 'tools',
          },
          onClick: () => dispatch(setOpen(true)),
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
        dispatch(setOpen(false))
      },
    })),
  }
}
