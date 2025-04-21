import React from 'react'
import { useSelector } from 'react-redux'

import { GraphLens } from './graph/GraphLens'
import { MapLens } from './map/MapLens'
// import TimelineLens from './timeline/TimelineLens'
import { SearchLens } from './search/SearchLens'

export const Lenses = () => {
  const { selectedLensId } = useSelector((store) => store.lenses)
  return !selectedLensId ? null : (
    <>
      <GraphLens />
      <MapLens />
      <SearchLens />
    </>
  )
}
