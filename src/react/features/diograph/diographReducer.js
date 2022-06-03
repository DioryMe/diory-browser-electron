import {
  GET_DIOGRAPH_SUCCESS,
  SAVE_DIOGRAPH,
  ADD_DIOGRAPH,
  CREATE_DIORY,
  DELETE_DIORY,
  UPDATE_DIORY,
} from './diographActionTypes'
import { promiseReducers, createReducer } from '../../store'

const initialState = {
  rootId: undefined,
  diograph: {},
  loaded: false,
  updated: false,
}

export const getDiographSuccess = (state, { payload: { diograph, rootId } }) => ({
  ...state,
  rootId,
  diograph,
  loaded: true,
  updated: false,
})

export const addDiograph = (state, { payload: { diograph } }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    ...diograph,
  },
  updated: true,
})

export const createDiory = (state, { payload }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    [payload.diory.id]: payload.diory,
  },
  updated: true,
})

export const deleteDiory = (state, { payload: { diory } }) => {
  // eslint-disable-next-line no-unused-vars
  const { [diory.id]: omit, ...diograph } = state.diograph
  return {
    ...state,
    diograph,
    updated: true,
  }
}

const updateDiory = (state, { payload }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    [payload.diory.id]: payload.diory,
  },
  updated: true,
})

export default createReducer(initialState, {
  [ADD_DIOGRAPH]: addDiograph,
  [GET_DIOGRAPH_SUCCESS]: getDiographSuccess,
  [CREATE_DIORY]: createDiory,
  [DELETE_DIORY]: deleteDiory,
  [UPDATE_DIORY]: updateDiory,
  ...promiseReducers(SAVE_DIOGRAPH, 'updated', 'saving', 'saved', 'error'),
})
