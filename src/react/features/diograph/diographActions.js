import { UPDATE_DIOGRAPH, GET_DIOGRAPH, SAVE_DIOGRAPH } from './diographActionTypes'

import { selectStory } from '../navigation/navigationActions'
import { createActions } from '../../store/storeUtils'

const saveDiographActions = createActions(SAVE_DIOGRAPH)

export const saveDiograph =
  () =>
  async (dispatch, getState, { diographStore, connectors }) => {
    const { saving } = getState().diograph
    if (!saving) {
      dispatch(saveDiographActions.begin())
      try {
        const { address } = getState().room
        const diograph = diographStore.toObject()
        await connectors.folder.saveDiograph({ diograph, address })
        dispatch(saveDiographActions.success())
      } catch (error) {
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
    dispatch(saveDiograph())
  }

export const createDiory =
  (dioryData) =>
  (dispatch, _, { diographStore }) => {
    const diory = diographStore.addDiory(dioryData)
    dispatch(updateDiograph(diographStore.toObject()))
    dispatch(saveDiograph())
    return { diory: diory.toObject() }
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
    console.log(linkedDioryObject)
    diographStore.addDioryLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph(diographStore.toObject()))
    dispatch(saveDiograph())
  }

export const deleteLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographStore }) => {
    diographStore.removeDioryLink(dioryObject, linkedDioryObject)
    dispatch(updateDiograph(diographStore.toObject()))
    dispatch(saveDiograph())
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { diographStore }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      diographStore.removeDioryLink(fromDiory, toDiory)
    })
    dispatch(updateDiograph(diographStore.toObject()))
    dispatch(saveDiograph())
  }

const getDiographActions = createActions(GET_DIOGRAPH)

export const getDiograph =
  () =>
  async (dispatch, getState, { diographStore, connectors }) => {
    const { loading } = getState().diograph
    if (!loading) {
      dispatch(getDiographActions.begin())
      try {
        const { address } = getState().room
        const { diograph } = await connectors.folder.getDiograph(address)
        diographStore.addDiograph(diograph)
        const rootId = Object.values(diographStore.toObject()).find(({ path }) => path === '/').id
        dispatch(getDiographActions.success({ diograph: diographStore.toObject(), rootId }))

        dispatch(selectStory({ id: rootId }))
      } catch (error) {
        dispatch(getDiographActions.failure(error))
      }
    }
  }
