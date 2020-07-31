import { SET_PATHS, ADD_PATH, REMOVE_PATH, UPDATE_PATH } from './actionsTypes'

export const setPaths = (rooms) => ({
  type: SET_PATHS,
  payload: { rooms },
})

export const addPath = (id, path) => ({
  type: ADD_PATH,
  payload: { id, path },
})

export const removePath = (id, path) => ({
  type: REMOVE_PATH,
  payload: { id, path },
})

export const updatePath = (id, path) => ({
  type: UPDATE_PATH,
  payload: { id, path },
})
