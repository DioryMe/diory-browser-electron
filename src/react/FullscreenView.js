import React from 'react'

import { useFocusDiory } from './features/room/hooks'

import Fullscreen from './components/Fullscreen'
import Diory from './components/diories/Diory'

const FullscreenView = () => {
  const { diory } = useFocusDiory()
  return (
    <Fullscreen top={48}>
      <Diory diory={diory} height={'100%'} />
    </Fullscreen>
  )
}

export default FullscreenView
