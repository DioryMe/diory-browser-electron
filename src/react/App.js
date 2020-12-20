import React from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { StoreProvider } from './store/StoreContext'
import { reducerWithMiddleware } from './utils/middleware'
import { reducer } from './store/reducer'
import { initialState } from './store/initialState'

import Home from './features/home/Home'

const App = () => (
  <StoreProvider reducer={reducerWithMiddleware(reducer)} initialState={initialState}>
    <DndProvider backend={HTML5Backend}>
      <Home />
    </DndProvider>
  </StoreProvider>
)

export default App
