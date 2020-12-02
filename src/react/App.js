import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Home from './features/home/Home'

import { reducerWithMiddleware } from './utils/middleware'
import { StoreProvider } from './store/StoreContext'
import { reducer } from './store/reducer'
import { initialState } from './store/initialState'

const App = () => (
  <StoreProvider reducer={reducerWithMiddleware(reducer)} initialState={initialState}>
    <DndProvider backend={HTML5Backend}>
      <Home />
    </DndProvider>
  </StoreProvider>
)

export default App
