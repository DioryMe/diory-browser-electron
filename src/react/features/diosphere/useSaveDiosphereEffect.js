import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { saveDiosphere } from './diosphereActions'

export const useSaveDiosphereEffect = () => {
  const { address } = useSelector((state) => state.home)
  const { updated } = useSelector((state) => state.diosphere)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (updated && address) {
      dispatch(saveDiosphere(address))
    }
  }, [dispatch, updated, address])
}
