import { UPDATE_DIOGRAPH } from './diographActionTypes'

const updateDiographAction = (diograph) => ({
  type: UPDATE_DIOGRAPH,
  payload: { diograph },
})

export const updateDiograph =
  () =>
  (dispatch, _, { dioryClient }) => {
    dispatch(updateDiographAction(dioryClient.diograph.toObject()))
  }

export const addDiograph =
  (diographData) =>
  (dispatch, _, { dioryClient }) => {
    dioryClient.diograph.initialise(diographData)
    dispatch(updateDiograph())
  }

export const createDiory =
  (dioryData) =>
  (dispatch, _, { dioryClient }) => {
    const diory = dioryClient.diograph.addDiory(dioryData)
    dispatch(updateDiograph())
    return { diory: diory.toObject() }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { dioryClient }) => {
    dioryClient.diograph.updateDiory(dioryData)
    dispatch(updateDiograph())
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, _, { dioryClient }) => {
    dioryClient.diograph.removeDiory(dioryData)
    dispatch(updateDiograph())
  }

export const createLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { dioryClient }) => {
    dioryClient.diograph.addDioryLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph())
  }

export const deleteLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { dioryClient }) => {
    dioryClient.diograph.removeDioryLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph())
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { dioryClient }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      dioryClient.diograph.removeDioryLink(fromDiory, toDiory)
    })
    dispatch(updateDiograph())
  }

export const resetDiograph =
  () =>
  async (dispatch, getState, { dioryClient }) => {
    dioryClient.diograph.resetDiograph()
    dispatch(updateDiograph())
  }
