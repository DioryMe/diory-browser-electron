import { useSelector } from 'react-redux'
import { useCreateDiory } from '../../tools/actions/createDiory/useCreateDiory'

import { getDiographKey } from './diographUtils'
import { getDiory } from './getDiory'

export const useDiograph = (diographAddress) => {
  const { address, diograph, isDiory } = useSelector((state) => state.diograph)
  const createDiory = useCreateDiory()

  return {
    // TODO remove address from key
    diograph: Object.fromEntries(
      Object.entries(diograph).filter(([key]) => key.startsWith(diographAddress || address))
    ),
    isDiory,
    address,
    createDiory: (dioryObject) => {
      const key = getDiographKey(address, dioryObject.id)
      return (
        getDiory(key, diograph) ||
        createDiory(dioryObject)
      )
    }
  }
}
