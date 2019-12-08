import * as types from '../actions'
import createReducer from './createReducer'

export const initialState = {
  diograph: {},
  updated: false,
}

export const setDiograph = (state, { payload }) => ({
  ...state,
  diograph: payload.diograph,
  updated: false,
})

export const addDiory = (state, { payload }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    [payload.diory.id]: payload.diory,
  },
  updated: true,
})

export const removeDiory = (state, { payload }) => {
  const { [payload.diory.id]: omit, ...diograph } = state.diograph
  return ({
    ...state,
    diograph,
    updated: true,
  })
};

export const updateDiory = (state, { payload }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    [payload.diory.id]: payload.diory,
  },
  updated: true,

});

export default createReducer({
  [types.SET_DIOGRAPH]: setDiograph,
  [types.ADD_DIORY]: addDiory,
  [types.REMOVE_DIORY]: removeDiory,
  [types.UPDATE_DIORY]: updateDiory,
});
