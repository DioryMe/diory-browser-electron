import React from 'react';
import Channels from './components/Channels'

import { StateProvider } from './store'
import reducer, { initialState } from './reducers'

import addMiddleware from './middleware/addMiddleware'
import { initial, final } from './middleware/logger'

import NavBar from './components/NavBar'
import View from './components/View'

const reducerWithMiddleware = addMiddleware([
  initial,
  reducer,
  final
])

const App = () =>
  <Channels>
    <StateProvider reducer={reducerWithMiddleware} initialState={initialState}>
      <div className="App">
        <NavBar/>
        <View/>
      </div>
    </StateProvider>
  </Channels>

export default App;
