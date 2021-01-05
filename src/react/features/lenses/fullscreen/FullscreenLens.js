import React from 'react'
import Diory from '../../../components/diories/Diory'
import { useFocus } from '../../diograph/hooks'

const FullscreenLens = () => {
  const { diory } = useFocus()
  return <Diory diory={diory} height="100%" />
}

export default FullscreenLens
