import { SET_PATHS, REMOVE_PATH, UPDATE_PATH, ADD_PATH } from './actionsTypes'
import { createReducer } from '../../../store'

export const initialState = {
  paths: {},
  updated: false,
}

export const setPaths = (state, { payload }) => ({
  ...state,
  paths: Object.entries(payload.rooms).reduce(
    (obj, [path, room]) => ({
      ...obj,
      [room.id]: path,
    }),
    {}
  ),
  updated: false,
})

export const addPath = (state, { payload }) => ({
  ...state,
  paths: {
    ...state.paths,
    [payload.id]: payload.path,
  },
  updated: true,
})

export const removePath = (state, { payload }) => {
  const { [payload.id]: omit, ...paths } = state.paths
  return {
    ...state,
    paths,
    updated: true,
  }
}

export const updatePath = (state, { payload }) => ({
  ...state,
  paths: {
    ...state.paths,
    [payload.id]: payload.path,
  },
  updated: true,
})

export default createReducer({
  [SET_PATHS]: setPaths,
  [ADD_PATH]: addPath,
  [REMOVE_PATH]: removePath,
  [UPDATE_PATH]: updatePath,
})
