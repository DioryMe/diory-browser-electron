import * as types from './actionsTypes'

export const setPaths = (rooms) => ({
  type: types.SET_PATHS,
  payload: { rooms },
})

export const addPath = (id, path) => ({
  type: types.ADD_PATH,
  payload: { id, path },
})

export const removePath = (id, path) => ({
  type: types.REMOVE_PATH,
  payload: { id, path },
})

export const updatePath = (id, path) => ({
  type: types.UPDATE_PATH,
  payload: { id, path },
})
