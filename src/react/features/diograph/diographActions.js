import { UPDATE_DIOGRAPH, GENERATE_DIOGRAPH, GET_DIOGRAPH } from './diographActionTypes'
import { createActions } from '../../store/storeUtils'
import { getAddressPath } from './utils/getAddressPath'

const updateDiographAction = (diograph, address) => ({
  type: UPDATE_DIOGRAPH,
  payload: { diograph, address },
})

const getDiographInstance = (diographClient, address) => {
  const connection = getAddressPath(address)
  return diographClient.diographs[connection]
}

export const updateDiograph =
  (connectionId) =>
  (dispatch, getState, { diographClient }) => {
    dispatch(updateDiographAction(getDiographInstance(diographClient, connectionId).toObject(), connectionId))
  }

export const createDiory =
  (dioryData, alias) =>
  (dispatch, getState, { diographClient }) => {
    const { storyId } = getState().navigation
    const diory = getDiographInstance(diographClient, storyId).addDiory(dioryData, alias)
    dispatch(updateDiograph(storyId))
    return { diory: diory.toObject() }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { diographClient }) => {
    console.log(getDiographInstance(diographClient, dioryData.address))
    getDiographInstance(diographClient, dioryData.address)
      .getDiory(dioryData)
      .update(dioryData)
    dispatch(updateDiograph(dioryData.address))
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, getState, { diographClient }) => {
    getDiographInstance(diographClient, dioryData.address).removeDiory(dioryData)
    dispatch(updateDiograph(dioryData.address))
  }

export const createLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographClient }) => {
    getDiographInstance(diographClient, dioryObject.address)
      .getDiory(dioryObject)
      .addLink({ id: linkedDioryObject.address })
    dispatch(updateDiograph(dioryObject.address))
  }

export const deleteLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographClient }) => {
    getDiographInstance(diographClient, dioryObject.address)
      .getDiory(dioryObject)
      .removeLink(linkedDioryObject)
    dispatch(updateDiograph(dioryObject.address))
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { diographClient }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      getDiographInstance(diographClient, fromDiory.address)
        .getDiory(fromDiory)
        .removeLink(toDiory)
    })
    dispatch(updateDiograph(deletedLinks[0].fromDiory.address))
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
