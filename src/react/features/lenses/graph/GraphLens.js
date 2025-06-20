import React from 'react'
import { useSelector } from 'react-redux'

import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { useDeleteTool } from '../../tools/delete'
import { useGraphData } from './useGraphData'

import GraphView from './GraphView'

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

export const GraphLens = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { storyKey } = useSelector((state) => state.navigation)
  const { sidePanelWidths } = useSelector((state) => state.sidePanel)

  const graphData = useGraphData(diograph)
  const tools = useGraphTools()
  const storyNode = graphData.nodes.find(({ id }) => id === storyKey)

  return (
    <GraphView
      storyNode={storyNode}
      data={graphData}
      {...tools}
      sidePanelWidth={sidePanelWidths.right}
    />
  )
}
