import * as types from '../actions/actionTypes'
import createReducer from './createReducer'

import diograph from './diograph.json'

export const initialState = {
  diograph
}

export const add = (state, { payload }) => ({
  ...state,
  diorys: [...state.diorys, payload.diory],
});

export const remove = (state, { payload }) => ({
  ...state,
  diorys: state.diorys.filter(t => t.id !== payload.diory.id),
});

export const update = (state, { payload }) => ({
  ...state,
  diorys: state.diorys.map(t => (t.id === payload.diory.id ? payload.diory : t)),
});

export const filter = (state, { payload }) => ({
  ...state,
  filter: payload.filter
});

export const showState = (state, { payload }) => ({
  ...state,
  state: payload.state
});

export default createReducer({
  [types.ADD_DIORY]: add,
  [types.REMOVE_DIORY]: remove,
  [types.UPDATE_DIORY]: update,
  [types.FILTER_DIORY]: filter,
  [types.SHOW_STATE]: showState,
});
