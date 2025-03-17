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

const getDiographBegin = (state, { payload: { key } }) => ({
  ...state,
  loading: {
    ...state.loading,
    [key]: true,
  },
})

const getDiographSuccess = (state, { payload: { key } }) => ({
  ...state,
  loading: {
    ...state.loading,
    [key]: false,
  },
  loaded: {
    ...state.loaded,
    [key]: true,
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
  [UPDATE_DIOGRAPH]: updateDiograph,
})
