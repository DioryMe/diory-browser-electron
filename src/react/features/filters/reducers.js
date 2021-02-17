import { ACTIVATE_FILTER, SET_FILTER } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  filters: {},
  updated: false,
}

const activateFilter = (state, { payload }) => ({
  ...state,
  filters: {
    ...state.filters,
    [payload.filter]: {
      ...state.filters[payload.filter],
      active: payload.active,
    },
  },
  updated: true,
})

const setFilter = (state, { payload }) => ({
  ...state,
  filters: {
    ...state.filters,
    [payload.filter]: {
      ...state.filters[payload.filter],
      ...payload.value,
    },
  },
  updated: true,
})

export default createReducer({
  [ACTIVATE_FILTER]: activateFilter,
  [SET_FILTER]: setFilter,
})
