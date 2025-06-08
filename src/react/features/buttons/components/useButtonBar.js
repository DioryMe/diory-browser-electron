import { useDispatchActions, useSelector } from '../../../store'

import { openButtons, activateButton, inactivateButton } from '../buttonsActions'
import { selectDiory } from '../../navigation/navigationActions'

const useInactivateButton = () => {
  const { dispatch } = useDispatchActions()
  return {
    inactivateButton: () => {
      dispatch(inactivateButton())
      dispatch(selectDiory({ key: null }))
    },
  }
}

export const useButtonBar = () => {
  const { open, active, buttons } = useSelector((state) => state.buttons)

  const { inactivateButton } = useInactivateButton()
  const { dispatch } = useDispatchActions()

  const toggleButton = {
    id: 'tools',
    data: {
      icon: open ? 'cross' : 'wrench',
      testid: 'tools',
    },
    onClick: () => {
      open ? inactivateButton() : dispatch(openButtons())
    },
  }

  const toolButtons = Object.values(buttons)
    .filter(({ data: { type } }) => type !== 'content')
    .filter(({ id }) => !active || id == active)
    .map((button) => ({
      ...button,
      active: button.id === active,
      onClick: () => {
        button.id === active ? inactivateButton() : dispatch(activateButton(button.id))
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
