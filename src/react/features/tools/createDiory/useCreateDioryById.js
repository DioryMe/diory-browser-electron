import { useEffect } from 'react'
import { useCreateDiory } from './useCreateDiory'
import { useGetDioryById } from '../../diograph/utils/useGetDioryById'

const capitalizeFirstLetter = (val) => String(val).charAt(0).toUpperCase() + String(val).slice(1)

export const useCreateDioryById = (id, diograph) => {
  const { getDiory } = useGetDioryById(diograph)
  const createDiory = useCreateDiory()

  let diory = getDiory(id)
  useEffect(() => {
    if (!diory) {
      diory = createDiory({ id, text: capitalizeFirstLetter(id) })
    }
  }, [diory, id])

  return diory
}
