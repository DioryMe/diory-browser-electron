import React from 'react'

import { useLens } from './utils/useLens'

import { LensesNavigation } from './LensesNavigation'
import { GraphLens, graphLensButton } from './graph/GraphLens'
import { MapLens, mapLensButton } from './map/MapLens'
import { TimelineLens } from './timeline/TimelineLens'
import { SearchLens, searchLensButton } from './search/SearchLens'
import { useDiograph } from '../diograph/utils/useDiograph'

import { timelineLensButton } from './timeline/button'

export const Lenses = () => {
  const { diograph } = useDiograph()
  return (
    <>
      <LensesNavigation />
      {useLens(graphLensButton, diograph) && <GraphLens diograph={diograph} />}
      {useLens(mapLensButton, diograph) && <MapLens diograph={diograph} />}
      {useLens(timelineLensButton, diograph) && <TimelineLens diograph={diograph} />}
      {useLens(searchLensButton, diograph) && <SearchLens diograph={diograph} />}
    </>
  )
}
