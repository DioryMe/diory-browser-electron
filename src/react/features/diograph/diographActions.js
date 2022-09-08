import {
  GET_DIOGRAPH_BEGIN,
  GET_DIOGRAPH_SUCCESS,
  GET_DIOGRAPH_FAILURE,
  SAVE_DIOGRAPH_BEGIN,
  SAVE_DIOGRAPH_SUCCESS,
  SAVE_DIOGRAPH_FAILURE,
  UPDATE_DIOGRAPH,
} from './diographActionTypes'

import { selectStory } from '../navigation/navigationActions'

export const getDiographBegin = () => ({
  type: GET_DIOGRAPH_BEGIN,
})

export const getDiographSuccess = (diograph, rootId) => ({
  type: GET_DIOGRAPH_SUCCESS,
  payload: { diograph, rootId },
})

export const getDiographFailure = (error) => ({
  type: GET_DIOGRAPH_FAILURE,
  payload: { error },
})

export const getDiograph =
  () =>
  async (dispatch, getState, { client }) => {
    const { saving } = getState().diograph
    if (!saving) {
      dispatch(getDiographBegin())
      try {
        const { dioryFolderLocation } = getState().settings
        const { diograph, rootId } = await client.getDiograph({ dioryFolderLocation })
        dispatch(getDiographSuccess(diograph, rootId))
        dispatch(selectStory({ id: rootId }))
      } catch (error) {
        dispatch(getDiographFailure(error))
      }
    }
  }

export const saveDiographBegin = () => ({
  type: SAVE_DIOGRAPH_BEGIN,
})

export const saveDiographSuccess = () => ({
  type: SAVE_DIOGRAPH_SUCCESS,
})

export const saveDiographFailure = (error) => ({
  type: SAVE_DIOGRAPH_FAILURE,
  payload: { error },
})

export const saveDiograph =
  () =>
  async (dispatch, getState, { client }) => {
    const { saving } = getState().diograph
    if (!saving) {
      dispatch(saveDiographBegin())
      try {
        const { dioryFolderLocation } = getState().settings
        await client.saveDiograph({ dioryFolderLocation })
        dispatch(saveDiographSuccess())
      } catch (error) {
        dispatch(saveDiographFailure(error))
      }
    }
  }

export const updateDiograph = (diograph) => ({
  type: UPDATE_DIOGRAPH,
  payload: { diograph },
})

export const addDiograph =
  (diographData) =>
  (dispatch, _, { client }) => {
    const { diograph } = client.addDiograph(diographData)
    dispatch(updateDiograph(diograph))
  }

export const createDiory =
  (dioryData) =>
  (dispatch, _, { client }) => {
    const { diory, diograph } = client.createDiory(dioryData)
    dispatch(updateDiograph(diograph))
    return { diory }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { client }) => {
    const { diograph } = client.updateDiory(dioryData)
    dispatch(updateDiograph(diograph))
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, _, { client }) => {
    const { diograph } = client.deleteDiory(dioryData)
    dispatch(updateDiograph(diograph))
  }

export const createLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { client }) => {
    const { diograph } = client.createLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph(diograph))
  }

export const deleteLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { client }) => {
    const { diograph } = client.deleteLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph(diograph))
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { client }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      const { diograph } = client.deleteLink(fromDiory, toDiory)
      dispatch(updateDiograph(diograph))
    })
  }
