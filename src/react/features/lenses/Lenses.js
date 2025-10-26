import React from 'react'

import { useLens } from './utils/useLens'

import { FolderLens, folderLensButton } from './folder/FolderLens'
import { GraphLens, graphLensButton } from './graph/GraphLens'
import { MapLens, mapLensButton } from './map/MapLens'
import { TimelineLens, timelineLensButton } from './timeline/TimelineLens'
import { SearchLens, searchLensButton } from './search/SearchLens'

export const Lenses = () => (
  <>
    {useLens(folderLensButton) && <FolderLens />}
    {useLens(graphLensButton) && <GraphLens />}
    {useLens(mapLensButton) && <MapLens />}
    {useLens(timelineLensButton) && <TimelineLens />}
    {useLens(searchLensButton) && <SearchLens />}
  </>
)
