import React from 'react'
import Diory from '../../../components/diories/Diory'
import { useFocusDiory } from '../../diograph/hooks'

const FullscreenLens = () => {
  const { diory } = useFocusDiory()
  return <Diory diory={diory} height="100%" />
}

export default FullscreenLens
