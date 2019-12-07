import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider
    value={useReducer(reducer, initialState)}
    children={children}
  />
)

export const useStore = (selector) => {
  const [state, dispatch] = useContext(StateContext);
  const selectedState = selector(state);
  return [selectedState, dispatch]
}
