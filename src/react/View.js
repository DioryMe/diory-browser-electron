import React from 'react'

import { useFocusDiory } from './features/room/hooks'

import LensView from './features/lenses/LensView'
import FullscreenView from './FullscreenView'
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
      <FullscreenView />
      <ToolsView/>
    </>
  )
}

export default View
