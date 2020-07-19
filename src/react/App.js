import React from 'react'
import { reducerWithMiddleware } from './utils/middleware'
import { StoreProvider } from './store/StoreContext'
import { reducer } from './store/reducer'
import { initialState } from './store/initialState'

import ButtonBar from './features/buttons/ButtonBar'
import Connector from './features/connector/Connector'
import Filters from './features/filters/Filters'
import Navigation from './features/navigation/Navigation'
import View from './View'

const App = () => (
  <div className="App">
    <Navigation />
    <ButtonBar />
    <View />
    <Connector />
    <Filters />
  </div>
)

const AppWithStore = () => (
  <StoreProvider reducer={reducerWithMiddleware(reducer)} initialState={initialState}>
    <App />
  </StoreProvider>
)

export default AppWithStore
