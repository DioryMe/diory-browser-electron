import * as types from './actionsTypes'

export const setTextFilter = (textFilter) => ({
  type: types.SET_TEXT_FILTER,
  payload: { textFilter },
})
