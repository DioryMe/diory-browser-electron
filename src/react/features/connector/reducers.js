import * as types from './actionsTypes'
import createReducer from '../../store/createReducer'

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
  [types.SET_PATHS]: setPaths,
  [types.ADD_PATH]: addPath,
  [types.REMOVE_PATH]: removePath,
  [types.UPDATE_PATH]: updatePath,
})
