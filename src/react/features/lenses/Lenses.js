import React from 'react'

import { useSelector } from '../../store'
import { useLenses } from './useLenses'

import { GraphLens } from './graph/GraphLens'
import { MapLens } from './map/MapLens'
import { TimelineLens } from './timeline/TimelineLens'
import { SearchLens } from './search/SearchLens'

export const Lenses = () => {
  useLenses()

  const { selectedLensId } = useSelector((state) => state.lenses)

  switch (selectedLensId) {
    case 'graph':
      return <GraphLens />
    case 'map':
      return <MapLens />
    case 'timeline':
      return <TimelineLens />
    case 'search':
      return <SearchLens />
    default:
      return null
  }
}
