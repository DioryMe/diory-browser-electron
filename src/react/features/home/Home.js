import React from 'react'

import Navigation from '../navigation/Navigation'
import Filters from '../filters/Filters'
import Lenses from '../lenses/Lenses'
import Rooms from '../rooms/Rooms'
import Buttons from '../buttons'
import Connectors from '../connectors/Connectors'

const Home = () => (
  <div className="App">
    <Navigation />
    <Filters />
    <Lenses />
    <Rooms />
    <Buttons />
    <Connectors />
  </div>
)

export default Home
