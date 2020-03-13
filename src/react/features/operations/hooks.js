import { useStore } from '../../store'

import * as types from './actionsTypes'

export const useOperations = () => {
  const [{ active }, dispatch] = useStore(state => state.operations)
  return {
    active,
    onSelect: operationId =>
      dispatch({ type: types.SET_ACTIVE, payload: { active: operationId } }),
    onClear: () => dispatch({ type: types.SET_INACTIVE }),
  }
}
