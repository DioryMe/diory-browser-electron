import { useSelector } from 'react-redux'
import { addDioryId, getPath } from './diographUtils'

export const getDiory = (address, diograph) => {
  const key = addDioryId(address, diograph)
  return key ? { key, ...diograph[key] } : undefined
}

export const useGetDioryById = () => {
  const { diograph, address } = useSelector((state) => state.diograph)
  return {
    getDiory: (id) => getDiory(`${getPath(address)}/${id}`, diograph),
  }
}
