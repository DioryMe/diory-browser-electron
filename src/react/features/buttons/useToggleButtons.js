import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { addButtons, inactivateButton, removeButtons } from './buttonsActions'

const useAddVisibleButton = (buttons, showFirst) => {
  const visibleButton = showFirst ? buttons[0] : buttons[1]

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(addButtons([visibleButton]))
    return () => dispatch(removeButtons(buttons))
  }, [dispatch, visibleButton])
}

const useSwitchButtons = (visibleButton, invisibleButton) => {
  const { active } = useSelector((state) => state.buttons)
  const visibleButtonIsActive = visibleButton.id === active

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (visibleButtonIsActive) {
      dispatch(removeButtons([visibleButton]))
      dispatch(addButtons([invisibleButton]))
      dispatch(inactivateButton())
    }
  }, [dispatch, active, visibleButtonIsActive, visibleButton, invisibleButton])

  return visibleButtonIsActive
}

export const useToggleButtons = (buttons, showFirst) => {
  useAddVisibleButton(buttons, showFirst)

  const firstButtonIsActive = useSwitchButtons(buttons[0], buttons[1])
  const secondButtonIsActive = useSwitchButtons(buttons[1], buttons[0])

  return [firstButtonIsActive, secondButtonIsActive]
}
