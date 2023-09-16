import { GET_HOME, SAVE_HOME } from './homeActionTypes'
import { createActions } from '../../store/storeUtils'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'
import { resetStore } from '../../store/actions'
import { setRoom } from '../room/roomActions'
import { selectRoom } from '../navigation/navigationActions'

const getHomeActions = createActions(GET_HOME)
export const getHome = () => async (dispatch, getState) => {
  const { loading } = getState().home
  if (!loading) {
    dispatch(getHomeActions.begin())
    try {
      const { dioryFolderLocation } = await invokeChannel(channels.GET_DIORY_FOLDER_LOCATION) // TODO refactor
      const connections = [{ address: dioryFolderLocation }]
      const room = { id: 'home-room', connections }
      dispatch(getHomeActions.success(room)) // TODO what is stored to app?
      dispatch(setRoom(room))
      console.log(room)
      dispatch(selectRoom(room.id))
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
      await invokeChannel(channels.SET_DIORY_FOLDER_LOCATION, address)
      dispatch(resetStore())
      dispatch(saveHomeActions.success({ connections }))
    } catch (error) {
      dispatch(saveHomeActions.failure(error))
    }
  }
}
