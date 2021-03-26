import { useDispatchActions, useStore } from '../../store'

import { setOpen, setActive, setInactive } from './actions'

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
  const { dispatch } = useDispatchActions()

  const toggleButton = {
    id: 'tools',
    data: {
      icon: open ? 'cross' : 'wrench',
      testid: 'tools',
    },
    onClick: () => {
      dispatch(open ? setInactive() : setOpen(true))
    },
  }

  const toolButtons = buttons.map((button) => ({
    ...button,
    active: button.id === active,
    onClick: () => {
      dispatch(button.id === active ? setInactive() : setActive(button.id))
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
