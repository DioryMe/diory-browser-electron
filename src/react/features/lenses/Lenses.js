import React from 'react'

import { useDiograph } from '../home/useDiograph'

import GraphLens from './GraphLens'
import MapLens from './MapLens'
// import TimelineLens from './timeline/TimelineLens'
import SearchLens from './SearchLens'

export const DEFAULT_LENS = null

const Lenses = () => {
  const diograph = useDiograph()
  return (
    <>
      <GraphLens {...diograph} />
      <MapLens {...diograph} />
      <SearchLens {...diograph} />
    </>
  )
}

export default Lenses
