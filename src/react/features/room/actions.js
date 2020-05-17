import {
  GET_ROOM,
  UPDATE_DIORY,
  SAVE_ROOM,
  REMOVE_LINK,
  REMOVE_DIORY,
  ADD_LINK,
  ADD_DIORY,
} from './actionsTypes'

export const getRoom = ({ id, diograph }) => ({
  type: GET_ROOM,
  payload: { id, diograph },
})

export const saveRoom = () => ({
  type: SAVE_ROOM,
})

export const addDiory = (diory) => ({
  type: ADD_DIORY,
  payload: {
    diory: {
      ...diory,
      modified: new Date().toISOString(),
    },
  },
})

export const removeDiory = (diory) => {
  const now = new Date().toISOString()
  return {
    type: REMOVE_DIORY,
    payload: {
      diory: {
        ...diory,
        modified: now,
        deleted: now,
      },
    },
  }
}

export const updateDiory = (diory) => ({
  type: UPDATE_DIORY,
  payload: {
    diory: {
      ...diory,
      modified: new Date().toISOString(),
    },
  },
})

export const addLink = (diory) => ({
  type: ADD_LINK,
  payload: {
    diory: {
      ...diory,
      modified: new Date().toISOString(),
    },
  },
})

export const removeLink = (diory) => ({
  type: REMOVE_LINK,
  payload: {
    diory: {
      ...diory,
      modified: new Date().toISOString(),
    },
  },
})
