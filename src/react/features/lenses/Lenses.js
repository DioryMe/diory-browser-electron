import React from 'react'
import PropTypes from 'prop-types'

import Fullscreen from '../../components/Fullscreen'
import GridLens from './grid/GridLens'
// import TimelineLens from './timeline/TimelineLens'
// import MapLens from './map/MapLens'

const Lenses = ({ room }) => (
  <Fullscreen zIndex={0}>
    <GridLens room={room} />
    {/* <TimelineLens /> */}
    {/* <MapLens /> */}
  </Fullscreen>
)

Lenses.propTypes = {
  room: PropTypes.object.isRequired,
}

export default Lenses
