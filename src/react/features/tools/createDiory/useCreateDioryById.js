import { useEffect } from 'react'
import { useCreateDiory } from './useCreateDiory'
import { useGetDioryById } from '../../diograph/utils/useGetDioryById'
import { useSelector } from 'react-redux'

const capitalizeFirstLetter = (val) => String(val).charAt(0).toUpperCase() + String(val).slice(1)

export const useCreateDioryById = (id, diograph) => {
  const { getDiory } = useGetDioryById(diograph)
  const { isDiory } = useSelector((state) => state.diograph)
  const createDiory = useCreateDiory()

  let diory = getDiory(id)
  useEffect(() => {
    if (isDiory && !diory) {
      diory = createDiory({ id, text: capitalizeFirstLetter(id) })
    }
  }, [isDiory, diory, id])

  return diory
}
