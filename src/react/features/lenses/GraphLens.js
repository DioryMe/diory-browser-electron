import React from 'react'
import { useSelector } from 'react-redux'

import { useStoryTool } from '../tools/story'
import { useUpdateTool } from '../tools/update'
import { useDeleteTool } from '../tools/delete'
import { useLens } from './useLens'
import { useDiograph } from '../diograph/useDiograph'

import button from '../../components/lenses/graph/diory'

import GraphView from '../../components/lenses/graph/GraphView'

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
  const diograph = useDiograph()
  const { sideBarWidth } = useSelector((state) => state.sideBar)
  const tools = useGraphTools()

  const { enabled } = useLens('graph', button)
  return enabled ? <GraphView {...diograph} {...tools} sideBarWidth={sideBarWidth} /> : null
}
