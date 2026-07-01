import { useSelector } from 'react-redux'
import { useDispatchActions } from '../../../../store'

import { selectDiory } from '../../toolsActions'
import { toggleHomeDiory } from '../../../home/homeActions'

import { TAKE_TOOL_BUTTON } from './buttons'

export const useTakeToDiory = () => {
  const { active } = useSelector((state) => state.buttons)
  const { dispatch } = useDispatchActions()

  return ({ diory }) => {
    if (TAKE_TOOL_BUTTON !== active) return false

    dispatch(selectDiory(diory))
    dispatch(toggleHomeDiory(diory))

    return true
  }
}
