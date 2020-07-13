import React from 'react'
import { useStore } from './store'

import FullscreenView from './FullscreenView'
import LensView from './features/lenses/LensView'
import RoomView from './features/room/RoomView'

const View = () => {
  const [{ fullscreen }] = useStore((state) => state.navigation)
  const [{ selectedLensId }] = useStore((state) => state.lenses)

  if (fullscreen) {
    return <FullscreenView />
  }

  if (selectedLensId) {
    return <LensView />
  }

  return (
    <>
      <RoomView />
    </>
  )
}

export default View
