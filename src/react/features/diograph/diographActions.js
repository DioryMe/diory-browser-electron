import {
  GET_DIOGRAPH,
  SAVE_DIOGRAPH,
  ADD_DIOGRAPH,
  CREATE_DIORY,
  UPDATE_DIORY,
  DELETE_DIORY,
  CREATE_LINK,
  DELETE_LINK,
  DELETE_LINKS,
} from './diographActionTypes'
import { getDefaultImage } from '../../../shared/getDefaultImage'

export const getDiograph = (diograph, rootId) => ({
  type: GET_DIOGRAPH,
  payload: { diograph, rootId },
})

export const saveDiograph = () => ({
  type: SAVE_DIOGRAPH,
})

export const addDiograph = (diograph) => ({
  type: ADD_DIOGRAPH,
  payload: { diograph },
})

export const createDiory = (diory) => ({
  type: CREATE_DIORY,
  payload: {
    diory: {
      id: uuid(),
      image: diory.image || getDefaultImage(),
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
