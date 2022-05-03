import React from 'react'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'

import { reducer } from './reducer'

const enhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const store = createStore(reducer, {}, enhancers)

const StoreProvider = ({ children }) => <Provider store={store}>{children}</Provider>

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default StoreProvider

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store
}
