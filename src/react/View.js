import React from 'react'

import { useFocusDiory } from './features/room/hooks'

import Lenses from './features/lenses/Lenses'
import FullscreenView from './FullscreenView'

const View = () => {
  // Loading view
  const { diory } = useFocusDiory()
  if (!diory) {
    return <div>loading</div>
  }

  return (
    <>
      <Lenses />
      <FullscreenView />
    </>
  )
}

export default View
