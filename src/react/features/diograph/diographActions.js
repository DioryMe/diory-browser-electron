import { UPDATE_DIOGRAPH, GENERATE_DIOGRAPH, GET_DIOGRAPH } from './diographActionTypes'
import { createActions } from '../../store/storeUtils'

const updateDiographAction = (diograph, address) => ({
  type: UPDATE_DIOGRAPH,
  payload: { diograph, address },
})

export const updateDiograph =
  (address) =>
  (dispatch, getState, { diographClient }) => {
    dispatch(updateDiographAction(diographClient.getDiograph(address).toObject(), address))
  }

export const createDiory =
  (dioryData, alias) =>
  (dispatch, getState, { diographClient }) => {
    const { storyKey } = getState().navigation
    const diory = diographClient.getDiograph(storyKey).addDiory(dioryData, alias)
    dispatch(updateDiograph(storyKey))
    return { diory: diory.toObject() }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { diographClient }) => {
    diographClient.getDiograph(dioryData.key)
      .getDiory(dioryData)
      .update(dioryData)
    dispatch(updateDiograph(dioryData.key))
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, getState, { diographClient }) => {
    diographClient.getDiograph(dioryData.key).removeDiory(dioryData)
    dispatch(updateDiograph(dioryData.key))
  }

export const createLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographClient }) => {
    diographClient.getDiograph(dioryObject.key)
      .getDiory(dioryObject)
      .addLink({ id: linkedDioryObject.key })
    dispatch(updateDiograph(dioryObject.key))
  }

export const deleteLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographClient }) => {
    diographClient.getDiograph(dioryObject.key)
      .getDiory(dioryObject)
      .removeLink(linkedDioryObject)
    dispatch(updateDiograph(dioryObject.key))
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { diographClient }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      diographClient.getDiograph(fromDiory.key)
        .getDiory(fromDiory)
        .removeLink(toDiory)
    })
    dispatch(updateDiograph(deletedLinks[0].fromDiory.key))
  }

export const resetDiograph =
  () =>
  async (dispatch, getState, { diographClient }) => {
    diographClient.diograph.resetDiograph()
    dispatch(updateDiograph())
  }

const getDiographActions = createActions(GET_DIOGRAPH)
export const getDiograph =
  (address) =>
  async (dispatch, getState, { diographClient }) => {
    const { loading, loaded } = getState().diograph
    if (!loading[address] && !loaded[address]) {
      dispatch(getDiographActions.begin({ address }))
      try {
        await diographClient.fetchDiograph(address)
        dispatch(updateDiograph(address))
        dispatch(getDiographActions.success({ address }))
      } catch (error) {
        console.error(error)
        dispatch(getDiographActions.failure(error))
      }
    }
  }
