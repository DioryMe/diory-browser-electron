import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../store'
import { useButtons } from './useButtons'

import { inactivateButton } from './buttonsActions'

export const useActiveButton = (buttons, callback) => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const buttonIsActive = active === buttons[0].id

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (buttonIsActive) {
      callback()
      dispatch(inactivateButton())
    }
  }, [dispatch, buttonIsActive, callback])
}
