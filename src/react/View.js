import React from 'react'

import { useFocusDiory } from './features/room/hooks'

import LensView from './features/lenses/LensView'
import ToolsView from './features/tools/ToolsView'

const View = () => {
  // Loading view
  const { diory } = useFocusDiory()
  if (!diory) {
    return <div>loading</div>
  }

  return (
    <>
      <LensView />
      <ToolsView />
    </>
  )
}

export default View
