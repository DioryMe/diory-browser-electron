import { useSelector } from 'react-redux'
import { addDioryId, getPath } from './diographUtils'

export const getDiory = (address, diograph) => {
  const dioryKey = addDioryId(address, diograph)
  if (!diograph[dioryKey]) return undefined

  const [key] = Object.entries(diograph).find(
    ([diographKey, { id }]) => diograph[dioryKey].id === id && diographKey !== dioryKey
  ) || [dioryKey]
  return { key, ...diograph[dioryKey] }
}

export const useGetDioryById = () => {
  const { diograph, address } = useSelector((state) => state.diograph)
  return {
    getDiory: (id) => getDiory(`${getPath(address)}/${id}`, diograph),
  }
}
