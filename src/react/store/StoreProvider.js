import React from 'react'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { DiographClient } from '@diograph/diograph'

import { reducer } from './reducer'

const dioryClient = new DiographClient([window.localClient])
const diosphereClient = new DiographClient([window.localClient])

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({ dioryClient, diosphereClient })))
)

const StoreProvider = ({ children }) => <Provider store={store}>{children}</Provider>

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default StoreProvider

// expose store when run in Cypress
if (window.Cypress || process.env.NODE_ENV === 'development') {
  window.store = store
}
