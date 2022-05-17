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

export const createDiory =
  (dioryData) =>
  (dispatch, _, { client }) => {
    const { diory } = client.createDiory(dioryData)
    dispatch({
      type: CREATE_DIORY,
      payload: { diory },
    })
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, _, { client }) => {
    const { diory } = client.updateDiory(dioryData)
    dispatch({
      type: UPDATE_DIORY,
      payload: { diory },
    })
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, _, { client }) => {
    const { diory } = client.deleteDiory(dioryData)
    dispatch({
      type: DELETE_DIORY,
      payload: { diory },
    })
  }

export const createLink =
  (dioryData, linkData) =>
  (dispatch, _, { client }) => {
    const { diory, link } = client.createLink(dioryData, linkData)
    console.log(diory, link)
    dispatch({
      type: CREATE_LINK,
      payload: { diory, link },
    })
  }

export const deleteLink =
  (from, to) =>
  (dispatch, _, { client }) => {
    const { diory } = client.deleteLink(from, to)
    dispatch({
      type: DELETE_LINK,
      payload: { diory },
    })
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, _, { client }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      const { diory } = client.deleteLink(fromDiory, toDiory)
      dispatch({
        type: DELETE_LINK,
        payload: { diory },
      })
    })
  }
