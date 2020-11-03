import React from 'react'

import { useFocusDiory } from './features/room/hooks'

import Lenses from './features/lenses/Lenses'

const View = () => {
  // Loading view
  const { diory } = useFocusDiory()
  if (!diory) {
    return <div>loading</div>
  }

  return (
    <>
      <Lenses />
    </>
  )
}

export default View
