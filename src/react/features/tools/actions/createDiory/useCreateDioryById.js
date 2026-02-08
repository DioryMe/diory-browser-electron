import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useCreateDiory } from './useCreateDiory'
import { getDiory } from '../../../diograph/utils/getDiory'
import { getDiographKey } from '../../../diograph/utils/diographUtils'

const capitalizeFirstLetter = (val) => String(val).charAt(0).toUpperCase() + String(val).slice(1)

export const useCreateDioryById = (id, diograph) => {
  // TODO remove is diory
  const { isDiory, address } = useSelector((state) => state.diograph)
  const key = getDiographKey(address, id)
  let diory = getDiory(key, diograph)

  const createDiory = useCreateDiory()
  useEffect(() => {
    if (isDiory && !diory) {
      diory = createDiory({ id, text: capitalizeFirstLetter(id) })
    }
  }, [isDiory, diory, id])

  return diory
}
