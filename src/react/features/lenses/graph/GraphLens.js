import React from 'react'
import { useSelector } from 'react-redux'

import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { useDeleteTool } from '../../tools/delete'
import { useGraphData } from './useGraphData'
import { useLens } from '../utils/useLens'

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
  const { sideBarWidth } = useSelector((state) => state.sideBar)

  const graphData = useGraphData(diograph)
  const tools = useGraphTools()
  const storyNode = graphData.nodes.find(({ id }) => id === storyKey)

  const { enabled } = useLens('graph')
  return enabled ? (
    <GraphView
      storyNode={storyNode}
      data={graphData}
      {...tools}
      sideBarWidth={sideBarWidth.right}
    />
  ) : null
}
