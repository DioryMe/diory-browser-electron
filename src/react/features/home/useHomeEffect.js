import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { selectStory } from '../navigation/navigationActions'
import { getDiograph } from '../diograph/diographActions'

export const useHomeEffect = () => {
  const { address } = useSelector((state) => state.home)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (address) {
      dispatch(getDiograph(address))
      dispatch(selectStory({ key: address }))
    }
  }, [dispatch, address])
}
