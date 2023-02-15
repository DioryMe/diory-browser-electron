import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { saveDiograph } from './diographActions'

export const useSaveDiographEffect = () => {
  const { updated } = useSelector((state) => state.diograph)
  const { address } = useSelector((state) => state.room)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (updated && address) {
      dispatch(saveDiograph())
    }
  }, [dispatch, updated, address])
}
