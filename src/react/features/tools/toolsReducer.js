import { SELECT_DIORY, SET_SELECTED_DIORIES, CLEAR_SELECTED_DIORIES } from './toolsActionTypes'

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

export const setSelectedDiories = (state, { payload }) => ({
  ...state,
  selectedDiories: payload.selectedDiories,
})

export const clearSelectedDiories = (state) => ({
  ...state,
  selectedDiories: {},
})

export default createReducer(initialState, {
  [SELECT_DIORY]: selectDiory,
  [SET_SELECTED_DIORIES]: setSelectedDiories,
  [CLEAR_SELECTED_DIORIES]: clearSelectedDiories,
})
