import React from 'react'
import GraphFilter from './graph/GraphFilter'
import MapFilter from './map/MapFilter'
import TimelineFilter from './timeline/TimelineFilter'

const Filters = () => (
  <div data-testid="filters">
    <GraphFilter />
    <MapFilter />
    <TimelineFilter />
  </div>
)

export default Filters
