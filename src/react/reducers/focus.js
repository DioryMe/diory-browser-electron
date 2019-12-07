import * as types from '../actions/actionTypes'
import createReducer from './createReducer'

export const initialState = {
  focus: undefined,
  backward: [],
  forward: [],
}

export const setFocus = (state, { payload }) => ({
  ...state,
  focus: payload.focus,
  backward: [state.focus, ...state.backward],
  forward: [],
});

export const goBackward = (state) => {
  const [focus, ...backward] = state.backward
  return ({
    ...state,
    focus,
    backward,
    forward: [state.focus, ...state.forward],
  })
};

export const goForward = (state) => {
  const [focus, ...forward] = state.forward
  return ({
    ...state,
    focus,
    backward: [state.focus, ...state.backward],
    forward,
  })
};

export default createReducer({
  [types.SET_FOCUS]: setFocus,
  [types.GO_BACKWARD]: goBackward,
  [types.GO_FORWARD]: goForward,
});
