import { useEffect } from 'react'
import { useDispatch } from '../../store'
import { addLensButtons, removeLensButtons } from './actions'

export const useInitializeLensButtons = (buttons = []) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (buttons.length) {
      dispatch(addLensButtons(buttons))
      return () => dispatch(removeLensButtons(buttons))
    }
  }, [dispatch])
}
