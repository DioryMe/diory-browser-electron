import React from 'react'

import { useFocus } from '../../diograph/hooks'

import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import Fullscreen from '../../../components/Fullscreen'

const FullscreenLens = () => {
  const { diory } = useFocus()
  return (
    <Fullscreen zIndex={10000}>
      <DataAwareDiory diory={diory} />
    </Fullscreen>
  )
}

export default FullscreenLens
