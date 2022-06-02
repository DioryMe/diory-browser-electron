import {
  SET_ROOM,
  SET_STORY,
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
  room: null,
  story: {},
  memories: [],
}

export const setRoom = (state, { payload: { room } }) => ({
  ...state,
  room,
  loaded: true,
})

export const setStory = (state, { payload: { storyId } }) => {
  const story = state.room.diograph.getDiory(storyId)
  const memories = state.room.diograph.getDioryWithLinks()
  return {
    ...state,
    story,
    memories,
  }
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

export default createReducer(initialState, {
  [SET_ROOM]: setRoom,
  [SET_STORY]: setStory,
  [ADD_DIOGRAPH]: addDiograph,
  [CREATE_DIORY]: createDiory,
  [DELETE_DIORY]: deleteDiory,
  [UPDATE_DIORY]: updateDiory,
  [CREATE_LINK]: createLink,
  [DELETE_LINK]: deleteLink,
  [DELETE_LINKS]: deleteLinks,
  [GET_DIOGRAPH]: getDiograph,
  ...promiseReducers(SAVE_DIOGRAPH, 'updated', 'saving', 'saved', 'error'),
})
