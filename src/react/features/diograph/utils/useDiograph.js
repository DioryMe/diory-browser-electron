import { useSelector } from 'react-redux'
import { useCreateDiory } from '../../tools/actions/createDiory/useCreateDiory'

import { getDiory } from './getDiory'

export const useDiograph = () => {
  const { diograph, isDiory } = useSelector((state) => state.diograph)
  const createDiory = useCreateDiory()

  return {
    // TODO remove address from key
    diograph,
    isDiory,
    rootKey: '/',
    createDiory: (dioryObject) => getDiory(dioryObject.id, diograph) || createDiory(dioryObject),
    // TODO add all actions here
  }
}
