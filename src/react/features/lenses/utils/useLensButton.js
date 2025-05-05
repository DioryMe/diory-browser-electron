import { useEffect } from 'react'
import { useDispatchActions } from '../../../store'

import { addLensButton } from '../lensesActions'

export const useLensButton = (button) => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    button && dispatch(addLensButton(button))
  }, [button, dispatch])
}
