import React from 'react'
import { useStore } from './store'
import { useFocusDiory } from './features/room/hooks'

import Fullscreen from './components/Fullscreen'
import Diory from './components/diories/Diory'

const FullscreenView = () => {
  const [{ fullscreen }] = useStore((state) => state.navigation)
  const { diory } = useFocusDiory()

  return fullscreen ? (
    <Fullscreen zIndex={1000}>
      <Diory diory={diory} height={'100%'} />
    </Fullscreen>
  ) : null
}

export default FullscreenView
