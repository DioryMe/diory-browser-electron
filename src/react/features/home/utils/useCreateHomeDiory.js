import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useHomeKey } from './useHomeKey'

import { createDiory, createLink } from '../../diograph/diographActions'
import { useDispatchActions } from '../../../store'

const capitalizeFirstLetter = (val) => String(val).charAt(0).toUpperCase() + String(val).slice(1)

export const useCreateHomeDiory = (id) => {
  const { diograph } = useSelector((state) => state.diograph)
  const key = useHomeKey(id)
  const diory = diograph[key]

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (!diory) {
      dispatch(createDiory({ key, id, text: capitalizeFirstLetter(id) }))
      dispatch(createLink({ id: '/' }, { id }))
    }
  }, [diory, id])
}
