import React, { createContext, useContext, useReducer } from 'react'

const StoreContext = createContext()

export const StoreProvider = ({ reducer, initialState, children }) => (
  <StoreContext.Provider value={useReducer(reducer, initialState)} children={children} />
)

StoreProvider.defaultProps = {
  reducer: () => {},
}

export const useStore = (selector) => {
  const [state, dispatch] = useContext(StoreContext)
  const selectedState = selector ? selector(state) : state
  return [selectedState, dispatch]
}

export const useDispatch = () => useContext(StoreContext)[1]
