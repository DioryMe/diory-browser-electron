import React from 'react'
import Home from './features/home/Home'

import { reducerWithMiddleware } from './utils/middleware'
import { StoreProvider } from './store/StoreContext'
import { reducer } from './store/reducer'
import { initialState } from './store/initialState'

const App = () => (
  <StoreProvider reducer={reducerWithMiddleware(reducer)} initialState={initialState}>
    <Home />
  </StoreProvider>
)

export default App
