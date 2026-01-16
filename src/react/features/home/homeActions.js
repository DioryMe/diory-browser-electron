import { getHomeAddressActions, saveHomeAddressActions, SET_IS_HOME } from './homeActionTypes'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const setIsHome = (isHome) => ({
  type: SET_IS_HOME,
  payload: { isHome },
})

export const getHomeAddress = () => async (dispatch, getState) => {
  const { loading } = getState().home
  if (!loading) {
    dispatch(getHomeAddressActions.begin())
    try {
      const { address } = await invokeChannel(channels.GET_HOME_ADDRESS) // TODO refactor
      dispatch(getHomeAddressActions.success({ address }))
    } catch (error) {
      console.error(error)
      dispatch(getHomeAddressActions.failure(error))
    }
  }
}

export const saveHomeAddress = (address) => async (dispatch, getState) => {
  const { saving } = getState().home
  if (!saving) {
    dispatch(saveHomeAddressActions.begin())
    try {
      await invokeChannel(channels.SAVE_HOME_ADDRESS, { address })
      dispatch(saveHomeAddressActions.success({ address }))
    } catch (error) {
      dispatch(saveHomeAddressActions.failure(error))
    }
  }
}
