import React from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { StoreProvider } from './store/StoreContext'
import { reducerWithMiddleware } from './utils/middleware'
import { reducer } from './store/reducer'
import { initialState } from './store/initialState'

import Root from './Root'

const App = () => (
  <StoreProvider reducer={reducerWithMiddleware(reducer)} initialState={initialState}>
    <DndProvider backend={HTML5Backend}>
      <Root />
    </DndProvider>
  </StoreProvider>
)

export default App
