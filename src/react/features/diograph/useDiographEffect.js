import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { getDiograph } from './diographActions'

export const useDiographEffect = () => {
  const { client, address, storeId } = useSelector((state) => state.home)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (client && address && storeId) {
      dispatch(getDiograph({ client, address: `${address}/${storeId}` }))
    }
  }, [dispatch, client, address, storeId])
}
