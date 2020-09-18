import React from 'react'
import { useFocusDiory } from '../../room/hooks'
import BackgroundDiory from '../../../components/diories/BackgroundDiory'

const FullscreenLens = () => {
  const { diory } = useFocusDiory()
  return <BackgroundDiory diory={diory} height="100%" />
}

export default FullscreenLens
