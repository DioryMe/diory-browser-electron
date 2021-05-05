import React from 'react'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import { useFocus } from '../../diograph/hooks'

const FullscreenLens = () => {
  const { diory } = useFocus()
  return <DataAwareDiory diory={diory} height="100%" />
}

export default FullscreenLens
