import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { generateDiograph } from './diographActions'

export const useGenerateDiographEffect = () => {
  const { address } = useSelector((state) => state.diograph)
  const { storyKey } = useSelector((state) => state.navigation)
  const path = storyKey ? `${storyKey.split('/').slice(0, -1).join('/')}/` : '/'

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (address) {
      dispatch(generateDiograph(address, path))
    }
  }, [dispatch, address, path])
}
