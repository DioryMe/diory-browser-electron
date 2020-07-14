import React from 'react'

import RoomView from './features/room/RoomView'
import LensView from './features/lenses/LensView'
import FullscreenView from './FullscreenView'

const View = () => {
  return (
    <>
      <RoomView />
      <LensView />
      <FullscreenView />
    </>
  )
}

export default View
