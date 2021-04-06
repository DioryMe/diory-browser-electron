import {
  GET_ROOM,
  ADD_DIORYS,
  CREATE_DIORY,
  CREATE_LINK,
  CREATE_LINKS,
  DELETE_DIORY,
  DELETE_LINK,
  DELETE_LINKS,
  SAVE_ROOM,
  UPDATE_DIORY,
} from './actionsTypes'
import { promiseReducers, createReducer } from '../../store'

export const initialState = {
  rootId: undefined,
  diograph: {},
  updated: false,
}

const reduceToObject = (array) =>
  array.reduce(
    (obj, { id }) => ({
      ...obj,
      ...getLink(id),
    }),
    {}
  )

const reduceToDiograph = (array) =>
  array.reduce(
    (obj, diory) => ({
      ...obj,
      [diory.id]: diory,
    }),
    {}
  )

const addDiorys = (state, { payload }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    ...reduceToDiograph(payload.diorys),
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

const getLink = (id) => ({
  [id]: { id },
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
          ...getLink(payload.link.id),
        },
      },
    },
    updated: true,
  }
}

const createLinks = (state, { payload }) => {
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
          ...reduceToObject(payload.links),
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
  [ADD_DIORYS]: addDiorys,
  [CREATE_DIORY]: createDiory,
  [DELETE_DIORY]: deleteDiory,
  [UPDATE_DIORY]: updateDiory,
  [CREATE_LINK]: createLink,
  [CREATE_LINKS]: createLinks,
  [DELETE_LINK]: deleteLink,
  [DELETE_LINKS]: deleteLinks,
  ...promiseReducers(GET_ROOM, 'load', 'loading', 'loaded', 'error'),
  ...promiseReducers(SAVE_ROOM, 'updated', 'saving', 'saved', 'error'),
})
