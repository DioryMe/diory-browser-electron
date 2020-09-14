import React from 'react'

import { reducerWithMiddleware } from './utils/middleware'
import { StoreProvider } from './store/StoreContext'
import { reducer } from './store/reducer'
import { initialState } from './store/initialState'

import Navigation from './features/navigation/Navigation'
import Filters from './features/filters/Filters'
import Lenses from './features/lenses/Lenses'
import Home from './features/home/Home'
import Buttons from './features/buttons'
import Connectors from './features/connectors/Connectors'

const App = () => (
  <div className="App">
    <Navigation />
    <Filters />
    <Lenses />
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
