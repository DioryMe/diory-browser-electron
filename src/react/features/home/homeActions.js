import { SET_STORE, GET_HOME_CONNECTION, SAVE_HOME_CONNECTION } from './homeActionTypes'
import { createActions } from '../../store/storeUtils'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

const getHomeConnectionActions = createActions(GET_HOME_CONNECTION)
export const getHomeConnection = () => async (dispatch, getState) => {
  const { loading } = getState().home
  if (!loading) {
    dispatch(getHomeConnectionActions.begin())
    try {
      const { connection } = await invokeChannel(channels.GET_DIORY_HOME_CONNECTION) // TODO refactor
      dispatch(getHomeConnectionActions.success(connection))
    } catch (error) {
      console.error(error)
      dispatch(getHomeConnectionActions.failure(error))
    }
  }
}

const saveHomeConnectionActions = createActions(SAVE_HOME_CONNECTION)
export const saveHomeConnection = (connection) => async (dispatch, getState) => {
  const { saving } = getState().home
  if (!saving) {
    dispatch(saveHomeConnectionActions.begin())
    try {
      await invokeChannel(channels.SAVE_DIORY_HOME_CONNECTION, { connection })
      dispatch(saveHomeConnectionActions.success({ connection }))
    } catch (error) {
      dispatch(saveHomeConnectionActions.failure(error))
    }
  }
}

export const setStore = (storeId) => ({
  type: SET_STORE,
  payload: { storeId },
})
