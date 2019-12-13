import React from 'react';

import { StateProvider } from './store'
import { ChannelProvider } from'./channels'

import reducer, { initialState } from './reducers'

import addMiddleware from './middleware/addMiddleware'
import { initial, final } from './middleware/logger'

import NavBar from './components/navigation/NavigationBar'
import View from './components/View'

const reducerWithMiddleware = addMiddleware([
  initial,
  reducer,
  final
])

const App = () =>
  <StateProvider reducer={reducerWithMiddleware} initialState={initialState}>
    <ChannelProvider>
      <div className="App">
        <NavBar/>
        <View/>
      </div>
    </ChannelProvider>
  </StateProvider>

export default App
