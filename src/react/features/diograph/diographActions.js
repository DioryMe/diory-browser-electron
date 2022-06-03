import {
  GET_DIOGRAPH,
  SAVE_DIOGRAPH_BEGIN,
  SAVE_DIOGRAPH_SUCCESS,
  SAVE_DIOGRAPH_FAILURE,
  ADD_DIOGRAPH,
  CREATE_DIORY,
  UPDATE_DIORY,
  DELETE_DIORY,
} from './diographActionTypes'

export const getDiograph = (diograph, rootId) => ({
  type: GET_DIOGRAPH,
  payload: { diograph, rootId },
})

export const saveDiograph =
  () =>
  async (dispatch, getState, { client }) => {
    const { saving } = getState().diograph
    if (!saving) {
      dispatch(saveDiographBegin())
      try {
        const { dioryFolderLocation } = getState().settings
        const { rootId, diograph } = getState().diograph
        await client.saveDiograph({
          dioryFolderLocation,
          rootId,
          diograph,
        })
        dispatch(saveDiographSuccess())
      } catch (error) {
        dispatch(saveDiographFailure(error))
      }
    }
  }

export const saveDiographBegin = () => ({
  type: SAVE_DIOGRAPH_BEGIN,
})

export const saveDiographSuccess = () => ({
  type: SAVE_DIOGRAPH_SUCCESS,
})

export const saveDiographFailure = () => ({
  type: SAVE_DIOGRAPH_FAILURE,
})

export const addDiograph = (diograph) => ({
  type: ADD_DIOGRAPH,
  payload: { diograph },
})

export const createDiory =
  (dioryData) =>
  (dispatch, _, { client }) => {
    const { diory } = client.createDiory(dioryData)
    dispatch({
      type: CREATE_DIORY,
      payload: { diory },
    })
  }

export const updateDiory =
  (dioryData) =>
  (dispatch, getState, { client }) => {
    const { diograph } = getState().diograph
    const { diory } = client.updateDiory(dioryData, diograph)
    dispatch({
      type: UPDATE_DIORY,
      payload: { diory },
    })
  }

export const deleteDiory =
  (dioryData) =>
  (dispatch, _, { client }) => {
    const { diory } = client.deleteDiory(dioryData)
    dispatch({
      type: DELETE_DIORY,
      payload: { diory },
    })
  }

export const createLink =
  (dioryData, linkData) =>
  (dispatch, getState, { client }) => {
    const { diograph } = getState().diograph
    const { diory } = client.createLink(dioryData.id, linkData.id, diograph)
    dispatch({
      type: UPDATE_DIORY,
      payload: { diory },
    })
  }

export const deleteLink =
  (from, to) =>
  (dispatch, getState, { client }) => {
    const { diograph } = getState().diograph
    const { diory } = client.deleteLink(from.id, to.id, diograph)
    dispatch({
      type: UPDATE_DIORY,
      payload: { diory },
    })
  }

export const deleteLinks =
  (deletedLinks) =>
  (dispatch, getState, { client }) => {
    const { diograph } = getState().diograph
    deletedLinks.forEach(({ fromDiory, toDiory }) => {
      const { diory } = client.deleteLink(fromDiory.id, toDiory.id, diograph)
      dispatch({
        type: UPDATE_DIORY,
        payload: { diory },
      })
    })
  }
