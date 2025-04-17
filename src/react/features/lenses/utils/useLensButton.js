import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../../store'
import { addLensButton } from '../lensesActions'

export const useLensButton = (button) => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    button && dispatch(addLensButton(button))
  }, [button, dispatch])
}
