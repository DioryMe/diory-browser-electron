import React from 'react'

import StoreProvider from './store/StoreProvider'

import Root from './layout/Root'

const App = () => (
  <StoreProvider>
    <Root />
  </StoreProvider>
)

export default App
