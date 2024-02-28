import { UPDATE_DIOGRAPH, GET_DIOGRAPH, SAVE_DIOGRAPH } from './diographActionTypes'

import { createActions } from '../../store/storeUtils'

const saveDiographActions = createActions(SAVE_DIOGRAPH)

export const saveDiograph =
  (connections) =>
  async (dispatch, getState, { diographStore, connectors }) => {
    const { saving } = getState().diograph
    if (!saving) {
      dispatch(saveDiographActions.begin())
      try {
        const { address } = connections[0]
        await connectors.folder.saveDiograph(address, diographStore.toObject())
        dispatch(saveDiographActions.success())
      } catch (error) {
        console.error(error)
        dispatch(saveDiographActions.failure(error))
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
  }

export const createDiory =
  (dioryData) =>
  (dispatch, _, { diographStore }) => {
    const diory = diographStore.addDiory(dioryData)
    dispatch(updateDiograph(diographStore.toObject()))
    return { diory: diory.toObject() }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { diographStore }) => {
    diographStore.updateDiory(dioryData)
    dispatch(updateDiograph(diographStore.toObject()))
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, _, { diographStore }) => {
    diographStore.deleteDiory(dioryData)
    dispatch(updateDiograph(diographStore.toObject()))
  }

export const createLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographStore }) => {
    console.log(linkedDioryObject)
    diographStore.addDioryLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph(diographStore.toObject()))
  }

export const deleteLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographStore }) => {
    diographStore.removeDioryLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph(diographStore.toObject()))
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { diographStore }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      diographStore.removeDioryLink(fromDiory, toDiory)
    })
    dispatch(updateDiograph(diographStore.toObject()))
  }

const getDiographActions = createActions(GET_DIOGRAPH)

export const getDiograph =
  (connections) =>
  async (dispatch, getState, { diographStore, connectors }) => {
    const { loading } = getState().diograph
    if (!loading) {
      dispatch(getDiographActions.begin())
      try {
        const { connector, address } = connections[0]
        const diograph = await connectors[connector].getDiograph(address)
        diographStore.resetDiograph().addDiograph(diograph)
        dispatch(getDiographActions.success({ diograph: diographStore.toObject() }))
      } catch (error) {
        console.log(error)
        dispatch(getDiographActions.failure(error.message))
      }
    }
  }

export const resetDiograph =
  () =>
  async (dispatch, getState, { diographStore }) => {
    diographStore.resetDiograph()
  }
