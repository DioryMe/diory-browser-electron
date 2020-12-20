import { SET_FILTERS, ACTIVATE_FILTER, SET_FILTER, SET_TEXT_FILTER } from './actionsTypes'
import { createReducer } from '../../store'

const DEFAULT_Filter = {
  grid: 1,
}

export const initialState = {
  active: {
    grid: true,
  },
  filters: DEFAULT_Filter,
  textFilter: undefined,
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

const setFilter = (state, { payload }) => state

const setTextFilter = (state, { payload }) => ({
  ...state,
  textFilter: payload.textFilter,
})

export default createReducer({
  [SET_FILTERS]: setFilters,
  [ACTIVATE_FILTER]: activateFilter,
  [SET_FILTER]: setFilter,
  [SET_TEXT_FILTER]: setTextFilter,
})
