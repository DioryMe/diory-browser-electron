import React from 'react'

import Navigation from '../navigation/Navigation'
import Filters from '../filters/Filters'
import Lenses from '../lenses/Lenses'
import Rooms from '../rooms/Rooms'
import Tools from '../tools/Tools'
import Buttons from '../buttons'
import Connectors from '../connectors/Connectors'
import Search from '../search/Search'

const Home = () => (
  <div className="App">
    <Navigation />
    <Rooms />
    <Lenses />
    <Filters />
    <Tools />
    <Buttons />
    <Connectors />
    <Search />
  </div>
)

export default Home
