import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { createContainer, getUntrackedObject } from 'react-tracked'

// FIXME: Remove me, I am duplicated from useSaveRoomEffect.js
// Makes a copy of storeDiograph and deeply resolves the Proxy objects
function getUntrackedDiograph(diograph) {
  const untrackedDiograph = { ...getUntrackedObject(diograph) }
  if (untrackedDiograph) {
    Object.entries(untrackedDiograph).forEach(([key, value]) => {
      const untrackedLinks = getUntrackedObject(untrackedDiograph[key].links)
      if (untrackedLinks) {
        untrackedDiograph[key].links = { ...untrackedLinks }
      }
    })
  }
  return untrackedDiograph
}

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
  }
  const selectedState = selector ? selector(state) : state
  return [selectedState, dispatch]
}

export const useDispatch = () => useTracked()[1]
