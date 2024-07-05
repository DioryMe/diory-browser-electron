import React from 'react'

import { useSelector } from '../../../store'

import { withLensContainer } from '../utils/withLensContainer'

import GraphView from './GraphView'

import button from './diory'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { useDeleteTool } from '../../tools/delete'

export const useGraph = () => {
  const selectStory = useStoryTool('graph')
  const updateDiory = useUpdateTool()
  const deleteDiory = useDeleteTool()

  return {
    onDioryClick: ({ diory }) => {
      selectStory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
  }
}

const GraphLens = () => {
  const { diograph = {} } = useSelector((state) => state.diograph)
  const { onDioryClick } = useGraph()
  return <GraphView diograph={diograph} onDioryClick={onDioryClick} />
}

export default withLensContainer('graph', button)(GraphLens)
