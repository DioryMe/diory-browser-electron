import { UPDATE_DIOGRAPH } from './diographActionTypes'

const updateDiographAction = (diograph) => ({
  type: UPDATE_DIOGRAPH,
  payload: { diograph },
})

export const updateDiograph =
  () =>
  (dispatch, _, { dioryClient: adapter }) => {
    adapter.saveRoom().then(() => {
      dispatch(updateDiographAction(adapter.getDiograph().toObject()))
    })
  }

export const addDiograph =
  (diographData) =>
  (dispatch, _, { dioryClient: adapter }) => {
    adapter.getDiograph().initialise(diographData)
    dispatch(updateDiograph())
  }

export const createDiory =
  (dioryData, alias) =>
  (dispatch, _, { dioryClient: adapter }) => {
    const diory = adapter.getDiograph().addDiory(dioryData, alias)
    dispatch(updateDiograph())
    return { diory: diory.toObject() }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { dioryClient: adapter }) => {
    adapter.getDiograph().updateDiory(dioryData)
    dispatch(updateDiograph())
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, _, { dioryClient: adapter }) => {
    adapter.getDiograph().removeDiory(dioryData)
    dispatch(updateDiograph())
  }

export const createLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { dioryClient: adapter }) => {
    console.log('link diory', dioryObject)
    console.log('link linked objct', linkedDioryObject)
    adapter.getDiograph().addDioryLink({ id: dioryObject.id }, { id: linkedDioryObject.id })
    console.log('after creatLINK', adapter.getDiograph())
    dispatch(updateDiograph())
  }

export const deleteLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { dioryClient: adapter }) => {
    adapter.getDiograph().removeDioryLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph())
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { dioryClient: adapter }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      adapter.getDiograph().removeDioryLink(fromDiory, toDiory)
    })
    dispatch(updateDiograph())
  }

export const resetDiograph =
  () =>
  async (dispatch, getState, { dioryClient: adapter }) => {
    adapter.getDiograph().resetDiograph()
    dispatch(updateDiograph())
  }
