import React from 'react'

import { useDispatchActions, useSelector } from '../../../store'

import { withLensContainer } from '../withLensContainer'

import GraphView from './GraphView'

import { selectStory } from '../../navigation/navigationActions'
import Fullscreen from '../../../components/Fullscreen'
import BackgroundDiory from '../../../components/diories/BackgroundDiory'

import button from './diory'

const useOnDioryClick = () => {
  const { dispatch } = useDispatchActions()
  return (node) => {
    dispatch(selectStory(node))
  }
}

const GraphLens = () => {
  const { rootId, diograph = {} } = useSelector((state) => state.diograph)
  const onDioryClick = useOnDioryClick()
  const rootDiory = diograph[rootId]
  return (
    <Fullscreen background="white">
      <BackgroundDiory diory={rootDiory} opacity={0.6} />
      <GraphView diograph={diograph} onDioryClick={onDioryClick} />
    </Fullscreen>
  )
}

export default withLensContainer('graph', button)(GraphLens)
