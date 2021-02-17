import { ACTIVATE_FILTER, SET_FILTER } from './actionsTypes'

export const activateFilter = (filter, active) => ({
  type: ACTIVATE_FILTER,
  payload: { filter, active },
})

export const setFilter = (filter, value) => ({
  type: SET_FILTER,
  payload: { filter, value },
})
