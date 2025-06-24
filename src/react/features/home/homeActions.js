import { GET_HOME_CONNECTION, SAVE_HOME_CONNECTION } from './homeActionTypes'
import { createActions } from '../../store/storeUtils'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

const getHomeAddressActions = createActions(GET_HOME_CONNECTION)
export const getHomeAddress = () => async (dispatch, getState) => {
  const { loading } = getState().home
  if (!loading) {
    dispatch(getHomeAddressActions.begin())
    try {
      const { connection } = await invokeChannel(channels.GET_DIORY_HOME_CONNECTION) // TODO refactor
      const address = connection ? `${connection}/` : undefined
      dispatch(getHomeAddressActions.success({ address }))
    } catch (error) {
      console.error(error)
      dispatch(getHomeAddressActions.failure(error))
    }
  }
}

const saveHomeAddressActions = createActions(SAVE_HOME_CONNECTION)
export const saveHomeAddress = (connection) => async (dispatch, getState) => {
  const { saving } = getState().home
  if (!saving) {
    dispatch(saveHomeAddressActions.begin())
    try {
      await invokeChannel(channels.SAVE_DIORY_HOME_CONNECTION, { connection })
      dispatch(saveHomeAddressActions.success({ address: `${connection}/` }))
    } catch (error) {
      dispatch(saveHomeAddressActions.failure(error))
    }
  }
}
