import { GET_HOME, SAVE_HOME, ENTER_ROOM } from './homeActionTypes'
import { createActions } from '../../store/storeUtils'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'
import { resetStore } from '../../store/actions'

import { selectRoom, selectStory } from '../navigation/navigationActions'
import { updateDiosphere } from '../diosphere/diosphereActions'
import { updateDiograph } from '../diograph/diographActions'

const getHomeActions = createActions(GET_HOME)
export const initialiseHome =
  () =>
  async (dispatch, getState, { dioryClient }) => {
    const { loading } = getState().home
    if (!loading) {
      dispatch(getHomeActions.begin())
      try {
        const { dioryFolderLocation } = await invokeChannel(channels.GET_DIORY_FOLDER_LOCATION) // TODO refactor
        await dioryClient.initialise([{ address: dioryFolderLocation, client: 'LocalClient' }])
        dispatch(updateDiosphere())
        dispatch(selectRoom(dioryClient.room.toObject()))
        dispatch(getHomeActions.success({ address: dioryFolderLocation }))
      } catch (error) {
        console.error(error)
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

const enterRoomActions = createActions(ENTER_ROOM)
export const enterRoom =
  (room) =>
  async (dispatch, getState, { dioryClient }) => {
    const { loading } = getState().diosphere
    if (!loading) {
      dispatch(enterRoomActions.begin())
      try {
        await dioryClient.enterRoom(room)
        dispatch(updateDiograph())
        dispatch(selectStory(dioryClient.diory.toObject()))
        dispatch(enterRoomActions.success())
      } catch (error) {
        console.error(error)
        dispatch(enterRoomActions.failure(error))
      }
    }
  }
