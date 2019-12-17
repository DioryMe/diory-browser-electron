import React from 'react';

import { StateProvider } from './store'
import { ChannelProvider } from './channels'
import { reducerWithMiddleware } from './middleware'
import reducer, { initialState } from './store/reducers'

import NavBar from './features/navigation/NavigationBar'
import View from './View'

const App = () =>
  <StateProvider reducer={reducerWithMiddleware(reducer)} initialState={initialState}>
    <ChannelProvider>
      <div className="App">
        <NavBar/>
        <View/>
      </div>
    </ChannelProvider>
  </StateProvider>

export default App
