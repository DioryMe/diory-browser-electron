import { GET_DIOGRAPH, GENERATE_DIOGRAPH, UPDATE_DIOGRAPH } from './diographActionTypes'

import { createReducer, promiseReducers } from '../../store'
import { getDiosphereAddress } from './utils/getDiosphereAddress'
import { createActions } from '../../store/storeUtils'

const initialState = {
  diograph: {},
  loading: {},
  loaded: {},
  error: {},
}

const getDiographActions = createActions(GET_DIOGRAPH)

const getDiographBegin = (state, { payload: { address } }) => ({
  ...state,
  loading: {
    ...state.loading,
    [address]: true,
  },
})

const getDiographSuccess = (state, { payload: { address } }) => ({
  ...state,
  loading: {
    ...state.loading,
    [address]: false,
  },
  loaded: {
    ...state.loaded,
    [address]: true,
  },
})

const updateDiograph = (state, { payload: { diograph, address: diographAddress } }) => ({
  ...state,
  diograph: Object.entries(diograph).reduce((obj, [address, diory]) => {
    const diosphereAddress = getDiosphereAddress(diographAddress, address)
    obj[diosphereAddress] = diory
    return obj
  }, state.diograph),
})

export default createReducer(initialState, {
  ...promiseReducers(GENERATE_DIOGRAPH, 'generating', 'generated', 'error'),
  [getDiographActions.begin().type]: getDiographBegin,
  [getDiographActions.success().type]: getDiographSuccess,
  [UPDATE_DIOGRAPH]: updateDiograph,
})
