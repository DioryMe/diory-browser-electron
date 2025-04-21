import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { useDeleteTool } from '../../tools/delete'
import { useGraphData } from './useGraphData'
import { useLens } from '../utils/useLens'

import GraphView from './GraphView'
import { useDiograph } from '../../diograph/useDiograph'

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
  const { story, diograph } = useDiograph()
  const data = useGraphData(diograph)
  const tools = useGraphTools()

  const { sideBarWidth } = useSelector((state) => state.sideBar)

  const storyNode = data.nodes.find(({ id }) => id === story.key)

  const { enabled } = useLens('graph')
  return enabled ? <GraphView storyNode={storyNode} data={data} {...tools} sideBarWidth={sideBarWidth.right} /> : null
}
