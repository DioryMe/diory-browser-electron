import { createActions } from '../../store/storeUtils'

export const GET_DIOGRAPH = 'GET_DIOGRAPH'
export const GENERATE_DIOGRAPH = 'GENERATE_DIOGRAPH'
export const UPDATE_DIOGRAPH = 'UPDATE_DIOGRAPH'
export const SET_DIOGRAPH_ADDRESS = 'SET_DIOGRAPH_ADDRESS'

export const getDiographActions = createActions(GET_DIOGRAPH)
export const generateDiographActions = createActions(GENERATE_DIOGRAPH)
