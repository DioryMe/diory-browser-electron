import { useSelector } from 'react-redux'
import { useDispatchActions } from '../../../store'

import { selectDiory } from '../toolsActions'
import { createDiory, deleteDiory } from '../../diograph/diographActions'

import { isDioryInDiograph } from './useMapSelectedDiory'

export const useToggleHomeDiograph = () => {
  const { address } = useSelector((state) => state.home)
  const { diograph } = useSelector((state) => state.diograph)

  const { dispatch } = useDispatchActions()
  return (diory) => {
    const key = `${address}${diory.id}`
    isDioryInDiograph(diory.id, address, diograph)
      ? dispatch(deleteDiory({ ...diory, key }))
      : dispatch(createDiory({ ...diory, key }))
  }
}

export const useSelectDiory = () => {
  const { isDiory } = useSelector((state) => state.diograph)
  const toggleHomeDiograph = useToggleHomeDiograph()
  const { dispatch } = useDispatchActions()
  return ({ diory }) => {
    isDiory ? dispatch(selectDiory(diory)) : toggleHomeDiograph(diory)
  }
}
