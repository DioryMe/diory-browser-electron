import { createActions } from '../../store/storeUtils'

export const GET_HOME_ADDRESS = 'GET_HOME_ADDRESS'
export const SAVE_HOME_ADDRESS = 'SAVE_HOME_ADDRESS'
export const SET_IS_HOME = 'SET_IS_HOME'

export const getHomeAddressActions = createActions(GET_HOME_ADDRESS)
export const saveHomeAddressActions = createActions(SAVE_HOME_ADDRESS)
