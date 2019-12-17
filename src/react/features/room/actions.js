import * as types from './actionsTypes'

export const setDiograph = diograph => ({
  type: types.SET_DIOGRAPH,
  payload: { diograph },
})

export const addDiory = diory => ({ type: types.ADD_DIORY, payload: { diory } })

export const removeDiory = diory => ({
  type: types.REMOVE_DIORY,
  payload: { diory },
})

export const updateDiory = diory => ({
  type: types.UPDATE_DIORY,
  payload: { diory },
})
