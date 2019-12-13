import * as types from '../actions'
import createReducer from './createReducer'

export const initialState = {
  focus: undefined,
  backward: [],
  forward: [],
  path: [],
}

export const setFocus = (state, {payload}) => ({
  ...state,
  focus: payload.focus,
  backward: state.focus ? [state.focus, ...state.backward] : [],
  forward: [],
  path: [...state.path, payload.focus]
})

export const goBackward = (state) => {
  const [focus, ...backward] = state.backward
  return ({
    ...state,
    focus,
    backward,
    forward: [state.focus, ...state.forward],
    path: [...state.path].slice(0,-1)
  })
}

export const goForward = (state) => {
  const [focus, ...forward] = state.forward
  return ({
    ...state,
    focus,
    backward: [state.focus, ...state.backward],
    forward,
    path: [...state.path, focus]
  })
}

export const goHome = (state) => {
  const home = state.path.slice(0, 1)
  return ({
    ...state,
    focus: home,
    backward: [state.focus, ...state.backward],
    forward: [],
    path: [home],
  })
}

export default createReducer({
  [types.SET_FOCUS]: setFocus,
  [types.GO_BACKWARD]: goBackward,
  [types.GO_FORWARD]: goForward,
  [types.GO_HOME]: goHome,
})
