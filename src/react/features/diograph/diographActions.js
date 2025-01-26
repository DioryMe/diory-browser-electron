import { UPDATE_DIOGRAPH, GENERATE_DIOGRAPH, GET_DIOGRAPH } from './diographActionTypes'
import { createActions } from '../../store/storeUtils'
import { selectStory } from '../navigation/navigationActions'

const updateDiographAction = (diograph) => ({
  type: UPDATE_DIOGRAPH,
  payload: { diograph },
})

export const updateDiograph =
  () =>
  (dispatch, _, { diographClient }) => {
    dispatch(updateDiographAction(diographClient.diograph.toObject()))
  }

export const createDiory =
  (dioryData, alias) =>
  (dispatch, _, { diographClient }) => {
    const diory = diographClient.diograph.addDiory(dioryData, alias)
    dispatch(updateDiograph())
    return { diory: diory.toObject() }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { diographClient }) => {
    diographClient.diograph.updateDiory(dioryData)
    dispatch(updateDiograph())
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, _, { diographClient }) => {
    diographClient.diograph.removeDiory(dioryData)
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
        await diographClient.getDiograph([connection])
        dispatch(updateDiograph())
        dispatch(selectStory(diographClient.diograph.getDiory({ id: '/' }).toObject()))
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
        await diographClient.generateDiograph([connection])
        dispatch(updateDiograph())
        dispatch(generateDiographActions.success())
      } catch (error) {
        console.error(error)
        dispatch(generateDiographActions.failure(error))
      }
    }
  }
