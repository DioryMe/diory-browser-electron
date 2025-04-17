import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../../store'
import { addLensButton } from '../lensesActions'

export const useLens = (lensId) => {
  const { selectedLensId } = useSelector((state) => state.lenses)
  return {
    enabled: lensId === selectedLensId,
  }
}
