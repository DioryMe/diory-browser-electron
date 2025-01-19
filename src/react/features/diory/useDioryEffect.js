import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { getDiograph } from './diographActions'

export const useDioryEffect = () => {
  const { client, address } = useSelector((state) => state.home)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (client && address) {
      dispatch(getDiograph({ client, address: `${address}/diory` }))
    }
  }, [dispatch, client, address])
}
