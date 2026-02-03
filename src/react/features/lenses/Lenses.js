import React from 'react'

import { useLens } from './utils/useLens'

import { useDiograph } from '../diograph/utils/useDiograph'
import { useCreateDioryById } from '../tools/actions/createDiory/useCreateDioryById'

import { LensesNavigation } from './LensesNavigation'
import { GraphLens, graphLensButton } from './graph/GraphLens'
import { MapLens, mapLensButton } from './map/MapLens'
import { TimelineLens } from './timeline/TimelineLens'
import { SearchLens, searchLensButton } from './search/SearchLens'

import { timelineLensButton } from './timeline/button'

export const Lenses = () => {
  const { diograph, isDiory } = useDiograph()

  useCreateDioryById(graphLensButton.id, diograph)
  useCreateDioryById(mapLensButton.id, diograph)
  useCreateDioryById(timelineLensButton.id, diograph)
  useCreateDioryById(searchLensButton.id, diograph)

  return (
    <>
      <LensesNavigation />
      {useLens(graphLensButton) && <GraphLens diograph={diograph} isDiory={isDiory} />}
      {useLens(mapLensButton) && <MapLens diograph={diograph} isDiory={isDiory} />}
      {useLens(timelineLensButton) && <TimelineLens diograph={diograph} isDiory={isDiory} />}
      {useLens(searchLensButton) && <SearchLens diograph={diograph} isDiory={isDiory} />}
    </>
  )
}
