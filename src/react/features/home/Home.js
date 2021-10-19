import React from 'react'

import Navigation from '../navigation/Navigation'
import Filters from '../filters/Filters'
import Lenses from '../lenses/Lenses'
// import Rooms from '../rooms/Rooms'
import Welcome from '../welcome/Welcome'
import Tools from '../tools/Tools'
import Buttons from '../buttons'

const Home = () => (
  <div className="App">
    <Navigation />
    <Welcome />
    <div /* Rooms */ />
    <Lenses />
    <Filters />
    <Tools />
    <Buttons />
  </div>
)

export default Home
