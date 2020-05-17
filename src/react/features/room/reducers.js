import {
  GET_ROOM,
  ADD_DIORY,
  ADD_LINK,
  REMOVE_DIORY,
  REMOVE_LINK,
  SAVE_ROOM,
  UPDATE_DIORY,
} from './actionsTypes'
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
  [GET_ROOM]: getRoom,
  [ADD_DIORY]: addDiory,
  [REMOVE_DIORY]: removeDiory,
  [UPDATE_DIORY]: updateDiory,
  [ADD_LINK]: addLink,
  [REMOVE_LINK]: removeLink,
  ...promiseReducers(SAVE_ROOM, 'updated', 'saving', 'saved', 'error'),
})
