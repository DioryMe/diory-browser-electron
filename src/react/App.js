import React from 'react';

import { StateProvider } from './store'
import { reducerWithMiddleware } from './middleware'
import reducer, { initialState } from './store/reducers'

import NavBar from './features/navigation/NavigationBar'
import View from './View'

const App = () =>
  <StateProvider reducer={reducerWithMiddleware(reducer)} initialState={initialState}>
    <div className="App">
      <NavBar/>
      <View/>
    </div>
  </StateProvider>

export default App
