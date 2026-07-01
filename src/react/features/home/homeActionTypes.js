import { createActions } from '../../store/storeUtils'

export const GET_HOME_DIOGRAPH = 'GET_HOME_DIOGRAPH'
export const SAVE_HOME_DIOGRAPH = 'SAVE_HOME_DIOGRAPH'
export const SET_IS_HOME = 'SET_IS_HOME'

export const getHomeDiographActions = createActions(GET_HOME_DIOGRAPH)
export const saveHomeDiographActions = createActions(SAVE_HOME_DIOGRAPH)
