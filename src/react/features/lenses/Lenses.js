import React from 'react'
import { useSelector } from 'react-redux'

import { GraphLens } from './GraphLens'
import { MapLens } from './MapLens'
// import TimelineLens from './timeline/TimelineLens'
import { SearchLens } from './SearchLens'

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
