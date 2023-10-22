import { GET_HOME, SAVE_HOME } from './homeActionTypes'
import { createActions } from '../../store/storeUtils'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'
import { resetStore } from '../../store/actions'

const getHomeActions = createActions(GET_HOME)
export const getHome = () => async (dispatch, getState) => {
  const { loading } = getState().home
  if (!loading) {
    dispatch(getHomeActions.begin())
    try {
      const { dioryFolderLocation } = await invokeChannel(channels.GET_DIORY_FOLDER_LOCATION) // TODO refactor
      dispatch(getHomeActions.success({ address: dioryFolderLocation }))
    } catch (error) {
      dispatch(getHomeActions.failure(error))
    }
  }
}

const saveHomeActions = createActions(SAVE_HOME) // createPromiseActions, createPromiseReducers
export const saveHome = (address) => async (dispatch, getState) => {
  const { saving } = getState().home
  if (!saving) {
    dispatch(saveHomeActions.begin())
    try {
      await invokeChannel(channels.SET_DIORY_FOLDER_LOCATION, { address })
      dispatch(resetStore())
      dispatch(saveHomeActions.success({ address }))
    } catch (error) {
      dispatch(saveHomeActions.failure(error))
    }
  }
}
