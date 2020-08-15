import React from 'react'

import { reducerWithMiddleware } from './utils/middleware'
import { StoreProvider } from './store/StoreContext'
import { reducer } from './store/reducer'
import { initialState } from './store/initialState'

import Navigation from './features/navigation/Navigation'
import Filters from './features/filters/Filters'
import Buttons from './features/buttons'
import View from './View'
import Home from './features/home/Home'
import Connectors from './features/connectors/Connectors'

const App = () => (
  <div className="App">
    <Navigation />
    <Filters />
    <View />
    <Home />
    <Buttons />
    <Connectors />
  </div>
)

const AppWithStore = () => (
  <StoreProvider reducer={reducerWithMiddleware(reducer)} initialState={initialState}>
    <App />
  </StoreProvider>
)

export default AppWithStore
