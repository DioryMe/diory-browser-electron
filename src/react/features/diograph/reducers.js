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
  diograph: {},
  updated: false,
}

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

/**
 * payload.diory = diory where link is removed
 * payload.link =  which link is removed
 */
export const deleteLink = (state, { payload }) => {
  const diory = state.diograph[payload.diory.id]
  const linkKey = Object.entries(diory.links).filter(
    ([, linkDiory]) => linkDiory.id === payload.link.id
  )[0][0]
  // eslint-disable-next-line no-unused-vars
  const { [linkKey]: omit, ...links } = diory.links
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
  ...promiseReducers(GET_ROOM, 'load', 'loading', 'loaded', 'error'),
  ...promiseReducers(SAVE_ROOM, 'updated', 'saving', 'saved', 'error'),
})
