import React from 'react'

import { useDispatch } from '../../store'
import { setFocus } from '../navigation/actions'

import Navigation from '../navigation/Navigation'
import Filters from '../filters/Filters'
import Lenses from '../lenses/Lenses'
import Rooms from '../rooms/Rooms'
import Tools from '../tools/Tools'
import Buttons from '../buttons'
import Connectors from '../connectors/Connectors'

const Home = () => {
  const dispatch = useDispatch()
  window.channelsApi.receive('setFocus', (dioryId) => {
    dispatch(setFocus({ focus: dioryId }))
  })

  return (
    <div className="App">
      <Navigation />
      <Rooms />
      <Lenses />
      <Filters />
      <Tools />
      <Buttons />
      <Connectors />
    </div>
  )
}

export default Home
