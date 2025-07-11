import { SELECT_DIORY, CLEAR_SELECTED_DIORIES } from './toolsActionTypes'

import { createReducer } from '../../store'

const initialState = {
  selectedDiories: {},
}

export const selectDiory = (state, { payload }) => ({
  ...state,
  selectedDiories: {
    ...state.selectedDiories,
    [payload.key]: !state.selectedDiories[payload.key],
  },
})

export const clearSelectedDiories = (state) => ({
  ...state,
  selectedDiories: {},
})

export default createReducer(initialState, {
  [SELECT_DIORY]: selectDiory,
  [CLEAR_SELECTED_DIORIES]: clearSelectedDiories,
})
