import React from 'react'
import { useStore } from './store'

import LensView from './features/lenses/LensView'
import RoomView from './features/room/RoomView'

const View = () => {
  const [{ selectedLensId }] = useStore((state) => state.lenses)

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
