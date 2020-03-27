import { useStore } from '../../store'

import * as types from './actionsTypes'

export const useTools = () => {
  const [{ active }, dispatch] = useStore(state => state.tools)
  return {
    active,
    onSelect: toolId => dispatch({ type: types.SET_ACTIVE, payload: { active: toolId } }),
    onClear: () => dispatch({ type: types.SET_INACTIVE }),
  }
}
