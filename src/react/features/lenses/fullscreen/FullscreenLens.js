import React from 'react'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import { useDiograph } from '../../diograph/useDiograph'

const FullscreenLens = () => {
  const { story } = useDiograph()
  return <DataAwareDiory diory={story} height="100%" />
}

export default FullscreenLens
