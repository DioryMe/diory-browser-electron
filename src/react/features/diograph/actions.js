import {
  GET_ROOM,
  SAVE_ROOM,
  CREATE_DIORY,
  UPDATE_DIORY,
  DELETE_DIORY,
  CREATE_LINK,
  DELETE_LINK,
  DELETE_LINKS
} from './actionsTypes'

export const getRoom = (room) => ({
  type: GET_ROOM,
  payload: room,
})

export const saveRoom = () => ({
  type: SAVE_ROOM,
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

export const deleteLink = (fromDiory, toDiory) => ({
  type: DELETE_LINK,
  payload: {
    fromDiory: {
      ...fromDiory,
      modified: new Date().toISOString(),
    },
    toDiory,
  },
})

export const deleteLinks = (deletedLinks) => ({
  type: DELETE_LINKS,
  payload: deletedLinks.map(({ fromDiory, toDiory }) => {
    return {
      fromDiory: {
        ...fromDiory,
        modified: new Date().toISOString(),
      },
      toDiory
    }
  })
})
