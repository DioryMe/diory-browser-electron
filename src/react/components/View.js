import React from 'react'

import { SelectedLens } from './lenses'
import Home from './Home'

const App = () => {
  return SelectedLens() ? <SelectedLens /> : <Home />
}

export default App
