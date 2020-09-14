import React from 'react'
import { useStore } from '../../../store'
import { useButtons } from '../../buttons'
import buttons from './buttons'

import GridView from './GridView'
import CreateTool from './tools/create/CreateTool'
import UpdateTool from './tools/update/UpdateTool'

const GRID_LENS = 'grid'

const GridLens = () => {
  useButtons(buttons)

  const [{ selectedLensId }] = useStore((state) => state.lenses)
  return (
    selectedLensId === GRID_LENS && (
      <>
        <GridView />
        <CreateTool />
        <UpdateTool />
      </>
    )
  )
}

GridLens.diory = {
  id: GRID_LENS,
  text: 'Grid',
  image: 'grid-view',
}

export default GridLens
