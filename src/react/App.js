import React from 'react'
import { reducerWithMiddleware } from './utils/middleware'
import { StoreProvider, reducer, initialState } from './store'

import { useDocumentTitle } from './features/navigation/hooks'
import { useChannel } from './features/connector/hooks'

import Navigation from './features/navigation/Navigation'
import Tools from './features/tools/Tools'
import View from './View'

const App = () => {
  useDocumentTitle()
  useChannel()
  return (
    <div className="App">
      <Navigation />
      <Tools />
      <View />
    </div>
  )
}

const AppWithStore = () => (
  <StoreProvider
    reducer={reducerWithMiddleware(reducer)}
    initialState={initialState}
  >
    <App />
  </StoreProvider>
)

export default AppWithStore
