import { UPDATE_DIOGRAPH } from './diographActionTypes'

const updateDiographAction = (diograph) => ({
  type: UPDATE_DIOGRAPH,
  payload: { diograph },
})

export const updateDiograph =
  () =>
  (dispatch, _, { dioryClient: adapter }) => {
    adapter.saveRoom().then(() => {
      dispatch(updateDiographAction(adapter.getDiograph()))
    })
  }

export const addDiograph =
  (diographData) =>
  (dispatch, _, { dioryClient: adapter }) => {
    adapter.diograph.initialise(diographData)
    dispatch(updateDiograph())
  }

export const createDiory =
  (dioryData, alias) =>
  (dispatch, _, { dioryClient: adapter }) => {
    const diory = adapter.diograph.addDiory(dioryData, alias)
    dispatch(updateDiograph())
    return { diory: diory.toObject() }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { dioryClient: adapter }) => {
    adapter.diograph.updateDiory(dioryData)
    dispatch(updateDiograph())
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, _, { dioryClient: adapter }) => {
    adapter.diograph.removeDiory(dioryData)
    dispatch(updateDiograph())
  }

export const createLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { dioryClient: adapter }) => {
    adapter.diograph.addDioryLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph())
  }

export const deleteLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { dioryClient: adapter }) => {
    adapter.diograph.removeDioryLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph())
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { dioryClient: adapter }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      adapter.diograph.removeDioryLink(fromDiory, toDiory)
    })
    dispatch(updateDiograph())
  }

export const resetDiograph =
  () =>
  async (dispatch, getState, { dioryClient: adapter }) => {
    adapter.diograph.resetDiograph()
    dispatch(updateDiograph())
  }
