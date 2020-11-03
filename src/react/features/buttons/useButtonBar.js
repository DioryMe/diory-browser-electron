import { useDispatch, useStore } from '../../store'

import { setOpen } from './actions'

const useButtonsArray = () => {
  const [{ buttons }] = useStore((state) => state.buttons)
  return {
    buttons: Object.values(buttons),
  }
}

export const useButtonBar = () => {
  const [{ open }] = useStore((state) => state.buttons)
  const [{ active }] = useStore((state) => state.buttons)

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
        dispatch(setOpen(false))
      },
    })),
  }
}
