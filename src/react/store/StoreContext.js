import React, { useReducer } from 'react'
import { createContainer } from 'react-tracked'

const { Provider, useTracked } = createContainer(({ reducer, initialState }) =>
  useReducer(reducer, initialState)
)

export const StoreProvider = ({ reducer, initialState, children }) => (
  <Provider reducer={reducer} initialState={initialState} children={children} />
)

StoreProvider.defaultProps = {
  reducer: () => {},
}

export const useStore = (selector) => {
  const [state, dispatch] = useTracked()
  const selectedState = selector ? selector(state) : state
  return [selectedState, dispatch]
}

export const useDispatch = () => useTracked()[1]
