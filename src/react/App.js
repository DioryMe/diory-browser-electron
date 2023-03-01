import React from 'react'

import StoreProvider from './store/StoreProvider'

import Root from './Root'

const App = () => (
  <StoreProvider>
    <div className="App">
      <Root />
    </div>
  </StoreProvider>
)

export default App
