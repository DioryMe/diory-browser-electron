import React from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import StoreProvider from './store/StoreProvider'

import Root from './Root'

const App = () => (
  <StoreProvider>
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Root />
      </div>
    </DndProvider>
  </StoreProvider>
)

export default App
