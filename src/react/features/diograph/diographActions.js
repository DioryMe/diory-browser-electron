import { UPDATE_DIOGRAPH, GENERATE_DIOGRAPH, GET_DIOGRAPH } from './diographActionTypes'
import { createActions } from '../../store/storeUtils'
import { getAddressPath } from './utils/getAddressPath'

const updateDiographAction = (diograph, address) => ({
  type: UPDATE_DIOGRAPH,
  payload: { diograph, address },
})

export const updateDiograph =
  (connectionId) =>
  (dispatch, getState, { diographClient }) => {
    const connection = getAddressPath(connectionId)
    dispatch(updateDiographAction(diographClient.diographs[connection].toObject(), connectionId))
  }

export const createDiory =
  (dioryData, alias) =>
  (dispatch, getState, { diographClient }) => {
    const { storyId } = getState().navigation
    const connection = getAddressPath(storyId)
    const diory = diographClient.diographs[connection].addDiory(dioryData, alias)
    dispatch(updateDiograph())
    return { diory: diory.toObject() }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { diographClient }) => {
    const { storyId } = getState().navigation
    const connection = getAddressPath(storyId)
    diographClient.diographs[connection].updateDiory(dioryData)
    dispatch(updateDiograph(connection))
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, getState, { diographClient }) => {
    const { storyId } = getState().navigation
    const connection = getAddressPath(storyId)
    diographClient.diographs[connection].removeDiory(dioryData)
    dispatch(updateDiograph(connection))
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
  (address) =>
  async (dispatch, getState, { diographClient }) => {
    const { loading, loaded } = getState().diograph
    if (!loading[address] && !loaded[address]) {
      dispatch(getDiographActions.begin({ address }))
      try {
        const connection = getAddressPath(address)
        await diographClient.getDiograph(connection)
        dispatch(updateDiograph(address))
        dispatch(getDiographActions.success({ address }))
      } catch (error) {
        console.error(error)
        dispatch(getDiographActions.failure(error))
      }
    }
  }

const generateDiographActions = createActions(GENERATE_DIOGRAPH)
export const generateDiograph =
  (address) =>
  async (dispatch, getState, { diographClient }) => {
    const { generating } = getState().diograph
    if (!generating) {
      dispatch(generateDiographActions.begin({ address }))
      try {
        await diographClient.generateDiograph(address)
        dispatch(updateDiograph())
        dispatch(generateDiographActions.success({ address }))
      } catch (error) {
        console.error(error)
        dispatch(generateDiographActions.failure(error))
      }
    }
  }
