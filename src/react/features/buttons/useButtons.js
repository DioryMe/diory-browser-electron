import { useEffect } from 'react'
import { useDispatch } from '../../store'
import { addButtons, removeButtons } from './actions'

export const useButtons = (buttons = []) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (buttons.length) {
      dispatch(addButtons(buttons))
      return () => dispatch(removeButtons(buttons))
    }
  }, [buttons, dispatch])
}
