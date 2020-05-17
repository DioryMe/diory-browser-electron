import { SET_TEXT_FILTER } from './actionsTypes'

export const setTextFilter = (textFilter) => ({
  type: SET_TEXT_FILTER,
  payload: { textFilter },
})
