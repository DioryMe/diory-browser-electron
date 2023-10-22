import { SAVE_DIOSPHERE, GET_DIOSPHERE } from './diosphereActionTypes'
import { createActions } from '../../store/storeUtils'

const getDiosphereActions = createActions(GET_DIOSPHERE)
export const getDiosphere =
  (address) =>
  async (dispatch, getState, { connectors }) => {
    const { loading } = getState().diosphere
    if (!loading) {
      dispatch(getDiosphereActions.begin())
      try {
        const diosphere = await connectors.folder.getDiosphere(address)
        dispatch(getDiosphereActions.success(diosphere))
      } catch (error) {
        console.log(error)
        dispatch(getDiosphereActions.failure(error.message))
      }
    }
  }

const saveDiosphereActions = createActions(SAVE_DIOSPHERE) // createPromiseActions, createPromiseReducers
export const saveDiosphere =
  (address) =>
  async (dispatch, getState, { connectors }) => {
    const { saving, rooms } = getState().diosphere
    if (!saving) {
      dispatch(saveDiosphereActions.begin())
      try {
        await connectors.folder.saveDiosphere(address, { rooms })
        dispatch(saveDiosphereActions.success())
      } catch (error) {
        console.log(error)
        dispatch(saveDiosphereActions.failure(error))
      }
    }
  }
