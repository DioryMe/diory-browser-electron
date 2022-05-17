import {
  GET_DIOGRAPH,
  SAVE_DIOGRAPH,
  ADD_DIOGRAPH,
  CREATE_DIORY,
  CREATE_LINK,
  DELETE_DIORY,
  DELETE_LINK,
  DELETE_LINKS,
  UPDATE_DIORY,
} from './diographActionTypes'
import { promiseReducers, createReducer } from '../../store'

const initialState = {
  rootId: undefined,
  diograph: {},
  loaded: false,
  updated: false,
}

export const getDiograph = (state, { payload: { diograph, rootId } }) => ({
  ...state,
  rootId,
  diograph,
  loaded: true,
  updated: false,
})

export const addDiograph = (state, { payload: { diograph } }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    ...diograph,
  },
  updated: true,
})

export const createDiory = (state, { payload: { diory } }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    [diory.id]: diory,
  },
  updated: true,
})

export const deleteDiory = (state, { payload: { diory } }) => {
  // eslint-disable-next-line no-unused-vars
  const { [diory.id]: omit, ...diograph } = state.diograph
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

export const deleteLink = (state, { payload }) => {
  return {
    ...state,
    diograph: {
      ...state.diograph,
      [payload.diory.id]: payload.diory,
    },
    updated: true,
  }
}

export default createReducer(initialState, {
  [ADD_DIOGRAPH]: addDiograph,
  [CREATE_DIORY]: createDiory,
  [DELETE_DIORY]: deleteDiory,
  [UPDATE_DIORY]: updateDiory,
  [CREATE_LINK]: createLink,
  [DELETE_LINK]: deleteLink,
  [GET_DIOGRAPH]: getDiograph,
  ...promiseReducers(SAVE_DIOGRAPH, 'updated', 'saving', 'saved', 'error'),
})
