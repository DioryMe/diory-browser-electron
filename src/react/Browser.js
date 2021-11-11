import React from 'react'

import Navigation from './features/navigation/Navigation'
import Lenses from './features/lenses/Lenses'
import Tools from './features/tools/Tools'
import Buttons from './features/buttons'
import Search from './features/search/Search'

const Browser = () => (
  <div className="App">
    <Navigation />
    <Lenses />
    <Tools />
    <Buttons />
    <Search />
  </div>
)

export default Browser
