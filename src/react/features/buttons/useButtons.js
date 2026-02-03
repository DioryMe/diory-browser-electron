import { useEffect } from 'react'
import { useDispatchActions } from '../../store'
import { addButtons, removeButtons } from './buttonsActions'

export const useButtons = (buttons = [], disabled) => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (buttons.length && !disabled) {
      dispatch(addButtons(buttons))
      return () => dispatch(removeButtons(buttons))
    }
  }, [buttons, dispatch])
}
