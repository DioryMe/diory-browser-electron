import React from 'react'

import { GraphLens } from './graph/GraphLens'
import { MapLens } from './map/MapLens'
import { TimelineLens } from './timeline/TimelineLens'
import { SearchLens } from './search/SearchLens'
import { useSelector } from '../../store'

export const Lenses = () => {
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
