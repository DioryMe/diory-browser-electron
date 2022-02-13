import { useDispatchActions, useSelector } from '../../store'

import { openButtons, activateButton, inactivateButton } from './buttonsActions'

export const useButtonBar = () => {
  const { open, active, buttons } = useSelector((state) => state.buttons)

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

  const toolButtons = Object.values(buttons)
    .filter(({ data: { type } }) => type !== 'content')
    .map((button) => ({
      ...button,
      active: button.id === active,
      onClick: () => {
        dispatch(button.id === active ? inactivateButton() : activateButton(button.id))
      },
    }))

  const contentButtons = Object.values(buttons)
    .filter(({ data: { type } }) => type === 'content')
    .sort(({ data: { order: order1 } }, { data: { order: order2 } }) => order1 - order2)
    .map((button) => ({
      ...button,
      onClick: () => {
        dispatch(activateButton(button.id))
      },
    }))

  if (toolButtons.length < 2) {
    return {
      buttons: toolButtons,
    }
  }

  if (!open) {
    return {
      buttons: [...contentButtons, toggleButton],
    }
  }

  return {
    buttons: [...toolButtons, ...contentButtons, toggleButton],
  }
}
