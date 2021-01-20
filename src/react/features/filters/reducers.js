import { SET_FILTERS, ACTIVATE_FILTER, SET_FILTER } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  active: {},
  filters: {},
  updated: false,
}

const setFilters = (state, { payload }) => ({
  ...state,
  filters: payload.filters,
  updated: false,
})

const activateFilter = (state, { payload }) => ({
  ...state,
  active: {
    ...state.active,
    ...payload.filter,
  },
  updated: true,
})

const setFilter = (state, { payload }) => ({
  ...state,
  filters: {
    ...state.filters,
    ...payload.filter,
  },
  updated: true,
})

export default createReducer({
  [SET_FILTERS]: setFilters,
  [ACTIVATE_FILTER]: activateFilter,
  [SET_FILTER]: setFilter,
})
