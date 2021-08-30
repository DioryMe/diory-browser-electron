import React from 'react'

import Navigation from '../navigation/Navigation'
import Filters from '../filters/Filters'
import Lenses from '../lenses/Lenses'
import Rooms from '../rooms/Rooms'
import Tools from '../tools/Tools'
import Buttons from '../buttons'
import Connectors from '../connectors/Connectors'
import Focus from '../focus/Focus'

const Home = () => (
  <div className="App">
    <Navigation />
    <Rooms />
    <Lenses />
    <Focus />
    <Filters />
    <Tools />
    <Buttons />
    <Connectors />
  </div>
)

export default Home
