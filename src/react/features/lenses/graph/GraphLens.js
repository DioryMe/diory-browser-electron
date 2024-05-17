import React from 'react'

import { useDispatchActions, useSelector } from '../../../store'

import { withLensContainer } from '../utils/withLensContainer'

import GraphView from './GraphView'

import { selectStory } from '../../navigation/navigationActions'

import button from './diory'

const useOnDioryClick = () => {
  const { dispatch } = useDispatchActions()
  return (node) => {
    dispatch(selectStory(node))
  }
}

const GraphLens = () => {
  const { diograph = {} } = useSelector((state) => state.diograph)
  const onDioryClick = useOnDioryClick()
  return <GraphView diograph={diograph} onDioryClick={onDioryClick} />
}

export default withLensContainer('graph', button)(GraphLens)
