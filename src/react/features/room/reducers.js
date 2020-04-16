import * as types from './actionsTypes'
import { promiseReducers, createReducer } from '../../store'

export const initialState = {
  id: null,
  diograph: {},
  updated: false,
}

const getRoom = (state, { payload }) => ({
  ...state,
  id: payload.id,
  diograph: payload.diograph,
  updated: false,
})

const addDiograph = (state, { payload }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    ...payload.diograph,
  },
  updated: true,
})

const addDiory = (state, { payload }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    [payload.diory.id]: payload.diory,
  },
  updated: true,
})

const removeDiory = (state, { payload }) => {
  const { [payload.diory.id]: omit, ...diograph } = state.diograph
  return {
    ...state,
    diograph,
    updated: true,
  }
}

const updateDiory = (state, { payload }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    [payload.diory.id]: {
      ...state.diograph[payload.diory.id],
      ...payload.diory,
    },
  },
  updated: true,
})

const addLink = (state, { payload }) => {
  const diory = state.diograph[payload.diory.id]
  return {
    ...state,
    diograph: {
      ...state.diograph,
      [payload.diory.id]: {
        ...diory,
        links: {
          ...diory.links,
          [payload.diory.link]: { id: payload.diory.link },
        },
      },
    },
    updated: true,
  }
}

const removeLink = (state, { payload }) => {
  const diory = state.diograph[payload.diory.id]
  const { [payload.diory.link]: omit, ...links } = diory.links
  return {
    ...state,
    diograph: {
      ...state.diograph,
      [payload.diory.id]: {
        ...diory,
        links,
      },
    },
    updated: true,
  }
}

export default createReducer({
  [types.GET_ROOM]: getRoom,
  [types.ADD_DIOGRAPH]: addDiograph,
  [types.ADD_DIORY]: addDiory,
  [types.REMOVE_DIORY]: removeDiory,
  [types.UPDATE_DIORY]: updateDiory,
  [types.ADD_LINK]: addLink,
  [types.REMOVE_LINK]: removeLink,
  ...promiseReducers(types.SAVE_ROOM, 'updated', 'saving', 'saved', 'error'),
})
