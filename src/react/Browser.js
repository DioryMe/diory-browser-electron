import React from 'react'

import Navigation from './features/navigation/Navigation'
import Filters from './features/filters/Filters'
import Lenses from './features/lenses/Lenses'
// import Rooms from './features/rooms/Rooms'
import Tools from './features/tools/Tools'
import Buttons from './features/buttons'
import Search from './features/search/Search'

const Browser = () => (
  <div className="App">
    <Navigation />
    <div /* Rooms */ />
    <Lenses />
    <Filters />
    <Tools />
    <Buttons />
    <Search />
  </div>
)

export default Browser
