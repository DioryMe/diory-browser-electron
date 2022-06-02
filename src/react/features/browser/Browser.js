import React from 'react'

import PropTypes from 'prop-types'
// import { useSelector } from '../../store'

import Fullscreen from '../../components/Fullscreen'
import Navigation from '../navigation/Navigation'
// import Lenses from '../lenses/Lenses'
import Tools from '../tools/Tools'
import Buttons from '../buttons/Buttons'
import Search from '../search/Search'

import GridLens from '../lenses/grid/GridLens'

const Browser = ({ room }) => (
  // const { showSearchBar } = useSelector((state) => state.search)
  // const { loaded } = useSelector((state) => state.diograph)
  // const { storyId } = useSelector((state) => state.navigation)
  <Fullscreen room={room}>
    <Navigation />
    {/* <Lenses right={showSearchBar ? 300 : 0} marginTop={48} /> */}
    <GridLens room={room} />
    <Search width={300} marginTop={48} />
    <Tools />
    <Buttons />
  </Fullscreen>
)

Browser.propTypes = {
  room: PropTypes.object.isRequired,
}

export default Browser
