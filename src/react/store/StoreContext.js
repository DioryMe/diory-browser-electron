import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { createContainer } from 'react-tracked'
import { getUntrackedDiograph } from '../utils'

const { Provider, useTracked } = createContainer(({ reducer, initialState }) =>
  useReducer(reducer, initialState)
)

export const StoreProvider = ({ reducer, initialState, children }) => (
  <Provider reducer={reducer} initialState={initialState} children={children} />
)

StoreProvider.defaultProps = {
  reducer: () => {},
}

StoreProvider.propTypes = {
  reducer: PropTypes.func,
  initialState: PropTypes.object,
  children: PropTypes.node,
}

export const useStore = (selector) => {
  const [state, dispatch] = useTracked()
  if (window.Cypress && process.env.NODE_ENV === 'development') {
    window.diographInStore = getUntrackedDiograph(state.diograph.diograph)
    window.handInStore = getUntrackedDiograph(state.tools.hand)
  }
  const selectedState = selector ? selector(state) : state
  return [selectedState, dispatch]
}

export const useDispatch = () => useTracked()[1]
