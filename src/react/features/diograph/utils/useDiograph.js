import { useSelector } from 'react-redux'
import { useCreateDiory } from '../../tools/actions/createDiory/useCreateDiory'

import { getDiographKey } from './diographUtils'
import { getDiory } from './getDiory'

export const useDiograph = (diographAddress) => {
  const { address, diograph, isDiory } = useSelector((state) => state.diograph)
  const createDiory = useCreateDiory()

  const rootKey = diographAddress || address
  return {
    // TODO remove address from key
    diograph: Object.fromEntries(
      Object.entries(diograph).filter(([key]) => key.startsWith(rootKey))
    ),
    isDiory,
    rootKey,
    createDiory: (dioryObject) => {
      const key = getDiographKey(rootKey, dioryObject.id)
      return getDiory(key, diograph) || createDiory(dioryObject)
    },
    // TODO add all actions here
  }
}
