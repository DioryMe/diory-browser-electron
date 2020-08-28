import { useDispatchActions, useStore } from '../../store'

import { setOpen } from './actions'
import { setActive, setInactive } from '../tools/actions'

const useButtonsArray = () => {
  const [{ buttons }] = useStore((state) => state.buttons)
  return {
    buttons: Object.values(buttons),
  }
}

export const useButtonBar = () => {
  const [{ open }] = useStore((state) => state.buttons)
  const [{ active }] = useStore((state) => state.tools)

  const { buttons } = useButtonsArray()
  const { dispatch, dispatchAction } = useDispatchActions()

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
        return dispatch(setActive(button.id))
      }

      dispatch(setInactive())
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
