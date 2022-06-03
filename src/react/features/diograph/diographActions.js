import {
  GET_DIOGRAPH_BEGIN,
  GET_DIOGRAPH_SUCCESS,
  GET_DIOGRAPH_FAILURE,
  SAVE_DIOGRAPH_BEGIN,
  SAVE_DIOGRAPH_SUCCESS,
  SAVE_DIOGRAPH_FAILURE,
  ADD_DIOGRAPH,
  CREATE_DIORY,
  UPDATE_DIORY,
  DELETE_DIORY,
} from './diographActionTypes'

import { selectStory } from '../navigation/navigationActions'

export const getDiograph =
  () =>
  async (dispatch, getState, { client }) => {
    const { saving } = getState().diograph
    if (!saving) {
      dispatch(getDiographBegin())
      try {
        const { dioryFolderLocation } = getState().settings
        const { diograph, rootId } = await client.getDiograph(dioryFolderLocation)
        dispatch(getDiographSuccess(diograph, rootId))
        dispatch(selectStory({ id: rootId }))
      } catch (error) {
        dispatch(getDiographFailure(error))
      }
    }
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

export const saveDiograph =
  () =>
  async (dispatch, getState, { client }) => {
    const { saving } = getState().diograph
    if (!saving) {
      dispatch(saveDiographBegin())
      try {
        const { dioryFolderLocation } = getState().settings
        const { rootId, diograph } = getState().diograph
        await client.saveDiograph({
          dioryFolderLocation,
          rootId,
          diograph,
        })
        dispatch(saveDiographSuccess())
      } catch (error) {
        dispatch(saveDiographFailure(error))
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
  (dispatch, getState, { client }) => {
    const { diograph } = getState().diograph
    const { diory } = client.updateDiory(dioryData, diograph)
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
  (dispatch, getState, { client }) => {
    const { diograph } = getState().diograph
    const { diory } = client.createLink(dioryData.id, linkData.id, diograph)
    dispatch({
      type: UPDATE_DIORY,
      payload: { diory },
    })
  }

export const deleteLink =
  (from, to) =>
  (dispatch, getState, { client }) => {
    const { diograph } = getState().diograph
    const { diory } = client.deleteLink(from.id, to.id, diograph)
    dispatch({
      type: UPDATE_DIORY,
      payload: { diory },
    })
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { client }) => {
    const { diograph } = getState().diograph
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      const { diory } = client.deleteLink(fromDiory.id, toDiory.id, diograph)
      dispatch({
        type: UPDATE_DIORY,
        payload: { diory },
      })
    })
  }
