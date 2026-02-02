import { useSelector } from 'react-redux'
import { useDispatchActions } from '../../../../store'

import { createDiory, deleteDiory } from '../../../diograph/diographActions'

import { TAKE_TOOL_BUTTON } from './buttons'
import { isDioryInDiograph } from './useDioryToSelectedEffect'
import { useDiograph } from '../../../diograph/utils/useDiograph'

export const useTakeToDiory = () => {
  const { address } = useSelector((state) => state.home)
  const { diograph } = useDiograph(address)

  const { active } = useSelector((state) => state.buttons)
  const { dispatch } = useDispatchActions()

  return ({ diory }) => {
    if (TAKE_TOOL_BUTTON === active) {
      const key = `${address}${diory.id}`
      isDioryInDiograph(diory.id, diograph)
        ? dispatch(deleteDiory({ ...diory, key }))
        : dispatch(createDiory({ ...diory, key }))
    }
  }
}
