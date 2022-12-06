import React from 'react'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'

import { Diograph } from 'diograph-js'
import { reducer } from './reducer'
import { createClient } from '../clients'

const client = createClient()

const diographStore = new Diograph()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({ diographStore, client })))
)

const StoreProvider = ({ children }) => <Provider store={store}>{children}</Provider>

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default StoreProvider

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store
}
