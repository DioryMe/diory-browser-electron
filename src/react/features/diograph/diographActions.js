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
  async (dispatch, getState, { diographStore, connectors }) => {
    const { saving } = getState().diograph
    if (!saving) {
      dispatch(saveDiographBegin())
      try {
        const { dioryFolderLocation } = getState().settings
        const diograph = diographStore.toObject()
        const { rootId } = diographStore
        await connectors.folder.saveDiograph({ diograph, dioryFolderLocation, rootId })
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
  (dispatch, _, { diographStore }) => {
    diographStore.addDiograph(diographData)
    dispatch(updateDiograph(diographStore.toObject()))
    dispatch(saveDiograph())
  }

export const createDiory =
  (dioryData) =>
  (dispatch, _, { diographStore }) => {
    const diory = diographStore.createDiory(dioryData)
    dispatch(updateDiograph(diographStore.toObject()))
    dispatch(saveDiograph())
    return { diory }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { diographStore }) => {
    diographStore.updateDiory(dioryData)
    dispatch(updateDiograph(diographStore.toObject()))
    dispatch(saveDiograph())
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, _, { diographStore }) => {
    diographStore.deleteDiory(dioryData)
    dispatch(updateDiograph(diographStore.toObject()))
    dispatch(saveDiograph())
  }

export const createLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographStore }) => {
    diographStore.createLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph(diographStore.toObject()))
    dispatch(saveDiograph())
  }

export const deleteLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographStore }) => {
    diographStore.deleteLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph(diographStore.toObject()))
    dispatch(saveDiograph())
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { diographStore }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      diographStore.deleteLink(fromDiory, toDiory)
    })
    dispatch(updateDiograph(diographStore.toObject()))
    dispatch(saveDiograph())
  }

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
  async (dispatch, getState, { diographStore, connectors }) => {
    const { loading } = getState().diograph
    if (!loading) {
      dispatch(getDiographBegin())
      try {
        const { dioryFolderLocation } = getState().settings
        const { diograph, rootId } = await connectors.folder.getDiograph(dioryFolderLocation)
        diographStore.addDiograph(diograph, rootId)
        dispatch(getDiographSuccess(diographStore.toObject(), rootId))

        dispatch(selectStory({ id: rootId }))
      } catch (error) {
        dispatch(getDiographFailure(error))
      }
    }
  }
