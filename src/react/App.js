import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { reducer } from './store/reducer'

import Root from './Root'

const store = createStore(reducer)

const App = () => (
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Root />
      </div>
    </DndProvider>
  </Provider>
)

export default App
