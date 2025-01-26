import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { addLensButton } from './lensesActions'

export const useLens = (lensId, button) => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    button && dispatch(addLensButton(button))
  }, [button, dispatch])

  const { selectedLensId } = useSelector((state) => state.lenses)
  return {
    enabled: lensId === selectedLensId,
  }
}
