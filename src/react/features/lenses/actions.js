import { ADD_LENS, SELECT_LENS } from './actionsTypes'

export const addLens = (id) => ({ type: ADD_LENS, payload: { id } })
export const selectLens = (id) => ({ type: SELECT_LENS, payload: { id } })
