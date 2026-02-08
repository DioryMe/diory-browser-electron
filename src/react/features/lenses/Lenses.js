import React from 'react'

import { useLens } from './utils/useLens'

import { LensesNavigation } from './LensesNavigation'
import { GraphLens, graphLensButton } from './graph/GraphLens'
import { MapLens, mapLensButton } from './map/MapLens'
import { TimelineLens } from './timeline/TimelineLens'
import { SearchLens, searchLensButton } from './search/SearchLens'

import { timelineLensButton } from './timeline/button'

export const Lenses = ({ diograph, isDiory, createDiory }) => {
  if (isDiory) {
    createDiory(graphLensButton)
    createDiory(mapLensButton)
    createDiory(timelineLensButton)
    createDiory(searchLensButton)
  }

  return (
    <>
      <LensesNavigation />
      {useLens(graphLensButton) && <GraphLens diograph={diograph} />}
      {useLens(mapLensButton) && <MapLens diograph={diograph} isDiory={isDiory} />}
      {useLens(timelineLensButton) && <TimelineLens diograph={diograph} isDiory={isDiory} />}
      {useLens(searchLensButton) && <SearchLens diograph={diograph} />}
    </>
  )
}
