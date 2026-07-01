import {
  SET_DIOGRAPH_ADDRESS,
  SET_DIOGRAPH_PATH,
  UPDATE_DIOGRAPH,
  getDiographActions,
  generateDiographActions,
} from './diographActionTypes'

export const setDiographAddress = (address, isDiory) => ({
  type: SET_DIOGRAPH_ADDRESS,
  payload: { address, isDiory },
})

export const setDiographPath = (path, isDiory) => ({
  type: SET_DIOGRAPH_PATH,
  payload: { path, isDiory },
})

export const updateDiographAction = (diograph, address) => ({
  type: UPDATE_DIOGRAPH,
  payload: { diograph, address },
})

export const updateDiograph =
  (address, removedDiory) =>
  (dispatch, getState, { diographClient }) => {
    console.log('updateDiograph', address, removedDiory)
    const diograph = diographClient.getDiograph(address).toObject()

    // TODO mark diory as deleted
    if (removedDiory) {
      diograph[removedDiory.id] = null
    }
    dispatch(updateDiographAction(diograph, address))
  }

export const createDiory =
  (dioryData, alias) =>
  (dispatch, getState, { diographClient }) => {
    console.log('createDiory', dioryData, alias)
    const { address } = getState().diograph
    const diory = diographClient.getDiograph(dioryData.key || address).addDiory(dioryData, alias)
    dispatch(updateDiograph(dioryData.key || address))
    return { diory: diory.toObject(), key: `${address}${diory.id}` }
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { diographClient }) => {
    console.log('updateDiory', dioryData)
    diographClient.getDiograph(dioryData.key).getDiory(dioryData).update(dioryData)
    dispatch(updateDiograph(dioryData.key))
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, getState, { diographClient }) => {
    console.log('deleteDiory', dioryData)
    diographClient.getDiograph(dioryData.key).removeDiory(dioryData)
    dispatch(updateDiograph(dioryData.key, dioryData))
  }

export const createLink =
  (dioryObject, linkedDioryObject) =>
  (dispatch, getState, { diographClient }) => {
    console.log('createLink', dioryObject, linkedDioryObject)
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
    console.log('deleteLink', dioryObject, linkedDioryObject)
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
    console.log('deleteLinks', deletedLinks)
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

export const generateDiory =
  (address, path = '/') =>
  async (dispatch, getState, { diographClient }) => {
    console.log('generateDiory', address)
    await diographClient.generateDiograph(address, path, { saveDiograph: true })
    const diory = diographClient.getDiograph(address).getDiory({ id: '/' })
    return {
      key: address,
      diory,
    }
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
    console.log('getDiograph', address, 'huuuuuu')
    const { loading, loaded } = getState().diograph
    if (!loading[address] && !loaded[address]) {
      dispatch(getDiographActions.begin({ address }))
      try {
        await diographClient.fetchDiograph(address)
        dispatch(getDiographActions.success({ address }))
      } catch (error) {
        console.error(error)
        dispatch(getDiographActions.failure({ address, error }))
      }
    }
  }

const saveDiograph = process.env.NODE_ENV !== 'development'
export const generateDiograph =
  (root, path) =>
  async (dispatch, getState, { diographClient }) => {
    const address = root + (path ? path.slice(1) : '')
    console.log('generateDiograph', address, path)
    const { loading } = getState().diograph
    if (!loading[address]) {
      dispatch(generateDiographActions.begin({ address, path }))
      try {
        await diographClient.generateDiograph(root, path, { saveDiograph })
        console.log(diographClient.diographs)
        dispatch(generateDiographActions.success({ address }))
        dispatch(updateDiograph(address))
      } catch (error) {
        console.error(error)
        dispatch(generateDiographActions.failure({ address, error }))
      }
    }
  }
