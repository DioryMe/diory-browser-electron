import { GET_DIOGRAPH, GENERATE_DIOGRAPH, UPDATE_DIOGRAPH } from './diographActionTypes'

import { createReducer, promiseReducers } from '../../store'
import { getDiographKey } from './utils/getDiographKey'
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

const getDiographFailure = (
  state,
  {
    payload: {
      error: { address, error },
    },
  }
) => ({
  ...state,
  loading: {
    ...state.loading,
    [address]: false,
  },
  error: {
    ...state.error,
    [address]: error,
  },
})

const updateDiograph = (state, { payload: { diograph, address } }) => ({
  ...state,
  diograph: Object.entries(diograph).reduce((obj, [key, diory]) => {
    const diographKey = getDiographKey(address, key)
    obj[diographKey] = diory
    return obj
  }, state.diograph),
})

export default createReducer(initialState, {
  ...promiseReducers(GENERATE_DIOGRAPH, 'generating', 'generated', 'error'),
  [getDiographActions.begin().type]: getDiographBegin,
  [getDiographActions.success().type]: getDiographSuccess,
  [getDiographActions.failure().type]: getDiographFailure,
  [UPDATE_DIOGRAPH]: updateDiograph,
})
