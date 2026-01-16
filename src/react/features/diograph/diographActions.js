import {
  SET_DIOGRAPH_ADDRESS,
  UPDATE_DIOGRAPH,
  getDiographActions,
  generateDiographActions,
} from './diographActionTypes'

export const setDiographAddress = (address, isDiory) => ({
  type: SET_DIOGRAPH_ADDRESS,
  payload: { address, isDiory },
})

export const updateDiographAction = (diograph, address) => ({
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
    const { address } = getState().diograph
    const diory = diographClient.getDiograph(dioryData.key || address).addDiory(dioryData, alias)
    dispatch(updateDiograph(dioryData.key || address))
    return { diory: diory.toObject(), key: `${address}${diory.id}` }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { diographClient }) => {
    diographClient.getDiograph(dioryData.key).getDiory(dioryData).update(dioryData)
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
    const address = dioryObject.key || getState().diograph.address
    const id = diographClient.getDiograph(address).diograph[linkedDioryObject.id]
      ? linkedDioryObject.id
      : linkedDioryObject.key
    diographClient.getDiograph(address).getDiory(dioryObject).addLink({ id })
    dispatch(updateDiograph(address))
  }

export const deleteLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographClient }) => {
    const address = dioryObject.key || getState().diograph.address
    const id = diographClient.getDiograph(address).diograph[linkedDioryObject.id]
      ? linkedDioryObject.id
      : linkedDioryObject.key
    diographClient.getDiograph(address).getDiory(dioryObject).removeLink({ id })
    dispatch(updateDiograph(address))
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { diographClient }) => {
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      const diory = diographClient.getDiograph(fromDiory.key).getDiory(fromDiory)
      const links = [
        toDiory.id,
        `${toDiory.key.split('/').slice(0, -1).join('/')}/`,
        `/${toDiory.key.split('/').at(-2)}/`,
      ]
      const linkedDiory = (diory.links || []).find(({ id }) => links.includes(id))
      if (!linkedDiory) {
        console.log('Link not found', diory.links)
      }
      diory.removeLink(linkedDiory)
    })
    dispatch(updateDiograph(deletedLinks[0].fromDiory.key))
  }

export const resetDiograph =
  (address) =>
  async (dispatch, getState, { diographClient }) => {
    diographClient.getDiograph(address).resetDiograph()
    dispatch(updateDiograph(address))
  }

export const getDiograph =
  (address) =>
  async (dispatch, getState, { diographClient }) => {
    const { loading, loaded } = getState().diograph
    if (!loading[address] && !loaded[address]) {
      dispatch(getDiographActions.begin({ address }))
      try {
        await diographClient.fetchDiograph(address, saveInProd)
        dispatch(getDiographActions.success({ address }))
        dispatch(updateDiograph(address))
      } catch (error) {
        console.error(error)
        dispatch(getDiographActions.failure({ address, error }))
      }
    }
  }

const saveInProd = process.env.NODE_ENV !== 'development'
export const generateDiograph =
  (address) =>
  async (dispatch, getState, { diographClient }) => {
    const { loading, loaded } = getState().diograph
    if (!loading[address] && !loaded[address]) {
      dispatch(generateDiographActions.begin({ address }))
      try {
        await diographClient.generateDiograph(address, saveInProd)
        dispatch(generateDiographActions.success({ address }))
        dispatch(updateDiograph(address))
      } catch (error) {
        console.error(error)
        dispatch(generateDiographActions.failure({ address, error }))
      }
    }
  }
