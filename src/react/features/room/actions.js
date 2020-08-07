import {
  GET_ROOM,
  SAVE_ROOM,
  UPDATE_ROOM,
  CREATE_DIORY,
  UPDATE_DIORY,
  DELETE_DIORY,
  CREATE_LINK,
  DELETE_LINK,
} from './actionsTypes'

export const getRoom = ({ id, diograph }) => ({
  type: GET_ROOM,
  payload: { id, diograph },
})

export const saveRoom = () => ({
  type: SAVE_ROOM,
})

export const updateRoom = () => ({
  type: UPDATE_ROOM,
})

export const createDiory = (diory) => ({
  type: CREATE_DIORY,
  payload: {
    diory: {
      ...diory,
      created: new Date().toISOString(),
    },
  },
})

export const updateDiory = (diory) => ({
  type: UPDATE_DIORY,
  payload: {
    diory: {
      ...diory,
      updated: new Date().toISOString(),
    },
  },
})

export const deleteDiory = (diory) => {
  const now = new Date().toISOString()
  return {
    type: DELETE_DIORY,
    payload: {
      diory: {
        ...diory,
        updated: now,
        deleted: now,
      },
    },
  }
}

export const createLink = (diory, link) => ({
  type: CREATE_LINK,
  payload: {
    diory: {
      ...diory,
      modified: new Date().toISOString(),
    },
    link,
  },
})

export const deleteLink = (diory, link) => ({
  type: DELETE_LINK,
  payload: {
    diory: {
      ...diory,
      modified: new Date().toISOString(),
    },
    link,
  },
})
