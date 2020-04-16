import React from 'react'
import { reducerWithMiddleware } from './utils/middleware'
import { StoreProvider } from './store/StoreContext'
import { reducer } from './store/reducer'
import { initialState } from './store/initialState'

import { useDocumentTitle } from './features/navigation/hooks'

import Connector from './features/connector/Connector'
import Navigation from './features/navigation/Navigation'
import ToolsBar from './features/tools/ToolsBar'
import Filters from './features/filters/Filters'
import View from './View'

const App = () => {
  useDocumentTitle()
  return (
    <div className="App">
      <Navigation />
      <ToolsBar />
      <View />
      <Connector />
      <Filters />
    </div>
  )
}

const AppWithStore = () => (
  <StoreProvider reducer={reducerWithMiddleware(reducer)} initialState={initialState}>
    <App />
  </StoreProvider>
)

export default AppWithStore
