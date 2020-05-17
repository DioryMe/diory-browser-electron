import { SELECT_LENS } from './actionsTypes'

export const selectLens = (id) => ({ type: SELECT_LENS, payload: { id } })
