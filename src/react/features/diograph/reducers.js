import {
  GET_ROOM,
  SAVE_ROOM,
  ADD_DIOGRAPH,
  CREATE_DIORY,
  CREATE_LINK,
  DELETE_DIORY,
  DELETE_LINK,
  DELETE_LINKS,
  UPDATE_DIORY,
} from './actionsTypes'
import { promiseReducers, createReducer } from '../../store'

export const initialState = {
  id: undefined,
  diograph: {},
  updated: false,
}

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

/**
 * payload.diory.id = diory where link should be removed
 * payload.linkedDiory.id =  diory where link is directed
 */
export const deleteLink = (state, { payload: { fromDiory, toDiory } }) => {
  const dioryLinks = state.diograph[fromDiory.id].links
  const linkKey = Object.entries(dioryLinks).filter(([, { id }]) => id === toDiory.id)[0][0]
  // eslint-disable-next-line no-unused-vars
  const { [linkKey]: omit, ...links } = dioryLinks
  return {
    ...state,
    diograph: {
      ...state.diograph,
      [fromDiory.id]: {
        ...state.diograph[fromDiory.id],
        links,
      },
    },
    updated: true,
  }
}

export const deleteLinks = (state, { payload: deletedLinks }) =>
  deletedLinks.reduce(
    (tempState, deletedLink) => deleteLink(tempState, { payload: deletedLink }),
    state
  )

export default createReducer({
  [ADD_DIOGRAPH]: addDiograph,
  [CREATE_DIORY]: createDiory,
  [DELETE_DIORY]: deleteDiory,
  [UPDATE_DIORY]: updateDiory,
  [CREATE_LINK]: createLink,
  [DELETE_LINK]: deleteLink,
  [DELETE_LINKS]: deleteLinks,
  ...promiseReducers(GET_ROOM, 'load', 'loading', 'loaded', 'error'),
  ...promiseReducers(SAVE_ROOM, 'updated', 'saving', 'saved', 'error'),
})
