import { SET_FILTERS, ACTIVATE_FILTER, SET_FILTER } from './actionsTypes'

export const setFilters = (filters = {}) => ({
  type: SET_FILTERS,
  payload: { filters },
})

export const activateFilter = (filter) => ({
  type: ACTIVATE_FILTER,
  payload: { filter },
})

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: { filter },
})
