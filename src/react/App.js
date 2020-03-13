import React from 'react'

import { reducerWithMiddleware } from './middleware'
import { StoreProvider, reducer, initialState } from './store'

import Controller from './Controller'
import View from './View'

const App = () => (
  <StoreProvider reducer={reducerWithMiddleware(reducer)} initialState={initialState}>
    <div className="App">
      <Controller />
      <View />
    </div>
  </StoreProvider>
)

export default App
