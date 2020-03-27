import * as types from './actionsTypes'

export const getRoom = ({ id, diograph }) => ({
  type: types.GET_ROOM,
  payload: { id, diograph },
})

export const saveRoom = ({ id, diograph }) => ({
  type: types.SAVE_ROOM,
  payload: { id, diograph },
})

export const addDiory = diory => ({
  type: types.ADD_DIORY,
  payload: {
    diory: {
      ...diory,
      modified: new Date().toISOString(),
    },
  },
})

export const removeDiory = diory => {
  const now = new Date().toISOString()
  return {
    type: types.REMOVE_DIORY,
    payload: {
      diory: {
        ...diory,
        modified: now,
        deleted: now,
      },
    },
  }
}

export const updateDiory = diory => ({
  type: types.UPDATE_DIORY,
  payload: {
    diory: {
      ...diory,
      modified: new Date().toISOString(),
    },
  },
})

export const addLink = diory => ({
  type: types.ADD_LINK,
  payload: {
    diory: {
      ...diory,
      modified: new Date().toISOString(),
    },
  },
})

export const removeLink = diory => ({
  type: types.REMOVE_LINK,
  payload: {
    diory: {
      ...diory,
      modified: new Date().toISOString(),
    },
  },
})
