import React from 'react'
import { useSelector } from 'react-redux'

import { withLensContainer } from './withLensContainer'

import GraphView from '../../components/lenses/graph/GraphView'

import button from '../../components/lenses/graph/diory'
import { useStoryTool } from '../diory/tools/story'
import { useUpdateTool } from '../diory/tools/update'
import { useDeleteTool } from '../diory/tools/delete'

export const useGraphTools = () => {
  const selectStory = useStoryTool()
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

const GraphLens = (diograph) => {
  const { sideBarWidth } = useSelector((state) => state.sideBar)

  return <GraphView {...diograph} {...useGraphTools()} sideBarWidth={sideBarWidth} />
}

export default withLensContainer('graph', button)(GraphLens)
