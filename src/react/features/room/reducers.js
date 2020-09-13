import {
  GET_ROOM,
  CREATE_DIORY,
  CREATE_LINK,
  DELETE_DIORY,
  DELETE_LINK,
  SAVE_ROOM,
  UPDATE_DIORY,
} from './actionsTypes'
import { promiseReducers, createReducer } from '../../store'

export const initialState = {
  id: undefined,
  diograph: undefined,
  updated: false,
}

const getRoom = (state, { payload }) => ({
  ...state,
  id: payload.id,
  diograph: payload.diograph,
  updated: false,
})

const createDiory = (state, { payload }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    [payload.diory.id]: payload.diory,
  },
  updated: true,
})

const deleteDiory = (state, { payload }) => {
  // eslint-disable-next-line no-unused-vars
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

const createLink = (state, { payload }) => {
  const diory = state.diograph[payload.diory.id]
  return {
    ...state,
    diograph: {
      ...state.diograph,
      [payload.diory.id]: {
        ...diory,
        ...payload.diory,
        links: {
          ...diory.links,
          [payload.link.id]: { id: payload.link.id },
        },
      },
    },
    updated: true,
  }
}

const deleteLink = (state, { payload }) => {
  const diory = state.diograph[payload.diory.id]
  // eslint-disable-next-line no-unused-vars
  const { [payload.diory.link.id]: omit, ...links } = diory.links
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
  [CREATE_DIORY]: createDiory,
  [DELETE_DIORY]: deleteDiory,
  [UPDATE_DIORY]: updateDiory,
  [CREATE_LINK]: createLink,
  [DELETE_LINK]: deleteLink,
  ...promiseReducers(GET_ROOM, 'updated', 'saving', 'saved', 'error', getRoom),
  ...promiseReducers(SAVE_ROOM, 'updated', 'saving', 'saved', 'error'),
})
