import React from 'react'
import { useSelector } from 'react-redux'

import { useCreateHomeDiory } from '../../home/utils/useCreateHomeDiory'
import { useLensButton } from '../utils/useLensButton'
import { useLens } from '../useLens'

import { useSelectStory } from '../../tools/selectStory'
import { useSelectDiory } from '../../tools/useSelectDiory'
import { useGraphData } from './useGraphData'

import GraphView from './GraphView'

import graphLens from './button'

export const useGraphTools = () => {
  const { selectStory } = useSelectStory()
  const { selectDiory } = useSelectDiory()

  return {
    onDioryClick: ({ diory }) => {
      selectStory(diory)
      selectDiory(diory)
    },
  }
}

export const GraphLens = () => {
  useCreateHomeDiory(graphLens.id)
  useLensButton(graphLens)

  const { diograph } = useSelector((state) => state.diograph)
  const { storyKey } = useSelector((state) => state.navigation)
  const { sidePanelWidths } = useSelector((state) => state.sidePanel)

  const graphData = useGraphData(diograph)
  const tools = useGraphTools()
  const storyNode = graphData.nodes.find(({ id }) => id === storyKey)

  return useLens(graphLens.id)? (
    <GraphView
      storyNode={storyNode}
      data={graphData}
      {...tools}
      sidePanelWidth={sidePanelWidths.right}
    />
  ) : null
}
