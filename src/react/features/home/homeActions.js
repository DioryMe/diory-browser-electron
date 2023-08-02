import { GET_HOME, SAVE_HOME } from './homeActionTypes'
import { createActions } from '../../store/storeUtils'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'
import { resetStore } from '../../store/actions'
import { setRoomConnections } from '../room/roomActions'

const getHomeActions = createActions(GET_HOME)
export const getHome = () => async (dispatch, getState) => {
  const { loading } = getState().home
  if (!loading) {
    dispatch(getHomeActions.begin())
    try {
      const { dioryFolderLocation } = await invokeChannel(channels.GET_DIORY_FOLDER_LOCATION)
      const connections = [{ address: dioryFolderLocation }]
      dispatch(getHomeActions.success({ connections }))
      console.log(connections)
      dispatch(setRoomConnections(connections))
    } catch (error) {
      dispatch(getHomeActions.failure(error))
    }
  }
}

const saveHomeActions = createActions(SAVE_HOME) // createPromiseActions, createPromiseReducers
export const saveHome = (connections) => async (dispatch, getState) => {
  const { saving } = getState().home
  if (!saving) {
    dispatch(saveHomeActions.begin())
    try {
      const { address } = connections[0]
      console.log(address)
      await invokeChannel(channels.SET_DIORY_FOLDER_LOCATION, address)
      dispatch(resetStore())
      dispatch(saveHomeActions.success({ connections }))
    } catch (error) {
      dispatch(saveHomeActions.failure(error))
    }
  }
}
