import { useEffect } from 'react'
import { useDispatchActions } from '../../store'
import { addButtons, removeButtons } from './buttonsActions'

export const useButtons = (buttons = []) => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    console.log('jaa', buttons.length)
    if (buttons.length) {
      dispatch(addButtons(buttons))
      return () => dispatch(removeButtons(buttons))
    }
  }, [buttons, dispatch])
}
