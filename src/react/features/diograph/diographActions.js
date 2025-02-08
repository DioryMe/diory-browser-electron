import { UPDATE_DIOGRAPH, GENERATE_DIOGRAPH, GET_DIOGRAPH } from './diographActionTypes'
import { createActions } from '../../store/storeUtils'

const updateDiographAction = (diograph) => ({
  type: UPDATE_DIOGRAPH,
  payload: { diograph },
})

export const updateDiograph =
  () =>
  (dispatch, getState, { diographClient }) => {
    const { connection } = getState().home
    dispatch(updateDiographAction(diographClient.diographs[connection].toObject()))
  }

export const createDiory =
  (dioryData, alias) =>
  (dispatch, getState, { diographClient }) => {
    const { connection } = getState().home
    const diory = diographClient.diographs[connection].addDiory(dioryData, alias)
    dispatch(updateDiograph())
    return { diory: diory.toObject() }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { diographClient }) => {
    const { connection } = getState().home
    diographClient.diographs[connection].updateDiory(dioryData)
    dispatch(updateDiograph())
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, getState, { diographClient }) => {
    const { connection } = getState().home
    diographClient.diographs[connection].removeDiory(dioryData)
    dispatch(updateDiograph())
  }

export const createLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographClient }) => {
    diographClient.diograph.getDiory(dioryObject).addLink({ id: linkedDioryObject.id })
    dispatch(updateDiograph())
  }

export const deleteLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographClient }) => {
    diographClient.diograph.getDiory(dioryObject).removeLink({ id: linkedDioryObject.id })
    dispatch(updateDiograph())
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { diographClient }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      diographClient.diograph.getDiory(fromDiory).removeLink(fromDiory, { id: toDiory.id })
    })
    dispatch(updateDiograph())
  }

export const resetDiograph =
  () =>
  async (dispatch, getState, { diographClient }) => {
    diographClient.diograph.resetDiograph()
    dispatch(updateDiograph())
  }

const getDiographActions = createActions(GET_DIOGRAPH)
export const getDiograph =
  (connection) =>
  async (dispatch, getState, { diographClient }) => {
    const { loading } = getState().diograph
    if (!loading) {
      dispatch(getDiographActions.begin())
      try {
        await diographClient.getDiograph(connection)
        dispatch(updateDiograph(connection))
        dispatch(getDiographActions.success())
      } catch (error) {
        console.error(error)
        dispatch(getDiographActions.failure(error))
      }
    }
  }

const generateDiographActions = createActions(GENERATE_DIOGRAPH)
export const generateDiograph =
  (connection) =>
  async (dispatch, getState, { diographClient }) => {
    const { generating } = getState().diograph
    if (!generating) {
      dispatch(generateDiographActions.begin())
      try {
        await diographClient.generateDiograph(connection)
        dispatch(updateDiograph())
        dispatch(generateDiographActions.success())
      } catch (error) {
        console.error(error)
        dispatch(generateDiographActions.failure(error))
      }
    }
  }
