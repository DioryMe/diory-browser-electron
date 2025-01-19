import { UPDATE_DIOGRAPH, GET_DIOGRAPH } from './diographActionTypes'
import { createActions } from '../../store/storeUtils'
import { selectStory } from './navigationActions'

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
    dioryClient.initialise(diographData)
    dispatch(updateDiograph())
  }

export const createDiory =
  (dioryData, alias) =>
  (dispatch, _, { dioryClient }) => {
    const diory = dioryClient.diograph.addDiory(dioryData, alias)
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
    dioryClient.diograph.getDiory(dioryObject).addLink({ id: linkedDioryObject.id })
    dispatch(updateDiograph())
  }

export const deleteLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { dioryClient }) => {
    dioryClient.diograph.getDiory(dioryObject).removeLink({ id: linkedDioryObject.id })
    dispatch(updateDiograph())
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { dioryClient }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      dioryClient.diograph.getDiory(fromDiory).removeLink(fromDiory, { id: toDiory.id })
    })
    dispatch(updateDiograph())
  }

export const resetDiograph =
  () =>
  async (dispatch, getState, { dioryClient }) => {
    dioryClient.diograph.resetDiograph()
    dispatch(updateDiograph())
  }

const getDiographActions = createActions(GET_DIOGRAPH)
export const getDiograph =
  (connection) =>
  async (dispatch, getState, { dioryClient }) => {
    const { loading } = getState().diory
    if (!loading) {
      dispatch(getDiographActions.begin())
      try {
        await dioryClient.getDiograph([connection])
        dispatch(updateDiograph())
        dispatch(selectStory(dioryClient.diograph.getDiory({ id: '/' }).toObject()))
        dispatch(getDiographActions.success())
      } catch (error) {
        console.error(error)
        dispatch(getDiographActions.failure(error))
      }
    }
  }
