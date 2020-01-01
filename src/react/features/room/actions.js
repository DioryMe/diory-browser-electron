import * as types from './actionsTypes'

export const addDiory = diory => ({
  type: types.ADD_DIORY,
  payload: { diory },
})

export const removeDiory = diory => ({
  type: types.REMOVE_DIORY,
  payload: { diory },
})

export const updateDiory = diory => ({
  type: types.UPDATE_DIORY,
  payload: { diory },
})
