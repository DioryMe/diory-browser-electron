import React from 'react'

import { useFocusDiory } from './features/room/hooks'

import LensView from './features/lenses/LensView'

const View = () => {
  // Loading view
  const { diory } = useFocusDiory()
  if (!diory) {
    return <div>loading</div>
  }

  return (
    <>
      <LensView />
    </>
  )
}

export default View
