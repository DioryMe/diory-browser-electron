import { GET_HOME_ADDRESS, SAVE_HOME_ADDRESS } from './homeActionTypes'
import { createActions } from '../../store/storeUtils'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

const getHomeAddressActions = createActions(GET_HOME_ADDRESS)
export const getHomeAddress = () => async (dispatch, getState) => {
  const { loading } = getState().home
  if (!loading) {
    dispatch(getHomeAddressActions.begin())
    try {
      const { address } = await invokeChannel(channels.GET_DIORY_HOME_ADDRESS) // TODO refactor
      dispatch(getHomeAddressActions.success({ address }))
    } catch (error) {
      console.error(error)
      dispatch(getHomeAddressActions.failure(error))
    }
  }
}

const saveHomeAddressActions = createActions(SAVE_HOME_ADDRESS)
export const saveHomeAddress = (address) => async (dispatch, getState) => {
  const { saving } = getState().home
  if (!saving) {
    dispatch(saveHomeAddressActions.begin())
    try {
      await invokeChannel(channels.SAVE_DIORY_HOME_ADDRESS, { address })
      dispatch(saveHomeAddressActions.success({ address }))
    } catch (error) {
      dispatch(saveHomeAddressActions.failure(error))
    }
  }
}
