import * as types from './actionsTypes'

export const selectLens = id => ({ type: types.SELECT_LENS, payload: { id } })
