import {
  GET_ROOM,
  SAVE_ROOM,
  ADD_DIORYS,
  CREATE_DIORY,
  UPDATE_DIORY,
  DELETE_DIORY,
  CREATE_LINK,
  CREATE_LINKS,
  DELETE_LINK,
  DELETE_LINKS,
} from './actionsTypes'

export const getRoom = (room) => ({
  type: GET_ROOM,
  payload: room,
})

export const saveRoom = () => ({
  type: SAVE_ROOM,
})

export const addDiorys = (diorys) => ({
  type: ADD_DIORYS,
  payload: { diorys },
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

const withModified = (diory) => ({
  ...diory,
  modified: new Date().toISOString(),
})

export const updateDiory = (diory) => ({
  type: UPDATE_DIORY,
  payload: {
    diory: withModified(diory),
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
    diory: withModified(diory),
    link,
  },
})

export const createLinks = (diory, links) => ({
  type: CREATE_LINKS,
  payload: {
    diory: withModified(diory),
    links,
  },
})

// Currently this is not used anywhere
// - same as deleteLinks but takes {} as an argument instead of [{}]
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
  payload: deletedLinks.map(({ fromDiory, toDiory }) => ({
    fromDiory: {
      ...fromDiory,
      modified: new Date().toISOString(),
    },
    toDiory,
  })),
})
