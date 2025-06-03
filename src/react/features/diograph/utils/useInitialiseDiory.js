import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useHomeDiographKey } from '../../home/utils/useHomeDiographKey'

import { createDiory } from '../diographActions'
import { useDispatchActions } from '../../../store'

export const useInitialiseDiory = (id) => {
  const key = useHomeDiographKey(id)
  const { diograph } = useSelector((state) => state.diograph)
  const diory = diograph[key]

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (!diory) {
      dispatch(createDiory({ key, id, text: id }))
    }
  }, [diory])
}
