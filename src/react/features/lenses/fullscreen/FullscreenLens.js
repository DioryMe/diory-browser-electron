import React from 'react'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import { useStory } from '../../diograph/hooks'

const FullscreenLens = () => {
  const { story } = useStory()
  return <DataAwareDiory diory={story} height="100%" />
}

export default FullscreenLens
