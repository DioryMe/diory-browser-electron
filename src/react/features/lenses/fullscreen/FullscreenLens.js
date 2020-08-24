import React from 'react'
import { useFocusDiory } from '../../room/hooks'

import Diory from '../../../components/diories/Diory'

const FullscreenLens = () => {
  const { diory } = useFocusDiory()

  return <Diory diory={diory} height="100%" />
}

FullscreenLens.diory = {
  text: 'Fullscreen',
  image: 'fullscreen',
}

export default FullscreenLens
