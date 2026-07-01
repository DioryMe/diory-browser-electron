import {
  generateDiographActions,
  getDiographActions,
  SET_DIOGRAPH_ADDRESS,
  SET_DIOGRAPH_PATH,
  UPDATE_DIOGRAPH,
} from './diographActionTypes'

import { createReducer } from '../../store'
import { resolveDiographKey } from './utils/diographUtils'
import loading from './utils/loading.gif'

const initialState = {
  address: null,
  isDiory: false,
  diograph: {},
  loading: {},
  loaded: {},
  error: {},
}

const getDiographBegin = (state, { payload: { address, path } }) => ({
  ...state,
  diograph: {
    [path]: {
      id: path,
      text: `Loading... ${path}`,
      image: loading,
    },
    ...state.diograph,
  },
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
    // const diographKey = resolveDiographKey(address, key)
    // console.log(key, diographKey)
    if (diory != null) obj[key] = diory
    return obj
  }, {}),
})

export const setDiographAddress = (state, { payload: { address, isDiory } }) => ({
  ...state,
  address,
  isDiory,
  diograph: {},
})

export const setDiographPath = (state, { payload: { path } }) => ({
  ...state,
  path,
})

export default createReducer(initialState, {
  [getDiographActions.begin().type]: getDiographBegin,
  [getDiographActions.success().type]: getDiographSuccess,
  [getDiographActions.failure().type]: getDiographFailure,
  [generateDiographActions.begin().type]: getDiographBegin,
  [generateDiographActions.success().type]: getDiographSuccess,
  [generateDiographActions.failure().type]: getDiographFailure,
  [UPDATE_DIOGRAPH]: updateDiograph,
  [SET_DIOGRAPH_ADDRESS]: setDiographAddress,
  [SET_DIOGRAPH_PATH]: setDiographPath,
})
