import { useDispatchActions, useStore } from '../../store'

import { openButtons, activateButton, inactivateButton } from './actions'

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
      icon: open ? 'cross' : 'plus',
      testid: 'tools',
    },
    onClick: () => {
      dispatch(open ? inactivateButton() : openButtons())
    },
  }

  const toolButtons = buttons.map((button) => ({
    ...button,
    active: button.id === active,
    onClick: () => {
      dispatch(button.id === active ? inactivateButton() : activateButton(button.id))
    },
  }))

  if (toolButtons.length < 2) {
    return {
      buttons: toolButtons,
    }
  }

  const visibleButtons = toolButtons.filter(({ data: { visible } }) => visible)
  const hiddenButtons = toolButtons.filter(({ data: { visible } }) => !visible)

  if (!open) {
    return {
      buttons: [...visibleButtons, toggleButton],
    }
  }

  return {
    buttons: [...hiddenButtons, ...visibleButtons, toggleButton],
  }
}
