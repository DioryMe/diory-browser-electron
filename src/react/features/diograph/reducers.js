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

/**
 * payload.diory.id = diory where link should be removed
 * payload.linkedDiory.id =  diory where link is directed
 */
export const deleteLink = (state, { payload: { diory, linkedDiory } }) => {
  const dioryLinks = state.diograph[diory.id].links
  const linkKey = Object.entries(dioryLinks).filter(([, { id }]) => id === linkedDiory.id)[0][0]
  // eslint-disable-next-line no-unused-vars
  const { [linkKey]: omit, ...links } = dioryLinks
  return {
    ...state,
    diograph: {
      ...state.diograph,
      [diory.id]: {
        ...state.diograph[diory.id],
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
