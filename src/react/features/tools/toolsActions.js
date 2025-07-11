import {
  SELECT_DIORY,
  CLEAR_SELECTED_DIORIES,
} from './toolsActionTypes'


export const selectDiory = ({ key } = {}) => ({
  type: SELECT_DIORY,
  payload: { key },
})

export const clearSelectedDiories = () => ({
  type: CLEAR_SELECTED_DIORIES,
})
