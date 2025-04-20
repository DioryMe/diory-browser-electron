import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { useStoryTool } from '../tools/story'
import { useUpdateTool } from '../tools/update'
import { useDeleteTool } from '../tools/delete'
import { useGraphData } from './components/graph/useGraphData'
import { useLens } from './utils/useLens'

import GraphView from './components/graph/GraphView'

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
  const graphLensData = useGraphData()
  const tools = useGraphTools()

  const { sideBarWidth } = useSelector((state) => state.sideBar)

  const { enabled } = useLens('graph')
  return enabled ? (
    <GraphView {...graphLensData} {...tools} sideBarWidth={sideBarWidth.right} />
  ) : null
}
